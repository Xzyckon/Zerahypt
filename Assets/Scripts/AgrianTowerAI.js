
var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var target : Transform;
var Waypoint : Transform;
var ResetPoint : Transform;
var AligningPoint : Transform;
var Spinner : Transform;

var Sensor : SphereCollider;
var SensorIncrease : boolean;

var Magnet1 : Transform;
var Magnet2 : Transform;

var EmptyContainer : Transform;
var FullContainer : Transform;

var isCarrier : boolean;

var isFleetVessel1 : boolean;
var isFleetVessel2 : boolean;

var ContainerBPoint1 : Transform;
var ContainerBPoint2 : Transform;
var ContainerBPoint1RB : Rigidbody;
var ContainerBPoint2RB : Rigidbody;

var Vessel: GameObject;
var Clamp: GameObject;
var Presence : GameObject;

var ContainerScript: AgrianContainerController;

var FrontCol : GameObject;

var Gyro : GameObject;
var Stabilizer1 : WingScript;
var Stabilizer2 : WingScript;

var GyroOn : boolean;

var APDist = 0;

var Gonnatow : boolean;
var HasEmpty : boolean;
var Gonnaput : boolean;
var HasFull : boolean;
var UpperObstacle : boolean;
var Obstacle : boolean;
var Brake : boolean;
var TargetTooClose : boolean;
var TotalObstacle : boolean;

var SlowingDown : boolean;

var Switch0 : boolean;
var Switch180 : boolean;

var Switch : boolean;

var Rotate = 0;

var targetLayers : LayerMask;

var TouchCount = 0;

var Reverse = 0;

var Still = 0;

var CarryingOn = 0;

var virtualPoint : Transform;

var UAndD1 : float;
var UAndD2 : float;

private var NewRotation : Quaternion;

InvokeRepeating("Reader", 1, 0.5);


function Start () {

if(isCarrier){
virtualPoint.parent = null;
target = PlayerInformation.instance.PiriTarget;
}else{
target = ResetPoint;
}
}

function Update () {

if(target != null){

if(target.name.Contains ("nerFull"))
target.name = "ContainerOFull";

if(target.name.Contains ("TowerDispatchArea"))
target.name = "TowerDispatchOArea";

if(target.name.Contains ("TowerDispatchOArea")){
if(Vector3.Distance(thisTransform.position, target.position) > 100)
target = ResetPoint;
}
}

if(target)
if(Gonnatow){

if(Vector3.Distance(thisTransform.position, target.position) < 80){
if(TouchCount == 0)
TargetTooClose = true;
}else{
TargetTooClose = false;
}
}

if(target == null && Gonnatow){
StopAllCoroutines();
Gonnatow = false;
gameObject.GetComponent(SphereCollider).radius = 2000;
}
	
var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;
var hit : RaycastHit;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 30, newRot * 1000f, Color.green);

if (Physics.Raycast (thisTransform.position + thisTransform.forward * 30, newRot, hit, 1000) && vRigidbody.velocity.magnitude > 50) {
     SlowingDown = true;
 } else {
     if(!TotalObstacle)
     SlowingDown = false;
 }
 
Debug.DrawRay (thisTransform.position + thisTransform.forward * 20, thisTransform.forward * 80f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 20, thisTransform.forward, 80)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * 10 + thisTransform.up * 60, thisTransform.forward * 40f, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 10 + thisTransform.up * 60, thisTransform.forward, 40)) {
		UpperObstacle = true;
	} else {
	    UpperObstacle = false;
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 512){
target = PlayerInformation.instance.PiriTarget;
NotiScript.PiriNotis = false;
}

if(WorldInformation.pSpeech){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < WorldInformation.pSpeechRange){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 512){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
WorldInformation.pSpeech = null;
}
}
}

}

function FixedUpdate () {

var localV = thisTransform.InverseTransformDirection(rigidbody.velocity);

if(!TotalObstacle)
Spinner.Rotate(0,0,800*Time.deltaTime);

if(!Gonnaput && !Gonnatow){

if(Sensor.radius > 1999)
SensorIncrease = false;
if(Sensor.radius < 2)
SensorIncrease = true;

if(!SensorIncrease)
Sensor.radius -= 1;
if(SensorIncrease)
Sensor.radius += 1;

}

if(!isCarrier){

if(target){
NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 20);
}

if(Reverse < 1 && !Gonnatow && !Gonnaput){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 20 + Spinner.transform.up * 120, thisTransform.forward * 1000f, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 20 + Spinner.transform.up * 120, thisTransform.forward, 1000)) {
		vRigidbody.AddTorque(Spinner.transform.right * 200000);
		TotalObstacle = true;
		SlowingDown = true;
	} else {
	    TotalObstacle = false;
	    SlowingDown = false;
}
}

if(SlowingDown){
  if(localV.z > 50)
  vRigidbody.AddForce(-thisVTransform.up * -100000);
}

if(Obstacle && !Gonnaput){
if(localV.z > 0)
if(APDist < 128){
if(Clamp.rigidbody.angularVelocity.magnitude > 0.04)
vRigidbody.AddForce(-thisVTransform.up * -100000);
}else{
vRigidbody.AddForce(-thisVTransform.up * -100000);
}
}

if(UpperObstacle){
if(localV.z > 0)
  vRigidbody.AddForce(-thisVTransform.up * -100000);

  vRigidbody.AddForce(thisVTransform.forward * -30000);
  vRigidbody.AddTorque(thisTransform.right * 400000);
}

if(Brake && !Gonnaput){
if(localV.z > 0)
  vRigidbody.AddForce(-thisVTransform.up * -30000);
  
Stabilizer1.AxisDrag.x = -1360;
Stabilizer1.AxisDrag.y = -1360;
Stabilizer1.AxisDrag.z = -1360;
}

if(Gonnatow && !TargetTooClose){
  vRigidbody.AddForce(-thisVTransform.up * 20000);
}

if(Gonnaput && !TargetTooClose){
  vRigidbody.AddForce(-thisVTransform.up * 20000);
}

if(Reverse > 0)
  vRigidbody.AddForce(-thisVTransform.up * -50000);
  
if(!Gonnatow && !Obstacle && !SlowingDown && !Brake && !TotalObstacle) {
  if(Reverse < 1)
  vRigidbody.AddForce(-thisVTransform.up * 20000);
}

}else{

var CBP1localV = ContainerBPoint1.InverseTransformDirection(ContainerBPoint1RB.velocity);
var CBP2localV = ContainerBPoint2.InverseTransformDirection(ContainerBPoint2RB.velocity);

if(target)
var relativePoint = thisVTransform.InverseTransformPoint(target.position);

LAndR = relativePoint.x;
FAndB = relativePoint.y;

Vel1 = -CBP1localV.y * 4;
Vel2 = -CBP2localV.y * 4;

velMag1 = Mathf.Clamp(Vel1 * 2,4,32);
velMag2 = Mathf.Clamp(Vel2 * 2,4,32);

      Debug.DrawRay (ContainerBPoint1.position + -ContainerBPoint1.up * 50, Vector3.down * 1024, Color.magenta);
if (Physics.Raycast (ContainerBPoint1.position + -ContainerBPoint1.up * 50, Vector3.down, 1024)) {

      Debug.DrawRay (ContainerBPoint1.position + -ContainerBPoint1.up * 50, Vector3.down * velMag1, Color.red);
if (Physics.Raycast (ContainerBPoint1.position + -ContainerBPoint1.up * 50, Vector3.down, velMag1)) {
		vRigidbody.AddForceAtPosition (-Vector3.down * 40000, ContainerBPoint1.position);
}else{
vRigidbody.AddForceAtPosition (Vector3.down * 5000, ContainerBPoint1.position);
}

      Debug.DrawRay (ContainerBPoint2.position + -ContainerBPoint2.up * 50, Vector3.down * velMag2, Color.red);
if (Physics.Raycast (ContainerBPoint2.position + -ContainerBPoint2.up * 50, Vector3.down, velMag2)) {
		vRigidbody.AddForceAtPosition (-Vector3.down * 40000, ContainerBPoint2.position);
}else{
vRigidbody.AddForceAtPosition (Vector3.down * 5000, ContainerBPoint2.position);
}

}else{















var relativePoint1 = virtualPoint.InverseTransformPoint(ContainerBPoint1.position);
var relativePoint2 = virtualPoint.InverseTransformPoint(ContainerBPoint2.position);

UAndD1 = relativePoint1.y;
UAndD2 = relativePoint2.y;

var HoverForce1 = Mathf.Clamp(UAndD1 * 400,-40000,5000);
var HoverForce2 = Mathf.Clamp(UAndD2 * 400,-40000,5000);

vRigidbody.AddForceAtPosition (Vector3.down * HoverForce1, ContainerBPoint1.position);
vRigidbody.AddForceAtPosition (Vector3.down * HoverForce2, ContainerBPoint2.position);























}



if(Rotate > 1){
if(LAndR < -1)
vRigidbody.AddTorque(thisVTransform.forward * 400000);

if(LAndR > 1)
vRigidbody.AddTorque(thisVTransform.forward * -400000);

if(-LAndR < 1 && LAndR < 1)
Rotate -= 1;

}


}

if(GyroOn){
if(Clamp.rigidbody.angularVelocity.magnitude < 0.5){
    Gyro.rigidbody.AddForceAtPosition(Vector3.up*30000, Gyro.transform.up * 50);
    Gyro.rigidbody.AddForceAtPosition(-Vector3.up*30000, -Gyro.transform.up * 50);
    }
}

if(Gonnatow){
if(target != ResetPoint){

APDist = Vector3.Distance(thisTransform.position, AligningPoint.transform.position);

if(Clamp.rigidbody.angularVelocity.magnitude > 0.05)
rigidbody.AddForce((AligningPoint.transform.position - thisTransform.position).normalized * 60000);
else
rigidbody.AddForce((AligningPoint.transform.position - thisTransform.position).normalized * 15000);
}
}

if(Gonnaput){
if(target != ResetPoint){
if(Clamp.rigidbody.angularVelocity.magnitude > 0.05){

if(Vector3.Distance(thisTransform.position, AligningPoint.transform.position) > 60)
rigidbody.AddForce((AligningPoint.transform.position - thisTransform.position).normalized * 30000);

}else{
rigidbody.AddForce((AligningPoint.transform.position - thisTransform.position).normalized * 15000);
}
}
}

if(Switch180){
if(Vessel.hingeJoint.spring.targetPosition < 180)
Vessel.hingeJoint.spring.targetPosition += 0.4;

if(Vessel.hingeJoint.spring.targetPosition > 180){
Vessel.hingeJoint.spring.targetPosition = 180;
TouchCount = 0;
Brake = false;
Switch = false;
}
}

if(Switch0){
if(Vessel.hingeJoint.spring.targetPosition > 0)
Vessel.hingeJoint.spring.targetPosition -= 0.4;

if(Vessel.hingeJoint.spring.targetPosition < 0){
Vessel.hingeJoint.spring.targetPosition = 0;
TouchCount = 0;
Brake = false;
Switch = false;
}
}

}

function OnTriggerStay (other : Collider) {

if(isCarrier)
return;

if(other.collider.name.Contains ("nerFull") && !HasFull){
  if(Vector3.Distance(thisTransform.position, other.transform.position) > 72){
  Gonnatow = true;
  GyroOn = false;
  target = other.gameObject.transform;
  Clamp.rigidbody.angularDrag = 10;
  gameObject.GetComponent(SphereCollider).radius = 75;
  FrontCol.gameObject.SetActive (false);
  
  AligningPoint = other.gameObject.GetComponent("AgrianContainerPoint").AlignPoint;
}
}
if(other.collider.name.Contains ("nerEmpty") && !HasEmpty){
  if(Vector3.Distance(thisTransform.position, other.transform.position) < 72){
  other.gameObject.name = "ContainerOEmpty";
  EmptyContainer = other.gameObject.transform;
  HasEmpty = true;
}
}

if(other.collider.name.Contains ("nerOFull") && !HasFull){
  if(Vector3.Distance(thisTransform.position, other.transform.position) < 80 && 
     Vector3.Distance(thisTransform.position, AligningPoint.transform.position) < 100){
  FullContainer = other.gameObject.transform;
  HasFull = true;
  Brake = true;
  gameObject.GetComponent(SphereCollider).radius = 1;
}
}

if(other.collider.name.Contains ("TowerDispatchArea")){
if(HasEmpty){
Gonnaput = true;
GyroOn = false;
TouchCount = 0;
target = other.gameObject.transform;
Clamp.rigidbody.angularDrag = 40;
gameObject.GetComponent(SphereCollider).radius = 75;
FrontCol.gameObject.SetActive (false);
AligningPoint = other.gameObject.GetComponent("AgrianContainerPoint").AlignPoint;
}
}

if(other.collider.name.Contains ("nerEmpty") && !Gonnaput && !Gonnatow){
if(Vector3.Distance(thisTransform.position, other.transform.position) > 72){
SensorIncrease = true;
Sensor.radius = 1;
}
}

}

