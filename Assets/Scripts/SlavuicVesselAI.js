var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var Leader : Transform;
var Comrade : Transform;
var Gyro : GameObject;
var Trig : CapsuleCollider;
var Turret : SlavuicGunController;
var Hull : VehicleDamage;
var DWR : DoppelgangerWithRemoval;

var vEntrance : CarDoorController;

var Mine : GameObject;
var MineLayer : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var slavAim : float = 0.01;

var slavTarget : Transform;
var Slavuic1Head : GameObject;
var Slavuic1Body : GameObject;
var Slavuic1BodyJ : SpringJoint;
var Slavuic1Gun : GameObject;
var Slavuic1GunS : PersonGunScript;

var Slavuic1Ani : Animation;

var Slav1Up : boolean;

var Slavuic1Pos1 : Transform;
var Slavuic1Pos2 : Transform;
var Slavuic1Pos3 : Transform;

var Slavuic2Head : GameObject;

var TurnPoint : Transform;

var Overview : Transform;

var HuntingSound : GameObject;
var AttackSound : GameObject;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Stranger : Transform;

var Fear : Transform;

var DedIfGunnerDed : boolean;
var DedIfDriverDed : boolean;

var Parked : boolean;

var HasSpace : boolean;

var Mistitor : boolean;
var Watchmen : boolean;
var Vanguard : boolean;
var Divertor : boolean;

var Hunting : boolean;
var Attacking : boolean;
var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var CanTurn : boolean;

var Escape : boolean;

var Threatened : boolean;

var Grounded : boolean;

var gRayLength : float = 2;

var ObsStartY : float = 4;
var ObsStartZ : float = 0.1;

var RightDist : float = 200;
var LeftDist : float = 200;

var TurnForce = 50;

var StatTurnForce = 0;

var TurnStabForce : float = 0;

var DirForce = 15;

var StatDirForce = 0;

var Catchup : float = 1;

var RPClamp : float = 0;

var Vel : float = 0;

var VelDir : Vector3;

var RDFMod : float = 0;

var IsClose : boolean;
var CanLaunch = 0;
var Reposition : boolean;

var Approach : boolean;

var Follow : boolean;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var Stuck = 0;

var LayingLow = 0;

var Ogle = 0;

var UniqueShootTime : float = 0.1;

InvokeRepeating("Updater", 1, 1);

InvokeRepeating("Refresher", 0.5, 0.2);

InvokeRepeating("Targety", 3, 3);

InvokeRepeating("Shoot", UniqueShootTime, 0.2);

function Start (){
target = Waypoint;
UniqueShootTime = Random.Range(1, 2);

StatDirForce = DirForce;
StatTurnForce = TurnForce;

slavAim = 0.1;
Hunting = true;
}

function Update () {

if(!vRigidbody || !Gyro)
return;

if (!IsClose) {
  
  if(!TurnLeft && !TurnRight && !Obstacle)
  CanTurn = true;
  
  if(CanLaunch > 0 && Attacking)
  CanTurn = true;
  
  if(Follow)
  CanTurn = true;
  
  if(TurnLeft || TurnRight || Obstacle)
  CanTurn = false;
 }
 
if(Vel < 6){
if(!Mistitor)
gRayLength = 1;
}else{
if(!Mistitor)
gRayLength = 0.6;
}
 
 
      Debug.DrawRay (thisTransform.position, -thisVTransform.forward * gRayLength, Color.white);
if (Physics.Raycast (thisTransform.position, -thisVTransform.forward, gRayLength))
		Grounded = true;
	    else
	    Grounded = false;
	
var newRot : Vector3 = (-thisVTransform.up).normalized;
var hit : RaycastHit;
var hit2 : RaycastHit;

var VelClamp = Mathf.Clamp(Vel,10,100);

if(vRigidbody){
var VesselAngVel = thisVTransform.InverseTransformDirection(vRigidbody.angularVelocity);
VelDir = vRigidbody.velocity;
}

var AV1 = VesselAngVel.z * vRigidbody.mass * 20;

var AV2 = Mathf.Clamp(AV1,-100,100);

TurnStabForce = -AV2;

Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5 + thisVTransform.right * 2, newRot * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5 + thisVTransform.right * 2, newRot, hit, VelClamp))
     RightDist = hit.distance;
     else
     RightDist = VelClamp;

Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5 + -thisVTransform.right * 2, newRot * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5 + -thisVTransform.right * 2, newRot, hit, VelClamp))
	 LeftDist = hit.distance;
	 else
	 LeftDist = VelClamp;
 
 if(RightDist > LeftDist)
     TurnRight = true;
     
 if(LeftDist > RightDist)
     TurnLeft = true;
     
 if(RightDist == LeftDist){
    TurnRight = false;
    TurnLeft = false;
    }
    
Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.up * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.up, VelClamp)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	    
Debug.DrawRay (thisTransform.position + -thisVTransform.up * VelClamp + thisVTransform.forward * 10, -thisVTransform.forward * 20, Color.white);
if (!Physics.Raycast (thisTransform.position + -thisVTransform.up * VelClamp + thisVTransform.forward * 10, -thisVTransform.forward, hit, 20)){
     Obstacle = true;
     }else{
     if(hit.collider.name.Contains("Wa"))
     Obstacle = true;
     }
     
	}
    
      Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5 + thisVTransform.forward * 0.4, -thisVTransform.up * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5 + thisVTransform.forward * 0.4, -thisVTransform.up, hit2, VelClamp))
     UpDist = hit2.distance;
     else
     UpDist = 8;

      Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.up * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.up, hit2, VelClamp))
     DownDist = hit2.distance;
     else
     DownDist = 8;
     
