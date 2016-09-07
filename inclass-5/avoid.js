function movingButt(){
    var buttonText = document.getElementById("button");
    var xPos;
    var yPos;
    if (buttonText.textContent == "Click Me" && !event.shiftKey){
        xPos=Math.floor(Math.random()*800+100);
        yPos=Math.floor(Math.random()*600+200);
        buttonText.style.left = xPos + "px";
        buttonText.style.top = yPos + "px";
    }
}

function congratulations(){
    var buttonText = document.getElementById("button");
    var xPos = buttonText.style.left;
    var yPos = buttonText.style.top;
    if (buttonText.textContent=="Click Me"){
        buttonText.textContent="Play Again";
        var congrats = document.getElementById("congratulations");
        congrats.style.display="block";
        congrats.style.left = (xPos + 50) + 'px';
        congrats.style.top = (yPos - 50) + 'px';
    } else {
        buttonText.textContent="Click Me";
        document.getElementById("congratulations").style.display="None";
        buttonText.style.left=Math.floor(Math.random()*800+100) +"px";
        buttonText.style.top=Math.floor(Math.random()*600+200)+"px";
    }
}