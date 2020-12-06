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
        this.rollTimer -= deltaTime;
        for (var i = 0; i < this.reelImages.length; i++) {
            this.reelImages[i].moveDown(this.rollSpeed);
            //console.log(Number(this.reelImages[i].topPos) + " > " + Number(this.reelImages[i].circleBackPosition));
            if(Number(this.reelImages[i].topPos) > Number(this.reelImages[i].circleBackPosition)){
                //leftReel.reelImages[0].circleBackPosition();
                this.reelImgCircledBack(this.reelImages[i]);
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
        if(this.rollTimer <= 0){
            this.rollSpeed = 0;
            console.log("stop");
        }
    }
}