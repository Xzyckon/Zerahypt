var target : Transform;
var ResetView : Transform;
var Waypoint : Transform;
var MissionWaypoint : Transform;
var Gyro : GyroStabilizer;
var Trig : SphereCollider;
var HealthScript : VehicleDamage;

var TargetCode : int;

var Remover : RemoveOverTime;

var vEntrance : CarDoorController;

var VPoint : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Runsound : EngineRunsound;

var Whizzer1 : EngineWhizzer;
var Whizzer2 : EngineWhizzer;
var Blastoff : AudioSource;

var Particles : ParticleSystem[];

var TaxiDoor : Transform;

var DoorOpen : boolean;

var IsCarrier : boolean;

var ignoreInteraction : boolean;

var Hinge1 : HingeJoint;
var Hinge2 : HingeJoint;
var Hinge3 : HingeJoint;
var Hinge4 : HingeJoint;
var Hinge5 : HingeJoint;
var Hinge6 : HingeJoint;
var Hinge7 : HingeJoint;
var Hinge8 : HingeJoint;
var Hinge9 : HingeJoint;
var Hinge10 : HingeJoint;
var Hinge11 : HingeJoint;
var Hinge12 : HingeJoint;

var ContainerPoint1 : Transform;
var ContainerPoint2 : Transform;
var ContainerPoint3 : Transform;
var ContainerPoint4 : Transform;
var ContainerPoint5 : Transform;
var ContainerPoint6 : Transform;

var CargoSpawnTF : Transform;

var CargoTF : Transform;

var Container1GO : GameObject;
var Container2GO : GameObject;
var Container3GO : GameObject;
var Container4GO : GameObject;
var Container5GO : GameObject;
var Container6GO : GameObject;

var HasVehicleShipment : boolean;

var OffToDrop : boolean;

var IsDropping : boolean;

var ThreatenedByTC1 = 0;
var ThreatenedByTC5 = 0;
var ThreatenedByTC4 = 0;
var ThreatenedByTC6 = 0;
var ThreatenedByTC7 = 0;

var ThreatPerimiter = 50;

var Stranger : Transform;

var Sanctuary : Transform;

var RoadTF : Transform;

var RoadTF2 : Transform;

var Road : boolean;

var RoadTime = 0;

var RoadTightness : float = 0.1;

var SinglePath : boolean;

var DriftyVessel : boolean;

var isBejsirf : boolean;

var IsTaxi : boolean;

var IsExit1 : boolean;
var IsExit2 : boolean;
var IsExit3 : boolean;

var SceneTimer = 5;

var StuckNum = 0;

var Proddy : float;

var IsInside : boolean;

var FreeFloating : boolean;

var HasHome : boolean;

var CanDrive : boolean;

var HasSpace : boolean;

var Parked : boolean;

var FullSpeed : boolean;

var Threatened : boolean;
var Obstacle : boolean;

var TurnUp : boolean;
var TurnDown : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;
var TurnRightX : boolean;
var TurnLeftX : boolean;

var StrafeRight : boolean;
var StrafeLeft : boolean;

var ObsStartY : float = 4;
var ObsStartZ : float = 0.1;

var TurnEndSide : float = 2;

var TurnEndSideS : float = 2;

var RightDist : float = 200;
var LeftDist : float = 200;

var TurnVehicleTop = 2;
var TurnVehicleBot = -2;

var UpDist : float = 200;
var DownDist : float = 200;

var UpDist2 : float = 200;
var DownDist2 : float = 200;

var TopSpeed : float = 100;
var StatTopSpeed : float = 100;

var BrakeForce : float = 30;
var SlowDownForce : float = 30;

var TurnForce : float = 60;

var RPMod : float = 0;
var RPMod2 : float = 0;

var TurnSpeed : float = 0.5;

var DirForce : float = 10;

var TurnStabForce : float = 0;

var TurnStabMod : float = 100;

var Stab : boolean;

var RayVelMod : float = 1;

var AimSpeed : float = 33;

var IncThreshold : float = 1.5;

var DropTolerance = 20;

var StopDist = 10;

var UnstickTime = 5;

var Ride : float = 0;

var Vel : float = 0;

var VelClamp : float = 0;
var VelClamp2 : float = 0;
var VelSplit : float = 0;

var TVel : float = 0;
var TAVel : float = 0;

var Dist : float = 8;

var MissionDist : float = 8;

var AtDestination : boolean;

var IsClose : boolean;

var SteepInc : boolean;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var Pathfind : boolean;

var GoToPath : boolean;

var PRot = 0;
var PCount = 0;

var FullRot : boolean;

var PathPoint1 : Vector3;
var PathPoint2 : Vector3;
var PathPoint3 : Vector3;

var newRot : Vector3;

var Stuck = 0;

var Escaping = 0;

var Ogle = 0;

var TForce = 6;

var Turnerisms = 0;

var Once : boolean;

InvokeRepeating("Updater", 2, 1);

InvokeRepeating("Refresher", 1, 0.2);

InvokeRepeating("Targety", 6, 6);

InvokeRepeating("Pathy", 30, 30);

