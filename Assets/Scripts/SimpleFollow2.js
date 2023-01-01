#pragma strict

var target : Transform;
private var speedCap: float = 20;
var smoothTime = 0.3;
var xOffset : float = 1.0;
var yOffset : float = 1.0;
var zOffset : float = 1.0;
 
private var velocity : Vector3;

function Update()
{
 if(target != null)
 {
  transform.position.x = Mathf.Lerp( transform.position.x, target.position.x + xOffset, Time.deltaTime * smoothTime);
  transform.position.y = Mathf.Lerp( transform.position.y, target.position.y + yOffset, Time.deltaTime * smoothTime);
  transform.position.z = Mathf.Lerp( transform.position.z, target.position.z + zOffset, Time.deltaTime * smoothTime);
 }
}

function OnTriggerEnter (other : Collider)
{
 if(other.tag == "Rocks")
 {
  if(other.rigidbody.velocity.magnitude < speedCap)
  {
  target = other.gameObject.transform;
  }
 }
}