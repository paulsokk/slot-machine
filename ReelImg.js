class ReelImg{
	constructor(element){
		this.element = element;
        this.style = window.getComputedStyle(this.element);
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
        this.topPosStart = this.style.getPropertyValue("top").replace("px", "");
        this.height = this.style.getPropertyValue("height").replace("px", "");
        this.type = this.element.getAttribute("reel-type");
        this.resetPosition = 300;
    }
    
    moveDown(movePixels){
        this.element.style.top = (Number(this.topPos) + (movePixels*deltaTime)) + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
        //console.log(this.topPos);
    }

    /*resetPosition(){
        console.log("resetting to " + this.topPosStart);
        this.element.style.top = this.topPosStart + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }*/

    moveToPosition(newPosition){
        this.element.style.top = newPosition + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }
}