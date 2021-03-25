chrome.runtime.onInstalled.addListener(() => {
    const url = chrome.runtime.getURL("./services.json");

    fetch(url)
        .then((response) => response.json())
        .then((services) => {
            const urlList = genUrlList(services);

            chrome.webRequest.onCompleted.addListener(
                (listener) => {
                    
                    console.log(listener);
                },
                { urls: urlList }
            );
        });
});

function genUrlList(services) {
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