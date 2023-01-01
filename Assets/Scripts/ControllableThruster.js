#pragma strict

var ForwardSpeed : float = 100;
var UpSpeed : float = 100;

function FixedUpdate () {

if(Input.GetKey("k"))
			rigidbody.AddForce(transform.forward * -ForwardSpeed);
			
if(Input.GetKey("l"))
			rigidbody.AddForce(transform.up * -UpSpeed);
			
}