function Start () {

if(vEntrance)
vEntrance.DenyEntrance = true;

if(DriftyVessel)
TurnStabMod = vRigidbody.mass * 48;
else
TurnStabMod = vRigidbody.mass * 28;

if(vRigidbody.mass > 1000)
TurnStabMod = vRigidbody.mass * 256;

StatTopSpeed = TopSpeed;

VelSplit = 1;

VelClamp = 1;

TurnEndSideS = TurnEndSide * 0.75;

var MassMod = vRigidbody.mass * 16;

if(BrakeForce > MassMod)
SlowDownForce = BrakeForce * 0.1;
else
SlowDownForce = BrakeForce * 0.3;

if(IsTaxi){
DoorOpen = true;
CanDrive = false;
}else{
CanDrive = true;
}

if(IsCarrier){
var Cargoionaise = Resources.Load("Models/THookContainer", GameObject) as GameObject;
var Cargoionaise2 = Resources.Load("Models/THookContainer2", GameObject) as GameObject;
var CargoionaiseD2 = Resources.Load("Models/THookContainerD2", GameObject) as GameObject;

if(CallAssistance.IsCargoing){
  var Rand0: int = Random.Range(0, 3);
       
  switch (Rand0) {
  case 0:
  Container2GO = Instantiate(CargoionaiseD2, ContainerPoint2.position, ContainerPoint2.rotation);
  Container2GO.transform.parent = thisVTransform;
  var TheCargo1 = Instantiate(Cargoionaise2, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo1.transform.parent = thisVTransform;
  break;
  case 1:
  Container2GO = Instantiate(CargoionaiseD2, ContainerPoint2.position, ContainerPoint2.rotation);
  Container2GO.transform.parent = thisVTransform;
  var TheCargo2 = Instantiate(Cargoionaise2, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo2.transform.parent = thisVTransform;
  break;
  case 2:
  Container2GO = Instantiate(CargoionaiseD2, ContainerPoint2.position, ContainerPoint2.rotation);
  Container2GO.transform.parent = thisVTransform;
  var TheCargo4 = Instantiate(Cargoionaise, ContainerPoint4.position, ContainerPoint4.rotation);
  TheCargo4.transform.parent = thisVTransform;
  var TheCargo5 = Instantiate(Cargoionaise, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo5.transform.parent = thisVTransform;
  var TheCargo6 = Instantiate(Cargoionaise, ContainerPoint6.position, ContainerPoint6.rotation);
  TheCargo6.transform.parent = thisVTransform;
  break;
  case 3:
  Container2GO = Instantiate(CargoionaiseD2, ContainerPoint2.position, ContainerPoint2.rotation);
  Container2GO.transform.parent = thisVTransform;
  var TheCargo8 = Instantiate(Cargoionaise, ContainerPoint4.position, ContainerPoint4.rotation);
  TheCargo8.transform.parent = thisVTransform;
  var TheCargo9 = Instantiate(Cargoionaise, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo9.transform.parent = thisVTransform;
  var TheCargo10 = Instantiate(Cargoionaise, ContainerPoint6.position, ContainerPoint6.rotation);
  TheCargo10.transform.parent = thisVTransform;
  break;
}
HasVehicleShipment = true;
target = PlayerInformation.instance.PiriTarget;
MissionWaypoint = PlayerInformation.instance.PiriTarget;
CallAssistance.IsCargoing = false;
Remover.isVesselCarrier = true;
}else{
  var Rand1: int = Random.Range(0, 4);
       
  switch (Rand1) {
  case 0:
  var TheCargo11 = Instantiate(Cargoionaise2, ContainerPoint2.position, ContainerPoint2.rotation);
  TheCargo11.transform.parent = thisVTransform;
  var TheCargo12 = Instantiate(Cargoionaise2, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo12.transform.parent = thisVTransform;
  break;
  case 1:
  var TheCargo13 = Instantiate(Cargoionaise2, ContainerPoint2.position, ContainerPoint2.rotation);
  TheCargo13.transform.parent = thisVTransform;
  var TheCargo14 = Instantiate(Cargoionaise, ContainerPoint4.position, ContainerPoint4.rotation);
  TheCargo14.transform.parent = thisVTransform;
  var TheCargo15 = Instantiate(Cargoionaise, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo15.transform.parent = thisVTransform;
  var TheCargo16 = Instantiate(Cargoionaise, ContainerPoint6.position, ContainerPoint6.rotation);
  TheCargo16.transform.parent = thisVTransform;
  break;
  case 2:
  var TheCargo17 = Instantiate(Cargoionaise2, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo17.transform.parent = thisVTransform;
  var TheCargo18 = Instantiate(Cargoionaise, ContainerPoint1.position, ContainerPoint1.rotation);
  TheCargo18.transform.parent = thisVTransform;
  var TheCargo19 = Instantiate(Cargoionaise, ContainerPoint2.position, ContainerPoint2.rotation);
  TheCargo19.transform.parent = thisVTransform;
  var TheCargo20 = Instantiate(Cargoionaise, ContainerPoint3.position, ContainerPoint3.rotation);
  TheCargo20.transform.parent = thisVTransform;
  break;
  case 3:
  var TheCargo21 = Instantiate(Cargoionaise, ContainerPoint1.position, ContainerPoint1.rotation);
  TheCargo21.transform.parent = thisVTransform;
  var TheCargo22 = Instantiate(Cargoionaise, ContainerPoint2.position, ContainerPoint2.rotation);
  TheCargo22.transform.parent = thisVTransform;
  var TheCargo23 = Instantiate(Cargoionaise, ContainerPoint3.position, ContainerPoint3.rotation);
  TheCargo23.transform.parent = thisVTransform;
  var TheCargo24 = Instantiate(Cargoionaise, ContainerPoint4.position, ContainerPoint4.rotation);
  TheCargo24.transform.parent = thisVTransform;
  var TheCargo25 = Instantiate(Cargoionaise, ContainerPoint5.position, ContainerPoint5.rotation);
  TheCargo25.transform.parent = thisVTransform;
  var TheCargo26 = Instantiate(Cargoionaise, ContainerPoint6.position, ContainerPoint6.rotation);
  TheCargo26.transform.parent = thisVTransform;
  break;
}
}
}
}

function Update () {

if(IsTaxi)
if(IsInside)
if(Input.GetKeyDown(KeyCode.E)){
CanDrive = true;
DoorOpen = false;
}

if(IsClose && Ogle == 1){
target = ResetView;
if(ThreatenedByTC1 == 2)
ThreatenedByTC1 = 1;
if(ThreatenedByTC4 == 2)
ThreatenedByTC4 = 1;
if(ThreatenedByTC6 == 2)
ThreatenedByTC6 = 1;
if(ThreatenedByTC7 == 2)
ThreatenedByTC7 = 1;
}

var newRot2 : Vector3;
var ObsStartZPLUS = ObsStartZ + Ride;
var VelPlus = VelClamp * RayVelMod;
var VelTQ = VelClamp * 0.75;
var hit : RaycastHit;
var hit2 : RaycastHit;
var hit3 : RaycastHit;

var Angle = Mathf.Abs(UpDist - DownDist);

var Angle2 = Mathf.Abs(UpDist2 - DownDist2);

if(!TurnLeft && !TurnRight){
var VesselAngVel = thisVTransform.InverseTransformDirection(vRigidbody.angularVelocity);

var AV1 = VesselAngVel.z * TurnStabMod;

var AV2 = Mathf.Clamp(AV1,-TurnForce,TurnForce);

TurnStabForce = -AV2;
}else{
TurnStabForce = 0;
}

Stab = false;

if(DriftyVessel || FreeFloating){
if(vRigidbody.velocity.magnitude > 8){
newRot2 = (vRigidbody.velocity);
VPoint.rotation = Quaternion.LookRotation(newRot2);
}else{
newRot2 = (ResetView.position - thisVTransform.position);
VPoint.rotation = Quaternion.LookRotation(newRot2);
}
}

if(!DriftyVessel){

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.right * TurnEndSideS, -thisVTransform.up * VelTQ, Color.white);
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + -thisVTransform.right * TurnEndSideS, -thisVTransform.up * VelTQ, Color.white);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.right * TurnEndSideS, -thisVTransform.up, VelTQ) ||
    Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + -thisVTransform.right * TurnEndSideS, -thisVTransform.up, VelTQ)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	    }

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + thisVTransform.right * TurnEndSide, newRot * VelPlus, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + thisVTransform.right * TurnEndSide, newRot, hit, VelPlus))
     RightDist = hit.distance;
     else
     RightDist = VelPlus;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + -thisVTransform.right * TurnEndSide, newRot * VelPlus, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + -thisVTransform.right * TurnEndSide, newRot, hit, VelPlus)){
	 LeftDist = hit.distance;
	 }else{
	 LeftDist = VelPlus;
	 }

