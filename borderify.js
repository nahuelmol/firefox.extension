document.body.style.border = "5px solid red";

async function notifyBackgroundPage(e) {
	console.log("click! borderify");

	await navigator.permissions.query({name:'geolocation'}).then(function(result) {
  		console.log("result: \n")
  		console.log(result)
	});

}

window.addEventListener("click", notifyBackgroundPage);


