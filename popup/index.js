
console.log("Chau");
document.getElementById('base').innerHTML = "Select video Link";

function openTab(){
	console.log("Button clicked!")
	var myWindow = window.open("player/player.html", "", "width=600,height=600"); 
	document.getElementById('notify').innerHTML = "Opening video in other tab";
}

function SearchVideos(){
	var links = [];

	document.getElementById('notify').innerHTML = "searching links";
	console.log('There I should get links from the current analized page');

	return links;
}

function CreateLinks(){

	var links = SearchVideos();

	for(var i=0; i < links.length; i++){
         
         var newDiv = document.createElement('div');
         newDiv.id = 'r'+i;
         newDiv.className = 'each_block';


         var target = document.createElement('BUTTON');
         target.id = 'btn'+i;
         target.className = 'btns';
         var cnt = document.createElement('div');
         cnt.className = 'content';

         var text = document.createElement('p');
         text.className = 'txt';


         toAdd.appendChild(newDiv);
         newDiv.appendChild(target);
         newDiv.appendChild(cnt);
         cnt.appendChild(text);
      }
	document.getElementById('sel').appendChild(toAdd);
}



document.getElementById("OpenButton").addEventListener("click", openTab);
document.getElementById("search_video_links").addEventListener("click", SearchVideos);