if(!FreeFloating){
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 0.4, newRot * VelPlus, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 0.4, newRot, hit2, VelPlus))
     UpDist = hit2.distance;
     else
     UpDist = 8;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot * VelPlus, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot, hit2, VelPlus))
     DownDist = hit2.distance;
     else
     DownDist = 2;

if(Angle < IncThreshold){ SteepInc = true; }else{ SteepInc = false; }

}else{

TurnDown = false;
TurnUp = false;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * TurnVehicleTop, newRot * VelPlus, Color.blue);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * TurnVehicleTop, newRot, hit2, VelPlus)){
     UpDist = hit2.distance;
     }else{
     UpDist = 8;
     }

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * TurnVehicleBot, newRot * VelPlus, Color.red);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * TurnVehicleBot, newRot, hit2, VelPlus)){
     DownDist = hit2.distance;
     }else{
     DownDist = 8;
     }

if(DownDist > UpDist)
TurnDown = true;

if(DownDist < UpDist)
TurnUp = true;

}






















Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 10.4, newRot * VelPlus, Color.yellow);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 10.4, newRot, hit3, VelPlus))
     UpDist2 = hit3.distance;
     else
     UpDist2 = 8;
     
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 10, newRot * VelPlus, Color.yellow);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 10, newRot, hit3, VelPlus))
     DownDist2 = hit3.distance;
     else
     DownDist2 = 2;

if(Angle2 < IncThreshold){ SteepInc = true; }else{ SteepInc = false; }






























}else{

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot2 * VelPlus, Color.white);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot2, VelPlus)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	    }
	 
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + VPoint.right * TurnEndSide, newRot2 * VelPlus, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + VPoint.right * TurnEndSide, newRot2, hit, VelPlus))
     RightDist = hit.distance;
     else
     RightDist = VelPlus;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + -VPoint.right * TurnEndSide, newRot2 * VelPlus, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZPLUS + -VPoint.right * TurnEndSide, newRot2, hit, VelPlus)){
	 LeftDist = hit.distance;
	 }else{
	 LeftDist = VelPlus;
	 }
	 
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 0.4, newRot2 * VelPlus, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.forward * 0.4, newRot2, hit2, VelPlus))
     UpDist = hit2.distance;
     else
     UpDist = 8;

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot2 * VelPlus, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, newRot2, hit2, VelPlus))
     DownDist = hit2.distance;
     else
     DownDist = 2;
     
if(Angle < IncThreshold){ SteepInc = true; }else{ SteepInc = false; }
	 
	 }
     
 if(RightDist == LeftDist){
    TurnRight = false;
    TurnLeft = false;
    }

//---------------------------------------------------------------------------------------------
if(!FreeFloating){

Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 + newRot * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 + newRot * VelPlus, -thisVTransform.forward, hit, DropTolerance)){
     Obstacle = true;
     }else{
     if(hit.collider.name.Contains("Wa") && !DriftyVessel){
     Obstacle = true;
     }
     }

if(!DriftyVessel){
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * TurnEndSide
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * TurnEndSide
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, DropTolerance)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * TurnEndSide
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * TurnEndSide
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, DropTolerance)){
     TurnRight = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, hit, DropTolerance, MtargetLayers)){
     TurnLeft = true;
     }else{
     if(hit.collider.name.Contains("Wa") && !DriftyVessel){
     TurnLeft = true;
     }
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, hit, DropTolerance, MtargetLayers)){
     TurnRight = true;
     }else{
     if(hit.collider.name.Contains("Wa") && !DriftyVessel){
     TurnRight = true;
     }
     }
     
     }else{
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + VPoint.right * TurnEndSide
                                         + VPoint.forward * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + VPoint.right * TurnEndSide
                                         + VPoint.forward * VelPlus, -thisVTransform.forward, DropTolerance)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + -VPoint.right * TurnEndSide
                                         + VPoint.forward * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (!Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + -VPoint.right * TurnEndSide
                                         + VPoint.forward * VelPlus, -thisVTransform.forward, DropTolerance)){
     TurnRight = true;
     }
}
}else{

Debug.DrawRay (thisTransform.position + newRot * VelPlus, -thisVTransform.forward * 10, Color.white);
if (Physics.Raycast (thisTransform.position + newRot * VelPlus, -thisVTransform.forward, 10, MtargetLayers)){
     if(SteepInc)
     Obstacle = true;
     }

       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + VPoint.right * 10
                                         + VPoint.forward * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + VPoint.right * 10
                                         + VPoint.forward * VelPlus, -thisVTransform.forward, DropTolerance, MtargetLayers)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + -VPoint.right * 10
                                         + VPoint.forward * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + -VPoint.right * 10
                                         + VPoint.forward * VelPlus, -thisVTransform.forward, DropTolerance, MtargetLayers)){
     TurnRight = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, DropTolerance, MtargetLayers)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward * DropTolerance, Color.white);
if (Physics.Raycast (thisTransform.position + thisVTransform.forward * 10 
                                         + -thisVTransform.right * 10
                                         + -thisVTransform.up * VelPlus, -thisVTransform.forward, DropTolerance, MtargetLayers)){
     TurnRight = true;
     }
}
//---------------------------------------------------------------------------------------------

if(DriftyVessel){
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, VPoint.right * TurnEndSide * 1.5, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, VPoint.right, TurnEndSide * 1.5)) {
     TurnLeft = true;
     }

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, -VPoint.right * TurnEndSide * 1.5, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, -VPoint.right, TurnEndSide * 1.5)) {
	 TurnRight = true;
     }
}else{
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, thisVTransform.right * TurnEndSide * 1.5, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, thisVTransform.right, TurnEndSide * 1.5)) {
     TurnLeft = true;
     }

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, -thisVTransform.right * TurnEndSide * 1.5, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ, -thisVTransform.right, TurnEndSide * 1.5)) {
	 TurnRight = true;
     }
}

