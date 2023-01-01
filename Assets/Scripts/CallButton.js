#pragma strict

var CallOn : AudioClip;
var CallOff : AudioClip;
var CallError : AudioClip;

var CallLockedOn : AudioClip;
var CallLockedOff : AudioClip;

var CallSource : AudioSource;

var CallMenu : GameObject;

var targetTXT : TextMesh;

static var LockedName : String = "undefined";

static var CallingOther : boolean;
static var CallingOther2 : boolean;
static var CallingOther0 : boolean;

static var CallingLock1 : boolean;
static var CallingLock0 : boolean;

private var entered : boolean;

function Update () {
	if(entered && Input.GetMouseButtonDown(0)) 
		CallMenu.gameObject.SetActive (true);
    if(!entered && Input.GetMouseButtonUp(0)) 
		CallMenu.gameObject.SetActive (false);
		
if(CallingOther){
CallingOther = false;
CallSound();
}
if(CallingOther2){
CallingOther2 = false;
CallSound2();
}
if(CallingOther0){
CallingOther0 = false;
CallSound0();
}

if(CallingLock1){
CallingLock1 = false;
CallSound3();
}
if(CallingLock0){
CallingLock0 = false;
CallSound4();
}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}

function CallSound () {
CallSource.clip = CallOn;
CallSource.Play();
}

function CallSound2 () {
CallSource.clip = CallOff;
CallSource.Play();
}

function CallSound0 () {
CallSource.clip = CallError;
CallSource.Play();
}

function CallSound3 () {
CallSource.clip = CallLockedOn;
CallSource.Play();
FurtherActionScript.instance.LockedOn = true;
FurtherActionScript.instance.ShowText();
targetTXT.text = "You have targeted an entity that goes \n by the code: " + LockedName;
}

function CallSound4 () {
CallSource.clip = CallLockedOff;
CallSource.Play();
}