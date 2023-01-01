#pragma strict

var target : Transform;
var smoothTime = 0.3;
var xOffset : float = 1.0;
var yOffset : float = 1.0;
var zOffset : float = 1.0;
 
private var velocity : Vector3;

function FixedUpdate()
{
 if(target != null)
 {
  transform.position.x = Mathf.Lerp( transform.position.x, target.position.x + xOffset, Time.deltaTime * smoothTime);
  transform.position.y = Mathf.Lerp( transform.position.y, target.position.y + yOffset, Time.deltaTime * smoothTime);
  transform.position.z = Mathf.Lerp( transform.position.z, target.position.z + zOffset, Time.deltaTime * smoothTime);
 }
}