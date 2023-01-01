var FPoint: Transform;

var thisRigidbody: Rigidbody;

var thatRigidbody: Rigidbody;
var thatTransform: Transform;

var Num = 0;

var FNum : float;

function Start () {
}

function FixedUpdate () {

}

function OnCollisionStay(collision : Collision) {

if(thisRigidbody.angularVelocity.magnitude > 0.5){

var contact : ContactPoint = collision.contacts[0];

if(Vector3.Distance(contact.point, FPoint.position) < 0.5){
thatRigidbody.AddForce(thatTransform.up * 2);
thatRigidbody.AddForce(thatTransform.forward * 1);
}

}

}