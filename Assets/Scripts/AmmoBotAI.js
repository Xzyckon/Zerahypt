var target : Transform;
var ResetView : Transform;
var Waypoint : Transform;
var ReloadPoint : Transform;
var DispensePoint : Transform;
var Gyro : GameObject;
var Trig : SphereCollider;
var Vessel : GameObject;
var HealthScript : VehicleDamage;

var Ammo1 : GameObject;
var Ammo2 : GameObject;
var Ammo3 : GameObject;
var Ammo4 : GameObject;
var Ammo5 : GameObject;

var DoorOpen : boolean;

var VPoint : Transform;

var ThreatenedByTC1 = 0;
var ThreatenedByTC4 = 0;
var ThreatenedByTC6 = 0;
var ThreatenedByTC7 = 0;

var ThreatPerimiter = 50;

var Stranger : Transform;

var RoadTF : Transform;

var RoadTF2 : Transform;

var Road : boolean;

var RoadTime = 0;

var SinglePath : boolean;

var OpenTop : boolean;

var DriftyVessel : boolean;

var Proddy : float;

var IsInside : boolean;

var FreeFloating : boolean;

var CanDrive : boolean;

var Threatened : boolean;
var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;
var StrafeRight : boolean;
var StrafeLeft : boolean;

var Pivot : boolean;

var VelLowClamp : float = 0.1;

var ObsStartY : float = 4;
var ObsStartZ : float = 0.1;

var StrafeEndSide : float = 2;

var RightDist : float = 200;
var LeftDist : float = 200;

var UpDist : float = 200;

var DownDist : float = 200;

var TopSpeed : float = 100;

var BrakeForce : float = 30;

var TurnForce : float = 60;

var TurnSpeed : float = 0.5;

var DirForce : float = 10;

var TurnStabForce : float = 0;

var TurnStabMod : float = 100;

var AimSpeed : float = 33;

var IncThreshold : float = 1.5;

var Ride : float = 0;

var Vel : float = 0;

var IsClose : boolean;

var IsSettled : boolean;

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

var Stuck = 0;

var Escaping = 0;

var TForce = 6;

var Turnerisms = 0;

var ConfJ : ConfigurableJoint;

InvokeRepeating("Updater", 2, 1);

InvokeRepeating("Navigator", 1.33, 0.33);

InvokeRepeating("Refresher", 1.13, 0.16);

InvokeRepeating("Targety", 4, 4);

InvokeRepeating("Pathy", 30, 30);

function Start () {
ConfJ.angularYZDrive.maximumForce = Vessel.rigidbody.mass * 0.5;
CanDrive = true;
}

function Update () {

  if(!TurnLeft && !TurnRight && !Obstacle)
  rigidbody.freezeRotation = true;
  
  if(TurnLeft || TurnRight || Obstacle)
  rigidbody.freezeRotation = false;

var newRot2 : Vector3 = (Vessel.rigidbody.velocity);
var newRot : Vector3 = (-Vessel.transform.up).normalized;
var ObsStartZPLUS = ObsStartZ + Ride;
var VelClamp = Mathf.Clamp(Vel,VelLowClamp,1000);
var ObsVelClamp = Mathf.Clamp(Vel,0.1,1000);
var VelSplit = VelClamp * 0.5;
var hit : RaycastHit;
var hit2 : RaycastHit;

var Angle = Mathf.Abs(UpDist - DownDist);

if(!TurnLeft && !TurnRight){
var VesselAngVel = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.angularVelocity);

var AV1 = VesselAngVel.z * TurnStabMod;

var AV2 = Mathf.Clamp(AV1,-10,10);

TurnStabForce = -AV2;
}

if(DriftyVessel || FreeFloating){
if(Vessel.rigidbody.velocity.magnitude > 1)
VPoint.transform.rotation = Quaternion.LookRotation(Vessel.rigidbody.velocity);
}

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, -Vessel.transform.up * ObsVelClamp, Color.white);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, -Vessel.transform.up, ObsVelClamp, targetLayers)) {
		if(SteepInc)
		Obstacle = true;
	    }else{
	    Obstacle = false;
	    }

