#pragma strict

var targetLayers : LayerMask;

function FixedUpdate () {

var hit : RaycastHit;
		if(Physics.Raycast(transform.position, transform.up, hit, 20000, targetLayers))
	    transform.localScale = Vector3(0.6, hit.distance, 0.6);
        else
        transform.localScale = Vector3(0.6, 20000, 0.6);
}