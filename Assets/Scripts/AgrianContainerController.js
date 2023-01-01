
var isBulkContainer : boolean;

var HasGarage : boolean;
var GaragePoint : Transform;
var GarageLight : GameObject;

var CarrierAI : AgrianTowerAI;

var Cbody1 : Rigidbody;
var Cbody2 : Rigidbody;

var CbodyNull : Rigidbody;

var Marker : GameObject;

var Node1 : Transform;
var Node2 : Transform;

var Magnet1 : Transform;
var Magnet2 : Transform;

var Detach : boolean;

var Attached : boolean;
var MagnetForce = 10.0;

var AmountOfStuff = 0;

var GateBool : boolean;

var Opening : boolean;
var Closing : boolean;

var RampOpening : boolean;
var RampClosing : boolean;

var gateDirJoint : ConfigurableJoint;
var gateAngJoint : HingeJoint;

var rampDirJoint : ConfigurableJoint;
var rampAngJoint : HingeJoint;

var GateMoveSFX : AudioSource;
var GateMoveSFXEnd : boolean;
var RampMoveSFX : AudioSource;
var RampMoveSFXEnd : boolean;
var RampTurnSFX : AudioSource;
var RampTurnSFXEnd : boolean;

var GateShockSFX : AudioSource;
var GateShockedSFX : boolean;

var RampShockSFX : AudioSource;
var RampShockedSFX : boolean;

var GateStopSFX : AudioSource;
var GateStoppedSFX : boolean;

var targetLayers : LayerMask;

InvokeRepeating("Reader", 1, 0.5);

function Start () {
if(HasGarage){
if(CarrierAI.isFleetVessel1){
if(PlayerPrefs.HasKey("GaragedIDF1")){

var Dist1 = PlayerPrefs.GetFloat("GaragedDistF1");
var ID1 = PlayerPrefs.GetString("GaragedIDF1");

var Prefabionaise1 = Resources.Load("VesselPrefabs/" + ID1, GameObject) as GameObject;

var TheThing1 = Instantiate(Prefabionaise1, GaragePoint.position, GaragePoint.rotation);
TheThing1.transform.position.y += Dist1;
if(ID1 != "Vessel74")
TheThing1.transform.GetComponent(VehicleSensor).Vessel.name = "GaragedVesselF1";

TheThing1.transform.GetComponent(VehicleSensor).Garaged = true;
TheThing1.transform.GetComponent(VehicleSensor).Garage = gameObject.transform;

}
GaragePoint.name = "GaragePointF1";
}
if(CarrierAI.isFleetVessel2){
if(PlayerPrefs.HasKey("GaragedIDF2")){

var Dist2 = PlayerPrefs.GetFloat("GaragedDistF2");
var ID2 = PlayerPrefs.GetString("GaragedIDF2");

var Prefabionaise2 = Resources.Load("VesselPrefabs/" + ID2, GameObject) as GameObject;

var TheThing2 = Instantiate(Prefabionaise2, GaragePoint.position, GaragePoint.rotation);
TheThing2.transform.position.y += Dist2;
if(ID2 != "Vessel74")
TheThing2.transform.GetComponent(VehicleSensor).Vessel.name = "GaragedVesselF2";

TheThing2.transform.GetComponent(VehicleSensor).Garaged = true;
TheThing2.transform.GetComponent(VehicleSensor).Garage = gameObject.transform;

}
GaragePoint.name = "GaragePointF2";
}
}
}

function Reader () {

rigidbody.centerOfMass = Vector3(0, 0, 0);

if(isBulkContainer){

if(!Marker.name.Contains ("nerOFull")){
if(AmountOfStuff > 200)
Marker.name = "ContainerFull";
}
if(!Marker.name.Contains ("nerOEmpty")){
if(AmountOfStuff == 0)
Marker.name = "ContainerEmpty";
}
}





if(HasGarage){
if(CarrierAI.isFleetVessel1){
WorldInformation.GarageF1 = GaragePoint;

if(WorldInformation.InGarageF1){
GarageLight.SetActive (true);
}

if(!WorldInformation.InGarageF1){
GarageLight.SetActive (false);
}
}
if(CarrierAI.isFleetVessel2){
WorldInformation.GarageF2 = GaragePoint;

if(WorldInformation.InGarageF2){
GarageLight.SetActive (true);
}

if(!WorldInformation.InGarageF2){
GarageLight.SetActive (false);
}
}

}






}

