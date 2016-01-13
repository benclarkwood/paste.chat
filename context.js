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
        console.log("Got response");
        // This response should have format: { url: <url>, text: <any selected text> }
        sendToSlack(response);
      });
    });
});

function sendToSlack(selection) {
  console.log("Sending to slack");
  // Get the webhook value.
  chrome.storage.sync.get({
    webhookValue: "NO VALUE SET"
  }, function(items) {
    if (items.webhookValue == "NO VALUE SET") {
      // do nothing.
    } else {
      var payload = { text: formatMessage(selection), unfurl_links: true };
      jQuery.ajax({
        type: "POST",
        url: items.webhookValue,
        data: JSON.stringify(payload),
        success: function(responseData, textStatus, jqXHR) {
          // nada
        },
        error: function(responseData, textStatus, errorThrown) {
          console.log(responseData, textStatus, errorThrown);
        }
      });
    }
  });
}

function formatMessage(selection) {
  // We want to send a message that is basically: 
  // <selected text>
  // 
  // See more: <url> (unfurls)
  return selection.text + "\n\nSee more: " + selection.url;
}