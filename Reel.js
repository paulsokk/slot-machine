class Reel{
    constructor (reelImages, reelWindowElement){
        this.reelImages = reelImages;
        this.reelWindowElement = reelWindowElement;
        this.windowStyle = window.getComputedStyle(this.reelWindowElement);
        this.windowTopValue = this.reelWindowElement.getBoundingClientRect().top;
        console.log(this.windowTopValue);
        this.reelWindowHeight = this.windowStyle.getPropertyValue("height").replace("px", "");
    }

    SetupReelImages(){
        //var totalReelImagesHeight = this.getTotalReelImagesHeight();

        for (var i = 0; i < this.reelImages.length; i++) {
            //setting reel image resetting starting position
            var startingTopPosition = 0 /*+ this.windowTopValue*/ - this.reelImages[i].height;
            console.log("0 + " + this.windowTopValue + " - " + this.reelImages[i].height);
            this.reelImages[i].topPosStart = startingTopPosition;

            //setting reel image circleBackPosition position
            var circleBackPosition = Number(startingTopPosition) + Number(this.reelImages[i].height) + Number(this.reelWindowHeight);
            this.reelImages[i].circleBackPosition = circleBackPosition;
            //console.log("circleBackPosition pos " + circleBackPosition);

            //setting first starting position
            var firstStartingPosition = circleBackPosition - Number(this.reelImages[i].height) * (i + 1);
            this.reelImages[i].moveToPosition(firstStartingPosition);
        }
    }

    /*getTotalReelImagesHeight(){
        var totalHeight = 0;
        for (var i = 0; i < this.reelImages.length; i++) {
            var totalHeight = totalHeight + Number(this.reelImages[i].height);
        }

        return totalHeight;

    }*/
}