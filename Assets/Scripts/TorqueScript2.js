#pragma strict
var MainVessel: Transform;

var YawSpeed : float = 100;

var YawSpeedOriginal : float = 100;
var YawSpeedAlternated : float = 100;

var SpeedAlternation : boolean;

var StrongTorque : boolean;

function FixedUpdate () {
	if(WorldInformation.playerCar == MainVessel.name){
		if(Input.GetKey("a")){
			rigidbody.AddTorque(transform.up * -YawSpeed);
			
			if(StrongTorque){
			rigidbody.AddForceAtPosition(transform.forward * YawSpeed, transform.right * 20);
            rigidbody.AddForceAtPosition(-transform.forward * YawSpeed, -transform.right * 20);
            }
            }
	
		if(Input.GetKey("d")){
			rigidbody.AddTorque(transform.up * YawSpeed);
			
			if(StrongTorque){
			rigidbody.AddForceAtPosition(transform.forward * YawSpeed, -transform.right * 20);
            rigidbody.AddForceAtPosition(-transform.forward * YawSpeed, transform.right * 20);
            }
            }
		
		if(SpeedAlternation){
		if(rigidbody.velocity.magnitude > 50)
		YawSpeed = YawSpeedAlternated;
		if(rigidbody.velocity.magnitude < 50)
		YawSpeed = YawSpeedOriginal;
		}
		
	}
}