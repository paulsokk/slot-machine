class Reel{

    constructor (reelImages, reelWindowElement){
        this.reelImages = reelImages;
        this.reelWindowElement = reelWindowElement;
        this.windowStyle = window.getComputedStyle(this.reelWindowElement);
        this.windowTopValue = this.reelWindowElement.getBoundingClientRect().top;
        console.log(this.windowTopValue);
        this.reelWindowHeight = this.windowStyle.getPropertyValue("height").replace("px", "");
        this.reelStateCounter = 0;
        this.rollSpeed = 0;
        this.rollTimer = 0;
        this.lastPositionWasHalf = false;
        this.positionFixed = false;
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
            //console.log(Number(this.reelImages[i].topPos) + " > " + Number(this.reelImages[i].circleBackPosition));
            if(Number(this.reelImages[i].topPos) >= Number(this.reelImages[i].circleBackPosition)){
                //leftReel.reelImages[0].circleBackPosition();
                this.reelImgCircledBack(this.reelImages[i]);
            }else if(
                (
                    (Number(this.reelImages[i].topPos) >= (Number(this.reelImages[i].circleBackPosition) - this.reelImages[i].height / 2)) && 
                    (Number(this.reelImages[i].topPos) < Number(this.reelImages[i].circleBackPosition))  
                ) && 
                 this.lastPositionWasHalf == false){
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
        this.rollSpeed = Math.floor(Math.random() * maxRollSpeed) + minRollSpeed;  
        this.rollTimer = rollTime;
    }

    reelPositionAchieved(){
        this.lastPositionWasHalf == false;
        
        if(this.rollTimer <= 0){
            this.rollSpeed = 0;
            console.log("stop");
            //fixPositionMove();
        }
    }

    reelHalfPositionAchieved(){
        this.lastPositionWasHalf == true;
        
        if(this.rollTimer <= 0){
            this.rollSpeed = 0;
            console.log("middle stop");
            //fixPositionMove();
        }
    }

    fixPositionMove(positionDiff){

        
        if(this.rollTimer <= 0){
            console.log("pos diff is: " + positionDiff + " first img pos is: " + this.reelImages[0].topPos);
            for (var i = 0; i < this.reelImages.length; i++) {
                this.reelImages[i].moveDownPixels(positionDiff);
                
            }
            console.log("new first img pos is: " + this.reelImages[0].topPos);
        }
        
        
    }
}