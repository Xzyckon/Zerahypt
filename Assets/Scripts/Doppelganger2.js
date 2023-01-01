#pragma strict

var target : Transform;
var smoothTime = 0.3;

function FixedUpdate()
{
 if(target != null)
 {
  transform.position.x = Mathf.Lerp( transform.position.x, target.position.x, Time.deltaTime * smoothTime);
  transform.position.y = Mathf.Lerp( transform.position.y, target.position.y, Time.deltaTime * smoothTime);
  transform.position.z = Mathf.Lerp( transform.position.z, target.position.z, Time.deltaTime * smoothTime);
  
  //transform.rotation.x = Mathf.Lerp( transform.rotation.x, target.rotation.x, Time.deltaTime * smoothTime);
  transform.rotation.y = Mathf.Lerp( transform.rotation.y, target.rotation.y, Time.deltaTime * smoothTime);
  //transform.rotation.z = Mathf.Lerp( transform.rotation.z, target.rotation.z, Time.deltaTime * smoothTime);
 }
}