if(Stuck > 0){
Debug.DrawRay (thisVTransform.position + thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.right * TurnEndSideS, thisVTransform.up * VelSplit, Color.white);
Debug.DrawRay (thisVTransform.position + thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + -thisVTransform.right * TurnEndSideS, thisVTransform.up * VelSplit, Color.white);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + thisVTransform.right * TurnEndSideS, thisVTransform.up, VelSplit) ||
    Physics.Raycast (thisVTransform.position + thisVTransform.up * ObsStartY + thisVTransform.forward * ObsStartZ + -thisVTransform.right * TurnEndSideS, thisVTransform.up, VelSplit)){
				Stuck = 0;
		Turnerisms = 0;
		}
	    
Debug.DrawRay (thisVTransform.position + thisVTransform.up * VelTQ, -thisVTransform.forward * 10f, Color.white);
if (!Physics.Raycast (thisVTransform.position + thisVTransform.up * VelTQ, -thisVTransform.forward, 10)){
     Stuck = 0;
     Turnerisms = 0;
     }
}

if(OffToDrop && !GoToPath){
var VelMod1 = Vel * 1.5;
var VelMod2 = StopDist + VelMod1;

if(MissionDist < VelMod2){
AtDestination = true;
IsClose = true;
}

if(MissionDist < StopDist){
AtDestination = true;
IsClose = true;
}
}

if(Pathfind){

var Phit : RaycastHit;

Debug.DrawRay (thisVTransform.position + thisVTransform.forward * 10 + ResetView.transform.up * 250, -thisVTransform.forward * 20f, Color.red);
if (Physics.Raycast (thisVTransform.position + thisVTransform.forward * 10 + ResetView.transform.up * 250, -thisVTransform.forward, Phit, 20)) {
		
		if(FullRot && PCount == 1){
		PathPoint1 = Phit.point;
		FullRot = false;
		}
		
		if(FullRot && PCount == 2){
		PathPoint2 = Phit.point;
		FullRot = false;
		}
		
		if(FullRot && PCount == 3){
		PathPoint3 = Phit.point;
		FullRot = false;
		}
		
		if(Vector3.Distance(PathPoint1, PathPoint2) < 200)
		if(Vector3.Distance(PathPoint2, PathPoint3) < 200)
		Waypoint.position = Phit.point;
}

ResetView.Rotate(0,0,5);
PRot += 5;

if(PRot == 360){
PRot = 0;
PCount += 1;
FullRot = true;
}

if(PCount == 4){
PRot = 0;
PCount = 0;
Pathfind = false;
GoToPath = true;
}

}
}








