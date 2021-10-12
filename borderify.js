document.body.style.border = "5px solid red";

async function SendMessageNow(){


	function onError(error) {
	  console.error(`Error: ${error}`);
	}

	function sendMessageToTabs(tabs) {
  		for (let tab of tabs) {
    		browser.tabs.sendMessage(
      			tab.id,
      			{greeting: "Hi from background script"}
    		).then(response => {
      			console.log("Message from borderify:");
      			console.log(response.response);
    		}).catch(onError);
  		}
	}

	browser.tabs.query({
    	currentWindow: true,
    	active: true
  	}).then(sendMessageToTabs).catch(onError);
}

function SendLinkToPopup(link){
	console.log('sending link...');
}


async function notifyBackgroundPage(e) {
	console.log("click! borderify");

	await navigator.permissions.query({name:'geolocation'}).then(function(result) {
  		console.log("result: \n")
  		console.log(result)
	});

}

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function VideoLinkDetector(e){
	var vid  = e.explicitOriginalTarget;
	console.log('links ready to send');
	var link  = vid.querySelector('source').src;
	console.log(link);
	
	SendMessageNow()
}

const video = document.querySelector('video');
video.addEventListener('play', VideoLinkDetector)

window.addEventListener("click", notifyBackgroundPage);


