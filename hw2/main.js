//main.js
//Author: He Dai
//Get access to each button
var btn1 = document.getElementById("btn1")
var btn2 = document.getElementById("btn2")
var btn3 = document.getElementById("btn3")
var btn4 = document.getElementById("btn4")

window.onload = function() {
	//Repeat same process to each button.
	//If stop pressed, use stopIntvl funtion.
	//If start pressed, use startIntvl function.
	btn1.onclick = function() {
		if (btn1.innerHTML=="Stop")
			stopIntvl(img1,btn1)
		else if(btn1.innerHTML=="Start")
			startIntvl1()
	}
	btn2.onclick = function() {
		if (btn2.innerHTML=="Stop")
			stopIntvl(img2,btn2)
		else if(btn2.innerHTML=="Start")
			startIntvl2()
	}
	btn3.onclick = function() {
		if (btn3.innerHTML=="Stop")
			stopIntvl(img3,btn3)
		else if(btn3.innerHTML=="Start")
			startIntvl3()
	}
	btn4.onclick = function() {
		if (btn4.innerHTML=="Stop")
			stopIntvl(img4,btn4)
		else if(btn4.innerHTML=="Start")
			startIntvl4()
	}
}

//Function: Stop Intvl
//stop current interval
//Set button name to "Start"
function stopIntvl(x,y){
	clearInterval(x)
	y.innerHTML = "Start"
}

//Function startIntvl1-4
//Restart the interval
//New random interval time
//Change button name to "Stop"
function startIntvl1(){
	invl = Math.random()
	img1 = setInterval("changeImage('img1')", 1000+4000*invl)
	btn1.innerHTML = "Stop"
}
function startIntvl2(){
	invl = Math.random()
	img2 = setInterval("changeImage('img2')", 1000+4000*invl)
	btn2.innerHTML = "Stop"
}
function startIntvl3(){
	invl = Math.random()
	img3 = setInterval("changeImage('img3')", 1000+4000*invl)
	btn3.innerHTML = "Stop"
}
function startIntvl4(){
	invl = Math.random()
	img4 = setInterval("changeImage('img4')", 1000+4000*invl)
	btn4.innerHTML = "Stop"
}


//Start the image intervals
invl = Math.random()
var img1 = setInterval("changeImage('img1')", 1000+4000*invl)
invl = Math.random()
var img2 = setInterval("changeImage('img2')", 1000+4000*invl)
invl = Math.random()
var img3 = setInterval("changeImage('img3')", 1000+4000*invl)
invl = Math.random()
var img4 = setInterval("changeImage('img4')", 1000+4000*invl)

//URLs to five images as our image pool
var imgs = [
  "http://allipadwallpapers.com/wp-content/uploads/wallpapers/Sport/thumbs/thumbs_la-lakers-kobe-bryan-2048x2048.jpg",
  "http://diverseeducation.com/wp-content/uploads/2016/06/062016_LeBron_James-200x200.jpg",
  "https://i.ytimg.com/i/Sribu9g6ykNo9ghCHAC5Kg/mq1.jpg",
  "http://cdn.niketalk.com/5/58/200x200px-ZC-582f7240_image.jpeg",
  "https://v.cdn.vine.co/r/avatars/4E8E9063EC1259306007537528832_4eab65a27d4.1.0.jpg",
  "http://cdn-images.deezer.com/images/artist/54d03364eeb7d0e09950d8d79a51eb72/200x200-000000-80-0-0.jpg",
  "http://cdn2.newsok.biz/cache/sq200-c4672ed278d67bc59c8332f2e53e605d.jpg"
]

//Loop over the images in the image pool
function changeImage(x) {
	var image = document.getElementById(x)
  	for(i=0; i<7; i++){
    	if(image.src == imgs[i]){
      		image.src = imgs[(i+1)%7]
      		break
    	}
  	}
}