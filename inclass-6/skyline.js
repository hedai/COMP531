'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//Store each building in array
	var buildings = [];
	//build a building
	var build = function() { 
		var x0
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var blgColor
		var bu_lowerbound = blgWidth + Math.random() * blgWidth*3
		var bu_upperbound = canvas.width - blgWidth * 3

		for(x0=bu_lowerbound; x0<bu_upperbound; x0=x0+blgWidth+Math.random()*blgWidth*3){
			blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10+2)
			blgHeight = Math.random()*canvas.height/2
			blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
			c.fillStyle = blgColor
			c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

			for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle=Math.random()>0.5 ? "yellow":"black"
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
			var building = {
				x:x0,
				width:blgWidth,
				height:blgHeight,
				color:blgColor
			}
			buildings.push(building)
		}
		setInterval(moveSun, 300)
		setInterval(moveCar, 100)
	}

	//Response when the click is within the building
	var clickBlg = function(event) {	
		var x = event.clientX
		var y = event.clientY
		buildings.forEach(function(building) { 
			if (building.x < x && x < building.x + building.width && floor - building.height < y && y < floor) {
				paintBlg(building.x, building.height, building.width, building.color)
				building.height=building.height+windowHeight
			}
		})
	}

	//Paint the whole building.
	function paintBlg(x0,height,width,color){
		c.fillStyle = color
		c.fillRect(x0, floor - height-windowHeight, width, height+windowHeight)

		for (var y = floor - floorSpacing; y > floor - height -windowHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < width - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle=Math.random()>0.5 ? "yellow":"black"
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	var mySun = {x:15, y:15, r:15}
	var moving = 1
	function moveSun(){
		//Clean
		c.fillStyle = "white"
		c.beginPath()
		c.arc(mySun.x, mySun.y, mySun.r*2, 2*Math.PI,false)
  		c.closePath()
  		c.fill()

  		//Move the sun center forward
  		mySun.x = mySun.x+10
  		if(mySun.x>canvas.width){
  			mySun.x=15
  		}
  		//Move the sun up and down
  		if(moving) {
  			mySun.y = mySun.y+10
  			moving = 0
  		}
		else {
			mySun.y = mySun.y-10
  			moving = 1	
		}

  		//Paint the sun
		c.fillStyle = "orange"
		c.beginPath()
		c.arc(mySun.x, mySun.y, mySun.r, 2*Math.PI,false)
  		c.closePath()
  		c.fill()

  		//Paint the building
  		buildings.forEach(function(building) { 
			paintBlg(building.x, building.height, building.width, building.color)
		})
	}

	//Object to mark the cat's coordinate
	//Position of the right tire
	var myCar = {x: 5, y: floor-5}
	function moveCar(){
		//Clear from the top left corner
		c.fillStyle = "white"
  		c.fillRect(myCar.x-26, myCar.y-16, 40, 21)

  		//Move car
  		if(myCar.x>canvas.width-5) myCar.x = 5
  		myCar.x = myCar.x+10

		//Paint Tires
		c.fillStyle = "black"
		c.beginPath()
		c.arc(myCar.x-15, myCar.y, 5, 2*Math.PI,false)
		c.arc(myCar.x, myCar.y, 5, 2*Math.PI,false)
  		c.closePath()
  		c.fill()
  		//Paint Body
  		c.fillRect(myCar.x-25, myCar.y-15, 35, 10)

  		//Repaint the building
  		buildings.forEach(function(building) { 
			paintBlg(building.x, building.height, building.width, building.color)
		})
	}

	return {
		build: build,
		clickBlg: clickBlg
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	document.querySelector("canvas").addEventListener('click', app.clickBlg, false)
}


