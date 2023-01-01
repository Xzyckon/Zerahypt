#pragma strict
public var CameraDistance : float;
public var connectedVehicle : MainVehicleController;
private var car : Transform;
private var VehicleRB : Rigidbody;
var vTurretRB : Rigidbody;
var pRigidbody : Rigidbody;
private var player : GameObject;
private var playerH : GameObject;
private var playerW : GameObject;
private var playerP : GameObject;
var isNPC : boolean;
var isInteriorDoor : boolean;
var isCameraSetter : boolean;
var rotBoost : boolean;
var PiriCol2 : GameObject;
var HeadCol : GameObject;
var doorTriggerLeft : Transform;
@HideInInspector
public var nearVehicle : boolean;
@HideInInspector
var inVehicle : boolean;
private var aScale : Vector3;
private var piri : GameObject;
private var helmet : GameObject;
var StandArea : Transform;
var EscapeBubble : Transform;
var DenyEntrance : boolean;
var cameraFocus : Transform;

var EngineFX1 : GameObject;
var EngineFX2 : GameObject;
var EngineFX3 : GameObject;

var BodyJoint : HingeJoint;
 
function Start(){
    car = this.transform;
    VehicleRB = transform.parent.gameObject.rigidbody;
    player = PlayerInformation.instance.Pirizuka.gameObject;
    playerH = PlayerInformation.instance.PiriHead.gameObject;
    playerW = PlayerInformation.instance.PiriWheel;
    playerP = PlayerInformation.instance.PiriPivot;
    cameraFocus = transform.parent.FindChild("CameraFocus");
    EscapeBubble = transform.parent.FindChild("ExitSphere");
    
    PiriCol2 = PlayerInformation.instance.PiriCol2;
}

function FixedUpdate() {
if(DenyEntrance){
        nearVehicle = false;
		if(WorldInformation.vehicleDoorController == this && !inVehicle)
			WorldInformation.vehicleDoorController = null;
}

if(isNPC){
if(inVehicle){
if(Input.GetKey("a")){
if(!rotBoost)
pRigidbody.AddTorque(transform.up * -pRigidbody.mass * 10);
else
pRigidbody.AddTorque(transform.up * -pRigidbody.mass * 20);
}
if(Input.GetKey("d")){
if(!rotBoost)
pRigidbody.AddTorque(transform.up * pRigidbody.mass * 10);
else
pRigidbody.AddTorque(transform.up * pRigidbody.mass * 20);
}
}
}
}

function ArtificialUpdate() {
if(connectedVehicle.OpenVessel == false){
   player.transform.position = EscapeBubble.transform.position;
   
   }else{
	
   if(Input.GetMouseButtonDown(1))
   BodyJoint.spring.spring = 0;
	
   if(Input.GetMouseButtonUp(1)){
   player.transform.position = StandArea.transform.position;
   player.transform.rotation = StandArea.transform.rotation;
   BodyJoint.spring.spring = 10;
   }
   }
}

function Enter() {

transform.parent.gameObject.name = "DV";

if(!isNPC){

IndicatorScript.VehicleIsDamaged = false;
IndicatorScript.GunIsDamaged = false;

connectedVehicle.RefreshFX();

if(connectedVehicle.OpenVessel == false){

if(player == null)
    player = GameObject.Find("Pirizuka").gameObject;
    
    connectedVehicle.Inside = true;
	player.gameObject.SetActive(false);
	EscapeBubble.gameObject.SetActive(true);
	player.transform.parent = EscapeBubble.transform;
	
	PlayerInformation.instance.LBosom.localEulerAngles = Vector3(280,180,0);
	PlayerInformation.instance.RBosom.localEulerAngles = Vector3(280,180,0);
	
	PlayerInformation.instance.LBosom.localPosition = Vector3(-0.09,0.44,0.02);
	PlayerInformation.instance.RBosom.localPosition = Vector3(0.09,0.44,0.02);
	
	PlayerInformation.instance.PiriHead.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriHead.localPosition = Vector3(0,0.075,0);
	
	PlayerInformation.instance.PiriREye.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriLEye.localEulerAngles = Vector3(0,0,0);
	
	playerW.transform.localEulerAngles = Vector3(0,0,0);
	playerW.transform.localPosition = Vector3(0,0,0);
	playerP.transform.localEulerAngles = Vector3(0,0,0);
	playerP.transform.localPosition = Vector3(0,-1.4,0);
	player.transform.localEulerAngles = Vector3(0,0,0);
	player.transform.localPosition = Vector3(0,-1.4,0);
	
	PlayerInformation.instance.TCCol.radius = CameraDistance * 0.5;
    PlayerInformation.instance.TCCol.center = Vector3(0,0,0);
    PlayerInformation.instance.TCCol.height = CameraDistance * 0.5;
    
    PlayerInformation.instance.PiriTurretAim.localPosition.y = 500;
    
    WorldInformation.UsingVessel = true;
	WorldInformation.UsingClosedVessel = true;
	WorldInformation.UsingBigVessel = false;
	WorldInformation.FPMode = false;
	CameraScript.changeColOnce = true;

	WorldInformation.playerCar = transform.parent.name;
	
	PresenceFollow.insideNPC = false;
	VehicleManager.EnterVehicle(connectedVehicle, this);
	NotiScript.Notipoint = WorldInformation.vehicleController.transform;

	inVehicle = true;
	nearVehicle = false;
	CameraScript.instance.CheckCars(cameraFocus, CameraDistance);
	
	if(connectedVehicle.ThisVehiclesID == "Vessel420")
	WorldInformation.UsingSnyf = true;
	
	if(connectedVehicle.ThisVehiclesID == "Vessel1338")
	if(PiripodAI.IsActive)
    CallAssistance.DismissCepto = true;

}else{

   if(connectedVehicle.ThisVehiclesID == "Vessel75")
   PlayerMotionAnimator.UsingMotus = false;
   else
   PlayerMotionAnimator.UsingMotus = true;

   connectedVehicle.Inside = true;
   player.GetComponent(CapsuleCollider).isTrigger = true;
   playerW.GetComponent(SphereCollider).isTrigger = true;
   PlayerMotionAnimator.instance.CanFPAnimationaise = true;
   if(HeadCol)
   HeadCol.gameObject.SetActive(true);
   
   WorldInformation.UsingVessel = true;
   WorldInformation.playerCar = transform.parent.name;
   VehicleManager.EnterVehicle(connectedVehicle, this);
   
   PlayerInformation.instance.PiriTurretAim.localPosition.y = 0;
   
   player.transform.position = StandArea.transform.position;
   player.transform.rotation = StandArea.transform.rotation;
   
   playerW.transform.localEulerAngles = Vector3(0,0,0);
   playerW.transform.localPosition = Vector3(0,0,0);
   playerP.transform.localEulerAngles = Vector3(0,0,0);
   playerP.transform.localPosition = Vector3(0,-1.4,0);
   
   BodyJoint = player.AddComponent ("HingeJoint");
   if(vTurretRB)
   BodyJoint.connectedBody = vTurretRB;
   else
   BodyJoint.connectedBody = VehicleRB;
   BodyJoint.axis = Vector3(0,1,0);
   BodyJoint.useSpring = true;
   BodyJoint.spring.spring = 10;
   
   playerW.SetActive(false);
   
   inVehicle = true;
   nearVehicle = false;
   
   if(connectedVehicle.BigVessel){
	CameraScript.instance.CheckCars(cameraFocus, CameraDistance);
	WorldInformation.UsingBigVessel = true;
	}
}
}else{

if(player == null)
    player = GameObject.Find("Pirizuka").gameObject;
    
	player.gameObject.SetActive(false);
	EscapeBubble.gameObject.SetActive(true);
	player.transform.parent = EscapeBubble.transform;
	
	PlayerInformation.instance.LBosom.localEulerAngles = Vector3(280,180,0);
	PlayerInformation.instance.RBosom.localEulerAngles = Vector3(280,180,0);
	
	PlayerInformation.instance.LBosom.localPosition = Vector3(-0.09,0.44,0.02);
	PlayerInformation.instance.RBosom.localPosition = Vector3(0.09,0.44,0.02);
	
	PlayerInformation.instance.PiriHead.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriHead.localPosition = Vector3(0,0.075,0);
	
	PlayerInformation.instance.PiriREye.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriLEye.localEulerAngles = Vector3(0,0,0);
	
	playerW.transform.localEulerAngles = Vector3(0,0,0);
	playerW.transform.localPosition = Vector3(0,0,0);
	playerP.transform.localEulerAngles = Vector3(0,0,0);
	playerP.transform.localPosition = Vector3(0,-1.4,0);
	player.transform.localEulerAngles = Vector3(0,0,0);
	player.transform.localPosition = Vector3(0,-1.4,0);
	
	PlayerInformation.instance.TCCol.radius = CameraDistance * 0.5;
    PlayerInformation.instance.TCCol.center = Vector3(0,0,0);
    PlayerInformation.instance.TCCol.height = CameraDistance * 0.5;
	
	WorldInformation.UsingVessel = true;
	WorldInformation.UsingClosedVessel = true;
	WorldInformation.UsingBigVessel = false;

	WorldInformation.playerCar = transform.parent.name;
	
	PresenceFollow.insideNPC = true;
	NotiScript.Notipoint = transform.parent.transform;
	WorldInformation.npcVehicleTF = transform;

	inVehicle = true;
	nearVehicle = false;
	CameraScript.instance.CheckCars(cameraFocus, CameraDistance);
	
	WorldInformation.Hitching = true;
	
	FurtherActionScript.instance.Hitching = true;
    FurtherActionScript.instance.ShowText();

}

if(EngineFX1)
EngineFX1.SetActive(true);

if(EngineFX2)
EngineFX2.SetActive(true);

if(EngineFX3)
EngineFX3.SetActive(true);

}

function Exit() {

if(!isNPC){
transform.parent.gameObject.name = "UV";

IndicatorScript.VehicleIsDamaged = false;
IndicatorScript.GunIsDamaged = false;

if(connectedVehicle.OpenVessel == false){
     
    connectedVehicle.Inside = false;
    connectedVehicle.Starting = false;
    PlayerMotionAnimator.Transit = true;
    PlayerMotionAnimator.CanCollide = false;
	player.gameObject.SetActive(true);
	EscapeBubble.gameObject.SetActive(false);
	
	NotiScript.Notipoint = PlayerInformation.instance.PiriNose;
	
	PlayerInformation.instance.LBosom.localEulerAngles = Vector3(280,180,0);
	PlayerInformation.instance.RBosom.localEulerAngles = Vector3(280,180,0);
	
	PlayerInformation.instance.LBosom.localPosition = Vector3(-0.09,0.44,0.02);
	PlayerInformation.instance.RBosom.localPosition = Vector3(0.09,0.44,0.02);
	
	PlayerInformation.instance.PiriHead.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriHead.localPosition = Vector3(0,0.075,0);
	
	PlayerInformation.instance.PiriREye.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriLEye.localEulerAngles = Vector3(0,0,0);
	
	playerW.transform.localEulerAngles = Vector3(0,0,0);
	playerW.transform.localPosition = Vector3(0,0,0);
	playerP.transform.localEulerAngles = Vector3(0,0,0);
	playerP.transform.localPosition = Vector3(0,-1.4,0);
	player.transform.localPosition = Vector3(0,0.8,0);
	player.transform.eulerAngles = Vector3(0,0,0);
	player.transform.parent = null;
	
	PlayerInformation.instance.TCCol.radius = 1;
    PlayerInformation.instance.TCCol.center = Vector3(0,-1,0);
    PlayerInformation.instance.TCCol.height = 3;
	
	PlayerMotionAnimator.instance.CanMove = true;
	PlayerMotionAnimator.Landing = false;
	
	WorldInformation.UsingClosedVessel = false;
	WorldInformation.UsingBigVessel = false;
	if(isInteriorDoor)
	if(!WorldInformation.IsNopass)
	WorldInformation.FPMode = true;
	
	if(isCameraSetter)
	if(!WorldInformation.IsNopass)
	CameraScript.cameraSetOnce = true;

	WorldInformation.playerCar = "null";
	VehicleManager.ExitVehicle();

    inVehicle = false;
	CameraScript.instance.CheckCars(null, 0);
	
	PlayerMotionAnimator.lastVelocity = 0;
	
	player.rigidbody.velocity = VehicleRB.velocity;
	playerH.rigidbody.velocity = VehicleRB.velocity;
    playerW.rigidbody.velocity = VehicleRB.velocity;
    
    if(connectedVehicle.ThisVehiclesID == "Vessel420")
	WorldInformation.UsingSnyf = false;
	
	yield WaitForSeconds (0.1);
	WorldInformation.UsingVessel = false;
	
}else{

   connectedVehicle.Inside = false;
   connectedVehicle.Starting = false;
   player.GetComponent(CapsuleCollider).isTrigger = false;
   playerW.GetComponent(SphereCollider).isTrigger = false;
   PlayerMotionAnimator.Transit = true;
   PlayerMotionAnimator.CanCollide = false;
   PlayerMotionAnimator.instance.CanFPAnimationaise = false;
   if(HeadCol)
   HeadCol.gameObject.SetActive(false);
   WorldInformation.playerCar = "null";
   
   VehicleManager.ExitVehicle();
   
   inVehicle = false;
   CameraScript.instance.CheckCars(null, 0);
   
   var Y2 : float = player.transform.eulerAngles.y;
   
   player.transform.rotation = Quaternion.Euler(0, Y2, 0);
   
   playerW.transform.localEulerAngles = Vector3(0,0,0);
   playerW.transform.localPosition = Vector3(0,0,0);
   playerP.transform.localEulerAngles = Vector3(0,0,0);
   playerP.transform.localPosition = Vector3(0,-1.4,0);
   
   WorldInformation.UsingBigVessel = false;
   
   PlayerMotionAnimator.lastVelocity = 0;
   
   player.rigidbody.velocity = VehicleRB.velocity;
   playerH.rigidbody.velocity = VehicleRB.velocity;
   playerW.rigidbody.velocity = VehicleRB.velocity;
   
   playerW.SetActive(true);
   
   Destroy(BodyJoint);
   
   yield WaitForSeconds (0.1);
   WorldInformation.UsingVessel = false;
}
}else{
    PlayerMotionAnimator.Transit = true;
	player.gameObject.SetActive(true);
	EscapeBubble.gameObject.SetActive(false);
	
	NotiScript.Notipoint = PlayerInformation.instance.PiriNose;
	
	PlayerInformation.instance.LBosom.localEulerAngles = Vector3(280,180,0);
	PlayerInformation.instance.RBosom.localEulerAngles = Vector3(280,180,0);
	
	PlayerInformation.instance.LBosom.localPosition = Vector3(-0.09,0.44,0.02);
	PlayerInformation.instance.RBosom.localPosition = Vector3(0.09,0.44,0.02);
	
	PlayerInformation.instance.PiriHead.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriHead.localPosition = Vector3(0,0.075,0);
	
	PlayerInformation.instance.PiriREye.localEulerAngles = Vector3(0,0,0);
	PlayerInformation.instance.PiriLEye.localEulerAngles = Vector3(0,0,0);
	
	playerW.transform.localEulerAngles = Vector3(0,0,0);
	playerW.transform.localPosition = Vector3(0,0,0);
	playerP.transform.localEulerAngles = Vector3(0,0,0);
	playerP.transform.localPosition = Vector3(0,-1.4,0);
	player.transform.localPosition = Vector3(0,0.8,0);
	player.transform.eulerAngles = Vector3(0,0,0);
	player.transform.parent = null;
	
	PlayerInformation.instance.TCCol.radius = 1;
    PlayerInformation.instance.TCCol.center = Vector3(0,-1,0);
    PlayerInformation.instance.TCCol.height = 3;
	
	PlayerMotionAnimator.instance.CanMove = true;
	PlayerMotionAnimator.Landing = false;
	
	WorldInformation.UsingClosedVessel = false;
	WorldInformation.UsingBigVessel = false;

	WorldInformation.playerCar = "null";

    inVehicle = false;
	CameraScript.instance.CheckCars(null, 0);
	
	PlayerMotionAnimator.lastVelocity = 0;
	
	player.rigidbody.velocity = VehicleRB.velocity;
	playerH.rigidbody.velocity = VehicleRB.velocity;
    playerW.rigidbody.velocity = VehicleRB.velocity;
    
    WorldInformation.Hitching = false;
    
    yield WaitForSeconds (0.1);
	WorldInformation.UsingVessel = false;
}


}