private var RP : Vector3;
function FixedUpdate () {

if(!vRigidbody)
return;

if(IsCarrier){
TVel = vRigidbody.velocity.magnitude;
TAVel = vRigidbody.angularVelocity.magnitude;
}

var hit : RaycastHit;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = -localV.y * 2.24;

var RPMod0 = 10 * TurnForce * RP.x;
var RPMod1 = 10 * TurnForce * RP.z;

RPMod = RPMod0 / Dist;
RPMod2 = RPMod1 / Dist;

VelClamp = Mathf.Clamp(Vel,2,1000);
VelClamp2 = Mathf.Clamp(Vel * 0.07,1,1000);
VelSplit = VelClamp * 0.5;

newRot = (-thisVTransform.up).normalized;

if(target)
var RelativeTarget = thisTransform.InverseTransformPoint(target.position);

var RTMod = RelativeTarget.z * 0.2 - 5;

var RelativeDirForce = Mathf.Clamp(RTMod,-DirForce,DirForce);

if(CanDrive){

if(!Parked){

if(Ogle < 1){

if(!FreeFloating){
if(!SinglePath){
Debug.DrawRay (thisTransform.position + newRot * VelSplit, -thisVTransform.forward * 10, Color.green);
if (Physics.Raycast (thisTransform.position + newRot * VelSplit, -thisVTransform.forward, hit, 10, targetLayers)){
if (hit.collider.name.Contains("RoadAlign")){
     target = ResetView;
     GoToPath = false;
     RoadTime = 16;
     TopSpeed = StatTopSpeed;
     Road = true;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     
     if (hit.collider.name.Contains("SS"))
     TopSpeed = RoadTF.localScale.z;
     if (hit.collider.name.Contains("SM"))
     TopSpeed = 45;
     if (hit.collider.name.Contains("SH"))
     TopSpeed = 75;
     }
}
}else{
Debug.DrawRay (thisTransform.position + newRot * VelSplit, -thisVTransform.forward * 10, Color.green);
if (Physics.Raycast (thisTransform.position + newRot * VelSplit, -thisVTransform.forward, hit, 10, targetLayers)){
if (hit.collider.name.Contains("RoadAlign")){
     
if (hit.transform == RoadTF){
     RoadTime = 20;
     Road = true;
     }
     
     if(RoadTF == null){
     target = ResetView;
     GoToPath = false;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     }
     
     TopSpeed = StatTopSpeed;
     if (hit.collider.name.Contains("SS"))
     TopSpeed = RoadTF.localScale.z;
     if (hit.collider.name.Contains("SM"))
     TopSpeed = 45;
     if (hit.collider.name.Contains("SH"))
     TopSpeed = 75;
     }
}
}
}else{
if(!SinglePath){
Debug.DrawRay (thisTransform.position + newRot * VelSplit, -thisVTransform.forward * 10, Color.green);
if (Physics.Raycast (thisTransform.position + newRot * VelSplit, -thisVTransform.forward, hit, 10, targetLayers)){
if (hit.collider.name.Contains("PathAlign")){
     target = ResetView;
     GoToPath = false;
     TopSpeed = StatTopSpeed;
     Road = true;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     if (hit.collider.name.Contains("SS"))
     TopSpeed = RoadTF.localScale.z;
     if (hit.collider.name.Contains("SM"))
     TopSpeed = 45;
     if (hit.collider.name.Contains("SH"))
     TopSpeed = 75;
     }
}
}else{
Debug.DrawRay (thisTransform.position + newRot * VelSplit, -thisVTransform.forward * 10, Color.green);
if (Physics.Raycast (thisTransform.position + newRot * VelSplit, -thisVTransform.forward, hit, 10, targetLayers)){
if (hit.collider.name.Contains("PathAlign")){

if (hit.transform == RoadTF){
     RoadTime = 20;
     Road = true;
     }
     
     if(RoadTF == null){
     target = ResetView;
     GoToPath = false;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     }
     
     TopSpeed = StatTopSpeed;
     if (hit.collider.name.Contains("SS"))
     TopSpeed = RoadTF.localScale.z;
     if (hit.collider.name.Contains("SM"))
     TopSpeed = 45;
     if (hit.collider.name.Contains("SH"))
     TopSpeed = 75;
     }
}
}
}
}

if(RoadTF){

    var relativePoint = RoadTF.transform.InverseTransformPoint(ResetView.position);
    var relativePoint2 = RoadTF.transform.InverseTransformPoint(thisVTransform.position);
    var relativePointW = thisVTransform.InverseTransformPoint(Waypoint.position);
    Proddy = Mathf.Abs(relativePoint.x);
    
    Waypoint.rotation = RoadTF.rotation;
    Waypoint.position = RoadTF.position;
    
    Waypoint.position += RoadTF.forward * relativePoint2.z * RoadTF.localScale.z;
    
    //if(RoadTF.localScale.z > 64)
    //ResetView.localPosition.y = -64;
    //else
    //ResetView.localPosition.y = -RoadTF.localScale.z;
        
if(DriftyVessel){

if(RoadTF.localScale.z > 64){
ResetView.localPosition.y = -64;
if(RoadTF.localScale.z > 256)
ResetView.localPosition.y = -256;
}else{
if(TopSpeed > 44){
ResetView.localPosition.y = -32;
}else{
ResetView.localPosition.y = -16;
}
}

if (relativePoint.x < -RoadTightness){
TurnLeft = false;
TurnRight = true;
if(TopSpeed > 44){
if(TopSpeed > 100){
if(Proddy > 2)
Obstacle = true;
}else{
if(Proddy > 0.7)
Obstacle = true;
}
}else{
if(Proddy > 0.35)
Obstacle = true;
}
}
if (relativePoint.x > RoadTightness){
TurnRight = false;
TurnLeft = true;
if(TopSpeed > 44){
if(TopSpeed > 100){
if(Proddy > 2)
Obstacle = true;
}else{
if(Proddy > 0.7)
Obstacle = true;
}
}else{
if(Proddy > 0.35)
Obstacle = true;
}
}

}else{

if(RoadTF.localScale.z > 64){
ResetView.localPosition.y = -32;
if(RoadTF.localScale.z > 256)
ResetView.localPosition.y = -256;
}else{
if(TopSpeed > 44){
ResetView.localPosition.y = -32;
}else{
ResetView.localPosition.y = -VelSplit;
}
}

if (relativePoint.x < -RoadTightness){
TurnLeft = false;
TurnRight = true;
if(TopSpeed > 44){
if(TopSpeed > 100){
if(Proddy > 2)
Obstacle = true;
}else{
if(Proddy > 0.7)
Obstacle = true;
}
}else{
if(Proddy > 0.35)
Obstacle = true;
}
}
if (relativePoint.x > RoadTightness){
TurnRight = false;
TurnLeft = true;
if(TopSpeed > 44){
if(TopSpeed > 100){
if(Proddy > 2)
Obstacle = true;
}else{
if(Proddy > 0.7)
Obstacle = true;
}
}else{
if(Proddy > 0.35)
Obstacle = true;
}
}
}

if (relativePoint2.x < -0.4 * VelClamp2){
TopSpeed = 25;
Stab = true;
Obstacle = false;
if (relativePointW.x < -2){
TurnRight = false;
TurnLeft = true;
}
if (relativePointW.x > 2){
TurnLeft = false;
TurnRight = true;
}
}
if (relativePoint2.x > 0.4 * VelClamp2){
TopSpeed = 25;
Stab = true;
Obstacle = false;
if (relativePointW.x < -2){
TurnRight = false;
TurnLeft = true;
}
if (relativePointW.x > 2){
TurnLeft = false;
TurnRight = true;
}
}

}

if(!FreeFloating){
if(RightDist > LeftDist && SteepInc){
TurnLeft = false;
TurnRight = true;
}

if(LeftDist > RightDist && SteepInc){
TurnRight = false;
TurnLeft = true;
}
}else{
if(RightDist > LeftDist){
TurnLeft = false;
TurnRight = true;
}

if(LeftDist > RightDist){
TurnRight = false;
TurnLeft = true;
}
}

if(!TurnLeft && !TurnRight){

if(!IsClose)
RPClamp = Mathf.Clamp(RPMod,-TurnForce,TurnForce);
else
RPClamp = 0;

if(target){
RP = RelativeTarget;
if(!Threatened)
vRigidbody.AddTorque(thisTransform.up * RPClamp);
else
vRigidbody.AddTorque(thisTransform.up * -RPClamp);
}

vRigidbody.AddTorque(thisTransform.up * TurnStabForce);

}else{
if(Stab)
vRigidbody.AddTorque(thisTransform.up * TurnStabForce);

RPClamp = 0;
}

if(Obstacle){
  if(Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * BrakeForce);
  else
  Obstacle = false;
}

if(StrafeRight){
  vRigidbody.AddForce(thisVTransform.right * DirForce);
}

if(StrafeLeft){
  vRigidbody.AddForce(thisVTransform.right * -DirForce);
}

if(Stuck > 0){
  if(!IsClose && !IsDropping){
  
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed){
  if(Turnerisms > 0)
  vRigidbody.AddTorque(thisTransform.up * TurnForce);
  else
  vRigidbody.AddTorque(thisTransform.up * -TurnForce);
  }
  
  if(!DriftyVessel)
  if(-Vel < 10)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  
}
}

if(isBejsirf){
if(Stuck < 1 && !IsClose && !IsDropping){
  if(!Obstacle){
  if(Vel < TopSpeed){
  if(TopSpeed < 50)
  vRigidbody.AddForce(thisVTransform.up * -3);
  else
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
  }else{
  vRigidbody.AddForce(thisVTransform.up * SlowDownForce);
  }
  }
}
}else{
if(Stuck < 1 && !IsClose && !IsDropping){
  if(!Obstacle){
  if(Vel < TopSpeed){
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
  }else{
  vRigidbody.AddForce(thisVTransform.up * SlowDownForce);
  }
  }
}
}

if(Stuck < 1 && !IsDropping){

if(TurnLeftX)
if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * -TurnForce);

if(TurnRightX)
if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * TurnForce);

if(TurnLeft && !TurnRight){
  if(Vel < TopSpeed * 0.5){
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * -TurnForce);
  }else{
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * -TurnForce * 0.25);
  }
}

if(TurnRight && !TurnLeft){
  if(Vel < TopSpeed * 0.5){
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * TurnForce);
  }else{
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.up * TurnForce * 0.25);
  }
}

if(TurnUp){
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.right * -TurnForce);
}

