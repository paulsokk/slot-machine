var reel1 = new Reel(document.getElementsByClassName("reel-img")[0]);
console.log(reel1);
/*var reelImgStartPos0 = window.getComputedStyle(reelImg0).getPropertyValue("top").replace("px", "");

var reelImg1 = document.getElementsByClassName("reel-img")[1];
var reelImgStartPos1 = window.getComputedStyle(reelImg1).getPropertyValue("top").replace("px", "");

var reelImg2 = document.getElementsByClassName("reel-img")[2];
var reelImgStartPos2 = window.getComputedStyle(reelImg2).getPropertyValue("top").replace("px", "");

var reelImg3 = document.getElementsByClassName("reel-img")[3];
var reelImgStartPos3 = window.getComputedStyle(reelImg3).getPropertyValue("top").replace("px", "");

var reelImg4 = document.getElementsByClassName("reel-img")[4];
var reelImgStartPos4 = window.getComputedStyle(reelImg4).getPropertyValue("top").replace("px", "");*/

function Start(){
    
    //console.log("Hello world");
}

function Update(){
    reel1.moveDown(.2);
    if(Number(reel1.topPos) > 300){
        reel1.resetPosition();
    }
    /*ScrollDown(reelImg0, 0.6, 300, reelImgStartPos0);
    ScrollDown(reelImg1, 0.6, 300, reelImgStartPos1);
    ScrollDown(reelImg2, 0.6, 300, reelImgStartPos2);
    ScrollDown(reelImg3, 0.6, 300, reelImgStartPos3);
    ScrollDown(reelImg4, 0.6, 300, reelImgStartPos4);*/
}

/*function MoveDown(element, value) {
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue("top").replace("px", "");
    element.style.top = (Number(topValue) + (value*deltaTime)) + "px";
}

function SetPositionIfTooLow(element, resetDistance, startPos){
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue("top").replace("px", "");
    if(Number(topValue) >= resetDistance){
        element.style.top = startPos+"px";
    }
}

function ScrollDown(element, speed, resetDistance, startPos){
    MoveDown(element, speed);
    SetPositionIfTooLow(element, resetDistance, startPos);
    
}*/