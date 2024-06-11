chrome.tabs.onUpdated.addListener((changeInfo, tab) => {
    console.log(`tab info: ${JSON.stringify(tab)}`);
    try {
        // if (
        //     changeInfo.status === "complete" &&
        //     (tab.url == undefined || tab.title == undefined)
        // ) {
        //     console.log(` changeinfo : ${JSON.stringify(tab)}`);
        //     throw new Error("tab url or tab title is undefined");
        // }
        if (
            changeInfo.status === "complete" &&
            tab.url.startsWith("http://l:")
        ) {
            const port = tab.url.slice(9);
            redirectUrl(port);
        } else if (
            changeInfo.status === "complete" &&
            tab.title.startsWith("l:")
        ) {
            // This one specifically covers for port 80
            const port = tab.title.slice(2, 5);
            redirectUrl(port);
        }
    } catch (error) {
        console.log(`Undefined tab url or title ${error}`);
    }
});

function redirectUrl(port) {
    let redirectUrl = `http://localhost:${port}`;

    chrome.tabs.update({ url: redirectUrl });
}
