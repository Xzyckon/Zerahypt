#pragma strict
var entered : boolean;
var OverEffect : GameObject;
var PressEffect : GameObject;

function Update () {

if(entered)
OverEffect.SetActive (true);
else
OverEffect.SetActive (false);

if(Input.GetMouseButtonDown(0) && entered)
PressEffect.SetActive (true);

}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}