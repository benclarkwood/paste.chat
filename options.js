function saveToken() {
  var token = document.getElementById('token').value;
  console.log("OH GOD KILL ME"); 
  chrome.storage.sync.set({ tokenValue: token }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    tokenValue: "Slack Token"
  }, function(items) {
    document.getElementById('token').value = items.tokenValue;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveToken);