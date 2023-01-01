#pragma strict

var targetLayers : LayerMask;

var Multiplier : float;
var HoverDistance = 5.0;

function FixedUpdate () {
		var fwd = transform.TransformDirection (Vector3.down);
		if (Physics.Raycast (transform.position, fwd, HoverDistance, targetLayers)) {
			rigidbody.AddForce(Vector3.up * Multiplier, ForceMode.Impulse);
		}
	}