if(TurnDown){
  if(vRigidbody.angularVelocity.magnitude < TurnSpeed)
  vRigidbody.AddTorque(thisTransform.right * TurnForce);
}

}

}else{
if(Vel > 10){
RPClamp2 = Mathf.Clamp(RPMod2,-TurnForce,TurnForce);
vRigidbody.AddTorque(thisTransform.up * RPClamp2);
}
}

if(IsClose || Parked){
if(Vel > 0){
  vRigidbody.AddForce(thisVTransform.up * BrakeForce);
  }
if(-Vel > 0){
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
  }
}

}

//[DoorAni]-----------------------------------------------------------------------------------------------------------------------------
if(IsTaxi){

if(!DoorOpen){
if(TaxiDoor.transform.localPosition.y > -0.001)
if(TaxiDoor.transform.localPosition.x < 0)
TaxiDoor.transform.localPosition.x += 0.005;

if(TaxiDoor.transform.localPosition.y < -0.001)
TaxiDoor.transform.localPosition.y += 0.01;

}else{

if(TaxiDoor.transform.localPosition.x > -0.3)
TaxiDoor.transform.localPosition.x -= 0.005;

if(TaxiDoor.transform.localPosition.x < -0.3)
if(TaxiDoor.transform.localPosition.y > -1.8)
TaxiDoor.transform.localPosition.y -= 0.01;
}

}
//[DoorAni]-----------------------------------------------------------------------------------------------------------------------------
}

function OnTriggerEnter (other : Collider) {

if(other != null)
if(other.collider.name.Contains ("TFC")){

if(TargetCode == 2){
AgrianNetwork.instance.PriorityWaypoint.transform.position = other.transform.position;
if(AgrianNetwork.instance.AlertTime < 120)
AgrianNetwork.instance.AlertTime = 120;
}

if(TargetCode == 9){
DutvutanianNetwork.instance.PriorityWaypoint.transform.position = other.transform.position;
if(DutvutanianNetwork.instance.AlertTime < 120)
DutvutanianNetwork.instance.AlertTime = 120;
}

if(Vector3.Distance(thisTransform.position, other.transform.position) < ThreatPerimiter){
if(other.collider.name.Contains ("C1"))
ThreatenedByTC1 += 1;
if(other.collider.name.Contains ("C4"))
ThreatenedByTC4 += 1;
if(other.collider.name.Contains ("C5"))
ThreatenedByTC5 += 1;
if(other.collider.name.Contains ("C6"))
ThreatenedByTC6 += 1;
if(other.collider.name.Contains ("C7"))
ThreatenedByTC7 += 1;
}

if(Escaping < 60)
Escaping += 3;

if(Ogle > 2)
Excuse();
}
}

function OnTriggerStay (other : Collider) {

if(other != null){

if(other.collider.name.Contains ("mTC2") || other.collider.name.Contains ("mTC3"))
Sanctuary = other.gameObject.transform;

if(other.collider.name.Contains ("TC")){
if(Vector3.Distance(thisTransform.position, other.transform.position) < 256){
  Stranger = other.gameObject.transform;
  
  if(!IsCarrier){
  if(Stranger.name.Contains ("TC6"))
  ThreatenedByTC6 = 3;
  if(Stranger.name.Contains ("TC7"))
  ThreatenedByTC7 = 3;
  }
 }
}

}
}

function Targety () {

if(!Threatened && HasHome && Ogle < 1){
if(Vector3.Distance(thisTransform.position, Waypoint.position) > 5000)
target = Waypoint;

if(target == Waypoint)
if(Vector3.Distance(thisTransform.position, Waypoint.position) < 5000)
target = ResetView;
}

if(RoadTF != RoadTF2)
RoadTF2 = RoadTF;

}

function Refresher () {

var localV = thisVTransform.InverseTransformDirection(vRigidbody.angularVelocity);

if(isBejsirf){
if(TopSpeed > 45){
FullSpeed = !Obstacle;
}else{
FullSpeed = false;
}

if(Runsound)
Runsound.RunningF = FullSpeed;

if(Whizzer1)
Whizzer1.RunningF = FullSpeed;

if(Whizzer2)
Whizzer2.RunningF = FullSpeed;

if(Blastoff){
if(FullSpeed && !Once){
Once = true;
if(!Blastoff.isPlaying)
Blastoff.Play();
}
if(!FullSpeed && Once)
Once = false;
}

if (Particles != null) {
			var i1 : int;
			for (i1 = 0; i1 < Particles.Length; i1++) {
					Particles[i1].enableEmission = FullSpeed;
			}
		}
}

if(Gyro)
Gyro.Deactivated = false;

if(TurnRight){
if(Turnerisms < 5)
Turnerisms += 1;
if(Gyro)
Gyro.Deactivated = true;
}

if(TurnLeft){
if(Turnerisms > -5)
Turnerisms -= 1;
if(Gyro)
Gyro.Deactivated = true;
}

if(TurnUp){
if(Gyro)
Gyro.Deactivated = true;
}

if(TurnDown){
if(Gyro)
Gyro.Deactivated = true;
}

if(localV.x > 0.1){
if(Ride < 2)
Ride += 0.1;
}else{
if(Ride > 0)
Ride -= 0.1;
}

if(DownDist == UpDist){
SteepInc = false;
}

Obstacle = false;
TurnRight = false;
TurnLeft = false;
}

