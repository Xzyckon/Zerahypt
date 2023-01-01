#pragma strict

var Radius : float = 5;
var TimeTick : float = 2;

var UseZ : boolean;

InvokeRepeating("Tick", 3, TimeTick);

function Tick () {

var newPosition : Vector3 = Random.insideUnitSphere * Radius;
	transform.localPosition.x = newPosition.x;
	transform.localPosition.y = newPosition.y;
	
	if(UseZ)
	transform.localPosition.z = newPosition.z;

}