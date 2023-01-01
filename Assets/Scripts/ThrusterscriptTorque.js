#pragma strict
var YawLeftSpeed : float = -100;
var YawRightSpeed : float = 100;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey("z"))
			rigidbody.AddTorque(transform.right * YawLeftSpeed);
	
		if(Input.GetKey("x"))
			rigidbody.AddTorque(transform.right * YawRightSpeed);
		
	}
}