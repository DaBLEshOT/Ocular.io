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
        this.storage.save(request.timeStamp, request.initiator, request.url);

        // TESTS
        // Get todays trackers
        this.storage.get(new Date()).then((logs) => {
            console.log(logs);
        });
        // Get tracker for certain time span
        this.storage.getFromTo(new Date(2021, 2, 20), new Date(2021, 2, 27)).then((logs) => {
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
                let data = request.result;
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
                }
                resolve(logs);
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
