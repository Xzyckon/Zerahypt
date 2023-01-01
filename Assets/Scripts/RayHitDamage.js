#pragma strict

var collision : GameObject;

var startPoint : float = 0.1;
var range : float = 20000;

var targetLayers : LayerMask;

function Start () {
var hit : RaycastHit;
		if(Physics.Raycast(transform.position + transform.forward * startPoint, transform.forward, hit, range, targetLayers))
		{
			Instantiate(collision, hit.point, Quaternion.identity);
		}
}