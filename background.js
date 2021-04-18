chrome.runtime.onInstalled.addListener(() => {
    const listener = new Listener();
});

class Listener {
    constructor(services) {
        const disconnectmeURL = "https://raw.githubusercontent.com/disconnectme/disconnect-tracking-protection/master/services.json";
        this.servicesUrl = services || disconnectmeURL;
        this.storage = new Storage();
        this.storage.openDatabase().then(() => this.start());
    }

    start() {
        fetch(this.servicesUrl)
            .then((response) => response.json())
            .then((services) => {
                const patterns = this.genPatternList(services);
                this.registerWebRequestListener(patterns, this.saveTrackerRequest.bind(this));
            });
    }

    saveTrackerRequest(request) {
        this.storage.save(request.timeStamp, request.initiator || request.originUrl, request.url);

        // TESTS
        // Get todays trackers
        this.storage.get(new Date()).then((logs) => {
            console.log(logs);
        });
        // Get tracker for certain time span
        this.storage.getFromTo(new Date(2021, 2, 20), new Date(2021, 2, 30)).then((logs) => {
            console.log(logs);
        });
    }

    registerWebRequestListener(patterns, callback) {
        chrome.webRequest.onCompleted.addListener(
            (request) => { callback(request); },
            { urls: patterns }
        );
    }

    genPatternList(services) {
        let out = [];

        const categories = Object.keys(services.categories);
        categories.forEach(
            (category) => {
                services.categories[category].forEach(
                    (service) => {
                        const name = Object.keys(service)[0];
                        const domain = Object.keys(service[name])[0];
                        const urls = service[name][domain];

                        const patterns = urls.map((url) => {
                            return `*://*.${url}/*`;
                        });

                        out = out.concat(patterns);
                    }
                );
            }
        );

        return out;
    }
}

class Storage {

    DB_NAME = "Tracker-data";
    DB_VERSION = 1;
    DB_STORE_NAME = "Trackers";

    constructor() {
        this.db;
    }

    openDatabase() {
        return new Promise((resolve, reject) => {
            //indexedDB.deleteDatabase(this.DB_NAME);
            let request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
            request.onerror = (event) => {
                console.log(event);
                reject();
            };

            request.onupgradeneeded = (event) => {
                let objectStore = event.target.result.createObjectStore(this.DB_STORE_NAME, { keyPath: "date" });

                objectStore.createIndex("date", "date", { unique: true });
            };
        });
    }

    getObjectStore(store_name, mode) {
        let tx = this.db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    removeTime(date) {
        return new Date(date.toDateString());
    }

    save(timestamp, initiator, tracker) {
        let store = this.getObjectStore(this.DB_STORE_NAME, "readwrite");

        let request = store.get(this.removeTime(new Date()));
        request.onerror = (event) => {
            console.log(event);
        };
        request.onsuccess = (event) => {
            let data = event.target.result;

            if (data == undefined) {
                data = {
                    date: this.removeTime(new Date()),
                    logs: []
                };
            }
            data.logs.push(new Log(timestamp, initiator, tracker));

            store.put(data);
        };
    }

    get(date) {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore(this.DB_STORE_NAME, "readwrite");
            let request = store.get(this.removeTime(date));
            request.onerror = (event) => {
                console.log(event);
            };
            request.onsuccess = (event) => {
                let data = event.target.result;
                resolve(data);
            };
        });
    }

    getFromTo(begin, end) {
        return new Promise((resolve, reject) => {
            let beginDate = this.removeTime(begin);
            let endDate = this.removeTime(end);

            let store = this.getObjectStore(this.DB_STORE_NAME, "readwrite");

            let logs = [];
            store.openCursor().onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    let keyDate = this.removeTime(new Date(cursor.key));

                    if (beginDate <= keyDate && keyDate <= endDate) {
                        logs.push(cursor.value);
                    }

                    cursor.continue();
                } else {
                    resolve(logs);
                }
            };
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore(this.DB_STORE_NAME, "readwrite");

            let logs = [];
            store.openCursor().onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    logs.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(logs);
                }
            };
        });
    }
}

class Log {
    constructor(timestamp, initiator, tracker) {
        this.timestamp = timestamp;
        this.initiator = initiator;
        this.tracker = tracker;
    }
}

class Utils {
    constructor(database) {
        this.database = database;
    }

    async trackersCurrentDay() {
        let data = await this.database.get(new Date());
        if (data) {
            return {
                date: data.date,
                chart: this._countDataset(data.logs)
            };
        }
        return {};
    }

    async trackersPastWeek() {
        let begin = new Date();
        begin.setDate(begin.getDate() - 7);
        let end = new Date();

        let data = await this.database.getFromTo(begin, end);
        if (data) {
            let logs = [];
            data.forEach((day) => {
                logs = logs.concat(day.logs);
            });

            return {
                from: begin,
                to: end,
                chart: this._countDataset(logs)
            };
        }
        return {};
    }

    async trackersPastMonth() {
        let begin = new Date();
        begin.setDate(begin.getDate() - 30);
        let end = new Date();

        let data = await this.database.getFromTo(begin, end);
        if (data) {
            let logs = [];
            data.forEach((day) => {
                logs = logs.concat(day.logs);
            });

            return {
                from: begin,
                to: end,
                chart: this._countDataset(logs)
            };
        }
        return {};
    }

    async allTimePercentage() {
        let data = await this.database.getAll();
        if (data) {
            let logs = [];
            data.forEach((day) => {
                logs = logs.concat(day.logs);
            });

            return {
                chart: this._countDataset(logs)
            };
        }
        return {};
    }

    async dailyReport() {
        let data = await this.database.get(new Date());
        if (data) {
            let trackerSet = {};
            data.logs.forEach((log) => {
                let tracker = new URL(log.tracker).hostname;
                if (!(tracker in trackerSet)) {
                    trackerSet[tracker] = [];
                }

                if (log.initiator) {
                    let initiator = new URL(log.initiator).hostname;
                    if (!trackerSet[tracker].includes(initiator)) {
                        trackerSet[tracker].push(initiator);
                    }
                }
            });

            return {
                date: data.date,
                data: trackerSet,
                chart: this._countDataset(data.logs)
            };
        }
        return {};
    }

    _countDataset(logs) {
        let set = {};
        logs.forEach((log) => {
            let hostname = new URL(log.tracker).hostname;
            if (!(hostname in set)) {
                set[hostname] = 0;
            }
            set[hostname]++;
        });

        let sorted = this._setToSortedArray(set);

        let labels = sorted.map((obj) => {
            return obj.label;
        });
        let data = sorted.map((obj) => {
            return obj.data;
        });

        return {
            labels: labels,
            data: data
        };
    }

    _setToSortedArray(set) {
        let arr = Object.keys(set).map((key) => {
            return { label: key, data: set[key] };
        });

        let sorted = arr.sort((obj1, obj2) => {
            if (obj1.data > obj2.data) {
                return -1;
            }
            if (obj1.data < obj2.data) {
                return 1;
            }
            return 0;
        });

        return sorted;
    }
}
