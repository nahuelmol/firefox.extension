var toAdd;

document.getElementById('base').innerHTML = "Select video Link";

function DefinitiveLink(e){

   var BTN = e.explicitOriginalTarget;
   var PARENT = BTN.parentNode;
   var TEXT = PARENT.firstChild.firstChild.innerHTML;
   console.log('setting definitive link')
   console.log(TEXT)

   var REQUEST = {
      type: 'set_link',
      video_id: BTN.id,
      link_to: TEXT
   }

   const arrayData = browser.runtime.sendMessage(REQUEST);
}

function openTab(e){
   
   //There I want to make this link unique, this way it can be played without conflicts

	console.log("Sending definitive link to be played!")
	var myWindow = window.open("player/player.html", "", "width=600,height=600"); 
	document.getElementById('notify').innerHTML = "Please, now click on OpenPlayer for watching video!";
}


function CreateLinks(links){
   console.log('links')
   
   if(links === undefined){
      document.getElementById('notify').innerHTML = 'undefined links in current page'
      return console.log('Links undefined, imposible to work without a link')
   }else{
      for(var i=0; i < links.length; i++){
         
         var newDiv = document.createElement('div');
         newDiv.id = 'r'+i;
         newDiv.className = 'each_link';


         var target = document.createElement('BUTTON');
         target.id = 'btn'+i;
         target.className = 'btns';
         target.innerHTML = 'open link';
         target.onclick = DefinitiveLink;

         var scroll_div = document.createElement('div');
         scroll_div.className = 'scroll-div';

         var text = document.createElement('p');
         text.className = 'scroll-text';
         text.innerHTML = links[i];

         toAdd.appendChild(newDiv);
         newDiv.appendChild(scroll_div);
         newDiv.appendChild(target);
         scroll_div.appendChild(text);
      }
   }

	document.getElementById('sel').appendChild(toAdd);
}

function TreatingResponse(response){
   var current = response[0]

   for(var each in response){
      if(response[each] == 'undefined'){
         response.splice(each)
         console.log(response[each])
      }
   }

   if((current == undefined) || (current == '')){
      console.log('It is not posible to end the action without links')
   }else{
      toAdd = document.createDocumentFragment();
      CreateLinks(current)
   }
}


const arrayData = browser.runtime.sendMessage({type: 'get_array'});
arrayData.then(TreatingResponse)

document.getElementById("OpenButton").addEventListener("click", openTab);

