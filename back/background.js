console.log('background working...')

var runtime_array = []
var definitive_link;

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
