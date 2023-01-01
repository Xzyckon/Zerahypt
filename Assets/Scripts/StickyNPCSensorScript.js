var MainNPC : GameObject;

var Tick : boolean;

function Update () {
Notice();
}

function Notice () {
if(Tick)
return;

Tick = true;
yield WaitForSeconds (0.5);
gameObject.GetComponent(SphereCollider).radius = 50;
yield WaitForSeconds (0.5);
gameObject.GetComponent(SphereCollider).radius = 0.01;
Tick = false;
}

function OnTriggerEnter (other : Collider) {
if(other.tag == "EnemyToAberrant" || other.tag == "EnemyToHelirotor" || other.tag == "EnemyToAkbar" || other.tag == "ThingOfInterest"){
var lastPos : Vector3 = other.transform.position;
yield WaitForSeconds (0.2);
if(Vector3.Distance(other.transform.position, lastPos) > 0.2){
MainNPC.GetComponent("StickyNPC").Ally = other.gameObject.transform;
}
}
}