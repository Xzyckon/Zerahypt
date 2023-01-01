var Snyf : GameObject;

var Tick : boolean;

function Update () {
Notice();
}

function Notice () {
if(Tick)
return;

Tick = true;
yield WaitForSeconds (0.9);
Snyf.GetComponent("SnyfController").Target = null;
gameObject.GetComponent(SphereCollider).radius = 10;
yield WaitForSeconds (0.1);
gameObject.GetComponent(SphereCollider).radius = 0.01;
Tick = false;
}

function OnTriggerEnter (other : Collider) {
if(other.gameObject.name == "SnyferolSource"){
Snyf.GetComponent("SnyfController").Target = other.gameObject.transform;
}
}