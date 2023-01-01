#pragma strict
var AnimationObject : GameObject;
var AnimationName : String = "Name";

var GoOnStart : boolean;

var ReachedEnd : boolean;
var CanPlay : boolean = true;

function Start () {
if(GoOnStart)
Activate(); 
}

function OnTriggerStay (other : Collider) {
if(other.name.Contains("TC1"))
if(!other.name.Contains("TC1d")){
                if(Input.GetKeyDown("e")){
                Activate(); 
                AnimationObject.audio.Play();
                }
}
}

function Activate () {
    if(ReachedEnd == false && CanPlay == true){
    CanPlay = false;
    Counter2();
    AnimationObject.animation[AnimationName + ""].speed = 1;
    AnimationObject.animation.Play(AnimationName + "");
    }
    if(ReachedEnd == true && CanPlay == true){
    CanPlay = false;
    Counter1();
    AnimationObject.animation[AnimationName + ""].speed = -1;
    AnimationObject.animation[AnimationName + ""].time = AnimationObject.animation[AnimationName + ""].length;
    AnimationObject.animation.Play(AnimationName + "");
    }
}

function Counter1 () {
yield WaitForSeconds (40);
ReachedEnd = false;
CanPlay = true;
}

function Counter2 () {
yield WaitForSeconds (40);
ReachedEnd = true;
CanPlay = true;
}