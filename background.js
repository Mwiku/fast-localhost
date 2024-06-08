chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.startsWith("http://l:")) {
        const url = getRedirectUrl(tab.url);
        const redirectUrl = url; // Logic to determine redirect URL
        if (redirectUrl) {
            chrome.tabs.update(tabId, { url: redirectUrl });
        }
    }
});

function getRedirectUrl(url) {
    port = url.slice(9);
    const redirectUrl = `http://localhost:${port}`;

    return redirectUrl;
}