function OnTriggerEnter(other : Collider){

    if(other.name.Contains("TC1p") && !DenyEntrance)
	if(!other.name.Contains("mTC1")){
		nearVehicle = true;
		WorldInformation.NearEntrance = true;
		if(WorldInformation.vehicleDoorController == null && !inVehicle)
			WorldInformation.vehicleDoorController = this;
    }
}

function OnTriggerStay(other : Collider){
if(!isNPC){

if(CameraDistance < 16){
if(other.name.Contains("GaragePoint")){
WorldInformation.NearGarage = true;
}
}

if(other.name.Contains("GaragePointF1")){
WorldInformation.NearGarageF1 = true;
}
if(other.name.Contains("GaragePointF2")){
WorldInformation.NearGarageF2 = true;
}

}

}
   
function OnTriggerExit(other : Collider){

if(other.name.Contains("GaragePoint")){
PlayerPrefs.DeleteKey("GaragedID");
PlayerPrefs.DeleteKey("GaragedDist");
WorldInformation.NearGarage = false;
WorldInformation.InGarage = false;
}

if(other.name.Contains("GaragePointF1")){
PlayerPrefs.DeleteKey("GaragedIDF1");
PlayerPrefs.DeleteKey("GaragedDistF1");
WorldInformation.NearGarageF1 = false;
WorldInformation.InGarageF1 = false;
}

if(other.name.Contains("GaragePointF2")){
PlayerPrefs.DeleteKey("GaragedIDF2");
PlayerPrefs.DeleteKey("GaragedDistF2");
WorldInformation.NearGarageF2 = false;
WorldInformation.InGarageF2 = false;
}

    if(other.name.Contains("TC1p") && !DenyEntrance)
	if(!other.name.Contains("mTC1")){
        nearVehicle = false;
        WorldInformation.NearEntrance = false;
		if(WorldInformation.vehicleDoorController == this && !inVehicle)
			WorldInformation.vehicleDoorController = null;
    }
}