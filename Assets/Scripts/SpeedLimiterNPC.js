#pragma strict

var curve : AnimationCurve = new AnimationCurve();

var DragAmount : float = 0;
var VelocityModifier : float = 10;

function Start () {

}

function Update () {

var p = rigidbody.velocity.magnitude / VelocityModifier;

DragAmount = curve.Evaluate(p) * 50;
rigidbody.drag = DragAmount;
}