if(!FreeFloating){
if(!SinglePath){
Debug.DrawRay (transform.position + newRot * VelClamp, -Vessel.transform.forward * 10, Color.green);
if (Physics.Raycast (transform.position + newRot * VelClamp, -Vessel.transform.forward, hit, 10, MtargetLayers)){
if (hit.collider.name.Contains("RoadAlign")){
     target = ResetView;
     GoToPath = false;
     Road = true;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     }
}
}else{
Debug.DrawRay (transform.position + newRot * VelClamp, -Vessel.transform.forward * 10, Color.green);
if (Physics.Raycast (transform.position + newRot * VelClamp, -Vessel.transform.forward, hit, 10, MtargetLayers)){
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
     }
}
}
}else{
if(!SinglePath){
Debug.DrawRay (transform.position + newRot * VelClamp, -Vessel.transform.forward * 10, Color.green);
if (Physics.Raycast (transform.position + newRot * VelClamp, -Vessel.transform.forward, hit, 10, MtargetLayers)){
if (hit.collider.name.Contains("PathAlign")){
     target = ResetView;
     GoToPath = false;
     Road = true;
     RoadTF = hit.transform;
     rigidbody.freezeRotation = true;
     }
}
}else{
Debug.DrawRay (transform.position + newRot * VelClamp, -Vessel.transform.forward * 10, Color.green);
if (Physics.Raycast (transform.position + newRot * VelClamp, -Vessel.transform.forward, hit, 10, MtargetLayers)){
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
     }
}
}
}

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZPLUS + Vessel.transform.right * StrafeEndSide, newRot * VelClamp, Color.black);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZPLUS + Vessel.transform.right * StrafeEndSide, newRot, hit, VelClamp, targetLayers)){
     if(!IsClose)
     RightDist = hit.distance;
     else
     StrafeRight = true;
     }else{
     RightDist = VelClamp;
     }

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZPLUS + -Vessel.transform.right * StrafeEndSide, newRot * VelClamp, Color.black);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZPLUS + -Vessel.transform.right * StrafeEndSide, newRot, hit, VelClamp, targetLayers)){
	 if(!IsClose)
	 LeftDist = hit.distance;
	 else
	 StrafeRight = true;
	 }else{
	 LeftDist = VelClamp;
	 }
	 
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.2, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.2, newRot, hit2, VelClamp))
     UpDist = hit2.distance;
     else
     UpDist = 8;

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * -0.2, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * -0.2, newRot, hit2, VelClamp))
     DownDist = hit2.distance;
     else
     DownDist = 8;
     
if(Angle < IncThreshold){ SteepInc = true; }else{ SteepInc = false; }
     
 if(RightDist > LeftDist && SteepInc){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && SteepInc){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnLeft = true;
     }
     
 if(RightDist == LeftDist){
    TurnRight = false;
    TurnLeft = false;
    }