function Updater () {

if(target == null){
target = ResetView;
}else{
Dist = Vector3.Distance(thisTransform.position, target.position);
}

if(RoadTime > 0)
RoadTime -= 1;

if(RoadTime < 1){
Road = false;
RoadTF = null;
TopSpeed = StatTopSpeed;
}

if(IsTaxi && CanDrive){

SceneTimer -= 1;

if(SceneTimer == 0)
SwitchScene();
}

if(WorldInformation.instance.RestrictedArea){
if(Vector3.Distance(thisTransform.position, WorldInformation.instance.RestrictedArea.position) < 1000){
target = WorldInformation.instance.RestrictedArea;
Threatened = true;
}
}

if(!Threatened && !OffToDrop)
IsClose = false;

if(target){

if(Threatened)
if(Vector3.Distance(thisTransform.position, target.position) > 1000){
target = ResetView;
Threatened = false;
}

}

if(Threatened)
Trig.radius = 20;
else
Trig.radius = 200;

if(Stuck > 0){
Stuck -= 1;

if(Stuck == 1){
Turnerisms = 0;
Stuck = 0;
}
}

if(Ogle > 0){
if(Vector3.Distance(thisTransform.position, target.position) < 32 + vRigidbody.mass){
PRot = 0;
PCount = 0;
Pathfind = false;
GoToPath = false;
Parked = true;
Ogle -= 1;
}else{
Parked = false;
}

if(Ogle < 1){
Parked = false;
Reposition = false;
target = Waypoint;
}
}

if(Escaping > 0){
Escaping -= 1;
if(!Sanctuary)
target = ResetView;
}

if(ThreatenedByTC1 > 3)
ThreatenedByTC1 = 3;
if(ThreatenedByTC4 > 3)
ThreatenedByTC4 = 3;
if(ThreatenedByTC6 > 3)
ThreatenedByTC6 = 3;
if(ThreatenedByTC7 > 3)
ThreatenedByTC7 = 3;

if(IsCarrier){

if(MissionWaypoint)
MissionDist = Vector3.Distance(thisTransform.position, MissionWaypoint.position);

if(HasVehicleShipment && !GoToPath){
if(!AtDestination){
OffToDrop = true;
target = PlayerInformation.instance.PiriTarget;
}else{
OffToDrop = true;
target = ResetView;
if(TVel < 0.02 && TAVel < 0.02 && !IsDropping){
IsDropping = true;
StopToDrop();
}
}

if(StrafeRight || StrafeLeft){
if(Vector3.Distance(thisTransform.position, CargoTF.position) > 24){
Hinge1.spring.targetPosition = 0;
Hinge2.spring.targetPosition = 0;
Hinge3.spring.targetPosition = 0;
Hinge4.spring.targetPosition = 0;
Hinge5.spring.targetPosition = 0;
Hinge6.spring.targetPosition = 0;
OffToDrop = false;
IsDropping = false;
StrafeRight = false;
HasVehicleShipment = false;
target = ResetView;
}
}

}
}

if(GoToPath && !IsDropping && Ogle < 1){
target = Waypoint;
if(Vector3.Distance(thisTransform.position, Waypoint.position) < 100){
target = ResetView;
GoToPath = false;
}else{
var relativePathPoint = thisTransform.InverseTransformPoint(Waypoint.position);
if(relativePathPoint.y > 64 || -relativePathPoint.y > 64)
GoToPath = false;
}
}

if(IsTaxi){
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 4)
IsInside = true;
else
IsInside = false;
}

if(Stuck < 1){
if(StuckNum < 1){
StuckNum = 6;
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}else{
StuckNum -= 1;
}
}

if(ignoreInteraction)
return;

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
if(convNum < 4){
if(!Escaping){
target = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}else{
if(target)
if(target.name.Contains ("TC1")){
target = PlayerInformation.instance.PiriTarget;
Ogle = 20;
}
}
}
NotiScript.PiriNotis = false;
}

if(Ogle > 0)
if(WorldInformation.pSpeech){
if(WorldInformation.pSpeech.name.Contains ("a1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 32)
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 0);

if(WorldInformation.pSpeech.name.Contains ("b1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 64)
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 1);

if(WorldInformation.pSpeech.name.Contains ("c1"))
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 128)
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 2);

WorldInformation.pSpeech = null;
}

}

function StopToDrop(){

var Container = Resources.Load("Objects/THookContainerD2", GameObject) as GameObject;

Destroy(Container2GO);
Instantiate(Container, ContainerPoint2.position, ContainerPoint2.rotation);

var Prefabionaise1 = Resources.Load("VesselPrefabs/" + VesselList.instance.StaticStringOut, GameObject) as GameObject;
var TheThing1 = Instantiate(Prefabionaise1, CargoSpawnTF.position, CargoSpawnTF.rotation);
TheThing1.transform.GetComponent(VehicleSensor).Vessel.name = "ShippedVessel" + WorldInformation.ShippedVehicleNum;
TheThing1.GetComponent(VehicleSensor).Repositioned = true;
TheThing1.transform.position.y += TheThing1.transform.GetComponent(VehicleSensor).MidToGroundDist;

VesselList.instance.StaticStringOut = null;

WorldInformation.ShippedVehicleNum += 1;

CargoTF = TheThing1.transform;

Hinge1.spring.targetPosition = -100;
Hinge2.spring.targetPosition = -100;
Hinge3.spring.targetPosition = -100;
Hinge4.spring.targetPosition = -100;
Hinge5.spring.targetPosition = -100;
Hinge6.spring.targetPosition = -100;
yield WaitForSeconds (3);
StrafeRight = true;
}

function IsEscaping(lastPos : Vector3){

yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.4 && !IsClose && CanDrive){
  Stuck = UnstickTime;
  yield WaitForSeconds (0.5);
  if(Stuck == 0){
  Stuck = UnstickTime * 0.8;
  }
  }
  
}

function Pathy(){

var lastArea : Vector3 = thisTransform.position;
IsPathfinding(lastArea);
  
}

function IsPathfinding(lastArea : Vector3){

yield WaitForSeconds (30);

  if(Vector3.Distance(thisTransform.position, lastArea) < 250 && !IsClose && !GoToPath && !IsDropping){
  Pathfind = true;
  }
  
}

function SwitchScene () {
ScreenFadeScript.FadeOut = true;

if(WorldInformation.instance.TaxiExit1)
LoadPiriLocation.Exit1 = true;
if(WorldInformation.instance.TaxiExit2)
LoadPiriLocation.Exit2 = true;
if(WorldInformation.instance.TaxiExit3)
LoadPiriLocation.Exit3 = true;

PlayerCamFollow.HoldCam = true;
	
yield WaitForSeconds (2);
Application.LoadLevel(WorldInformation.instance.TaxiWhereToGo);
}

function Excuse(){
yield WaitForSeconds (0.2);
if(ThreatenedByTC1 > 0){
convNum = 99;
Ogle = 1;
}else{
if(target.name.Contains ("TC1")){
if(IsCarrier)
ReturnSpeech("Sorry, I don't feel like \n sacrificing my ship.");
else
ReturnSpeech("Sorry, I don't feel safe \n around here.");
convNum = 0;
Ogle = 1;
}
}
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;
var boredom = 0;

function ProcessSpeech (speech : String, mode : int){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(mode == 0){
if(convNum == 0){
//===============================================================================
if(HasSpace){
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Hello stranger."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("You look lost. \n You need a ride?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("You want in?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Alright. \n There is space for you."); vEntrance.DenyEntrance = false; return; }
}else{
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello stranger."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello! You look lost."); return; }
}

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Ok, I am stopping."); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, There's room for you."); return;}

if(speech.Contains ("no")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright, you have a good one."); return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("drive")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, right here."); return; }
//===============================================================================
}

