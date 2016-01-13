// content.js
console.log("Hello from paste.chat");

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("test");
  console.log(request);
  if (request.method == "getSelection") {
    sendResponse({text: window.getSelection().toString(), url: window.location.href});
  } else if (request.method == "log") {
    console.log(request);
    sendResponse({});
  } else {
    sendResponse({});
  }
});