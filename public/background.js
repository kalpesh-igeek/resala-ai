let isOpen = false;

const actionClickHandler = async ({ id: tabId }) => {
  isOpen = !isOpen;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: isOpen }, function (response) {
      console.log('response', response);
    });
  });

  chrome.tabs.insertCSS(tabs[0].id, {
    code: isOpen ? 'body { width: calc(100% - 300px); }' : 'body { width: 100%; }',
  });
};

chrome.action.onClicked.addListener(actionClickHandler);
