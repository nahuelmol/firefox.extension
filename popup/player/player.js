
var toAdd;

function MAKE(){

}

function CreateOptions(){

	var ButtonSet = document.createElement('div')
	ButtonSet.id = 'button_set' 

	var online_sub = document.createElement('BUTTON');
	oneline_sub.id = 'btn_sub1';
    oneline_sub.className = 'btn_sub';
    oneline_sub.innerHTML = 'ADD';
    oneline_sub.onclick = MAKE;

    var local_sub = document.createElement('BUTTON');
	local_sub.id = 'btn_sub2';
	local_sub.className = 'btn_sub';
	local_sub.innerHTML = 'ADD';
	local_sub.onclick = MAKE;

	ButtonSet.appendChild(online_sub)
	ButtonSet.appendChild(local_sub)

	toAdd.appendChild(ButtonSet)
}

function CustomSubs(){
	document.getElementById('custom-caption').createAttribute("src", "url.vtt")
	document.getElementById('custom-caption').createAttribute("label", "English")

	console.log("accessing to set subs");

	toAdd = document.createDocumentFragment();
    CreateOptions()
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