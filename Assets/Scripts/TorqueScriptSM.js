#pragma strict
var Power : float = 1;
var Modifier : float = 1;

var curve : AnimationCurve = new AnimationCurve();

function FixedUpdate () {

var p = rigidbody.velocity.magnitude;

Modifier = curve.Evaluate(p);

	if(WorldInformation.playerCar == transform.parent.name){
		if(Input.GetKey("a"))
			rigidbody.AddTorque(transform.right * -Power * Modifier);
	
		if(Input.GetKey("d"))
			rigidbody.AddTorque(transform.right * Power * Modifier);
	}
}