function FixedUpdate () {


if(GateBool)
if(!Opening && !Closing){
GateBool = false;

GateStoppedSFX = false;
GateShockedSFX = false;
RampShockedSFX = false;

GateMoveSFXEnd = false;
RampMoveSFXEnd = false;
RampTurnSFXEnd = false;

GateMoveSFX.Stop();
RampMoveSFX.Stop();
RampTurnSFX.Stop();

GateMoveSFX.volume = 1;
RampMoveSFX.volume = 1;
RampTurnSFX.volume = 1;

if(gateDirJoint.targetPosition.z < 0.2){
Opening = true;
Closing = false;
}else{
Closing = true;
Opening = false;
RampClosing = true;
RampOpening = false;
}


}



if(Opening){
if(gateAngJoint.spring.targetPosition < 90){
if(gateDirJoint.targetPosition.z < 14){
gateDirJoint.targetPosition.z += 0.05;
if(!GateMoveSFX.isPlaying)
GateMoveSFX.Play();
}else{
gateAngJoint.spring.targetPosition += 0.1;
RampOpening = true;
if(!RampMoveSFX.isPlaying)
RampMoveSFX.Play();

if(!GateShockedSFX){
GateShockSFX.Play();
GateShockedSFX = true;
}
}
}else{
gateAngJoint.spring.targetPosition = 90;
gateDirJoint.targetPosition.z = 14;

if(!GateStoppedSFX){
GateStopSFX.Play();
GateStoppedSFX = true;
}

GateMoveSFXEnd = true;

Opening = false;
}
}

if(RampOpening){
if(rampAngJoint.spring.targetPosition < 20){
if(rampDirJoint.targetPosition.z < 89){
rampDirJoint.targetPosition.z += 0.15;
}else{
rampAngJoint.spring.targetPosition += 0.1;
if(!RampTurnSFX.isPlaying)
RampTurnSFX.Play();

RampMoveSFXEnd = true;

}
}else{
rampAngJoint.spring.targetPosition = 20;
rampDirJoint.targetPosition.z = 89;
if(!RampShockedSFX){
RampShockSFX.Play();
RampShockedSFX = true;
}

RampTurnSFXEnd = true;

RampOpening = false;
}
}

if(Closing){
if(gateDirJoint.targetPosition.z > 0.1){
if(gateAngJoint.spring.targetPosition > 0.2){
gateAngJoint.spring.targetPosition -= 0.1;
if(!GateMoveSFX.isPlaying)
GateMoveSFX.Play();
}else{
gateAngJoint.spring.targetPosition = 0;
gateDirJoint.targetPosition.z -= 0.05;

if(!GateShockedSFX){
GateShockSFX.Play();
GateShockedSFX = true;
}

}
}else{
gateAngJoint.spring.targetPosition = 0;
gateDirJoint.targetPosition.z = 0;

if(!GateStoppedSFX){
GateStopSFX.Play();
GateStoppedSFX = true;
}

GateMoveSFXEnd = true;

Closing = false;
LockFunction();
}
}



if(RampClosing){
if(rampDirJoint.targetPosition.z > 0.1){
if(rampAngJoint.spring.targetPosition > 0.2){
rampAngJoint.spring.targetPosition -= 0.1;
if(!RampTurnSFX.isPlaying)
RampTurnSFX.Play();
}else{
rampAngJoint.spring.targetPosition = 0;
rampDirJoint.targetPosition.z -= 0.15;
if(!RampMoveSFX.isPlaying){
RampMoveSFX.Play();
RampShockSFX.Play();
}

RampTurnSFXEnd = true;
}
}else{
rampAngJoint.spring.targetPosition = 0;
rampDirJoint.targetPosition.z = 0;
RampClosing = false;

if(!RampShockedSFX){
RampShockSFX.Play();
RampShockedSFX = true;
}

RampMoveSFXEnd = true;
RampLockFunction();
}
}









if(GateMoveSFXEnd){
GateMoveSFX.volume -= 0.025;
if(GateMoveSFX.volume == 0){
GateMoveSFX.Stop();
GateMoveSFXEnd = false;
}
}

if(RampMoveSFXEnd){
RampMoveSFX.volume -= 0.025;
if(RampMoveSFX.volume == 0){
RampMoveSFX.Stop();
RampMoveSFXEnd = false;
}
}

if(RampTurnSFXEnd){
RampTurnSFX.volume -= 0.025;
if(RampTurnSFX.volume == 0){
RampTurnSFX.Stop();
RampTurnSFXEnd = false;
}
}








if(Cbody1 == null){
var hit : RaycastHit;
Debug.DrawRay (transform.position + transform.forward * 55, transform.forward * 20f, Color.red);
if (Physics.Raycast (transform.position + transform.forward * 55, transform.forward, hit, 20, targetLayers)){
if(hit.collider.name.Contains ("TC2HullA"))
Cbody1 = hit.collider.gameObject.rigidbody;
}
}

if(Detach){

if(Node1)
Node1.gameObject.GetComponent("AgrianContainerArea").Vacant = true;

rigidbody.drag = 1;
Attached = false;
Detach = false;
gameObject.GetComponent(FixedJoint).connectedBody = CbodyNull;
}

if(Node1){
if(!Attached){
rigidbody.AddForce((Node1.transform.position - Magnet1.transform.position).normalized * MagnetForce);

if(Vector3.Distance(Magnet1.transform.position, Node1.transform.position) < 0.1){
         Attached = true;
         Node1.gameObject.GetComponent("AgrianContainerArea").Occupied = true;
         gameObject.GetComponent(FixedJoint).connectedBody = Cbody2;
         rigidbody.drag = 0.05;
         }
}
}

if(Node2){
if(!Attached){
rigidbody.AddForce((Node2.transform.position - Magnet2.transform.position).normalized * MagnetForce);

if(Vector3.Distance(Magnet2.transform.position, Node2.transform.position) < 0.2){
         Attached = true;
         gameObject.GetComponent(FixedJoint).connectedBody = Cbody1;
         rigidbody.drag = 0.05;
         }
}
}

}

