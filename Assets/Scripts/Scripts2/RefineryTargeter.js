#pragma strict

var target : Transform;

InvokeRepeating("Look", 3, 0.5);

function Look()
{
 CheckVessel();
 if(target != null)
 {
  transform.position = target.transform.position;
 }
}

function CheckVessel () {
target = GameObject.Find("ProspectorPresence").transform;
}