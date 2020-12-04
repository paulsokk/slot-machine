var reelImg = document.getElementsByClassName("reel-img")[0];
var reelImgStartPos = window.getComputedStyle(reelImg).getPropertyValue("top").replace("px", "");

function Start(){
    
    console.log("Hello world");
}

function Update(){
    ScrollDown(reelImg, 0.6, 300);
}

function MoveDown(element, value) {
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue("top").replace("px", "");
    element.style.top = (Number(topValue) + (value*deltaTime)) + "px";
}

function SetPositionIfTooLow(element, resetDistance){
    var elStyle = window.getComputedStyle(element);
    var topValue = elStyle.getPropertyValue("top").replace("px", "");
    if(Number(topValue) >= resetDistance){
        element.style.top = reelImgStartPos+"px";
    }
}

function ScrollDown(element, speed, resetDistance){
    MoveDown(element, speed);
    SetPositionIfTooLow(element, resetDistance);
    
}