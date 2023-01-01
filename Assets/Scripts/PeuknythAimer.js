#pragma strict

var target : Transform;

private var NewRotation : Quaternion;
function Update () {
 if (target) {
  NewRotation = Quaternion.LookRotation(target.position - transform.position);
  transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * 400);
 }
}