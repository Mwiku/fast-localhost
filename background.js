chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  try {
    if (changeInfo.status === "complete" && tab.url.startsWith("http://l:")) {
      const port = tab.url.slice(9);
      redirectUrl(port);
    } else if (changeInfo.status === "complete" && tab.title.startsWith("l:")) {
      // This one specifically covers for port 80
      const port = tab.title.slice(2, 5);
      redirectUrl(port);
    }
  } catch (error) {
    console.error(`Fast-localhost error, unable to redirecton tab ${tabId}`);
  }
});

function redirectUrl(port) {
  let redirectUrl = `http://localhost:${port}`;

  chrome.tabs.update({ url: redirectUrl });
}