var Angle = Mathf.Abs(UpDist - DownDist);

if (!Physics.Raycast (thisTransform.position + -thisVTransform.up * 5 + thisVTransform.forward * 1.5, -thisVTransform.up, VelClamp)){
if(Angle > 1.5){TurnRight = false; TurnLeft = false; Obstacle = false;}
}else{
Obstacle = true;
}

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + Vector3.up * 10 
                                  + thisVTransform.right * 10
                                  + -thisVTransform.up * VelClamp, Vector3.down * 20, Color.white);
if (!Physics.Raycast (thisTransform.position + Vector3.up * 10 
                                        + thisVTransform.right * 10 
                                        + -thisVTransform.up * VelClamp, Vector3.down, hit, 20)){
     TurnLeft = true;
     }else{
     if(hit.collider.name.Contains("Wa"))
     TurnLeft = true;
     }
     
             Debug.DrawRay (thisTransform.position + Vector3.up * 10 
                                  + -thisVTransform.right * 10
                                  + -thisVTransform.up * VelClamp, Vector3.down * 20, Color.white);
if (!Physics.Raycast (thisTransform.position + Vector3.up * 10 
                                        + -thisVTransform.right * 10 
                                        + -thisVTransform.up * VelClamp, Vector3.down, hit, 20)){
     TurnRight = true;
     }else{
     if(hit.collider.name.Contains("Wa"))
     TurnRight = true;
     }
//---------------------------------------------------------------------------------------------


Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5, thisVTransform.right * 7, Color.black);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5, thisVTransform.right, 7))
     RightDist = hit.distance;
     else
     RightDist = 60;

Debug.DrawRay (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.right * 7, Color.black);
if (Physics.Raycast (thisTransform.position + -thisVTransform.up * 5, -thisVTransform.right, 7))
	 LeftDist = hit.distance;
	 else
	 LeftDist = 60;
	 
 if(RightDist > LeftDist){
    TurnRight = true;
    TurnLeft = false;
    }
     
 if(LeftDist > RightDist){
    TurnLeft = true;
    TurnRight = false;
    }

if(Watchmen && !Vanguard){
if(Slavuic1Body)
SlavSquat();
else
StopAllCoroutines();
}

}


private var RP : Vector3;
function FixedUpdate () {

if(!vRigidbody || !Gyro)
return;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = -localV.y * 2.24;

var RPMod = RP.x;

var RPMAbs = Mathf.Abs(RPMod);

if(target)
var RelativeTarget = thisTransform.InverseTransformPoint(target.position);

var RTMod = RelativeTarget.z * 0.2 - 5;

var RelativeDirForce = Mathf.Clamp(RTMod,-DirForce,DirForce);

RDFMod = RelativeDirForce * Catchup;

if(Vel > 8)
TForceMod = TurnForce;
else
TForceMod = TurnForce * 2;

if(CanTurn)
RPClamp = Mathf.Clamp(RPMod,-TForceMod,TForceMod);
else
RPClamp = 0;

if(!Grounded){
RPClamp = 0;
RDFMod = 0;
TurnForce = 0;
DirForce = 0;
}else{
TurnForce = StatTurnForce;
DirForce = StatDirForce;
}

if(!TurnLeft && !TurnRight){
  if(target)
  if(Watchmen || Mistitor){
  if(!Attacking){
  RP = RelativeTarget;
  if(!Threatened)
  Gyro.rigidbody.AddTorque(thisVTransform.forward * RPClamp);
  else
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -RPClamp);
  }else{
  if(!Escape){
  if(!Approach){
  RP = thisTransform.InverseTransformPoint(TurnPoint.position);
  Gyro.rigidbody.AddTorque(thisVTransform.forward * RPClamp);
  }else{
  RP = RelativeTarget;
  Gyro.rigidbody.AddTorque(thisVTransform.forward * RPClamp);
  }
  }else{
  RP = RelativeTarget;
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -RPClamp);
  }
  }
  }else{
  RP = RelativeTarget;
  if(!Threatened)
  Gyro.rigidbody.AddTorque(thisVTransform.forward * RPClamp);
  else
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -RPClamp);
  }

if(RPMAbs > 32){
if(vRigidbody.angularVelocity.magnitude > 1)
Gyro.rigidbody.AddTorque(thisVTransform.forward * TurnStabForce);
}else{
Gyro.rigidbody.AddTorque(thisVTransform.forward * TurnStabForce);
}
}

if(Obstacle){
  if(Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
}

if(!Attacking){

if(Stuck > 0){
  if(!IsClose){
  
  if(vRigidbody.angularVelocity.magnitude < 0.5){
  if(!Mistitor)
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -TurnForce * 2);
  else
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -TurnForce * 2);
  }
  
  if(-Vel < 8)
  vRigidbody.AddForce(thisVTransform.up * DirForce);

}
}

