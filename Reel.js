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
        for (var i = 0; i < this.reelImages.length; i++) {
            var startingTopPosition = 0 + this.windowTopValue - this.reelImages[i].height;
            //setting starting position
            this.reelImages[i].topPosStart = startingTopPosition;
            console.log("starting position is " + startingTopPosition);
            this.reelImages[i].moveToPosition(this.reelImages[i].topPosStart);

            //setting reset position
            
        }
    }
}