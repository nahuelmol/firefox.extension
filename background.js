console.log('background')

console.log(browser.tabs)

browser.runtime.onMessage.addListener(
  	(data, sender) => {
      //document.getElementById('notify').innerHTML = "Message received";
      console.log('received')
 	  console.log(data.greeting)
 	  console.log(data.links)
});