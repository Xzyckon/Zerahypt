var eye : Transform;
var TurnedOff : boolean;
var TorqueForce = 20000;
var eyeOffset : float = 20f;

var RotateThreshold : float = 0.5;

var IsForceTurning : boolean;

function FixedUpdate() {
if(!eye)
return;

if(TurnedOff)
return;

 var difference = ((eye.position + eye.forward * eyeOffset) - transform.position).normalized;
 var product : float = Vector3.Dot(transform.right, difference);
 if (product < -RotateThreshold) {
  rigidbody.AddTorque(transform.forward * TorqueForce);
 } else if (product > RotateThreshold) {
  rigidbody.AddTorque(transform.forward * -TorqueForce);
 }
 
 if (IsForceTurning && rigidbody.angularVelocity.magnitude < 0.5) {
  rigidbody.AddTorque(transform.forward * -TorqueForce * 1.5);
 }
}

function ForceTurn (){
IsForceTurning = true;
yield WaitForSeconds (4);
IsForceTurning = false;
}