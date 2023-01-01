#pragma strict

static var Dozervub : boolean = false;

var DozerAnimationObject : GameObject;
var DozerAnimationName : String = "Name";

var DozerActivateSoundClip : AudioClip;
var DozerMidSoundClip : AudioClip;
var DozerLateSoundClip : AudioClip;

var DozerGameobject : GameObject;
var Ship : GameObject;

var ReachedEnd : boolean = false;
var CanPlay : boolean = true;

 function Update () {
      if(WorldInformation.playerCar.Contains(transform.parent.parent.name)){
                if(Input.GetKeyDown("4"))
                Activate(); 
}
}

function Activate () {
    if(ReachedEnd == false && CanPlay == true){
    DozerAnimationObject.animation[DozerAnimationName + ""].speed = 1;
    DozerAnimationObject.animation.Play(DozerAnimationName + "");
    }
    if(ReachedEnd == true && CanPlay == true){
    DozerAnimationObject.animation[DozerAnimationName + ""].speed = -1;
    DozerAnimationObject.animation[DozerAnimationName + ""].time = DozerAnimationObject.animation[DozerAnimationName + ""].length;
    DozerAnimationObject.animation.Play(DozerAnimationName + "");
    }
}

function StopZeAnimation () {
    ReachedEnd = true;
}

function ActivateSound () {
    ReachedEnd = false;
audio.PlayOneShot(DozerActivateSoundClip);
}

function MotorSound () {
if(ReachedEnd == false){
audio.PlayOneShot(DozerMidSoundClip);
}
}

function MotorEndSound () {
if(ReachedEnd == true){
audio.PlayOneShot(DozerMidSoundClip);
}
}

function LateSound () {
audio.PlayOneShot(DozerLateSoundClip);
}

function LockPlay () {
    CanPlay = false;
}

function UnLockPlay () {
    CanPlay = true;
}

function DozerActive () {
    Dozervub = true;
    DozerGameobject.gameObject.SetActive (true);
}

function DozerInActive () {
    Dozervub = false;
    DozerGameobject.gameObject.SetActive (false);
}