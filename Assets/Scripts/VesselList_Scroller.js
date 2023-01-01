
var scrollUp : VesselList_Scroll;
var scrollDown : VesselList_Scroll;

var thisTransform : Transform;

var thisCol : BoxCollider;

var isActive : boolean;

var isScrollingUp : boolean;

function Start() {

}

function Update () {

if(isActive){

if (Input.GetAxis("Mouse ScrollWheel") > 0f ){
isScrollingUp = true;
thisCol.enabled = true;
DisableCol();
}

if (Input.GetAxis("Mouse ScrollWheel") < 0f ){
isScrollingUp = false;
thisCol.enabled = true;
DisableCol();
}

}

}

function OnMouseOver(){

if(isScrollingUp)
scrollUp.Scroll();
else
scrollDown.Scroll();

thisCol.enabled = false;

}

function DisableCol(){

yield WaitForSeconds (0.15);

thisCol.enabled = false;

}