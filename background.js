console.log('background')

console.log(browser.tabs)

browser.runtime.onMessage.addListener(
  (data, sender) => {
      //document.getElementById('notify').innerHTML = "Message received";
      console.log('received');
      if (data.type === 'handle_me') {
        return Promise.resolve('done');
      }
      return false;
  }
);