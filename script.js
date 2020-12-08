
var leftReel;
var middleReel;
var rightReel;

var rowResults = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

//the order of these array elements are set to the win sum amounts (from hight to low)
var tableWinIds = [
    "3-cherry-bottom", "3-cherry-top", "3-cherry-center", 
    "3-7-top", "3-7-center", "3-7-bottom", 
    "cherry-7-top", "cherry-7-center", "cherry-7-bottom", 
    "3-3xbar-top", "3-3xbar-center", "3-3xbar-bottom", 
    "3-2xbar-top", "3-2xbar-center", "3-2xbar-bottom", 
    "3-bar-top", "3-bar-center", "3-bar-bottom", 
    "3-anybars-top", "3-anybars-center", "3-anybars-bottom", 
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
    if(leftReel.rollSpeed == 0 && middleReel.rollSpeed == 0 && rightReel.rollSpeed == 0){
        leftReel.rollReel(2.0, 400, 800);
        middleReel.rollReel(2.5, 400, 800);
        rightReel.rollReel(3.0, 400, 800); 

        hideWinLine("top");
        hideWinLine("center");
        hideWinLine("bottom");
        stopAllBlinkingWinTable();
    }
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

function results(){

    var winAmount = 0;
    for(var i = 0; i < tableWinIds.length; i++){
        winAmount = checkWin(tableWinIds[i]);
        if(winAmount > 0){
            break;
        }
    }

    if(i < tableWinIds.length){
        showWinLine(tableWinIds[i].split("-")[2]);
        startBlinkingWinTable(tableWinIds[i])
    }else{
        console.log("no win");
    }

}

function checkWin(winTag){

    var winTagParts = winTag.split("-");

    //understand which line we are looking at
    var lineIndex = -1;
    if(winTagParts[2] == "top"){
        lineIndex = 0;
    }else if(winTagParts[2] == "center"){
        lineIndex = 1;
    }else if(winTagParts[2] == "bottom"){
        lineIndex = 2;
    }else{
        console.error("win tag is wrong: " + winTag);
    }

    //understand what combination we are looking for
    if(winTagParts[0] == "3"){
        if(winTagParts[1] == "cherry"){
            if(rowResults[0][lineIndex] == winTagParts[1] && rowResults[1][lineIndex] == winTagParts[1] && rowResults[2][lineIndex] == winTagParts[1]){
                if(lineIndex == 0){
                    //three cherries on top line
                    return 2000;
                }else if(lineIndex == 1){
                    //three cherries on center line
                    return 1000;
                }else if(lineIndex == 2){
                    //three cherries on bottom line
                    return 4000;
                }
            }
        }else if(winTagParts[1] == "7"){
            if(rowResults[0][lineIndex] == winTagParts[1] && rowResults[1][lineIndex] == winTagParts[1] && rowResults[2][lineIndex] == winTagParts[1]){
                //three 7s on one line
                return 150;
            }
        }else if(winTagParts[1] == "3xbar"){
            if(rowResults[0][lineIndex] == winTagParts[1] && rowResults[1][lineIndex] == winTagParts[1] && rowResults[2][lineIndex] == winTagParts[1]){
                //three 3xbars on one line
                return 50;
            }
        }else if(winTagParts[1] == "2xbar"){
            if(rowResults[0][lineIndex] == winTagParts[1] && rowResults[1][lineIndex] == winTagParts[1] && rowResults[2][lineIndex] == winTagParts[1]){
                //three 2xbars on one line
                return 20;
            }
        }else if(winTagParts[1] == "bar"){
            if(rowResults[0][lineIndex] == winTagParts[1] && rowResults[1][lineIndex] == winTagParts[1] && rowResults[2][lineIndex] == winTagParts[1]){
                //three bars on one line
                return 10;
            }
        }else if(winTagParts[1] == "anybars"){
            if(
                (rowResults[0][lineIndex] == "3xbar" || rowResults[0][lineIndex] == "2xbar" || rowResults[0][lineIndex] == "bar") &&
                (rowResults[1][lineIndex] == "3xbar" || rowResults[1][lineIndex] == "2xbar" || rowResults[1][lineIndex] == "bar") &&
                (rowResults[2][lineIndex] == "3xbar" || rowResults[2][lineIndex] == "2xbar" || rowResults[2][lineIndex] == "bar")){
                
                //three of any bars on one line
                return 5;
            }
        }else{
            console.error("win tag is wrong: " + winTag);
        }
    }else if(winTagParts[0] == "cherry" && winTagParts[1] == "7"){

        var cherryExists = false;
        var sevenExists = false;


        if(rowResults[0][lineIndex] == winTagParts[0] || rowResults[1][lineIndex] == winTagParts[0] || rowResults[2][lineIndex] == winTagParts[0]){
            cherryExists = true;
        }
        if(rowResults[0][lineIndex] == winTagParts[1] || rowResults[1][lineIndex] == winTagParts[1] || rowResults[2][lineIndex] == winTagParts[1]){
            sevenExists = true;
        }

        if(cherryExists && sevenExists){
            //7 and cherry exist on one line
            return 75;
        }
    }else{
        console.error("win tag is wrong: " + winTag);
    }

}

function showWinLine(winLineType){
    document.getElementById("win-overlay-"+winLineType+"-line").style.display = "block";
}

function hideWinLine(winLineType){
    document.getElementById("win-overlay-"+winLineType+"-line").style.display = "none";
}

function startBlinkingWinTable(winTableId){
    document.getElementById(winTableId).classList.add("blinking");

}

function stopAllBlinkingWinTable(){
    for(var i = 0; i < tableWinIds.length; i++){
        document.getElementById(tableWinIds[i]).classList.remove("blinking");
    }
}

/*function getPayTableIdName(){
    var idNameToReturn = "";
    var topWinAmount = 0;

    //bottom row, three in a row
    if(rowResults[0][2] == rowResults[1][2] == rowResults[2][2]){
        idNameToReturn += "3-";
        idNameToReturn += rowResults[0][2];
        idNameToReturn += "-bottom";
        return idNameToReturn;
    }

    //top row, three in a row
    if(rowResults[0][0] == rowResults[1][0] == rowResults[2][0]){
        idNameToReturn += "3-";
        idNameToReturn += rowResults[0][0];
        idNameToReturn += "-top";
        return idNameToReturn;
    }

    //top row, three in a row
    if(rowResults[0][0] == rowResults[1][0] == rowResults[2][0]){
        idNameToReturn += "3-";
        idNameToReturn += rowResults[0][0];
        idNameToReturn += "-top";
        return idNameToReturn;
    }
}*/
