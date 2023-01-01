#pragma strict

var target : Transform;
var Locked : boolean;
var smoothTime = 0.3;

function LateUpdate()
{
 if(target != null && !Locked)
 {
  transform.position.x = Mathf.Lerp( transform.position.x, target.position.x, Time.deltaTime * smoothTime);
  transform.position.y = Mathf.Lerp( transform.position.y, target.position.y, Time.deltaTime * smoothTime);
  transform.position.z = Mathf.Lerp( transform.position.z, target.position.z, Time.deltaTime * smoothTime);
 }
 
 if(target != null && Locked)
 {
 transform.position = target.transform.position;
 }
}