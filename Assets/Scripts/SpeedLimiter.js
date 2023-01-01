#pragma strict

var UseStopper : boolean;
var CanBoost : boolean;

var curve : AnimationCurve = new AnimationCurve();
var BoostCurve : AnimationCurve = new AnimationCurve();

var DragAmount : float = 0;
var StopperDragAmount : float = 1;
var VelocityModifier : float = 10;

function Start () {

}

function Update () {

var p = rigidbody.velocity.magnitude / VelocityModifier;

if(!CanBoost){
DragAmount = curve.Evaluate(p) * 50;
rigidbody.drag = DragAmount;
}

if(Input.GetKey("w") && CanBoost){

if(!Input.GetKey(KeyCode.B))
DragAmount = curve.Evaluate(p) * 50;

if(Input.GetKey(KeyCode.B))
DragAmount = BoostCurve.Evaluate(p) * 50;

rigidbody.drag = DragAmount;
}

if(UseStopper){
if(!Input.GetKey("w"))
rigidbody.drag = StopperDragAmount;
}
}