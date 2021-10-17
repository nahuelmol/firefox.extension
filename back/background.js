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

	if((d.type === 'media') || (d.type === 'xmlhttprequest')){
		var link = d.url;
		var tab_id = d.tabId;
		var status_code = d.statusCode;

		if((link.endsWith('.mp4')) && (status_code === 200)){

			runtime_array.push(link)

			console.log('request\'s target: ', link)
  			console.log('status:',d.statusCode)
  			console.log('method',d.method)
		}
	} 




}, {
  urls: ['*://*/*'],
  types: ['main_frame', 'other', 'xmlhttprequest', 'media']
}, ['responseHeaders']);