function Reader () {
var hit : RaycastHit;

if(isCarrier){
virtualPoint.position.x = thisVTransform.position.x;
virtualPoint.position.z = thisVTransform.position.z;
}


vRigidbody.centerOfMass = Vector3(0, 0, 0);
Clamp.rigidbody.centerOfMass = Vector3(0, 0, 0);
rigidbody.freezeRotation = true;

if(Gonnatow){

if(Vector3.Distance(thisTransform.position, target.position) < 300){
Stabilizer1.AxisDrag.x = -1360;
Stabilizer1.AxisDrag.y = -1360;
Stabilizer1.AxisDrag.z = -1360;
if(Clamp.rigidbody.angularVelocity.magnitude < 0.1){
Stabilizer2.AxisDrag.x = 0;
Stabilizer2.AxisDrag.y = -1360;
Stabilizer2.AxisDrag.z = 0;
}else{
Stabilizer2.AxisDrag.x = -1360;
Stabilizer2.AxisDrag.y = 0;
Stabilizer2.AxisDrag.z = -1360;
}
}
if(Vector3.Distance(thisTransform.position, target.position) > 300){
Stabilizer1.AxisDrag.x = -1360;
Stabilizer1.AxisDrag.y = 0;
Stabilizer1.AxisDrag.z = -1360;
Stabilizer2.AxisDrag.x = -1360;
Stabilizer2.AxisDrag.y = 0;
Stabilizer2.AxisDrag.z = -1360;
}
}

if(Gonnaput){
if(Vector3.Distance(thisTransform.position, target.position) < 300){
Stabilizer1.AxisDrag.x = -1360;
Stabilizer1.AxisDrag.y = -1360;
Stabilizer1.AxisDrag.z = -1360;
if(Switch){
Stabilizer2.AxisDrag.x = 0;
Stabilizer2.AxisDrag.y = 0;
Stabilizer2.AxisDrag.z = 0;
}else{
Stabilizer2.AxisDrag.x = -680;
Stabilizer2.AxisDrag.y = -680;
Stabilizer2.AxisDrag.z = -680;
}
}
if(Vector3.Distance(thisTransform.position, target.position) > 300){
Stabilizer1.AxisDrag.x = -1360;
Stabilizer1.AxisDrag.y = 0;
Stabilizer1.AxisDrag.z = -1360;
Stabilizer2.AxisDrag.x = -1360;
Stabilizer2.AxisDrag.y = 0;
Stabilizer2.AxisDrag.z = -1360;
}
}

if(Reverse > 0){
Reverse -= 1;
Stabilizer1.AxisDrag.x = 0;
Stabilizer1.AxisDrag.y = 0;
Stabilizer1.AxisDrag.z = 0;
}

if (!Gonnaput && !Gonnatow){
if (vRigidbody.velocity.magnitude < 1)
     Still += 1;
     else
     Still = 0;
     
Stabilizer1.AxisDrag.x = 0;
Stabilizer1.AxisDrag.y = 0;
Stabilizer1.AxisDrag.z = 0;
Stabilizer2.AxisDrag.x = -1360;
Stabilizer2.AxisDrag.y = 0;
Stabilizer2.AxisDrag.z = -1360;
}

if (Gonnaput || Gonnatow)
if(target == ResetPoint && CarryingOn < 20)
    CarryingOn += 1;

if(CarryingOn == 20){
CarryingOn = 0;
Gonnaput = false;
Gonnatow = false;
}

if(Still == 20){
    Still = 0;
    Brake = false;
Stabilizer1.AxisDrag.x = 0;
Stabilizer1.AxisDrag.y = 0;
Stabilizer1.AxisDrag.z = 0;
    }

if(target)
if(target.name.Contains ("Front"))
rigidbody.freezeRotation = false;

if(TouchCount == 16){

if(Switch180 && !Switch){
Switch = true;
Switch180 = false;
Switch0 = true;
}
if(Switch0 && !Switch){
Switch = true;
Switch0 = false;
Switch180 = true;
}

Obstacle = false;
Gonnatow = false;
TargetTooClose = false;
rigidbody.freezeRotation = false;
GyroOn = true;
TouchCount = 0;
Clamp.rigidbody.angularDrag = 10;
gameObject.GetComponent(SphereCollider).radius = 2000;
}

if(Gonnaput)
if(Vector3.Distance(thisTransform.position, EmptyContainer.position) > 72){

EmptyContainer = null;
HasEmpty = false;
Gonnaput = false;
TargetTooClose = false;
rigidbody.freezeRotation = false;
target = ResetPoint;
Reverse = 4;
GyroOn = true;
TouchCount = 0;
Clamp.rigidbody.angularDrag = 10;
gameObject.GetComponent(SphereCollider).radius = 2000;
FrontCol.gameObject.SetActive (true);
}

Debug.DrawRay (thisTransform.position, thisTransform.forward * 30f, Color.red);
if(Gonnatow){
if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, 30, targetLayers)){
TargetTooClose = false;
TouchCount += 1;
}else{
TouchCount = 0;
}
}
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;

function ProcessSpeech (speech : String){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(isCarrier){

if(convNum == 0){
//===============================================================================
if(speech.Contains ("carrier") || speech.Contains ("tower")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("What is your request?"); return;}
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("pen")){ convNum = 0; yield WaitForSeconds (2);
ContainerScript.Open(); return;}

if(speech.Contains ("lose")){ convNum = 0; yield WaitForSeconds (2);
ContainerScript.Close(); return;}

if(speech.Contains ("otate") || speech.Contains ("urn")){ convNum = 0; yield WaitForSeconds (2);
ReturnSpeech("I will turn facing away from you."); Rotate = 300; return;}

yield WaitForSeconds (3);

ReturnSpeech("I can not understand your request. \n Do you want me to rotate, close or open?"); convNum = 1; return;
}
//===============================================================================

}

}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC2";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}