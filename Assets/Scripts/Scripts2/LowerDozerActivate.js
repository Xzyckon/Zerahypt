#pragma strict

var LowerDozerAnimationObject : GameObject;
var LowerDozerAnimationName : String = "Name";

var LowerDozerActivateSoundClip : AudioClip;

var LowerReachedEnd : boolean = false;
var LowerCanPlay : boolean = true;

 function Update () {
         if(WorldInformation.playerCar.Contains(transform.parent.parent.name)){
                if(Input.GetKeyDown("4"))
                LowerActivate(); 
}
}

function LowerActivate () {
    if(LowerReachedEnd == false && LowerCanPlay == true){
    LowerDozerAnimationObject.animation[LowerDozerAnimationName + ""].speed = 1;
    LowerDozerAnimationObject.animation.Play(LowerDozerAnimationName + "");
    }
    if(LowerReachedEnd == true && LowerCanPlay == true){
    LowerDozerAnimationObject.animation[LowerDozerAnimationName + ""].speed = -1;
    LowerDozerAnimationObject.animation[LowerDozerAnimationName + ""].time = LowerDozerAnimationObject.animation[LowerDozerAnimationName + ""].length;
    LowerDozerAnimationObject.animation.Play(LowerDozerAnimationName + "");
    }
}

function LowerStopZeAnimation () {
    LowerReachedEnd = true;
}

function LowerActivateSound () {
    LowerReachedEnd = false;
audio.PlayOneShot(LowerDozerActivateSoundClip);
}

function LowerLockPlay () {
    LowerCanPlay = false;
}

function LowerUnLockPlay () {
    LowerCanPlay = true;
}