#pragma strict

function Start () {

}

function Update () {
if(rigidbody.angularVelocity.magnitude > 0.1)
hingeJoint.spring.damper = 0.8;
if(rigidbody.angularVelocity.magnitude > 0.2)
hingeJoint.spring.damper = 0.6;
if(rigidbody.angularVelocity.magnitude > 0.4)
hingeJoint.spring.damper = 0.5;
if(rigidbody.angularVelocity.magnitude > 0.6)
hingeJoint.spring.damper = 0.4;
}