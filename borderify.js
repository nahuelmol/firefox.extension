document.body.style.border = "5px solid red";

async function SendMessageNow(link){

	function handleResponse(message) {
  		console.log(`Message to the background script:  ${message.response}`);
	}

	function handleError(error) {
	  console.log(`Error: ${error}`);
	}

	var sending = browser.runtime.sendMessage({
		greeting:'HOLA',
		links:[link]
	})
	sending.then(handleResponse, handleError)

}


async function notifyBackgroundPage(e) {
	console.log("click! borderify");

	await navigator.permissions.query({name:'geolocation'}).then(function(result) {
  		console.log("result: \n")
  		console.log(result)
	});

}



function VideoLinkDetector(e){
	var vid  = e.explicitOriginalTarget;
	console.log('links ready to send');
	var link  = vid.querySelector('source').src;
	console.log(link);
	
	SendMessageNow(link)
}

const video = document.querySelector('video');
video.addEventListener('play', VideoLinkDetector)

window.addEventListener("click", notifyBackgroundPage);