if(Stuck < 1 && !IsClose){
  if(!Obstacle){
  if(!Follow){
  if(Vel < 75){
  if(Vel < 40)
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
  else
  vRigidbody.AddForce(thisVTransform.up * -RDFMod);
  }
  }else{
  if(Vel < 95){
  if(Vel < 40)
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
  else
  vRigidbody.AddForce(thisVTransform.up * -RDFMod);
  }
  }
}
}

if(IsClose && !Attacking){
if(Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
  
if(-Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
}

}else{

if(Reposition){
if(!Obstacle){
if(!Escape){
if(!Approach){
if(Vel < 30)
vRigidbody.AddForce(thisVTransform.up * -DirForce);
}else{
if(Vel < 75)
vRigidbody.AddForce(thisVTransform.up * -DirForce);
}
}else{
if(Vel < 95)
vRigidbody.AddForce(thisVTransform.up * -DirForce);
}
}
Parked = false;
}else{
if(Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * DirForce);
if(-Vel > 0)
  vRigidbody.AddForce(thisVTransform.up * -DirForce);
}

}
 
if(TurnLeft && !TurnRight && Stuck < 1 && !Parked){
  if(Vel < 20)
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -TurnForce * 2);
  else
  Gyro.rigidbody.AddTorque(thisVTransform.forward * -TurnForce);
}

if(TurnRight && !TurnLeft && Stuck < 1 && !Parked){
  if(Vel < 20)
  Gyro.rigidbody.AddTorque(thisVTransform.forward * TurnForce * 2);
  else
  Gyro.rigidbody.AddTorque(thisVTransform.forward * TurnForce);
}

if(Stranger){
  if(Slavuic1Head){
  Slavuic1Head.rigidbody.AddForceAtPosition((Stranger.position - Slavuic1Head.transform.position).normalized * 0.01, Slavuic1Head.transform.forward * 2);
  Slavuic1Head.rigidbody.AddForceAtPosition((Stranger.position - Slavuic1Head.transform.position).normalized * -0.01, -Slavuic1Head.transform.forward * 2);
}
  if(Slavuic2Head){
  Slavuic2Head.rigidbody.AddForceAtPosition((Stranger.position - Slavuic2Head.transform.position).normalized * 0.01, Slavuic2Head.transform.forward * 2);
  Slavuic2Head.rigidbody.AddForceAtPosition((Stranger.position - Slavuic2Head.transform.position).normalized * -0.01, -Slavuic2Head.transform.forward * 2);
}

}

if(Slavuic1Body){
if(slavTarget){
  Slavuic1Body.rigidbody.AddForceAtPosition((slavTarget.position - Slavuic1Body.transform.position).normalized * slavAim, Slavuic1Body.transform.forward * 2);
  Slavuic1Body.rigidbody.AddForceAtPosition((slavTarget.position - Slavuic1Body.transform.position).normalized * -slavAim, -Slavuic1Body.transform.forward * 2);
}
if(!Slav1Up){
  Slavuic1Body.rigidbody.AddForceAtPosition(-Vector3.up * 0.1, Slavuic1Body.transform.right * 2);
  Slavuic1Body.rigidbody.AddForceAtPosition(Vector3.up * 0.1, -Slavuic1Body.transform.right * 2);
}
}

}

function OnTriggerEnter (other : Collider) {

if(other != null){

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC")){
if(!ON.Contains ("TFC5")){

if(DWR){
thisTransform.LookAt(OT);
DWR.enabled = false;
ResetTF();
}

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC0a"))
PissedAtTC0a += 1;

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC1"))
PissedAtTC1 += 1;

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC4"))
PissedAtTC4 += 1;

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC7"))
PissedAtTC7 += 1;

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC8"))
PissedAtTC8 += 1;

if(Vector3.Distance(thisTransform.position, OT.position) < 50)
if(ON.Contains ("TFC9"))
PissedAtTC9 += 1;

}
}

}
}

function ResetTF(){
yield WaitForSeconds (0.3);
DWR.enabled = true;
}

function OnTriggerStay (other : Collider) {

if(other != null){

ON = other.name;
OT = other.transform;

if(!ON.Contains ("x"))
if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TC")){
if(Vector3.Distance(thisTransform.position, OT.position) < 200){

if(Divertor){
var relativePoint = thisVTransform.InverseTransformPoint(OT.position);
if(relativePoint.y < 0)
if(relativePoint.x < 50 && relativePoint.x > -50)
return;
}

  Stranger = OT;
  
  if(ON.Contains ("TC0a") && PissedAtTC0a > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC1") && PissedAtTC1 > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC3") && PissedAtTC3 > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC4") && PissedAtTC4 > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC7") && PissedAtTC7 > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC8") && PissedAtTC8 > 3)
  Stranger = OT;
  
  if(ON.Contains ("TC9") && PissedAtTC9 > 3)
  Stranger = OT;
  
  if(ON.Contains ("mTC6")){
  Stranger = OT;
  PissedAtTC6 = 4;
  }
  
 }else{
 Stranger = null;

if(target)
if(ON.Contains ("xb")){
SlavuicNetwork.FoundExtraBig = target;
SlavuicNetwork.instance.PriorityWaypoint.position = target.position;
}
 
}
}