//---------------------------------------------------------------------------------------------
if(!FreeFloating){

Debug.DrawRay (transform.position + Vessel.transform.forward * 10 + newRot * ObsVelClamp, -Vessel.transform.forward * 20, Color.white);
if (!Physics.Raycast (transform.position + Vessel.transform.forward * 10 + newRot * ObsVelClamp, -Vessel.transform.forward, 20)){
     Obstacle = true;
     ConfJ.angularYZDrive.maximumForce = 0.1;
     }

       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * StrafeEndSide
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (!Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * StrafeEndSide
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnLeft = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * StrafeEndSide
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (!Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * StrafeEndSide
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnRight = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (!Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnLeft = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (!Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnRight = true;
     }
     
}else{

Debug.DrawRay (transform.position + newRot * ObsVelClamp, -Vessel.transform.forward * 10, Color.white);
if (Physics.Raycast (transform.position + newRot * ObsVelClamp, -Vessel.transform.forward, 10, MtargetLayers)){
     if(SteepInc){
     Obstacle = true;
     ConfJ.angularYZDrive.maximumForce = 0.1;
     }
     }

       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + VPoint.transform.right * 10
                                         + VPoint.transform.forward * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + VPoint.transform.right * 10
                                         + VPoint.transform.forward * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnLeft = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + -VPoint.transform.right * 10
                                         + VPoint.transform.forward * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + -VPoint.transform.right * 10
                                         + VPoint.transform.forward * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnRight = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnLeft = true;
     }
     
       Debug.DrawRay (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward * 20, Color.white);
if (Physics.Raycast (transform.position + Vessel.transform.forward * 10 
                                         + -Vessel.transform.right * 10
                                         + -Vessel.transform.up * VelClamp, -Vessel.transform.forward, 20, MtargetLayers)){
     ConfJ.angularYZDrive.maximumForce = 0.1;
     TurnRight = true;
     }
}
//---------------------------------------------------------------------------------------------

if(RoadTF != null && RoadTF2 != null)
if(!RoadTF.name.Contains (RoadTF2.name)){

if(Vel > 30)
Obstacle = true;
else
Obstacle = false;
}

if(IsClose){
if(ReloadPoint)
if(Vector3.Distance(DispensePoint.position, ReloadPoint.position) > 1){

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, Vessel.transform.right * StrafeEndSide, Color.black);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, Vessel.transform.right, StrafeEndSide, targetLayers))
     StrafeLeft = true;
     else
     StrafeLeft = false;

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, -Vessel.transform.right * StrafeEndSide, Color.black);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, -Vessel.transform.right, StrafeEndSide, targetLayers))
	 StrafeRight = true;
     else
     StrafeRight = false;
     
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1.2, Color.grey);
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + -Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1.2, Color.grey);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1.2, targetLayers) ||
    Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + -Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1.2, targetLayers)){
     StrafeLeft = true;
     }

Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1.2, Color.grey);
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + -Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1.2, Color.grey);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1.2, targetLayers) ||
    Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + -Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1.2, targetLayers)){
	 StrafeRight = true;
     }
     
}
     
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1, Color.white);
Debug.DrawRay (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot * 1, Color.white);
if (Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1, targetLayers) ||
    Physics.Raycast (Vessel.transform.position + -Vessel.transform.up * ObsStartY + Vessel.transform.forward * 0.5 + -Vessel.transform.right * StrafeEndSide * 0.5, newRot, 1, targetLayers))
     Obstacle = true;
     
}

if(Stuck > 0 && !Pivot){
Debug.DrawRay (Vessel.transform.position + Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, Vessel.transform.up * VelSplit, Color.white);
if (Physics.Raycast (Vessel.transform.position + Vessel.transform.up * ObsStartY + Vessel.transform.forward * ObsStartZ, Vessel.transform.up, VelSplit * 0.5)){
		Stuck = 0;
		Turnerisms = 0;
		}
	    
Debug.DrawRay (Vessel.transform.position + Vessel.transform.up * VelSplit, -Vessel.transform.forward * 10f, Color.white);
if (!Physics.Raycast (Vessel.transform.position + Vessel.transform.up * VelSplit, -Vessel.transform.forward, 10)){
     Stuck = 0;
     Turnerisms = 0;
     }
}

if(RoadTF && FreeFloating){

    var relativePoint = RoadTF.transform.InverseTransformPoint(Vessel.transform.position);
    Proddy = relativePoint.x;
    if (relativePoint.x < -20)
        TurnRight = true;
    if (relativePoint.x > 20)
        TurnLeft = true;
 }

