#pragma strict
static var instance : MapInfoDisplay;
static var isShowingWindow : boolean;
var entered : boolean;
var HideAni : String;
var ShowAni : String;
var InfoInterface : GameObject;

function Awake() {
	instance = this;
}

function Start() {
	isShowingWindow = false;
}

function UpdateName (name : String) {
	var tm : TextMesh = GetComponent(TextMesh);
	tm.text = name;
}

function OnMouseDown() {
	if (isShowingWindow) {
		InfoInterface.animation.Play(HideAni);
		yield WaitForSeconds(0.1);
		isShowingWindow = false;
	} else {
		InfoInterface.animation.Play(ShowAni);
		isShowingWindow = true;
	}
}