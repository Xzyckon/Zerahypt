
var EnableGravity : boolean;

function OnJointBreak(breakForce : float) {
if(EnableGravity)
rigidbody.useGravity = true;

transform.parent = null;
}