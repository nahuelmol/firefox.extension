console.log('background working...')

const tabs = {};

var obj_runtime = []
var runtime_array = []
var definitive_link;

chrome.tabs.onRemoved.addListener(tabId => delete tabs[tabId]);

browser.runtime.onMessage.addListener(
  	(data, sender, sendResponse) => {

  	  if (data.type === 'clear_data'){
  	  	runtime_array.splice(0, runtime_array.length)

  	  	sendResponse({
  	  		status:'data cleared'
  	  	})
  	  }

 	    if (data.type === 'get_links'){
 	    	sendResponse({
 	    		status:'sending all links',
 	    		links:runtime_array
 	    	})
 	    }

 	    if (data.type === 'player_ask_link'){
 	    	console.log('PLAYER_ASKING_LINK')

 	    	sendResponse({
 	    		status:'link asked',
 	    		link:definitive_link
 	    	})
 	    }

 	    if (data.type === 'set_link'){
 	    	definitive_link = data.link_to
 	    	sendResponse({
 	    		status:'definitive link setted correctly'
 	    	})
 	    }	

});


chrome.webRequest.onHeadersReceived.addListener(d => {

  if(d.type === 'media'){
    if (d.statusCode === 206){
      console.log("FILE: ", d.url)

      var OBJ = {
        tab:d.tabId,
        url:d.url
      }

      if (!(runtime_array.includes(d.url))){
        obj_runtime.push(OBJ)
        runtime_array.push(d.url)
      }

      if (d.url.endsWith('.mp4')){
        console.log('MP4 file detected')
      }
      else if (d.url.endsWith('.m3u8')){
        console.log('M3U8 file detected')
      }
    }

    if (d.statusCode === 200){
      if ((d.responseHeaders('content-type') === 'vnd.apple.mpegurl') && (d.url.endsWith('.m3u8'))) {
        console.log('There exists a streaming file')
      }else{
        console.log('This media content is unrecognizable')
      }
    }
  }else if(d.type === 'xmlhttprequest'){
    console.log('trying to identify dash manifest')
   
    if(d.url.endsWith('.mpd')){
        if(!runtime_array.includes(d.url)){
            runtime_array.push()
        }
    }
  }
    
}, {
  urls: ['*://*/*'],
  types: ['main_frame', 'other', 'xmlhttprequest', 'media']
}, ['responseHeaders']);
