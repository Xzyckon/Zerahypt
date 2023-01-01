#pragma strict
var AnimationObject : GameObject;
var AnimationName : String = "Name";

var ReachedEnd : boolean = false;
var CanPlay : boolean = true;

 function Update () {
      if(WorldInformation.playerCar == this.gameObject.name){
                if(Input.GetKey("g"))
                Activate(); 
}
}

function Activate () {
    if(ReachedEnd == false && CanPlay == true){
    AnimationObject.animation[AnimationName + ""].speed = 1;
    AnimationObject.animation.Play(AnimationName + "");
    }
    if(ReachedEnd == true && CanPlay == true){
    AnimationObject.animation[AnimationName + ""].speed = -1;
    AnimationObject.animation[AnimationName + ""].time = AnimationObject.animation[AnimationName + ""].length;
    AnimationObject.animation.Play(AnimationName + "");
    }
}

function StopZeAnimation () {
    ReachedEnd = true;
}

function StartZeAnimation () {
    ReachedEnd = false;
}

function LockPlay () {
    CanPlay = false;
}

function UnLockPlay () {
    CanPlay = true;
}