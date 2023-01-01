#pragma strict
var YawLeftSpeed : float = 100;
var YawRightSpeed : float = 100;
var TiltUpSpeed : float = 100;
var TiltDownSpeed : float = 100;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey("a"))
			rigidbody.AddTorque(transform.forward * -YawLeftSpeed);
	
		if(Input.GetKey("d"))
			rigidbody.AddTorque(transform.forward * YawRightSpeed);
			
		if(Input.GetKey("s"))
			rigidbody.AddTorque(transform.right * -TiltUpSpeed);
	
		if(Input.GetKey("w"))
			rigidbody.AddTorque(transform.right * TiltDownSpeed);
		
	}
}