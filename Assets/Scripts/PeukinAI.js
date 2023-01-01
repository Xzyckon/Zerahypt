var Creature : GameObject;

var IsPeuktato : boolean;
var IsPeuktorb : boolean;

var Target : Transform;

var Power : float = 0.01;
var Torque : float = 0.01;
var Spin : float = 0;

var upnudge : Upnudge;

var AttractedTo : String = "HeatSource";

var NoticeRadius = 200;

var UseOutOfBounds : boolean;
var OutOfBounds = 5000;
var FromWhat : Transform;

var Tick : boolean;

InvokeRepeating("Regenerator", 1, 0.2);

function Start () {
if(IsPeuktato)
StuffSpawner.TheNPC000N += 1;
if(IsPeuktorb)
StuffSpawner.TheNPC001N += 1;
}

function FixedUpdate () {
Notice();

if(Spin > 0)
 Creature.rigidbody.AddTorque(transform.up * Spin);
 else
 Creature.rigidbody.AddTorque(transform.up * Random.Range (-Torque, Torque));
 
 Creature.rigidbody.AddTorque(transform.right * Random.Range (-Torque, Torque));
 Creature.rigidbody.AddTorque(transform.forward * Random.Range (-Torque, Torque));

if(Target != null){
   Creature.rigidbody.AddForce((Target.transform.position - Creature.transform.position).normalized * Power);
   }else{
   Creature.rigidbody.AddForce(transform.up * Power);
   }

if(UseOutOfBounds){

if(FromWhat)
if(Vector3.Distance(transform.position, WorldInformation.instance.transform.position) > OutOfBounds)
Creature.rigidbody.AddForce((FromWhat.position - Creature.transform.position).normalized * Power);

}
}

function Notice () {
if(Tick)
return;

Tick = true;
yield WaitForSeconds (0.8);
Target = null;
gameObject.GetComponent(SphereCollider).radius = NoticeRadius;
yield WaitForSeconds (0.2);
gameObject.GetComponent(SphereCollider).radius = 0.01;
Tick = false;
}

function OnTriggerStay (other : Collider) {
if(other.collider.name.Contains (AttractedTo)){
Target = other.gameObject.transform;
}
}

function Regenerator () {
if(IsPeuktato)
if(upnudge.isTouching)
upnudge.nudge = true;
}

function decrement () {
	if(audio.volume > 0.2)
		audio.volume -= 0.004;
	if(audio.pitch > 0.6)
		audio.pitch -= 0.002;
}

function increment () {
	if(audio.volume < 0.5)
		audio.volume += 0.01;
    if(audio.pitch < 0.8)
		audio.pitch += 0.01;
}

function Damage () {
if(IsPeuktato)
StuffSpawner.TheNPC000N -= 1;
if(IsPeuktorb)
StuffSpawner.TheNPC001N -= 1;
}