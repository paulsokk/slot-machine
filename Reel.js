class Reel{
	constructor(element){
		this.element = element;
        this.style = window.getComputedStyle(this.element);
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
        this.topPosStart = this.style.getPropertyValue("top").replace("px", "");
        this.type = this.element.getAttribute("reel-type");
    }
    
    moveDown(movePixels){
        this.element.style.top = (Number(this.topPos) + (movePixels*deltaTime)) + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }

    resetPosition(){
        this.element.style.top = this.topPosStart + "px";
        this.topPos = this.style.getPropertyValue("top").replace("px", "");
    }
}