if(Pathfind){

var Phit : RaycastHit;

Debug.DrawRay (Vessel.transform.position + Vessel.transform.forward * 10 + ResetView.transform.up * 250, -Vessel.transform.forward * 20f, Color.red);
if (Physics.Raycast (Vessel.transform.position + Vessel.transform.forward * 10 + ResetView.transform.up * 250, -Vessel.transform.forward, Phit, 20)) {
		
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

private var NewRotation : Quaternion;

function FixedUpdate () {

var localV = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.velocity);

Vel = -localV.y * 2.24;

if(CanDrive){
  
  if(!IsClose){
  if(target){
  if(Road){
  transform.rotation = Quaternion.RotateTowards(transform.rotation, RoadTF.rotation, Time.deltaTime * AimSpeed);
  }else{
  NewRotation = Quaternion.LookRotation(target.position - transform.position);
  transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * AimSpeed);
  }
  }
  }else{
  if(ReloadPoint){
  NewRotation2 = Quaternion.LookRotation(ReloadPoint.position - transform.position);
  transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation2, Time.deltaTime * AimSpeed);
  
  if(Vector3.Distance(transform.position, ReloadPoint.position) > 3.5)
  Vessel.rigidbody.AddForce((ReloadPoint.position - transform.position).normalized * DirForce * 0.2);
  else
  Vessel.rigidbody.AddForce(Vessel.transform.up * DirForce);
  
  }else{
  NewRotation3 = Quaternion.LookRotation(target.position - transform.position);
  transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation3, Time.deltaTime * AimSpeed);
  }
  }

if(Obstacle){
  if(Vel > 0)
  Vessel.rigidbody.AddForce(Vessel.transform.up * BrakeForce);
  
  if(IsClose)
  if(-Vel < 2)
  Vessel.rigidbody.AddForce(Vessel.transform.up * DirForce);
  
}

if(Stuck > 0){
  if(IsClose){
  if(Vessel.rigidbody.angularVelocity.magnitude < TurnSpeed){
  Vessel.rigidbody.AddForce(Vessel.transform.right * DirForce);
  }
  }else{
  if(Vessel.rigidbody.angularVelocity.magnitude < TurnSpeed){
  if(Turnerisms > 0){
  Gyro.rigidbody.AddTorque(transform.up * TurnForce);
  }else{
  Gyro.rigidbody.AddTorque(transform.up * -TurnForce);
  }
  }
  }
  
  if(-Vel < 10 && !Pivot && !IsClose){
  Vessel.rigidbody.AddForce(Vessel.transform.up * DirForce);
  }
  
}else{

if(StrafeRight){
Vessel.rigidbody.AddForce(Vessel.transform.right * DirForce);
}

if(StrafeLeft){
Vessel.rigidbody.AddForce(Vessel.transform.right * -DirForce);
}

if(!IsClose){
  if(!Obstacle){
  if(Vel < TopSpeed){
  Vessel.rigidbody.AddForce(Vessel.transform.up * -DirForce);
  }
  }
}

if(TurnLeft && !TurnRight){
  if(Vel > 5)
  if(Vessel.rigidbody.angularVelocity.magnitude < TurnSpeed)
  Gyro.rigidbody.AddTorque(transform.up * -TurnForce);
}

if(TurnRight && !TurnLeft){
  if(Vel > 5)
  if(Vessel.rigidbody.angularVelocity.magnitude < TurnSpeed)
  Gyro.rigidbody.AddTorque(transform.up * TurnForce);
}

}

if(IsClose && !Threatened){
if(Vel > 5)
  Vessel.rigidbody.AddForce(Vessel.transform.up * BrakeForce);
}

}

Gyro.rigidbody.AddTorque(transform.up * TurnStabForce);

}

function OnTriggerEnter (other : Collider) {
if(other != null)
if(other.collider.name.Contains ("TFC1")){

if(Vector3.Distance(transform.position, other.transform.position) < ThreatPerimiter){
CallAssistance.DismissAmmo = true;
ReloadPoint = null;
IsClose = false;
ThreatenedByTC1 += 1;
}

}
}

function OnTriggerStay (other : Collider) {
if(CallAssistance.IsAmmoing){

if(other.collider.name.Contains ("AmmoPointE")){
ReloadPoint = other.transform;
}
if(other.collider.name.Contains ("AmmoPointF")){
ReloadPoint = null;
}

}
}

function Targety () {

var lastPos : Vector3 = transform.position;
IsEscaping(lastPos);


if(RoadTF != RoadTF2)
RoadTF2 = RoadTF;

}

