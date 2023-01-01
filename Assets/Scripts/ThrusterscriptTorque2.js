#pragma strict
var YawLeftSpeed : float = 100;
var YawRightSpeed : float = 100;
var TiltLeftSpeed : float = 100;
var TiltRightSpeed : float = 100;
var TiltUpSpeed : float = 100;
var TiltDownSpeed : float = 100;

var SwitchWhenS : boolean;

function FixedUpdate () {
	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey("z"))
			rigidbody.AddTorque(transform.up * -YawLeftSpeed);
	
		if(Input.GetKey("x"))
			rigidbody.AddTorque(transform.up * YawRightSpeed);
			
		if(Input.GetKey("a")){
		    if(!SwitchWhenS)
			rigidbody.AddTorque(transform.forward * TiltLeftSpeed);
			if(SwitchWhenS && !Input.GetKey("s"))
			rigidbody.AddTorque(transform.forward * TiltLeftSpeed);
			}
	
		if(Input.GetKey("d")){
		    if(!SwitchWhenS)
			rigidbody.AddTorque(transform.forward * -TiltRightSpeed);
			if(SwitchWhenS && !Input.GetKey("s"))
			rigidbody.AddTorque(transform.forward * -TiltRightSpeed);
			}
			
		if(Input.GetKey("s"))
			rigidbody.AddTorque(transform.right * -TiltUpSpeed);
			
		if(Input.GetKey("w"))
			rigidbody.AddTorque(transform.right * TiltDownSpeed);
		
	}
}