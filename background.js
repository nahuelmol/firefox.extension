console.log('background working...')

var runtime_array = []

browser.runtime.onMessage.addListener(
  	(data, sender, sendResponse) => {
 	  if (data.links != 'undefined'){
 	  	if(!runtime_array.includes(data.links)){
 	  		runtime_array.push(data.links)
 	  	}
 	  } 

 	  if (data.type === 'get_array'){
 	  	return Promise.resolve(runtime_array);
 	  }
          
          if (data.type === 'data_links'){
 	  	console.log('receiving data from content script')
 	  	console.log('links received: ' + data.links)

 	  	sendResponse({
 	  		response:'Response from background: links received'
 	  	})
 	  }

});
