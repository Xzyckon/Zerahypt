var xspin = 0.0;
var yspin = 0.0;
var zspin = 0.0;
var Vel = 140.0;


function Start () {
		rigidbody.AddRelativeForce(Vector3(Vel, 0, 0) * (rigidbody.mass * 10));
		rigidbody.angularVelocity  = Vector3(Random.Range(-0.1,0.1), Random.Range(-0.1,0.1), Random.Range(-0.1,0.1));
	}