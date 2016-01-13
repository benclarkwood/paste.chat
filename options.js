function saveToken() {
  var token = document.getElementById('token').value;
  var webhook = document.getElementById('webhook').value;
  chrome.storage.sync.set({ tokenValue: token, webhookValue: webhook}, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    tokenValue: "Input Slack Token",
    webhookValue: "Input webhook value"
  }, function(items) {
    document.getElementById('token').value = items.tokenValue;
    document.getElementById('webhook').value = items.webhookValue;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveToken);