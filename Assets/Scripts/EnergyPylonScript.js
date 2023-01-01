
var DischargePrefab : GameObject;

var DronePrefab : GameObject;

var IssuedDrone1 : GameObject;
var IssuedDrone2 : GameObject;

var DroneArea : Transform;

var DroneAreaAudio : AudioSource;

var HumArea : GameObject;

var DischargeArea : Transform;

var StartArea : GameObject;

var target : Transform;

var AimTowards : boolean;

var Turning: boolean;

var AdapterRB : Rigidbody;

static var EnergyBallArea : Transform;

var AuraEffect : ParticleSystem;

var Hum1  : AudioClip;
var Hum2  : AudioClip;

var Dist : boolean;

var BuoyPatrol: boolean;

var Discharging : boolean;

var DischargeTime = 0;

var Lengthrandomizer : float = 10;

var lastTime : float;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;

InvokeRepeating("Respawn", 4, 0.83);

InvokeRepeating("Counter", 4, 1);

function Start(){

DischargeTime = 0;

EnergyBallArea = DischargeArea;

Lengthrandomizer = Random.Range(10, 30);
if(BuoyPatrol){
StartArea = new GameObject();
StartArea.transform.position = transform.position;
StartArea.transform.rotation = transform.rotation;
}
}

function Update () {
if(!Dist){
 if(Time.time - lastTime > Lengthrandomizer) {
  Lengthrandomizer = Random.Range(30, 60);
  
  var randomValue : int = Random.Range(1, 3);
  
  switch (randomValue) {
    		case 1:
    		HumArea.audio.PlayOneShot(Hum1);
    		break;
    		case 2:
    		HumArea.audio.PlayOneShot(Hum2);
    		break;
    		}
    		
  lastTime = Time.time;
 }
}
}

function FixedUpdate () {
if(!Dist){
if(Discharging){

if(AuraEffect.startSize > 8)
AuraEffect.startSize -= 0.5;

if(AuraEffect.startSize < 8.1)
Discharging = false;

}

if(!Discharging)
if(AuraEffect.startSize < 27)
AuraEffect.startSize += 0.02;

if(BuoyPatrol){
if(AimTowards){
AdapterRB.AddForceAtPosition((target.transform.position - transform.position).normalized * 20000, -transform.up * 16);
AdapterRB.AddForceAtPosition((target.transform.position - transform.position).normalized * -20000, transform.up * 16);
}else{
AdapterRB.AddForceAtPosition((target.transform.position - transform.position).normalized * 20000, transform.up * 16);
AdapterRB.AddForceAtPosition((target.transform.position - transform.position).normalized * -20000, -transform.up * 16);
}
if(Turning)
rigidbody.AddTorque(-transform.forward * 200000);
}

}
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC0a"))
PissedAtTC0a = 10;

if(other.collider.name.Contains ("TFC1"))
PissedAtTC1 = 10;

if(other.collider.name.Contains ("TFC3"))
PissedAtTC3 = 10;

if(other.collider.name.Contains ("TFC5"))
PissedAtTC5 = 10;

if(other.collider.name.Contains ("TFC6"))
PissedAtTC6 = 10;

if(other.collider.name.Contains ("TFC7"))
PissedAtTC7 = 10;

if(other.collider.name.Contains ("TFC"))
if(!other.collider.name.Contains ("TFC2"))
SpawnDrone();

}

function SpawnDrone(){

yield WaitForSeconds (0.2);

if(IssuedDrone2 == null && DronePrefab){
IssuedDrone2 = Instantiate(DronePrefab, DroneArea.position, DroneArea.rotation);
IssuedDrone2.rigidbody.velocity = DroneArea.transform.up * -40;
DroneAreaAudio.Play();

if(PissedAtTC0a > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC0a = 8;

if(PissedAtTC1 > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC1 = 8;
if(PissedAtTC3 > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC3 = 8;
if(PissedAtTC5 > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC5 = 8;
if(PissedAtTC6 > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC6 = 8;
if(PissedAtTC7 > 0)
IssuedDrone2.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC7 = 8;
}

}

function Respawn(){
if(IssuedDrone1 == null && DronePrefab){
IssuedDrone1 = Instantiate(DronePrefab, DroneArea.position, DroneArea.rotation);
IssuedDrone1.rigidbody.velocity = DroneArea.transform.up * -40;
DroneAreaAudio.Play();

if(PissedAtTC0a > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC0a = 8;
if(PissedAtTC1 > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC1 = 8;
if(PissedAtTC3 > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC3 = 8;
if(PissedAtTC5 > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC5 = 8;
if(PissedAtTC6 > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC6 = 8;
if(PissedAtTC7 > 0)
IssuedDrone1.transform.GetChild(0).GetComponent(AgrianMiniBotAI).PissedAtTC7 = 8;

}
if(BuoyPatrol){
if(Vector3.Distance(transform.position, StartArea.transform.position) > 2000 && !AimTowards){
AimTowards = true;
Turning = true;
Align();
}
if(Vector3.Distance(transform.position, StartArea.transform.position) < 20 && AimTowards){
AimTowards = false;
Turning = true;
Align();
}
}

if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
  
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
  
if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;
  
if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;
  
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;

}

function Spawn(){
yield WaitForSeconds (0.2);
var TheThing =  Instantiate(DischargePrefab, DischargeArea.position, DischargeArea.rotation);
TheThing.transform.parent = gameObject.transform;
}

function Align () {
yield WaitForSeconds (2);
Turning = false;
}

function Discharge(){
 Discharging = true;
 Spawn();
}

function Counter(){
if(DischargeTime < 100){

var randomValueT : int = Random.Range(1, 3);
  
switch (randomValueT) {
case 1:
DischargeTime += 1;
break;
case 2:
DischargeTime += 2;
break;
}

}else{
DischargeTime = 0;
Discharge();
}
}