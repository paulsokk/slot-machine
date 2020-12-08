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
        /* The input reel image is moved to the top of the reel to leave the inpression of a spinning wheel */
        
        inputReelImage.moveToPosition(inputReelImage.topPosStart);
        this.reelStateCounter++;
        if(this.reelStateCounter == this.reelImages.length){
            this.reelStateCounter = 0;
            this.setupReelImages();
        }

        this.reelPositionAchieved();
    }

    rollReel(rollTime, minRollSpeed, maxRollSpeed){
        /* The method that starts the rolling */

        this.isFixed = false;
        this.fixedReelImageType = "";
        this.fixedReelImageRow = "";

        this.rollSpeed = Math.floor(Math.random() * maxRollSpeed) + minRollSpeed;  
        this.rollTimer = rollTime;
    }

    rollReelFixed(rollTime, minRollSpeed, maxRollSpeed, reelImgType, reelImgRow){
        /* The method that starts the fixed rolling */

        this.isFixed = true;
        this.fixedReelImageType = reelImgType;
        this.fixedReelImageRow = reelImgRow;

        this.rollSpeed = Math.floor(Math.random() * maxRollSpeed) + minRollSpeed;  
        this.rollTimer = rollTime;

    }

    reelPositionAchieved(){
        /* This method is launched whenever the reel is in the full-position where reelImages are at the top and bottom of reel window */

        this.lastPositionWasHalf = false;
        
        if(this.rollTimer <= 0 && this.isFixed == false){
            this.rollSpeed = 0;
            var topResult = this.reelImages[this.getReelTopMiddleRowIndex()].type;
            var bottomResult = this.reelImages[this.getReelBottomRowIndex()].type;
            this.saveReelResults(topResult, "", bottomResult);

        }else if(this.rollTimer <= 0 && this.isFixed == true){

            var typeOfCurrentReelImage = "";
            if(this.fixedReelImageRow == "top"){
                typeOfCurrentReelImage = this.reelImages[this.getReelTopMiddleRowIndex()].type;
            }else if(this.fixedReelImageRow == "bottom"){
                typeOfCurrentReelImage = this.reelImages[this.getReelBottomRowIndex()].type;
            }else{
                return;
            }

            if(typeOfCurrentReelImage == this.fixedReelImageType){
                this.rollSpeed = 0;
                var topResult = this.reelImages[this.getReelTopMiddleRowIndex()].type;
                var bottomResult = this.reelImages[this.getReelBottomRowIndex()].type;
                this.saveReelResults(topResult, "", bottomResult);
            }
        }
    }

    reelHalfPositionAchieved(){
        /* This method is launched whenever the reel is in the half-position where reelImage is in the centre of reel window */

        this.lastPositionWasHalf = true;
        
        if(this.rollTimer <= 0 && this.isFixed == false){
            this.rollSpeed = 0;
            var centerResult = this.reelImages[this.getReelTopMiddleRowIndex()].type;
            this.saveReelResults("", centerResult, "");
        }else if(this.rollTimer <= 0 && this.isFixed == true){

            var typeOfCurrentReelImage = "";
            if(this.fixedReelImageRow == "center"){
                typeOfCurrentReelImage = this.reelImages[this.getReelTopMiddleRowIndex()].type;
            }else{
                return;
            }

            if(typeOfCurrentReelImage == this.fixedReelImageType){
                this.rollSpeed = 0;
                var centerResult = this.reelImages[this.getReelTopMiddleRowIndex()].type;
                this.saveReelResults("", centerResult, "");
            }
        }
    }

    fixPositionMove(positionDiff){
        /*Corrects the small position difference caused by movement refresh differences */

        if(this.rollTimer <= 0){
            for (var i = 0; i < this.reelImages.length; i++) {
                this.reelImages[i].moveDownPixels(positionDiff);
                
            }
        }
    }

    getReelTopMiddleRowIndex(){
        /* For getting the index of the image, that is seen on the top row of the reel window when calling this method. */
        /* ...or the the index of the image, that is seen on the centre row of the reel window when calling this method. Centre row is returned only when this method is called during the reelHalfPositionAchieved() */

        var imgIndex = this.reelStateCounter - 2;
        if(imgIndex < 0){
            return this.reelImages.length + imgIndex;
        }
        return imgIndex;
    }

    getReelBottomRowIndex(){
        /* For getting the index of the image, that is seen on the bottom row of the reel window when calling this method. */

        var imgIndex = this.reelStateCounter - 3;
        if(imgIndex < 0){
            return this.reelImages.length + imgIndex;
        }
        return imgIndex;
    }

    saveReelResults(topResult, centerResult, bottomResult){
        /* Saves all the values to the global 2D array of the input reel results. */

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
        /* When all reels have stopped, it runs a method that rewards the player and shows what he/she won, if they did. */

        if(leftReel.rollSpeed == 0 && middleReel.rollSpeed == 0 && rightReel.rollSpeed == 0){
            results();
        }
    }
}