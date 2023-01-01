#pragma strict

var IsNear : boolean;

var isCameraSetter : boolean;

var StartPoint : Transform;
var EndPoint : Transform;

function Start () {

}

function Update () {
if(IsNear)
if(Input.GetKeyDown(KeyCode.E)){

IsNear = false;

PlayerInformation.instance.Pirizuka.position = EndPoint.position;
PlayerInformation.instance.Pirizuka.Translate(Vector3.up * 1.4);

if(isCameraSetter)
if(!WorldInformation.IsNopass)
CameraScript.cameraSetOnce = true;

}
}

function OnTriggerEnter(other : Collider) {
if(other.name.Contains("TC1p") && WorldInformation.playerCar == "null"){

IsNear = true;

}
}

function OnTriggerExit(other : Collider) {
if(other.name.Contains("TC1p") && WorldInformation.playerCar == "null"){

IsNear = false;

}
}