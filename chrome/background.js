var port = null;

function onNativeMessage(message) {
  alert(message);
}

function onDisconnected() {
  port = null;
  alert("Failed to connect: " + chrome.runtime.lastError.message);
}

function openDMovie() {
  var hostName = "dmovie";
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  port.postMessage({url: "/home/hualet/Videos/2.mp4"});
  port.disconnect();
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'g' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function (tabId) {
  openDMovie();
});