var Target : Transform;
var Sensor : AgroidSensor;
var ZapEffect : GameObject;

var Presence : GameObject;

var Rogue : boolean;

InvokeRepeating("Counter", 0.63, 1);

function Start () {
   if(Rogue)
   Sensor.Rogue = true;
}

function FixedUpdate () {

if(Target != null){
if(Vector3.Distance(transform.position, Target.position) > 3){
   if(rigidbody.velocity.magnitude < 15)
   rigidbody.AddForce((Target.transform.position - transform.position).normalized * 0.05);
   }
if(Vector3.Distance(transform.position, Target.position) < 3){
   rigidbody.AddForce((Target.transform.position - transform.position) * 0);
   }
}
}

function Zap () {
if(Target != null){
var TheThing = Instantiate(ZapEffect, gameObject.transform.position, gameObject.transform.rotation);
    TheThing.transform.parent = gameObject.transform;
}
}

function Counter () {
if(Rogue){

if(rigidbody.velocity.magnitude > 5)
Presence.name = "sTC4TFC4";
else
Presence.name = "sTC4";

}else{

if(rigidbody.velocity.magnitude > 5)
Presence.name = "sTC4TFC4";
else
Presence.name = "sTC4";

}
}