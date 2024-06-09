chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.startsWith("http://l:" && changeInfo.status === "complete")) {
        const port = tab.url.slice(9);
        redirectUrl(port);
    } else if (tab.title.startsWith("l:") && changeInfo.status === "complete") {
        // This one specifically covers for port 80
        const port = tab.title.slice(2, 5);
        redirectUrl(port);
    }
});

function redirectUrl(port) {
    let redirectUrl = `http://localhost:${port}`;

    chrome.tabs.update({ url: redirectUrl });
}
