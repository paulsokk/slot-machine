class Reel{

    constructor (reelImages, reelWindowElement, reelWindowId){
        this.reelType = reelWindowId.replace("reel-window-", "");
        this.reelImages = reelImages;
        this.reelWindowElement = reelWindowElement;
        this.windowStyle = window.getComputedStyle(this.reelWindowElement);
        this.windowTopValue = this.reelWindowElement.getBoundingClientRect().top;
        this.reelWindowHeight = this.windowStyle.getPropertyValue("height").replace("px", "");
        this.reelStateCounter = 0;
        this.rollSpeed = 0;
        this.rollTimer = 0;
        this.lastPositionWasHalf = true;
        this.isFixed = false;
        this.fixedReelImageType = "";
        this.fixedReelImageRow = "";
    }

    setupReelImages(){
        var totalReelImagesHeight = this.getTotalReelImagesHeight();

        for (var i = 0; i < this.reelImages.length; i++) {
            //setting reel image resetting starting position
            var startingTopPosition = 0 - this.reelImages[i].height;
            this.reelImages[i].topPosStart = startingTopPosition;

            //setting reel image circleBackPosition position
            var circleBackPosition = Number(startingTopPosition) + totalReelImagesHeight;
            this.reelImages[i].circleBackPosition = circleBackPosition;

            //setting first starting position
            var firstStartingPosition = circleBackPosition - Number(this.reelImages[i].height) * (i + 1);
            this.reelImages[i].moveToPosition(firstStartingPosition);
        }
    }

    getTotalReelImagesHeight(){
        var totalHeight = 0;
        for (var i = 0; i < this.reelImages.length; i++) {
            var totalHeight = totalHeight + Number(this.reelImages[i].height);
        }

        return totalHeight;
    }

    move(){

        if(this.rollSpeed == 0){
            return;
        }

        this.rollTimer -= deltaTime;
        for (var i = 0; i < this.reelImages.length; i++) {

            this.reelImages[i].moveDown(this.rollSpeed);

            if(Number(this.reelImages[i].topPos) >= Number(this.reelImages[i].circleBackPosition)){

                this.reelImgCircledBack(this.reelImages[i]);
                
            }else if( ((Number(this.reelImages[i].topPos) >= (Number(this.reelImages[i].circleBackPosition) - this.reelImages[i].height / 2)) && (Number(this.reelImages[i].topPos) < Number(this.reelImages[i].circleBackPosition))) && this.lastPositionWasHalf == false){

                this.reelHalfPositionAchieved();
                var posDiff = (Number(this.reelImages[i].circleBackPosition) - this.reelImages[i].height / 2) - Number(this.reelImages[i].topPos);
                this.fixPositionMove(posDiff);

            }
        }
    }

    reelImgCircledBack(inputReelImage){
        
        inputReelImage.moveToPosition(inputReelImage.topPosStart);
        this.reelStateCounter++;
        if(this.reelStateCounter == this.reelImages.length){
            this.reelStateCounter = 0;
            this.setupReelImages();
        }

        this.reelPositionAchieved();
    }

    rollReel(rollTime, minRollSpeed, maxRollSpeed){
        this.isFixed = false;
        this.fixedReelImageType = "";
        this.fixedReelImageRow = "";

        this.rollSpeed = Math.floor(Math.random() * maxRollSpeed) + minRollSpeed;  
        this.rollTimer = rollTime;
    }

    rollReelFixed(rollTime, minRollSpeed, maxRollSpeed, reelImgType, reelImgRow){
        this.isFixed = true;
        this.fixedReelImageType = reelImgType;
        this.fixedReelImageRow = reelImgRow;

        this.rollSpeed = Math.floor(Math.random() * maxRollSpeed) + minRollSpeed;  
        this.rollTimer = rollTime;

    }

    reelPositionAchieved(){
        this.lastPositionWasHalf = false;
        
        if(this.rollTimer <= 0 && this.isFixed == false){
            this.rollSpeed = 0;
            var topResult = this.reelImages[this.getReelTopRowIndex()].type;
            var bottomResult = this.reelImages[this.getReelBottomRowIndex()].type;
            this.saveReelResults(topResult, "", bottomResult);
            
        }else if(this.rollTimer <= 0 && this.isFixed == true){

            var typeOfCurrentReelImage = "";
            if(this.fixedReelImageRow == "top"){
                typeOfCurrentReelImage = this.reelImages[this.getReelTopRowIndex()].type;
            }else if(this.fixedReelImageRow == "bottom"){
                typeOfCurrentReelImage = this.reelImages[this.getReelBottomRowIndex()].type;
            }else{
                return;
            }

            if(typeOfCurrentReelImage == this.fixedReelImageType){
                this.rollSpeed = 0;
                var topResult = this.reelImages[this.getReelTopRowIndex()].type;
                var bottomResult = this.reelImages[this.getReelBottomRowIndex()].type;
                this.saveReelResults(topResult, "", bottomResult);
            }
        }
    }

    reelHalfPositionAchieved(){
        this.lastPositionWasHalf = true;
        
        if(this.rollTimer <= 0 && this.isFixed == false){
            this.rollSpeed = 0;
            var centerResult = this.reelImages[this.getReelTopRowIndex()].type;
            this.saveReelResults("", centerResult, "");
        }else if(this.rollTimer <= 0 && this.isFixed == true){

            var typeOfCurrentReelImage = "";
            if(this.fixedReelImageRow == "center"){
                typeOfCurrentReelImage = this.reelImages[this.getReelTopRowIndex()].type;
            }else{
                return;
            }

            if(typeOfCurrentReelImage == this.fixedReelImageType){
                this.rollSpeed = 0;
                var centerResult = this.reelImages[this.getReelTopRowIndex()].type;
                this.saveReelResults("", centerResult, "");
            }
        }
    }

    fixPositionMove(positionDiff){

        if(this.rollTimer <= 0){
            for (var i = 0; i < this.reelImages.length; i++) {
                this.reelImages[i].moveDownPixels(positionDiff);
                
            }
        }
    }

    getReelTopRowIndex(){
        var imgIndex = this.reelStateCounter - 2;
        if(imgIndex < 0){
            return this.reelImages.length + imgIndex;
        }
        return imgIndex;
    }

    getReelBottomRowIndex(){
        var imgIndex = this.reelStateCounter - 3;
        if(imgIndex < 0){
            return this.reelImages.length + imgIndex;
        }
        return imgIndex;
    }

    saveReelResults(topResult, centerResult, bottomResult){
        switch(this.reelType) {
            case "left":
                rowResults[0][0] = topResult;
                rowResults[0][1] = centerResult;
                rowResults[0][2] = bottomResult;
                break;
            case "middle":
                rowResults[1][0] = topResult;
                rowResults[1][1] = centerResult;
                rowResults[1][2] = bottomResult;
                break;
            case "right":
                rowResults[2][0] = topResult;
                rowResults[2][1] = centerResult;
                rowResults[2][2] = bottomResult;
                break;
            default:
              console.error("Reel window class name is wrong");
        }

        this.showAllResults();
    }

    showAllResults(){
        if(leftReel.rollSpeed == 0 && middleReel.rollSpeed == 0 && rightReel.rollSpeed == 0){
            results();
        }
    }
}