if(Watchmen || Mistitor){

  if(ON.Contains ("TC2")){
  if(Vector3.Distance(thisTransform.position, OT.position) < 500){
  Fear = OT;
  LayingLow = 3;
  }
}

if(ON.Contains ("TC0a") && PissedAtTC0a > 1 && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing0 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing0.transform.parent = thisTransform;
  }
  target = OT;
  
  if(!Attacking && PissedAtTC0a > 3){
  target = OT;
  Attacking = true;
  }
  }
  
  if(ON.Contains ("TC1") && PissedAtTC1 > 1 && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing1 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing1.transform.parent = thisTransform;
  }
  target = OT;
  
  if(!Attacking && PissedAtTC1 > 3){
  target = OT;
  Attacking = true;
  }
  }
  
  if(PissedAtTC3 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC3") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing2 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing2.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC3 > 3){
  target = OT;
  Attacking = true;
  }
  }
  
  if(PissedAtTC4 > 1)
  if(ON.Contains ("TC4") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing3 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC4 > 3){
  target = OT;
  Attacking = true;
  }
  }
  
  if(PissedAtTC6 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC6") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing4 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing4.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC6 > 3){
  target = OT;
  Attacking = true;
  }
  }
  
  if(PissedAtTC7 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC7") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing5 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing5.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC7 > 3){
  target = OT;
  Attacking = true;
  }
 }
 
  if(PissedAtTC8 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC8") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing6 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing6.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC8 > 3){
  target = OT;
  Attacking = true;
  }
 }
 
   if(PissedAtTC9 > 1)
  if(!ON.Contains ("cT"))
  if(ON.Contains ("TC9") && LayingLow < 1){
  Hunting = false;
  if(AttackSound){
  var TheThing7 = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing7.transform.parent = thisTransform;
  }
  target = OT;
  
  if(PissedAtTC9 > 3){
  target = OT;
  Attacking = true;
  }
 }

if(Mistitor)
if(!Leader)
if(ON.Contains ("TC5l"))
Leader = OT;
 
}else{

if(Divertor)
if(!Comrade)
if(ON.Contains ("TC5"))
Comrade = OT;

if(Divertor)
if(!Leader)
if(ON.Contains ("TC5l"))
Leader = OT;

}
if(Attacking)
Stranger = target;
}

if(Ogle > 0){
if(target)
if(target.name.Contains ("FC1"))
if(ON.Contains ("TC1"))
target = OT;
}

}

function Shoot () {
if(Watchmen || Mistitor){
if(Attacking && LayingLow < 1 && CanLaunch > 0)
Turret.Firing = true;
}
if(Divertor){

if(Stranger)
if(LayingLow < 1 && CanLaunch > 3){

var relativePoint = thisVTransform.InverseTransformPoint(Stranger.position);
if(relativePoint.y > 0)
if(relativePoint.x < 50 && relativePoint.x > -50)
if(Stranger.name.Contains ("TC0a") && PissedAtTC0a > 3 ||
   Stranger.name.Contains ("TC1") && PissedAtTC1 > 3 ||
   Stranger.name.Contains ("TC3") && PissedAtTC3 > 3 ||
   Stranger.name.Contains ("TC4") && PissedAtTC4 > 3 ||
   Stranger.name.Contains ("TC6") && PissedAtTC6 > 3 || 
   Stranger.name.Contains ("TC7") && PissedAtTC7 > 3 || 
   Stranger.name.Contains ("TC8") && PissedAtTC8 > 3 || 
   Stranger.name.Contains ("TC9") && PissedAtTC9 > 3){
   if(Vel > 20){
var _SpawnedObject1 = Instantiate(Mine, MineLayer.position, MineLayer.rotation);
    _SpawnedObject1.rigidbody.velocity = vRigidbody.velocity * 1;
    CanLaunch = 0;
    }
  }
}

}
}

function Targety () {

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);

if(Watchmen || Mistitor){
if(Hunting){
if(Vector3.Distance(thisTransform.position, Waypoint2.position) > 5000)
target = Waypoint2;

if(target == Waypoint2)
if(Vector3.Distance(thisTransform.position, Waypoint2.position) < 5000)
target = Waypoint;
}

if(Mistitor){
if(Leader && !Attacking){
target = Leader;
Follow = true;
}
}

}else{

if(Leader){
target = Leader;
Follow = true;
}
if(Comrade){
target = Comrade;
Follow = true;
}

}
}

function Refresher () {
if(Watchmen && !Vanguard)
if(Slavuic1Head == null || Slavuic2Head == null)
Hull.DamageIn(128, 0, 0, false);

if(Turret){
Turret.LeadDiv = Vel;
Turret.VelDir = VelDir;
}

TurnRight = false;
TurnLeft = false;
}