function Navigator () {

if(CallAssistance.IsAmmoing){

Waypoint.position = PlayerInformation.instance.Pirizuka.position;

if(Vector3.Distance(transform.position, Waypoint.transform.position) > 50){
target = Waypoint;
IsClose = false;
IsSettled = false;
}else{
target = ResetView;

if(ReloadPoint == null){
IsSettled = true;
IsClose = false;
}else{
IsSettled = false;
IsClose = true;
}

}
}else{
IsSettled = false;
}

if(ReloadPoint){

if(Vector3.Distance(DispensePoint.position, ReloadPoint.position) < 0.5){

if(ReloadPoint.name.Contains ("20mm")){
Instantiate(Ammo1, DispensePoint.transform.position, DispensePoint.transform.rotation);
audio.Play();
}
if(ReloadPoint.name.Contains ("30mm")){
Instantiate(Ammo2, DispensePoint.transform.position, DispensePoint.transform.rotation);
audio.Play();
}
if(ReloadPoint.name.Contains ("40mmSK")){
Instantiate(Ammo3, DispensePoint.transform.position, DispensePoint.transform.rotation);
audio.Play();
}
if(ReloadPoint.name.Contains ("40mmSHE")){
Instantiate(Ammo4, DispensePoint.transform.position, DispensePoint.transform.rotation);
audio.Play();
}
if(ReloadPoint.name.Contains ("50mm")){
Instantiate(Ammo5, DispensePoint.transform.position, DispensePoint.transform.rotation);
audio.Play();
}

}
}

}

function Refresher () {

var localV = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.angularVelocity);

if(TurnRight)
if(Turnerisms < 5)
Turnerisms += 1;

if(TurnLeft)
if(Turnerisms > -5)
Turnerisms -= 1;

if(localV.x > 0.2){
if(Ride < 2)
Ride += 0.2;
}else{
if(Ride > 0)
Ride -= 0.2;
}

if(DownDist == UpDist){
SteepInc = false;
}

Obstacle = false;
TurnRight = false;
TurnLeft = false;
StrafeRight = false;
StrafeLeft = false;

}

function Updater () {

if(!SinglePath){
Road = false;
RoadTF = null;
}else{

if(RoadTime > 0)
RoadTime -= 1;

if(RoadTime < 1){
Road = false;
RoadTF = null;
}
}

ConfJ.angularYZDrive.maximumForce = Vessel.rigidbody.mass * 0.5;

if(Threatened)
if(target == ResetView || target == Waypoint){
Threatened = false;
target = ResetView;
}

if(target == null){
Threatened = false;
target = ResetView;
}

if(Threatened)
IsClose = false;

if(Threatened)
Trig.radius = 20;
else
Trig.radius = 100;

if(Stuck > 0){

Stuck -= 1;

if(Stuck == 1){
Turnerisms = 0;
Stuck = 0;
}
}

if(!CallAssistance.IsAmmoing)
target = ResetView;

if(ThreatenedByTC1 > 3)
ThreatenedByTC1 = 3;
if(ThreatenedByTC4 > 3)
ThreatenedByTC4 = 3;
if(ThreatenedByTC6 > 3)
ThreatenedByTC6 = 3;
if(ThreatenedByTC7 > 3)
ThreatenedByTC7 = 3;

if(GoToPath){
target = Waypoint;
if(Vector3.Distance(transform.position, Waypoint.position) < 100){
target = ResetView;
GoToPath = false;
}
}

}

function IsEscaping(lastPos : Vector3){

yield WaitForSeconds (3);

if(ReloadPoint)
if(Vector3.Distance(DispensePoint.position, ReloadPoint.position) < 2)
return;

  if(Vector3.Distance(transform.position, lastPos) < 2 && CanDrive && !IsSettled){
  Stuck = 5;
  yield WaitForSeconds (0.5);
  if(Stuck == 0){
  Pivot = true;
  Stuck = 4;
  }
  }
  
}

function Pathy(){

var lastArea : Vector3 = transform.position;
IsPathfinding(lastArea);
  
}

function IsPathfinding(lastArea : Vector3){

yield WaitForSeconds (30);

  if(Vector3.Distance(transform.position, lastArea) < 250 && !IsClose && !GoToPath){
  Pathfind = true;
  }
  
}