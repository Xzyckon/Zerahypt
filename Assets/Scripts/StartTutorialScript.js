#pragma strict

var ShowUpAnimationName : String = "Name";
var HideAnimationName : String = "Name";
var ShowTutWindowAnimationName : String = "Name";
var TutorialWindow : GameObject;
var TutorialScript : TutorialScript;
private var entered : boolean;
private var Once : boolean;

static var DoNotShow : boolean;

function Start () {

DoNotShow = WorldInformation.TutorialOff;

if(DoNotShow) return;

yield WaitForSeconds (5);
animation.Play(ShowUpAnimationName + "");
yield WaitForSeconds (20);
if(Once) return;
animation.Play(HideAnimationName + "");
}

function StartNow () {
StopAllCoroutines();
Starting();
}

function Starting () {
Once = false;
TutorialScript.Once = false;
TutorialScript.Page = 1;
animation.Play(ShowUpAnimationName + "");
yield WaitForSeconds (5);
if(Once) return;
animation.Play(HideAnimationName + "");
}

function Update () {
	if(Input.GetMouseButtonDown(0) && entered == true && Once == false){
	    entered = false;
		stuff();
	}
}

function stuff () {
Once = true;
TutorialWindow.animation.Play(ShowTutWindowAnimationName + "");
animation.Play(HideAnimationName + "");
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}