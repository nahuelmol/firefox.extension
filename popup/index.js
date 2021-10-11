
console.log("Chau");
document.getElementById('base').innerHTML = "Select video Link";

function openTab(){
	console.log("Button clicked!")
	var myWindow = window.open("player.html", "", "width=600,height=600"); 
	document.getElementById('notify').innerHTML = "Opening video in other tab";
}

function SearchVideos(){
	document.getElementById('notify').innerHTML = "searching links";
}

document.getElementById("OpenButton").addEventListener("click", openTab);
document.getElementById("search_video_links").addEventListener("click", SearchVideos);