#pragma strict
var horizontalSpeed : float = 10;
var reverseSpeed : float = 10;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey("w"))
			rigidbody.AddForce(transform.up * -100 * horizontalSpeed);
	
		if(Input.GetKey("s"))
			rigidbody.AddForce(transform.up * 100 * reverseSpeed);
	
		if(Input.GetKey("a"))
			rigidbody.AddForce(transform.right * 100 * horizontalSpeed);
	
		if(Input.GetKey("d"))
			rigidbody.AddForce(transform.right * -100 * horizontalSpeed);
		
	}
}