#pragma strict

var Objects : boolean;

var SelectedObject : GameObject;

function OnJointBreak(breakForce : float) {
if(!Objects){
Destroy(transform.GetChild(0).gameObject);
}

if(Objects)
Destroy(SelectedObject);

transform.parent = null;
}