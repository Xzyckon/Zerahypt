#pragma strict

var target : Transform;

function Start () {
target = PlayerInformation.instance.PhysCam;
}

function FixedUpdate(){
if(target == null)
return;

  transform.position.x = target.position.x;
  transform.position.z = target.position.z;
 }