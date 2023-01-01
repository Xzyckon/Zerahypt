#pragma strict

var targetLayers : LayerMask;

var Multiplier : float;
var HoverDistance = 5.0;

function FixedUpdate () {
		var fwd = transform.TransformDirection (Vector3.down);
		if (Physics.Raycast (transform.position, fwd, HoverDistance, targetLayers)) {
			rigidbody.AddForce(Vector3.up * Multiplier, ForceMode.Impulse);
		}
		if (Physics.Raycast (transform.position, fwd, HoverDistance - 0.1, targetLayers)) {
			rigidbody.AddForce(Vector3.up * Multiplier * 1, ForceMode.Impulse);
		}
		if (Physics.Raycast (transform.position, fwd, HoverDistance- 0.2, targetLayers)) {
			rigidbody.AddForce(Vector3.up * Multiplier * 2, ForceMode.Impulse);
		}
		if (Physics.Raycast (transform.position, fwd, HoverDistance- 0.3, targetLayers)) {
			rigidbody.AddForce(Vector3.up * Multiplier * 3, ForceMode.Impulse);
		}
	}