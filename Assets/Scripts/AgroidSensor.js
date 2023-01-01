var Controller : AgroidController;
var SensorTarget : GameObject;
var Rogue : boolean;
var Tick : boolean;

function Update () {
   Notice();
}

function Notice () {
if(Tick)
return;

Tick = true;

if(SensorTarget != null){

var lastPos : Vector3 = SensorTarget.transform.position;
yield WaitForSeconds (Random.Range(0.15, 0.25));
if(SensorTarget)
if(Vector3.Distance(SensorTarget.transform.position, lastPos) > 0.2){
Controller.Target = SensorTarget.transform;
yield WaitForSeconds (Random.Range(0.95, 1.05));
if(SensorTarget)
if(Vector3.Distance(SensorTarget.transform.position, transform.position) < 4)
Controller.Zap();

}
}

Tick = false;
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC")){
gameObject.GetComponent(SphereCollider).radius = 100;
if(SensorTarget != null)
Controller.Target = SensorTarget.transform;
}

if(other.collider.name.Contains ("TC") && Rogue){
if (!other.gameObject.name.Contains ("sTC4")){
SensorTarget = other.gameObject;
gameObject.GetComponent(SphereCollider).radius = 15;
}
}
if(other.collider.name.Contains ("TC") && !Rogue){
if (!other.gameObject.name.Contains ("sTC2")){
SensorTarget = other.gameObject;
gameObject.GetComponent(SphereCollider).radius = 15;
}
}
}