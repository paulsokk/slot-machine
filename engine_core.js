var deltaTime = 0.0;
var previousTime = 0;

Awake();

/*MAIN FUNCTIONS*/

function Awake(){
    var d = new Date();
    previousTime = d.getTime();
    Start();
    LoopUpdate();
}

/*CORE FUNCTIONS*/

function LoopUpdate(){
    setInterval(function(){ 
        SetDeltaTime();
        Update(); 
    }, 0);
}

function SetDeltaTime(){
    var d = new Date();
    deltaTime = d.getTime() - previousTime;
    previousTime = d.getTime();

}

/*FUNCTIONS*/