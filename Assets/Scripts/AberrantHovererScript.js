var HoverForce : float = 1;
var HovDist : float = 1;

var curve : AnimationCurve = new AnimationCurve();

var targetLayers : LayerMask;

function FixedUpdate () {

		var hit : RaycastHit;
		
		if (Physics.Raycast (transform.position, Vector3.down, hit, HovDist, targetLayers)){
			 HoverForce = curve.Evaluate(hit.distance);
			 
	    rigidbody.AddForceAtPosition(Vector3.up * HoverForce, transform.position, ForceMode.Impulse);
	    }

}