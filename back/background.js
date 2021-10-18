console.log('background working...')


const tabs = {};
var runtime_array = []
var definitive_link;

chrome.tabs.onRemoved.addListener(tabId => delete tabs[tabId]);


browser.runtime.onMessage.addListener(
  	(data, sender, sendResponse) => {

 	  if (data.type === 'get_links'){
 	  	sendResponse({
 	  		links:runtime_array
 	  	})
 	  }

 	  if (data.type === 'ask_link'){
 	  	console.log('ASKING_LINK')
 	  	return Promise.resolve(definitive_link);
 	  }

 	  if (data.type === 'set_link'){
 	  	console.log('SETTING LINK')
 	  	console.log(data.link_to)

 	  	definitive_link = data.link_to
 	  }	
          
      if (data.type === 'data_links'){
 	  	console.log('receiving data from content script')
 	  	console.log('links received: ' + data.links)

 	  	sendResponse({
 	  		response:'Response from background: links received'
 	  	})
 	  }

});


chrome.webRequest.onHeadersReceived.addListener(d => {

    if(d.statusCode === 302){
    	console.log('REDIRECTOR')
    	console.log('red: ',d.url)
    }

    if(d.statusCode === 206){
    	console.log("FILE: ", d.url)
    	runtime_array.push(d.url)
    }


}, {
  urls: ['*://*/*'],
  types: ['main_frame', 'other', 'xmlhttprequest', 'media']
}, ['responseHeaders']);
