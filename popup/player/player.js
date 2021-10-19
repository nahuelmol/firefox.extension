

function _add_caption_title(){
	
}

function _add_caption_file(){

}

function CreateOptions(){

	var ButtonSet = document.createElement('div')
	ButtonSet.id = 'button_set' 

	var online_sub = document.createElement('BUTTON');
	oneline_sub.id = 'btn_sub1';
    oneline_sub.className = 'btn_sub';
    oneline_sub.innerHTML = 'ADD FILE';
    oneline_sub.onclick = _add_caption_file;

    var local_sub = document.createElement('BUTTON');
	local_sub.id = 'btn_sub2';
	local_sub.className = 'btn_sub';
	local_sub.innerHTML = 'ADD TITLE';
	local_sub.onclick = _add_caption_title;

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

	var source = document.getElementById('source_id')

	var src = document.createAttribute('src')

	src.value = response.link;
	source.setAttributeNode(src);

	var video = document.querySelector('video')
	
	video.load()
	video.play()
}

const arrayData = browser.runtime.sendMessage({type: 'player_ask_link'});
arrayData.then(SettingSrc)

//document.getElementById("subs-adder").addEventListener("click", CustomSubs);