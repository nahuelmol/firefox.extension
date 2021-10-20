var toAdd;

document.getElementById('base').innerHTML = "Search links and Select one";

function ClearRemoteData(){

   var SEL = document.querySelector('#sel')
   var cada = SEL.childNodes

   cada.forEach(each => {
      each.remove()
   })

   var REQUEST = {
      type:'clear_data'
   }

   function call(response){
      console.log(response.status);
   }

   var sending = browser.runtime.sendMessage(REQUEST)
   sending.then(call)
}

function DefinitiveLink(e){

   var BTN = e.explicitOriginalTarget;
   var PARENT = BTN.parentNode;
   var TEXT = PARENT.firstChild.firstChild.innerHTML;
   console.log('setting definitive link')

   var REQUEST = {
      type: 'set_link',
      video_id: BTN.id,
      link_to: TEXT
   }

   var arrayData = browser.runtime.sendMessage(REQUEST);
   arrayData.then(response => {
      console.log(response.status)
   })
}

function openTab(e){
	var myWindow = window.open("player/player.html", "", "width=600,height=600"); 
}


function CreateLinks(links){

   var SEL = document.querySelector('#sel')
   var cada = SEL.childNodes

   cada.forEach(each => {
      each.remove()
   })
   
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
         target.innerHTML = 'set link';
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

	SEL.appendChild(toAdd);
}

function TreatingResponse(response){
   console.log(response)

   if((response == undefined) || (response === '')){
      return console.log('It is not posible to end the action without links')
   }

   for(var each of response.links){
      if(each == undefined){
         response.links.splice(each)
         console.log(each + ' is undefined')
      }
   }

   toAdd = document.createDocumentFragment();
   CreateLinks(response.links)
}

function SearchVideoLink(){
   var arrayData = browser.runtime.sendMessage({type: 'get_links'});
   arrayData.then(TreatingResponse)
}

document.getElementById("search_video_links").addEventListener("click", SearchVideoLink);
document.getElementById("OpenButton").addEventListener("click", openTab);
document.getElementById("_clear_").addEventListener("click", ClearRemoteData);
