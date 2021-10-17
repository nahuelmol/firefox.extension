document.body.style.border = "5px solid red";

async function SendMessageNow(link){

	function handleResponse(message) {
  		console.log(`Response from background script:  ${message.response}`);
	}

	function handleError(error) {
	  console.log(`Error: ${error}`);
	}

	var sending = browser.runtime.sendMessage({
		greeting:'HOLA',
        type:'no_one',
		links:[link]
	})
	sending.then(handleResponse, handleError)

}

SendMessageNow('link')

async function notifyBackgroundPage(e) {
	console.log("click! borderify");

	await navigator.permissions.query({name:'geolocation'}).then(function(result) {
  		console.log("result: \n")
  		console.log(result)

                var nav_online = navigator.onLine()
                console.log("Online: "+nav_online+"\n")

                var nav_cookie_enabled = navigator.cookieEnabled()
                console.log("Cookie enabled: "+nav_cookie_enabled+"\n")

                var lang = navigator.language()
                console.log("Language: "+lang)

                var UserAgent = navigator.userAgent()
                console.log("User Agent: "+UserAgent)
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
//video.addEventListener('play', VideoLinkDetector)
//
//window.addEventListener("click", notifyBackgroundPage);

var select = document.querySelector('select');
console.log()

