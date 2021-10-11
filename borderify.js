document.body.style.border = "5px solid red";

async function notifyBackgroundPage(e) {
	console.log("click! borderify");

	await navigator.permissions.query({name:'geolocation'}).then(function(result) {
  		console.log("result: \n")
  		console.log(result)
	});

}

function VideoDetector(){
	var video = $( "video" );
	var element = $("#root");
	var video_primary = $("#primary")

	console.log(element);
	console.log(video);
	console.log(video_primary);

	video.onplaying = function() { 
		console.log('Video is now loaded and playing'); 
	}
}

VideoDetector()

window.addEventListener("click", notifyBackgroundPage);


