var DirForce : float = 0.005;
var HoverForce : float = 1;
var StabForce : float = 1;
var DownForce : float = 1;
var MaxHoverForce : float = 90000;
var HoverDistance : float = 20;

var Force : float = 1;
var Torque : float = 1;

var Spinner : Transform;

var curve : AnimationCurve = new AnimationCurve();

var targetLayers : LayerMask;

function Start () {
rigidbody.centerOfMass = Vector3(0, 0, 0);
}

function FixedUpdate () {

if(Vector3.Distance(transform.position, PlayerInformation.instance.PiriPresence.position) < 500){

var hit : RaycastHit;

Debug.DrawRay (Spinner.transform.position + Spinner.transform.forward * 2, Spinner.transform.forward * 100f, Color.red);

if (Physics.Raycast (Spinner.transform.position + Spinner.transform.forward * 2, Spinner.transform.forward, 100, targetLayers))
rigidbody.AddForce(Spinner.transform.forward * DirForce);
else
Spinner.Rotate(0,10,0 * Time.deltaTime);
		
if (Physics.Raycast (transform.position, Vector3.down, hit, HoverDistance, targetLayers)) {
			 HoverForce = curve.Evaluate(hit.distance);
			 
			 if(HoverForce > MaxHoverForce)
			 HoverForce = MaxHoverForce;
			 
		     rigidbody.AddForce(Vector3.up * HoverForce);
}
		
	rigidbody.AddForce(Vector3.down * DownForce);

    rigidbody.AddForceAtPosition(Vector3.up * StabForce, transform.up * 1);
    rigidbody.AddForceAtPosition(-Vector3.up * StabForce, -transform.up * 1);

 rigidbody.AddTorque(transform.up * Random.Range (-Torque, Torque));
 rigidbody.AddTorque(transform.right * Random.Range (-Torque, Torque));
 rigidbody.AddTorque(transform.forward * Random.Range (-Torque, Torque));


 rigidbody.AddForce(transform.up * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.right * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.forward * Random.Range (-Force, Force));

}
}