function OnCollisionEnter (collision : Collision){
if(collision.gameObject.name.Contains ("AgrianM")){
Cbody2 = collision.rigidbody;
}
}

function Open () {

if(Opening || Closing)
return;

GateStoppedSFX = false;
GateShockedSFX = false;
RampShockedSFX = false;

GateMoveSFXEnd = false;
RampMoveSFXEnd = false;
RampTurnSFXEnd = false;

GateMoveSFX.Stop();
RampMoveSFX.Stop();
RampTurnSFX.Stop();

GateMoveSFX.volume = 1;
RampMoveSFX.volume = 1;
RampTurnSFX.volume = 1;

if(gateDirJoint.targetPosition.z < 0.2){
Opening = true;
Closing = false;
}

}

function Close () {

if(Opening || Closing)
return;

GateStoppedSFX = false;
GateShockedSFX = false;
RampShockedSFX = false;

GateMoveSFXEnd = false;
RampMoveSFXEnd = false;
RampTurnSFXEnd = false;

GateMoveSFX.Stop();
RampMoveSFX.Stop();
RampTurnSFX.Stop();

GateMoveSFX.volume = 1;
RampMoveSFX.volume = 1;
RampTurnSFX.volume = 1;

if(gateDirJoint.targetPosition.z > 0.2){
Closing = true;
Opening = false;
RampClosing = true;
RampOpening = false;
}

}

function LockFunction () {
yield WaitForSeconds (0.2);
gateAngJoint.spring.targetPosition = -1;
gateDirJoint.targetPosition.z = 0.01;
yield WaitForSeconds (0.2);
gateAngJoint.spring.targetPosition = 0;
gateDirJoint.targetPosition.z = 0;
}

function RampLockFunction () {
yield WaitForSeconds (0.1);
rampAngJoint.spring.targetPosition = 0.01;
rampDirJoint.targetPosition.z = 0.01;
yield WaitForSeconds (0.1);
rampAngJoint.spring.targetPosition = 0;
rampDirJoint.targetPosition.z = 0;
}