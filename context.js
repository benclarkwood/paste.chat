var parent = chrome.contextMenus.create(
  {
    "title": "paste.chat",
    "contexts": ["all"]
  });
  
chrome.contextMenus.onClicked.addListener(function() {
  // Figure out what the current tab is.
  chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
    function(tab) {
      // Okay, we have the current tab. Call 
      // content.getSelection on it.
      chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
      function(response) {
        // This response should have format: { url: <url>, text: <any selected text> }
        // Log both back.
        chrome.tabs.sendMessage(tab[0].id, {method: "log", url: response.url, text: response.text},
        function (response)  {});
      });
    });
});