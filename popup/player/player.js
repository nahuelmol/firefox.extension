
function CustomSubs(){
	document.getElementById('custom-caption').createAttribute("src", "url.vtt")
	document.getElementById('custom-caption').createAttribute("label", "English")

	console.log("accessing to set subs");
}

document.getElementById("subs-adder").addEventListener("click", CustomSubs);