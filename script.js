
var leftReel;
var middleReel;
var rightReel;

var rowResults = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


function Start(){
    
    leftReel = createReel("reel-window-left");
    middleReel = createReel("reel-window-middle");
    rightReel = createReel("reel-window-right");
}

function Update(){
    leftReel.move();
    middleReel.move();
    rightReel.move();
    
}

function spin(){
    leftReel.rollReel(2.0, 400, 800);
    middleReel.rollReel(2.5, 400, 800);
    rightReel.rollReel(3.0, 400, 800);
}

function createReel(reelWindowId){
    var reelWindowElement = document.getElementById(reelWindowId);
    var reelImageElementsArray = reelWindowElement.getElementsByClassName("reel-img");
    var reelImagesArray = new Array();

    for (var i = 0; i < reelImageElementsArray.length; i++) {
        reelImagesArray.push(new ReelImg(reelImageElementsArray[i]));
    }
    var reel = new Reel(reelImagesArray, reelWindowElement, reelWindowId);
    reel.setupReelImages();
    return reel;
}
