#pragma strict

function OnCollisionStay(collision : Collision){
var contact : ContactPoint = collision.contacts[0];
if(collision.gameObject.rigidbody.velocity.magnitude < 0.5)
collision.gameObject.rigidbody.AddForceAtPosition (transform.forward * 0.2, contact.point);
}