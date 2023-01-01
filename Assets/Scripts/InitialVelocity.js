#pragma strict
var DisplayVelocity : boolean;
var Velocity = 0;

var Force = 0.1;

function Start () {
rigidbody.AddForce(transform.up * Force, ForceMode.Impulse);
}

function Update () {
if(DisplayVelocity)
Velocity = rigidbody.velocity.magnitude;
}