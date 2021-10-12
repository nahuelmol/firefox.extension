
function CustomSubs(){
	document.getElementById('custom-caption').createAttribute("src", "url.vtt")
	document.getElementById('custom-caption').createAttribute("label", "English")

	console.log("accessing to set subs");
}

function SettingSrc(response){
	var Source = document.getElementById('source_id');

	console.log(response)
	console.log(Source)

	Source.setAttribute('src', response)
	console.log(Source)
}

const arrayData = browser.runtime.sendMessage({type: 'ask_link'});
arrayData.then(SettingSrc)

document.getElementById("subs-adder").addEventListener("click", CustomSubs);