function Updater () {

if(Follow)
Catchup = 1;
else
Catchup = 0.5;

Parked = false;

if(Attacking){

if(target)
if(target.name.Contains ("TC"))
SlavuicNetwork.target = target;

if(target == Waypoint || target == Waypoint2){
StopAllCoroutines();
Attacking = false;
Hunting = true;
Reposition = false;
target = Waypoint;
}
}

if(target == null){
StopAllCoroutines();
Attacking = false;
Hunting = true;
Reposition = false;
target = Waypoint;
}

if(WorldInformation.instance.RestrictedArea){
if(Vector3.Distance(thisTransform.position, WorldInformation.instance.RestrictedArea.position) < 1000){
target = WorldInformation.instance.RestrictedArea;
Threatened = true;
}
}

if(target){
Clamp = Mathf.Clamp(Vel,10,100);

if(Vector3.Distance(thisTransform.position, target.position) < Clamp)
IsClose = true;
else
IsClose = false;

if(Threatened)
if(Vector3.Distance(thisTransform.position, target.position) > 1000){
target = Waypoint;
Threatened = false;
}

}

if(Watchmen || Mistitor){
if(target){

if(Attacking){

if(Vector3.Distance(thisTransform.position, target.position) > 1200){
Reposition = true;

Parked = false;
Approach = true;
CanLaunch = 0;

}else{

if(!Escape)
Reposition = false;
else
Reposition = true;

Parked = true;
Approach = false;
CanLaunch = 1;

if(Vector3.Distance(thisTransform.position, target.position) < 700){
SenseTargDir();
}else{
Escape = false;
}

}

if(Vector3.Distance(thisTransform.position, target.position) > 1500){

if(target.name.Contains ("TC0a") && PissedAtTC0a < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC1") && PissedAtTC1 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC3") && PissedAtTC3 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC4") && PissedAtTC4 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC7") && PissedAtTC7 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC8") && PissedAtTC8 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

if(target.name.Contains ("TC9") && PissedAtTC9 < 3){
target = Waypoint;
Attacking = false;
Hunting = true;
Reposition = false;
}

}

if (Physics.Linecast (Overview.position, target.position, targetLayers)){
Reposition = true;
CanLaunch = 0;
}

Stranger = target;

}else{

if(SlavuicNetwork.TC0aDeathRow > 0){
PissedAtTC0a = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC0a") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC1DeathRow > 0){
if(SlavuicNetwork.TC1DeathRow < 600){
PissedAtTC1 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC1") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}
}

}

if(SlavuicNetwork.TC3DeathRow > 0){
PissedAtTC3 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC3") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC4DeathRow > 0){
PissedAtTC4 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC4") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC6DeathRow > 0){
PissedAtTC6 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC6") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC7DeathRow > 0){
PissedAtTC7 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC7") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC8DeathRow > 0){
PissedAtTC8 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC8") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

if(SlavuicNetwork.TC9DeathRow > 0){
PissedAtTC9 = 4;
if(SlavuicNetwork.target)
if(SlavuicNetwork.target.name.Contains ("TC9") && SlavuicNetwork.Confirmed){
if(Watchmen || Mistitor){
target = SlavuicNetwork.target;
Hunting = false;
Attacking = true;
}
}

}

}
}

}else{
if(CanLaunch < 4)
CanLaunch += 1;
}

if(Attacking){
Trig.center = Vector3(0,0,0);
Trig.radius = 64;
Trig.height = 64;
}else{
Trig.center = Vector3(0,0,100);
Trig.radius = 150;
Trig.height = 500;
}

if(Stuck > 0)
Stuck -= 1;

if(Ogle > 0){
if(Vector3.Distance(thisTransform.position, target.position) < 32 || target == Waypoint){
Parked = true;
Ogle -= 1;
}

if(Ogle == 1){
Parked = false;
Reposition = false;
target = Waypoint;
}
}

if(LayingLow > 0){

LayingLow -= 1;

if(Fear)
if(target)
if(Vector3.Distance(Fear.position, target.position) < 300)
LayingLow += 1;
}

if(PissedAtTC0a > 4)
PissedAtTC0a = 4;
if(PissedAtTC1 > 4){
if(SlavuicNetwork.TC1DeathRow < 240)
SlavuicNetwork.TC1DeathRow = 240;
PissedAtTC1 = 4;
}
if(PissedAtTC3 > 4){
SlavuicNetwork.TC3DeathRow = 240;
PissedAtTC3 = 4;
}
if(PissedAtTC4 > 4){
SlavuicNetwork.TC4DeathRow = 240;
PissedAtTC4 = 4;
}
if(PissedAtTC6 > 4)
PissedAtTC6 = 4;

if(PissedAtTC7 > 4){
SlavuicNetwork.TC7DeathRow = 240;
PissedAtTC7 = 4;
}

if(PissedAtTC8 > 4){
SlavuicNetwork.TC8DeathRow = 240;
PissedAtTC8 = 4;
}

if(PissedAtTC9 > 4){
SlavuicNetwork.TC9DeathRow = 240;
PissedAtTC9 = 4;
}

Obstacle = false;

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
if(convNum < 99){
if(!Attacking){
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

function SlavSquat () {
if(target)
if(Slavuic1Body){

var relativePoint = thisVTransform.InverseTransformPoint(target.position);
LAndR = relativePoint.x;
FAndB = relativePoint.y;

if(Attacking){

if(Vector3.Distance(thisTransform.position, target.position) < 100){

CanLaunch = 0;

slavTarget = target;

if(slavAim < 0.12){
slavAim += 0.001;
}else{
if(slavAim < 1)
slavAim += 0.05;
}

if(!Slav1Up){
Slavuic1Gun.SetActive (true);
Slavuic1GunS.Firing = true;
Slavuic1Ani.CrossFade("Slav1Situp", 0.3f);
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos2.localPosition;
yield WaitForSeconds (0.3);
Slav1Up = true;
}

if(Slav1Up){

if(FAndB < 0 && FAndB > -16){
if(LAndR > 0){
Slavuic1Ani.CrossFade("Slav1SitupR", 0.5f);
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos3.localPosition;
}else{
Slavuic1Ani.CrossFade("Slav1SitupL", 0.5f);
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos3.localPosition;
}
}

if(FAndB > 0){
Slavuic1Ani.CrossFade("Slav1SitupB", 0.5f);
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos3.localPosition;
}
if(FAndB < -16){
Slavuic1Ani.CrossFade("Slav1Situp", 0.5f);
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos2.localPosition;
}
}

}else{

slavTarget = Waypoint;

slavAim = 0.1;

if(Slav1Up){
if(FAndB > 0){
Slavuic1Ani.CrossFade("Slav1SitupR", 0.3f);
yield WaitForSeconds (0.3);
Slavuic1Gun.SetActive (false);
Slavuic1GunS.Firing = false;
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos1.localPosition;
Slavuic1Ani.CrossFade("Slav1Sitdown", 0.3f);
Slav1Up = false;
}else{
Slavuic1Gun.SetActive (false);
Slavuic1GunS.Firing = false;
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos1.localPosition;
Slavuic1Ani.CrossFade("Slav1Sitdown", 0.5f);
Slav1Up = false;
}
}
}

}
if(!Attacking){

slavTarget = Waypoint;

slavAim = 0.1;

if(Slav1Up){
if(FAndB > 0){
Slavuic1Ani.CrossFade("Slav1SitupR", 0.3f);
yield WaitForSeconds (0.25);
Slavuic1Gun.SetActive (false);
Slavuic1GunS.Firing = false;
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos1.localPosition;
Slavuic1Ani.CrossFade("Slav1Sitdown", 0.3f);
Slav1Up = false;
}else{
Slavuic1Gun.SetActive (false);
Slavuic1GunS.Firing = false;
Slavuic1BodyJ.connectedAnchor = Slavuic1Pos1.localPosition;
Slavuic1Ani.CrossFade("Slav1Sitdown", 0.5f);
Slav1Up = false;
}
}

}
}
}

function SenseTargDir(){

var targPos = Vector3.Distance(thisTransform.position, target.position);

yield WaitForSeconds (0.5);

var Towards = targPos - 8;
  
  if(target){
  if(Vector3.Distance(thisTransform.position, target.position) < Towards){
  Escape = true;
  }else{
  if(Vector3.Distance(thisTransform.position, target.position) > 700)
  Escape = false;
  }
  }
  
}

function IsEscaping(lastPos : Vector3){

yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.2 && !IsClose && !Parked)
  Stuck = 5;
  
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
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello stranger! You need a lift?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Privet! You look lost. \n You need a ride?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("You want a ride?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Alright tovarishch! \n There is space for you."); vEntrance.DenyEntrance = false; return; }
}else{
if(speech.Contains ("hi") || speech.Contains ("hey") || speech.Contains ("yo")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Hello stranger! You want something?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Privet! You look lost."); return; }
}

if(speech.Contains ("blyat")){ convNum = 12; yield WaitForSeconds (2);
ReturnSpeech("Oh, a Thilian with basic slav skills! \n Now, do you need something?"); return; }

if(speech.Contains ("cyka")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Blyat!"); return;}

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Yes, we are stopping."); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, There's room for you."); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(HasSpace){
if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. \n Now do you want a lift or not?"); return;}
}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

if(speech.Contains ("drive")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok."); return; }

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, friend."); return; }
//===============================================================================
}

if(convNum == 11){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(HasSpace){
if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. \n Now do you want a lift or not?"); return;}
}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, friend."); return; }
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(HasSpace){
if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. \n Now do you want a lift or not?"); return;}
}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}

if(speech.Contains ("stop")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, friend."); return; }
//===============================================================================
}

if(convNum == 13){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 3; yield WaitForSeconds (4);
ReturnSpeech("What is wrong with you?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Do it, you cyka!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Just do it already!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Haha... Very funny cyka nahui."); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Oh, so you know basic slav language. \n That's great..."); return;}

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright. We'll stop here."); return; }
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

if(speech.Contains ("blyat")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Piss off, idi nahui!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You too."); return;}

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

if(speech.Contains ("blyat")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, I'll be off now."); return;}

if(speech.Contains ("cyka")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("go")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("drive")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes."); return; }

if(speech.Contains ("stop")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Alright. We'll stop here."); return; }
//===============================================================================
}

if(convNum == 21){
//===============================================================================
if(speech.Contains ("hi")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("hello")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Proshchay, idi nahui!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You know what? Yob tvoyu mat!"); return; }

if(speech.Contains ("blyat")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Shut up, Thili cyka!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Stop embarrassing yourself."); return; }

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
ReturnSpeech("Alright! \n Now get on with it, blyat!"); return; }

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
ReturnSpeech("Hello stranger! You need something?"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Privet! You look lost. \n You want directions?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("What, yours is broken?"); return; }

if(speech.Contains ("blyat")){ convNum = 12; yield WaitForSeconds (2);
ReturnSpeech("Oh, a Thilian with basic slav skills! \n Now, do you need something?"); return; }

if(speech.Contains ("cyka")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Blyat!"); return;}

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Yes, we are stopping."); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then, go ahead."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. \n Now what do want?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

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

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, jump out and get in!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Is that all you wanted to say?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Is that all you wanted to say?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}
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
ReturnSpeech("Do it, you cyka!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Just do it already!"); vEntrance.DenyEntrance = false; return; }
}

if(speech.Contains ("blyat")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Haha... Very funny cyka nahui."); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Oh, so you know basic slav language. \n That's great..."); return;}
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

if(speech.Contains ("blyat")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Piss off, idi nahui!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You too."); return;}

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

if(speech.Contains ("blyat")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, I'll be off now."); return;}

if(speech.Contains ("cyka")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

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
ReturnSpeech("Proshchay, idi nahui!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You know what? Yob tvoyu mat!"); return; }

if(speech.Contains ("blyat")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Shut up, Thili cyka!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Stop embarrassing yourself."); return; }

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

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Pick another ride. \n You already got one chance."); return; }

if(speech.Contains ("stop")){ convNum = 21; yield WaitForSeconds (2);
ReturnSpeech("Alright! \n Now get on with it, blyat!"); return; }

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
ReturnSpeech("Opa!"); return;}

if(speech.Contains ("hello") || speech.Contains ("greet")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Privet! \n You want something?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Wait, what?"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("What, your vessel is kaput?"); return; }

if(speech.Contains ("blyat")){ convNum = 12; yield WaitForSeconds (2);
ReturnSpeech("Oh, a Thilian with basic slav skills! \n Now, do you need something?"); return; }

if(speech.Contains ("cyka")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Blyat!"); return;}

if(speech.Contains ("stop")){ convNum = 11; yield WaitForSeconds (2);
ReturnSpeech("Oy blyat. What now?"); return; }
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What, you want a ride?"); return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, yes. \n Now what do you want?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}

if(speech.Contains ("go")){ convNum = 2; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }

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

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, jump out and get in!"); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Is that all you wanted to say?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}
//===============================================================================
}

if(convNum == 12){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("What is it?"); return;}

if(speech.Contains ("no")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Okey. Was there something else?"); return; }

if(speech.Contains ("in") || speech.Contains ("on")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Blin!"); vEntrance.DenyEntrance = false; return; }

if(HasSpace)
if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Yes, just jump in."); vEntrance.DenyEntrance = false; return; }

if(speech.Contains ("blyat")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Is that all?"); return;}

if(speech.Contains ("cyka")){ convNum = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok, so you know basic slav language. \n Now what do you want?"); return;}
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
ReturnSpeech("I think we need to go."); return; }

if(speech.Contains ("blyat")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech("Haha... Very funny cyka nahui."); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Oh, so you know basic slav language. \n That's great..."); return;}
//===============================================================================
}

if(convNum == 14){
//===============================================================================
if(speech.Contains ("yes")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return;}

if(speech.Contains ("no")){ convNum = 4; Ogle = 2; yield WaitForSeconds (4);
ReturnSpeech(". . ."); return; }

if(speech.Contains ("in") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think you can use yours \n as a bunker for now."); return; }

if(speech.Contains ("ride") || speech.Contains ("on")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("I think I'll pass on that now."); return; }

if(speech.Contains ("blyat")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Piss off, idi nahui!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You too."); return;}

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

if(speech.Contains ("blyat")){ convNum = 3; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well, I'll be off now."); return;}

if(speech.Contains ("cyka")){ convNum = 3; yield WaitForSeconds (2);
ReturnSpeech(". . ."); return; }

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
ReturnSpeech("Proshchay, idi nahui!"); return; }

if(speech.Contains ("ride") || speech.Contains ("lift")){ convNum = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("You know what? Yob tvoyu mat!"); return; }

if(speech.Contains ("blyat")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Shut up, Thili cyka!"); return;}

if(speech.Contains ("cyka")){ convNum = 4; yield WaitForSeconds (2);
ReturnSpeech("Stop embarrassing yourself."); return; }

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
ReturnSpeech("Pick another ride!"); return; }

if(speech.Contains ("stop")){ convNum = 21; yield WaitForSeconds (2);
ReturnSpeech("Alright! \n Now get on with it, blyat!"); return; }

convNum = 4; boredom = 4; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Goodbye!"); return;
//===============================================================================
}
}

if(convNum == 5){
if(SlavuicNetwork.TC1DeathRow < 10){
if(mode < 2){
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Provalivay!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}

if(speech.Contains ("sorry")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Ok, bug off cyka!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return; }

if(speech.Contains ("please")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Now stop bothering!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return; }

if(speech.Contains ("stop")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Try again and you'll be \n the one stopping, period!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return; }

if(speech.Contains ("excuse")){ convNum = 99; yield WaitForSeconds (8);
ReturnSpeech("Ok, now fuck off pidor!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}
//===============================================================================
}else{
//===============================================================================
if(speech.Contains ("ok")){ convNum = 6; yield WaitForSeconds (4);
ReturnSpeech("Ok, what? \n You want a fair fight?"); Ogle = 2; return;}

if(speech.Contains ("sorry")){ convNum = 6; yield WaitForSeconds (4);
ReturnSpeech("Hahaha! Why don't you \n shoot us again, urod!"); Ogle = 2; return; }

if(speech.Contains ("please")){ convNum = 6; yield WaitForSeconds (4);
ReturnSpeech("Not buying it!"); Ogle = 2; return; }

if(speech.Contains ("stop")){ convNum = 6; yield WaitForSeconds (4);
ReturnSpeech("We'll stop once you stop!"); Ogle = 2; return; }

if(speech.Contains ("excuse")){ convNum = 6; yield WaitForSeconds (4);
ReturnSpeech("Yeah, once you \n fuck off blyat!"); Ogle = 2; return;}
//===============================================================================
}
}else{
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; Ogle = 2; yield WaitForSeconds (1);
ReturnSpeech("Poshel nahui!"); return;}

if(speech.Contains ("sorry")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Idi k chertu!"); return; }

if(speech.Contains ("please")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Zatkni cyka!"); return; }

if(speech.Contains ("stop")){ convNum = 99; Ogle = 2; yield WaitForSeconds (1);
ReturnSpeech("Eat blins urod!"); return; }

if(speech.Contains ("excuse")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Wanting us to excuse you now? \n Fuck off, idi nahui!"); return;}
//===============================================================================
}
}

if(convNum == 6){
if(SlavuicNetwork.TC1DeathRow < 10){
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("I'll let you go, \n for now."); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}

if(speech.Contains ("sorry")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Don't do it again \n or you'll be sorry."); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}

if(speech.Contains ("please")){ convNum = 99; yield WaitForSeconds (4);
ReturnSpeech("Ok, now stay away from us!"); Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}

if(speech.Contains ("stop")){ convNum = 99; yield WaitForSeconds (4);
Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}

if(speech.Contains ("excuse")){ convNum = 99; yield WaitForSeconds (4);
Ogle = 2; Attacking = false; PissedAtTC1 = 0; return;}
//===============================================================================
}else{
//===============================================================================
if(speech.Contains ("ok")){ convNum = 99; Ogle = 2; yield WaitForSeconds (1);
ReturnSpeech("Poshel nahui!"); return;}

if(speech.Contains ("sorry")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Idi k chertu!"); return; }

if(speech.Contains ("please")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Zatkni cyka!"); return; }

if(speech.Contains ("stop")){ convNum = 99; Ogle = 2; yield WaitForSeconds (1);
ReturnSpeech("Eat blins cyka!"); return; }

if(speech.Contains ("excuse")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Wanting us to excuse you now? \n Fuck off, idi nahui!"); return;}
//===============================================================================
}
}

if(convNum > 0){

if(boredom < 3){
if(speech.Contains ("bye") || speech.Contains ("see") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Goodbye."); Ogle = 2; return;}
if(speech.Contains ("thank") || speech.Contains ("good") || speech.Contains ("like")){ yield WaitForSeconds (2);
ReturnSpeech("Later, tovarishch!"); Ogle = 2; return;}
}

//===============================================================================
if(speech.Contains ("fuck you")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well fuck you too idi nahui!"); return; }
if(speech.Contains ("fuck off")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Ok. Thili nahui"); return; }
if(speech.Contains ("go away")){ convNum = 99; Ogle = 2; yield WaitForSeconds (2);
ReturnSpeech("Well then."); return; }
//===============================================================================
}else{

if(boredom < 3)
if(speech.Contains ("bye") || speech.Contains ("cya") || speech.Contains ("fare") || speech.Contains ("later")){ yield WaitForSeconds (2);
ReturnSpeech("Ok."); Ogle = 2; return;}
}

yield WaitForSeconds (2);
if(boredom == 0){ReturnSpeech("What?");}
if(boredom == 1){ReturnSpeech("What exactly do you want?"); convNum = 1;}
if(boredom == 2){ReturnSpeech("Just get to the point. \n We can't stay here forever."); convNum = 1;}
if(boredom == 3){ReturnSpeech("Well, good luck out there."); convNum = 4; Ogle = 2;}
if(boredom == 4){ReturnSpeech("Just go away."); convNum = 4; Ogle = 2;}
if(boredom == 5){ReturnSpeech("I told you. Go away!"); convNum = 4; Ogle = 2;}
if(boredom == 6){ReturnSpeech("If you don't leave now, \n I'll force you to!"); convNum = 4; Ogle = 2;}
if(boredom == 7){ReturnSpeech("Pizdets!"); convNum = 5; PissedAtTC1 = 4; Ogle = 2;}
boredom += 1;
}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC5";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}