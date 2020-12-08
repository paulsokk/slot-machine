class ReelImg{
	constructor(element){
		this.element = element;
        this.style = window.getComputedStyle(this.element);
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
        this.topPosStart = this.style.getPropertyValue("top").replace("px", "");
        this.height = this.style.getPropertyValue("height").replace("px", "");
        this.type = this.element.getAttribute("reel-type");
        this.circleBackPosition = 300;
    }
    
    moveDown(moveSpeed){
        /* Should be used when moving reel images at a consistant pace. Moves the reel image down by input amount per second. */
        this.element.style.top = (Number(this.topPos) + (moveSpeed*deltaTime)) + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }

    moveDownPixels(movePixels){
        this.element.style.top = (Number(this.topPos) + movePixels) + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }

    moveToPosition(newPosition){
        this.element.style.top = newPosition + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }
}