if(convNum == 11){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Sure, I can give you a lift."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright."); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, will do."); return; }
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright, you have a good one."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright."); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, hold on."); return; }
//===============================================================================
}

if(convNum == 13){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 1; yield WaitForSeconds (4);
ReturnSpeech("What is wrong with you?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Just do it then."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Just do it already!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("*sigh*"); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Jump in already."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return; }
//===============================================================================
}

if(convNum == 14){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You already got your chance!"); return; }

if(speech.Contains ("ride") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think I'll pass on that now."); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Go bug somebody else."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 13; yield WaitForSeconds (2);
ReturnSpeech("Ok, what is it?"); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("I do not have all day."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Ok, I do not have all day."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return; }
//===============================================================================
}

if(convNum == 21){
//===============================================================================
if(speech.Contains ("hi")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("hello")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Goodbye, idiot!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You know what? Bug off!"); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Leave!"); return; }
//===============================================================================
}

if(convNum == 3){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("State your business! \n I do not have all day."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("Just state what you want already!"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("How about no."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Pick another ride. \n You already got one chance."); return; }

if(speech.Contains ("stop")){ convNum = 21; yield WaitForSeconds (2);
ReturnSpeech("Alright! \n Now get on with it!"); return; }

convNum = 4; boredom = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Goodbye!"); return;
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 1){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello stranger. You need something?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Greetings! You look lost. \n You want directions?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("What, your vessel is broken?"); return; }

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Why do you want me to stop?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright, you have a good one."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then, go ahead."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Alright."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("drive")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }
//===============================================================================
}

if(convNum == 11){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, jump out and get in!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Okey. Farewell."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}
//===============================================================================
}

if(convNum == 13){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 3; yield WaitForSeconds (4);
ReturnSpeech("What is wrong with you?"); return; }

if(HasSpace){
if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Do it, you fool!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Just do it already!"); vEntrance.DenyEntrance = false; return; }
}
//===============================================================================
}

if(convNum == 14){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech(". . ."); return; }

if(HasSpace)
if(speech.Contains ("in") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You already got your chance!"); return; }

if(speech.Contains ("ride") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think I'll pass on that now."); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Go bug somebody else."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 13; yield WaitForSeconds (2);
ReturnSpeech("Ok, what is it?"); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 3; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("I do not have all day."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Ok, I do not have all day."); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); return; }
}

if(speech.Contains ("drive")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }
//===============================================================================
}

if(convNum == 21){
//===============================================================================
if(speech.Contains ("hi")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("hello")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Go bite a snorp!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You know what? NO!"); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Leave me alone now."); return; }
//===============================================================================
}

if(convNum == 3){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("State your business! \n I do not have all day."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("Just state what you want already!"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("How about no."); return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Pick another ride. \n You already got one chance."); return; }

if(speech.Contains ("stop")){ convNum = 21; yield WaitForSeconds (2);
ReturnSpeech("Get on with it then!"); return; }

convNum = 4; boredom = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Goodbye!"); return;
//===============================================================================
}
}
//======================================================================================================================================
//======================================================================================================================================

if(mode == 2){
if(convNum == 0){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Woah!"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello? \n You want something?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Are you serious?"); return; }

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Oh no. What now?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What, you want a ride?"); return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("drive")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }
//===============================================================================
}

if(convNum == 11){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, jump out and get in!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("leave") && !speech.Contains ("i") || speech.Contains ("u") && speech.Contains ("leave")){ convNum = 2; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(HasSpace){
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("i") && speech.Contains ("leave")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Alright, go ahead."); vEntrance.DenyEntrance = false; return; }
}
//===============================================================================
}

if(convNum == 13){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 3; yield WaitForSeconds (4);
ReturnSpeech("What is wrong with you?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Stop!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("I think I need to go."); return; }
//===============================================================================
}

if(convNum == 14){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think I'll pass. \n Good luck out there."); return; }

if(speech.Contains ("ride") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think I'll pass on that now."); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Go bug somebody else."); return; }
//===============================================================================
}

if(convNum == 2){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 13; yield WaitForSeconds (2);
ReturnSpeech("Ok, what is it?"); return;}

if(speech.Contains ("no")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("I do not have all day."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Ok, I do not have all day."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }
//===============================================================================
}

if(convNum == 21){
//===============================================================================
if(speech.Contains ("hi")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("hello")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Nevermind. . ."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 1; yield WaitForSeconds (2);
ReturnSpeech("Well. . . \n Good luck out there!"); return; }

if(speech.Contains ("stop")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Go away. . ."); return; }
//===============================================================================
}

if(convNum == 3){
//===============================================================================
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("State your business! \n I do not have all day."); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 14; yield WaitForSeconds (2);
ReturnSpeech("Just state what you want already!"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("How about no."); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Pick another ride!"); return; }

if(speech.Contains ("stop")){ convNum = 21; yield WaitForSeconds (2);
ReturnSpeech("Alright! \n Now get on with it!"); return; }

convNum = 4; boredom = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Goodbye!"); return;
//===============================================================================
}
}

if(convNum > 0){

if(boredom < 3){
if(speech.Contains ("bye") || speech.Contains ("see") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Goodbye."); Ogle = 2; return;}
if(speech.Contains ("thank") || speech.Contains ("good") || speech.Contains ("like")){ yield WaitForSeconds (2);
ReturnSpeech("I'll see you!"); Ogle = 2; return;}
}

//===============================================================================
if(speech.Contains ("fuck you")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well fuck you too!"); return; }
if(speech.Contains ("fuck off")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok. . ."); return; }
if(speech.Contains ("go away")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then. . ."); return; }
//===============================================================================
}else{

if(boredom < 3)
if(speech.Contains ("bye") || speech.Contains ("see") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Ok?"); Ogle = 2; return;}
}

yield WaitForSeconds (2);
if(boredom == 0){ReturnSpeech("Oh?");}
if(boredom == 1){ReturnSpeech("What do you want?"); convNum = 1;}
if(boredom == 2){ReturnSpeech("Just get to the point. \n I don't have all day"); convNum = 1;}
if(boredom == 3){ReturnSpeech("Well, good luck out there."); convNum = 4; Ogle = 2;}
if(boredom == 4){ReturnSpeech("Just go away."); convNum = 4; Ogle = 2;}
if(boredom == 5){ReturnSpeech("I told you. Go away!"); convNum = 4; Ogle = 2;}
if(boredom == 6){ReturnSpeech("Please go away."); convNum = 4; Ogle = 2;}
if(boredom == 7){ReturnSpeech("You're dead to me. . ."); convNum = 5; PissedAtTC1 = 4; Ogle = 2;}
boredom += 1;
}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC0";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}