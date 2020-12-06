
var leftReel;
var middleReel;
var rightReel;


function Start(){
    
    leftReel = createReel("reel-window-left");
    middleReel = createReel("reel-window-middle");
    rightReel = createReel("reel-window-right");

}

function Update(){
    leftReel.move(.2);
    middleReel.move(.4);
    rightReel.move(.6);
    
}

function createReel(reelWindowId){
    var reelWindowElement = document.getElementById(reelWindowId);
    var reelImageElementsArray = reelWindowElement.getElementsByClassName("reel-img");
    var reelImagesArray = new Array();

    for (var i = 0; i < reelImageElementsArray.length; i++) {
        reelImagesArray.push(new ReelImg(reelImageElementsArray[i]));
    }
    var reel = new Reel(reelImagesArray, reelWindowElement);
    reel.setupReelImages();
    return reel;
}
