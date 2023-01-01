var xvelocity = 0.0;
var yvelocity = 0.0;
var zvelocity = 0.0;


var xspin = 0.0;
var yspin = 0.0;
var zspin = 0.0;


function Start () {
		rigidbody.velocity  = Vector3(xvelocity, yvelocity, zvelocity);
		rigidbody.angularVelocity  = Vector3(xspin, yspin, zspin);
	}