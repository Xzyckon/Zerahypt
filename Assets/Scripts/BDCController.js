
var VesselSpawn : Transform;
var Model : GameObject;
var Floor : GameObject;

var Shield : GameObject;

var Contact : boolean;
var GroundContact : boolean;

var TempPause : boolean;

var OpenShield : boolean;
var CloseShield : boolean;

var ShieldOpenSound: AudioClip;
var ShieldCloseSound: AudioClip;

var ShieldFree : boolean;
var ShieldPush : boolean;
var ShieldReturn : boolean;

var AimUp : boolean;
var Away : boolean;

var ShieldPos : Transform;
var ShieldAim : Transform;

var AccelSound : GameObject;
var DecelSound : GameObject;

var DecelOnce : boolean;
var AccelOnce : boolean;

var StringIn : String = "Vessel1";

var Force : float = 10;

var targetLayers : LayerMask;

private var state: String;

function FixedUpdate () {

var localV = transform.InverseTransformDirection(rigidbody.velocity);

if(-localV.z > 120 && !AccelOnce){
DecelOnce = false;
AccelOnce = true;
var TheThing1 = Instantiate(AccelSound, transform.position, transform.rotation);
  TheThing1.transform.parent = gameObject.transform;
}

if(-localV.z < 120 && !DecelOnce){
AccelOnce = false;
DecelOnce = true;
var TheThing2 = Instantiate(DecelSound, transform.position, transform.rotation);
  TheThing2.transform.parent = gameObject.transform;
}

if (Physics.Raycast(transform.position, -transform.forward, 1000, targetLayers) && !Contact){
Contact = true;
audio.Play();
}

if (Physics.Raycast(transform.position, -transform.forward, 12, targetLayers) && !GroundContact){
GroundContact = true;
Floor.gameObject.audio.Play();
Floor.transform.parent = null;
Spawn();
}

if (Physics.Raycast(transform.position, -transform.forward, 45, targetLayers) && !OpenShield){
TempPause = true;
OpenShield = true;
Shield.animation["BDCShieldScrew"].speed = 1;
Shield.animation.Play("BDCShieldScrew");
rigidbody.constraints = RigidbodyConstraints.None;
Shield.audio.PlayOneShot(ShieldOpenSound);
Counter();
}

if(Vector3.Distance(ShieldPos.position, Shield.transform.position) < 0.005 && !TempPause && !CloseShield){
ShieldFree = false;
CloseShield = true;
Shield.rigidbody.isKinematic = true;
Shield.transform.parent = gameObject.transform;
Shield.rigidbody.drag = 0.1;
Shield.animation["BDCShieldScrew"].speed = -1;
Shield.animation["BDCShieldScrew"].time = Shield.animation["BDCShieldScrew"].length;
Shield.animation.Play("BDCShieldScrew");
Shield.audio.PlayOneShot(ShieldCloseSound);
Counter2();
}

if(ShieldFree){

if(ShieldPush){
Shield.rigidbody.AddForce(Shield.transform.right * 1000);
Shield.rigidbody.AddForce(Shield.transform.forward * -50);
Shield.rigidbody.AddTorque(Shield.transform.up * -500);
}

if(ShieldReturn){
Shield.rigidbody.AddForce((ShieldPos.position - Shield.transform.position).normalized * 200);
if(Vector3.Distance(ShieldPos.position, Shield.transform.position) < 20){
Shield.rigidbody.AddForceAtPosition((ShieldAim.position - Shield.transform.position).normalized * 2000, Shield.transform.forward * 8);
Shield.rigidbody.AddForceAtPosition((ShieldAim.position - Shield.transform.position).normalized * -2000, -Shield.transform.forward * 8);
}
}

}

if(AimUp){
rigidbody.AddTorque(transform.up * 50000);
rigidbody.AddForceAtPosition((Floor.transform.position - transform.position).normalized * -8000, -transform.forward * 20);
rigidbody.AddForceAtPosition((Floor.transform.position - transform.position).normalized * 8000, transform.forward * 20);

if(Away)
if(-localV.z < 2000)
rigidbody.AddForce(transform.forward * -340000);

if(transform.position.y > 35000){
Destroy(gameObject);
}

}else{

if(!Contact && !GroundContact)
if(-localV.z < 2000)
rigidbody.AddForce(transform.forward * -340000);

if(Contact && !GroundContact)
if(-localV.z > 20)
rigidbody.AddForce(transform.forward * 580000);
if(-localV.z > 5)
rigidbody.AddForce(transform.forward * 10000);

if(GroundContact){
if (Physics.Raycast(transform.position, -transform.forward, 40, targetLayers) && GroundContact){
if(localV.z < 8)
rigidbody.AddForce(transform.forward * 5000);
}
}

rigidbody.AddForce(Vector3.up * -2500);

}

}

function Counter () {
TempPause = true;
yield WaitForSeconds (2);
Shield.rigidbody.isKinematic = false;
Shield.rigidbody.velocity = rigidbody.velocity * 1;
ShieldFree = true;
ShieldPush = true;
yield WaitForSeconds (1);
Shield.transform.parent = null;
Shield.rigidbody.drag = 2;
Shield.rigidbody.angularDrag = 10;
TempPause = false;
ShieldPush = false;
}

function Counter2 () {
yield WaitForSeconds (2);
rigidbody.AddTorque(transform.forward * -1000000);
yield WaitForSeconds (1);
rigidbody.drag = 0.08;
rigidbody.angularDrag = 6;
AimUp = true;
yield WaitForSeconds (3);
Away = true;
}

function Spawn () {

//Muggyonaise--------------------------------------------------------------------------------------------------

var Prefabionaise = Resources.Load("VesselPrefabs/" + VesselList.instance.StringOut(), GameObject) as GameObject;
var SpawnedV1 = Instantiate(Prefabionaise, VesselSpawn.transform.position + 
                                           VesselSpawn.transform.up * Prefabionaise.GetComponent("VehicleSensor").MidToGroundDist + 
                                           VesselSpawn.transform.forward * Prefabionaise.GetComponent("VehicleSensor").TailEndDist, 
                                           VesselSpawn.transform.rotation);
SpawnedV1.GetComponent("VehicleSensor").Vessel.name = "DroppedVessel";
SpawnedV1.GetComponent(VehicleSensor).Repositioned = true;

//Muggyonaise--------------------------------------------------------------------------------------------------

Floor.rigidbody.useGravity = true;

yield WaitForSeconds (0.6);
rigidbody.drag = 4;
Destroy(Floor.GetComponent(FixedJoint));
Floor.rigidbody.velocity = -Floor.transform.up * 2;
yield WaitForSeconds (5);
ShieldReturn = true;
}