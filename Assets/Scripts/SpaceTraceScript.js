var SpaceTrace : GameObject;

var Target : Transform;
var Power : float = 0.01;

var NoticeRadius = 100;

var Tick : boolean;

function Update () {
Notice();
}

function Notice () {
if(Tick)
return;

if(Target == null){
   SpaceTrace.rigidbody.drag = 1;
   SpaceTrace.rigidbody.angularDrag = 0.1;
}

Tick = true;
yield WaitForSeconds (0.8);
Target = null;
gameObject.GetComponent(SphereCollider).radius = NoticeRadius;
yield WaitForSeconds (0.2);
gameObject.GetComponent(SphereCollider).radius = 0.01;
Tick = false;
}

function OnTriggerStay (other : Collider) {
if(Target == null){
if(other.gameObject.name == "HeatSource"){
Target = other.gameObject.transform;
}
}
}

function FixedUpdate(){

if(Target != null){
   SpaceTrace.rigidbody.drag = 0;
   SpaceTrace.rigidbody.angularDrag = 0;
   SpaceTrace.rigidbody.AddForce((Target.transform.position - transform.position).normalized * Power);
   }
}