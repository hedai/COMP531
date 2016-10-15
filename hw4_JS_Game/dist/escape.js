window.onload = function () {
	var curX, curY, curX2, curY2, boxX, boxY, moving=0, touch=0;
	var gametime=0, started=0, speed;
	var starttime, endtime, finaltime=0; //pass finaltime to popup window to ask for initials
	var enemyxdir = new Array(1,1,1,1);
	var enemyydir = new Array(1,1,1,1);
	var playBox = document.getElementById("box");

	playBox.onmousedown = function() {start(event)};
	playBox.onmousemove = function() {checkLocation(event)};
	playBox.onmouseup = function() {stop(event)};
	// playBox.addEventListener("onmousedown", start);
	// playBox.addEventListener("onmousemove", checkLocation);
	// playBox.addEventListener("onmouseup", stop);

	function startClock() {
		var today = new Date(); starttime = today.getTime();
	}

	function endClock() {
		var today = new Date(); endtime = today.getTime();
	}

	function calctime() {
		var time = (endtime - starttime - 0)/1000;	return time;
	}

	function givePosX(divname) {
		var posLeft = parseInt(document.getElementById(divname).style.left);
		return posLeft;
	}

	function givePosY(divname) {
		var posTop = parseInt(document.getElementById(divname).style.top);
		return posTop;
	}

	function setPosX(divname, xpos) {
		document.getElementById(divname).style.left = xpos + "px";
	}

	function setPosY(divname, ypos) {
		document.getElementById(divname).style.top = ypos + "px";
	}

	function giveSize(divname, dimension) {
		var divsize = 0;
			if (dimension == 'y') {
				divsize = parseInt(document.getElementById(divname).style.height);
			}
			else if (dimension == 'x') {
				divsize = parseInt(document.getElementById(divname).style.width);
			}
		return divsize;
	}

	// check to see if 'box' is touching 'enemy'	
	function checkTouching(num) {
		
		var enemy = "enemy" + num;
		var difX = givePosX('box') - givePosX(enemy) - 0; // -0 converts to integer
		var difY = givePosY('box') - givePosY(enemy) - 0;
		
		// set touch = 1 if it is touching an enemy
		if (difX > (-1 * giveSize('box', 'x')) && difX < giveSize(enemy, 'x') && difY > (-1 * giveSize('box', 'y')) && difY < giveSize(enemy, 'y')) {
			touch = 1;
		}
		else touch = 0;
	}

	function moveEnemy(num, step_x, step_y) {
		var enemy = "enemy" + num;
		var enemyx = giveSize(enemy, 'x');
		var enemyy = giveSize(enemy, 'y');
		if (givePosX(enemy) >= (450 - enemyx) || givePosX(enemy) <= 0) {
			enemyxdir[num] = -1 * enemyxdir[num];
			}
		if (givePosY(enemy) >= (450 - enemyy) || givePosY(enemy) <= 0) {
			enemyydir[num] = -1 * enemyydir[num];
			}
		var newposx = givePosX(enemy) + (step_x * enemyxdir[num]) + 0;
		var newposy = givePosY(enemy) + (step_y * enemyydir[num]) + 0;
		
		setPosX(enemy, newposx);
		setPosY(enemy, newposy);
		checkTouching(num);
		if (touch == 1) {
			stop(); reset();
		}
	}

	// Make the enemies start with different random directions every time
	var directions = new Array(8);
	for (i = 0; i < 8; i++)
	{
		directions[i] = getRandom(-20, 20);
	}
	function getRandom(min, max)
	{
		return (Math.round(Math.random() * (max - min))) + min;
	}

	function moveEnemies() {
		gametime = gametime + 1
		
		if (gametime >= 0 && gametime < 100) speed = 80;
		else if (gametime >= 100 &&  gametime < 200) speed = 60;
		else if (gametime >= 200 &&  gametime < 300) speed = 40;
		else if (gametime >= 300 &&  gametime < 400) speed = 30;
		else if (gametime >= 400 &&  gametime < 500) speed = 20;
		else if (gametime >= 500 &&  gametime < 800) speed = 15;
		else speed = 10;

		moveEnemy(0,directions[0],directions[1]);
		moveEnemy(1,directions[2],directions[3]);
		moveEnemy(2,directions[4],directions[5]);
		moveEnemy(3,directions[6],directions[7]);
		
		//demonstrate played time
		var today = new Date();
		var playTime = (today.getTime() - starttime) / 1000;
		document.getElementById('currentScore').innerHTML = playTime + 's';

		setTimeout(moveEnemies,speed);
	}

	function start(e) { 
		if (started == 0) {	
			moveEnemies(); 	
			startClock(); 	
			started = 1;	
		}
			
		curX = e.clientX;
	    curY = e.clientY;
			
		curX2 = curX - 40;
		curY2 = curY - 40;

		boxX = curX - 20;
		boxY = curY - 20;	
			
		var boxleft = givePosX('box');
		var boxtop = givePosY('box');
					
		if (curX > boxleft && curX2 < boxleft && curY > boxtop && curY2 < boxtop) {
			moving = 1;
			setPosX('box', boxX);
			setPosY('box', boxY);
		}
	}
	
	//check the box location to make sure not touch the walls
	function checkLocation(e){
	        
			curX = e.clientX;
	        curY = e.clientY;		
			// console.log("curX = ", curX);
			// console.log("curY = ", curY);			
			boxX = curX - 20;
			boxY = curY - 20;	

		// checkTouching('1');
		if (moving == 1 && touch == 0){
		
				setPosX('box',boxX);
				setPosY('box',boxY);

				if (curY > 69 && curX > 69 && curY < 381 && curX < 381) {
					return;
				}
				else {
					stop(); 
					reset();
				}
		}
		
		else if (touch == 1){
		stop(); reset();
		}
	}

	function stop(e){
		// console.log("stop state!");
	    moving=0;
	}

	function reset(e){
	    endClock();
		moving=0;

		if (finaltime == 0) {
			finaltime = calctime();
			window.alert('you lasted ' + finaltime + ' seconds'); 
			document.location.reload();
		}
	}
}