chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let shortHandUrl = "";
    console.log(`tab-title stages: ${tab.title}`);
    console.log(`shorthand-url is: ${shortHandUrl}`);
    if (changeInfo.status == "loading" && shortHandUrl.length <= 0) {
        shortHandUrl = tab.title;
        console.log(`short-hand-url: ${shortHandUrl}`);
    }

    if (
        changeInfo.status === "complete" &&
        tab.url.startsWith("http://l:" || shortHandUrl.length > 0)
    ) {
        shortHandUrl = tab.url;
        console.log(
            `in redirect tab url: ${tab.url} . title: ${tab.title} . short-hand-url: ${shortHandUrl} `
        );
        const url = getRedirectUrl(shortHandUrl);
        const redirectUrl = url; // Logic to determine redirect URL
        if (redirectUrl) {
            chrome.tabs.update(tabId, { url: redirectUrl });
        }
    }
});

function getRedirectUrl(shortHandUrl) {
    console.log(`receive url i: ${shortHandUrl}`);
    let port = "";
    if (shortHandUrl.startsWith("http://l:")) {
        port = shortHandUrl.slice(9);
    } else if (shortHandUrl.startsWith("l:")) {
        port = shortHandUrl.slice(2);
    }
    const redirectUrl = `http://localhost:${port}`;
    resetShortHandUrl();
    console.log(`after reset ${shortHandUrl}`);
    port = "";
    return redirectUrl;
}

function resetShortHandUrl() {
    shortHandUrl = "";
}
