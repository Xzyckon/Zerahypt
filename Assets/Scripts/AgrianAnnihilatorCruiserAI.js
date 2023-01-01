var target : Transform;
var Waypoint : Transform;

var Forward : Transform;
var viewPoint : Transform;

var AIAnchor : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var TPivot1HJ : HingeJoint;
var TPivot2HJ : HingeJoint;
var TPivot3HJ : HingeJoint;
var TPivot4HJ : HingeJoint;

var TPivot1HJTP = 0;
var TPivot2HJTP = 0;
var TPivot3HJTP = 0;
var TPivot4HJTP = 0;

var Turret1TF : Transform;
var Turret2TF : Transform;
var Turret3TF : Transform;
var Turret4TF : Transform;

var T1ElevationJoint : HingeJoint;
var T2ElevationJoint : HingeJoint;
var T3ElevationJoint : HingeJoint;
var T4ElevationJoint : HingeJoint;

var T1TraverseJoint : HingeJoint;
var T2TraverseJoint : HingeJoint;
var T3TraverseJoint : HingeJoint;
var T4TraverseJoint : HingeJoint;

var Muzzle1 : Transform;
var Muzzle2 : Transform;
var Muzzle3 : Transform;
var Muzzle4 : Transform;

var Gun1Model : Transform;
var Gun2Model : Transform;
var Gun3Model : Transform;
var Gun4Model : Transform;

var Gun1Fire : boolean;
var Gun2Fire : boolean;
var Gun3Fire : boolean;
var Gun4Fire : boolean;

var G1RN = 0;
var G2RN = 0;
var G3RN = 0;
var G4RN = 0;

var RecoilCurve : AnimationCurve = new AnimationCurve();

var Bomb : GameObject;
var MuzzleB : Transform;
var BombModel : GameObject;
var BombGateSFX : GameObject;
var BombGateTF : Transform;

var LaunchingBomb : boolean;
var BombLaunchTimer = 0;
var BombLauncherHJ : HingeJoint;
var BombLauncherHJTP = 0;

var VPoint : Transform;

var AimForce = 300;
var TurnForce = 200;

var DirForce = 200;

var RayDist = 0;

var TorqueForce = 20000;

var PropelEffect : GameObject;

var RayBurst : GameObject;
var LastPos : GameObject;

var Dist : float = 2;

var velMag : float;

var Anger = 0;

var inView : boolean;

var Attacking : boolean;
var Obstacle : boolean;
var Floorstacle : boolean;
var Still : boolean;
var TurnLeft : boolean;
var TurnRight : boolean;

var SD = 0;
var SDf = 0;
var SDl = 0;
var SDr = 0;
var SDa = 2;

var SD2 = 0;
var SD2f = 0;
var SD2l = 0;
var SD2r = 0;
var SD2a = 2;

var FAndB : float = 0;
var LAndR : float = 0;
var UAndD : float = 0;

var RightDist : float = 32;
var LeftDist : float = 32;

var StrafeLeft : boolean;
var StrafeRight : boolean;

var OnHull : boolean;
var StillOnHull = 0;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var FoundSmall : boolean;
var FoundMedium : boolean;
var FoundBig : boolean;

var ExecuteTC1 : boolean;
var ExecuteTC4 : boolean;
var ExecuteTC6 : boolean;
var ExecuteTC7 : boolean;
var ExecuteTC8 : boolean;
var ExecuteTC9 : boolean;

var targetLayers : LayerMask;
var targetLayers2 : LayerMask;

var MtargetLayers : LayerMask;

var DangerDirection : Vector3;

var DangerSense = 0;

var Pursuit = 0;

var RayBurstTime : float = 1.5;

var Damaged : boolean;

InvokeRepeating("Counter", 1, 1);

InvokeRepeating("LeaveMarker", 3, 3);

InvokeRepeating("Shooty", 1, 0.8);

function Start (){

}

function Update () {

if(Damaged)
return;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

velMag = vRigidbody.velocity.magnitude;

Vel = -localV.y * 5;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);
else
Dist = 64;

var VelClamp = Mathf.Clamp(Vel,100,1000);
var VelPlus = VelClamp + 100;

var hit : RaycastHit;
var newRot : Vector3 = (VPoint.forward * 0.6f ).normalized;

Debug.DrawRay (VPoint.position + VPoint.forward * 40 + VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
Debug.DrawRay (VPoint.position + VPoint.forward * 40 + -VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
if (Physics.Raycast (VPoint.position + VPoint.forward * 40 + VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)
 || Physics.Raycast (VPoint.position + VPoint.forward * 40 + -VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)){
		Obstacle = true;
		}

Debug.DrawRay (VPoint.position + VPoint.forward * 18 + -VPoint.up * 8 + VPoint.right * RayDist, VPoint.forward * VelPlus, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * 18 + -VPoint.up * 8 + VPoint.right * RayDist, VPoint.forward, hit, VelPlus, targetLayers)) {
     TurnLeft = true;
     RightDist = hit.distance;
 }else{
 RightDist = 512;
 }

Debug.DrawRay (VPoint.position + VPoint.forward * 18 + -VPoint.up * 8 + -VPoint.right * RayDist, VPoint.forward * VelPlus, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * 18 + -VPoint.up * 8 + -VPoint.right * RayDist, VPoint.forward, hit, VelPlus, targetLayers)) {
		TurnRight = true;
		LeftDist = hit.distance;
 }else{
  LeftDist = 512;
 }
 
 if(RightDist > LeftDist){
     TurnLeft = false;
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
     TurnRight = false;
     TurnLeft = true;
     }
 
newRot = (-VPoint.up * 0.6f).normalized;

Debug.DrawRay (VPoint.position + VPoint.forward * 70, newRot * 50, Color.blue);
Debug.DrawRay (VPoint.position, newRot * 50f, Color.blue);
if (Physics.Raycast (VPoint.position + VPoint.forward * 70, newRot, 50, targetLayers) ||
    Physics.Raycast (VPoint.position, newRot, 50, targetLayers)) {
     if(velMag > 50)
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }

}

private var NewRotation : Quaternion;
function FixedUpdate () {

if(Damaged){

vRigidbody.AddTorque(-thisVTransform.forward * 8000000);

return;
}

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(target)
var relativePoint = thisVTransform.InverseTransformPoint(target.position);

LAndR = relativePoint.x;
FAndB = relativePoint.y;
UAndD = relativePoint.z;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

     if(RayDist < 50)
     RayDist += 2;
     if(RayDist == 50)
     RayDist = 2;

if(target){

if(!TurnLeft && !TurnRight && !Obstacle)
if(Dist > 500)
if(vRigidbody.angularVelocity.magnitude < 0.5){
  vRigidbody.AddForceAtPosition((target.position - thisVTransform.position).normalized * TurnForce, -thisVTransform.up * 50);
  vRigidbody.AddForceAtPosition((target.position - thisVTransform.position).normalized * -TurnForce, thisVTransform.up * 50);

}

var RelPoint1 = Turret1TF.InverseTransformPoint(target.position);
var RelPoint2 = Turret2TF.InverseTransformPoint(target.position);
var RelPoint3 = Turret3TF.InverseTransformPoint(target.position);
var RelPoint4 = Turret4TF.InverseTransformPoint(target.position);

if(Attacking){

Vert = Mathf.Clamp(-RelPoint1.z * AimForce / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint1.x * AimForce / Dist,-64,64);
T1ElevationJoint.motor.targetVelocity = Vert;
T1TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint2.z * AimForce / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint2.x * AimForce / Dist,-64,64);
T2ElevationJoint.motor.targetVelocity = Vert;
T2TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint3.z * AimForce / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint3.x * AimForce / Dist,-64,64);
T3ElevationJoint.motor.targetVelocity = Vert;
T3TraverseJoint.motor.targetVelocity = Hori;

Vert = Mathf.Clamp(-RelPoint4.z * AimForce / Dist,-64,64);
Hori = Mathf.Clamp(RelPoint4.x * AimForce / Dist,-64,64);
T4ElevationJoint.motor.targetVelocity = Vert;
T4TraverseJoint.motor.targetVelocity = Hori;

}else{

RelPoint1 = Turret1TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint1.z,-64,64);
Hori = Mathf.Clamp(RelPoint1.x,-64,64);
T1ElevationJoint.motor.targetVelocity = Vert;
T1TraverseJoint.motor.targetVelocity = Hori;

RelPoint2 = Turret2TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint2.z,-64,64);
Hori = Mathf.Clamp(RelPoint2.x,-64,64);
T2ElevationJoint.motor.targetVelocity = Vert;
T2TraverseJoint.motor.targetVelocity = Hori;

RelPoint3 = Turret3TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint3.z,-64,64);
Hori = Mathf.Clamp(RelPoint3.x,-64,64);
T3ElevationJoint.motor.targetVelocity = Vert;
T3TraverseJoint.motor.targetVelocity = Hori;

RelPoint4 = Turret4TF.InverseTransformPoint(Forward.position);
Vert = Mathf.Clamp(-RelPoint4.z,-64,64);
Hori = Mathf.Clamp(RelPoint4.x,-64,64);
T4ElevationJoint.motor.targetVelocity = Vert;
T4TraverseJoint.motor.targetVelocity = Hori;

}

}



	if (DangerSense < 1 && target != null) {
	    
            NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 200);
	}
	if (DangerSense > 0 && DangerDirection != Vector3.zero) {
            NewRotation = Quaternion.LookRotation(DangerDirection);
            thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, 1000000);
	}
	

if(target)
if(!Obstacle && !Still){

if(Anger > 50){

if(Pursuit < 4){

if(Dist < 400){

DirForce = 200000;
  
TurnForce = 2400000;

if(-FAndB > 300){
if(-localV.y < 80)
vRigidbody.AddForce(-thisVTransform.up * DirForce);
}else{
if(inView){
if(-FAndB < 100){
if(localV.y < 80)
vRigidbody.AddForce(thisVTransform.up * DirForce);
}else{
vRigidbody.AddForce(thisVTransform.up * -localV.y * 20000);
}
}else{
if(-localV.y < 80)
vRigidbody.AddForce(-thisVTransform.up * DirForce);
}
}
  
  
  }else{
  
  if(vRigidbody.angularVelocity.magnitude < 0.02)
  if(-FAndB > 600){
  if(-localV.y < 2000){
  if(DirForce < 16000000)
  DirForce += 100000;
  vRigidbody.AddForce(-thisVTransform.up * DirForce);
  }
  //Debug.Log(FAndB);
  //Debug.Break();
  }
  TurnForce = 2400000;
  
  }
  
  if(-FAndB < 500)
  if(-localV.y > 100)
  vRigidbody.AddForce(-thisVTransform.up * -24000000);
  
  }else{
  
  if(Dist < 150)
  vRigidbody.AddForce(thisVTransform.up * -localV.y * 20000);
  
  if(Dist > 100)
  if(-localV.y < 360)
  vRigidbody.AddForce(-thisVTransform.up * 800000);
  
  if(Dist < 300)
  if(FAndB > 0)
  if(-localV.y > 160)
  vRigidbody.AddForce(-thisVTransform.up * -24000000);
  
  }
  
if(UAndD > 0)
  vRigidbody.AddForce(thisVTransform.forward * 400000);
  
}else{

  if(Dist < 100){
  if(localV.y < 80)
  vRigidbody.AddForce(-thisVTransform.up * -200000);
  }
  if(Dist > 150){
  if(-localV.y < 80)
  vRigidbody.AddForce(-thisVTransform.up * 200000);
  }
}

}

if(Floorstacle){
if(Pursuit < 4){
vRigidbody.AddTorque(-thisVTransform.right * 16000000);
}else{
vRigidbody.AddTorque(-thisVTransform.right * 32000000);
}
}

if(Obstacle){
if(-localV.y > 25){

vRigidbody.AddForce(-thisVTransform.up * 30000 * localV.y);
}

if(TurnLeft || TurnRight)
  vRigidbody.AddForce(-thisVTransform.up * 80000);

}


if(Still){

if(Attacking){
if(!inView){
if(!LaunchingBomb && BombLaunchTimer == 0){
if(target){
if(target.name.Contains ("TC") && UAndD < 0 && velMag < 250){
BombModel.SetActive (true);
BombLaunchTimer = 7;
LaunchingBomb = true;
LaunchBomb();
}
}
}
}
}

}else{

Debug.DrawRay (thisTransform.position + thisTransform.forward * 150 + -thisTransform.up * 10, thisTransform.right * 150, Color.green);
Debug.DrawRay (thisTransform.position + thisTransform.forward * 150 + -thisTransform.up * 10, -thisTransform.right * 150, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 150 + -thisTransform.up * 10, thisTransform.right, 150, MtargetLayers)){
vRigidbody.AddTorque(thisVTransform.forward * -16000000);
Obstacle = true;
}
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 150 + -thisTransform.up * 10, -thisTransform.right, 150, MtargetLayers)){
vRigidbody.AddTorque(thisVTransform.forward * 16000000);
Obstacle = true;
}

if(TurnRight && !TurnLeft){
  vRigidbody.AddTorque(-thisVTransform.forward * -16000000);
  vRigidbody.AddForce(thisVTransform.right * 160000);
}

if(TurnLeft && !TurnRight){
  vRigidbody.AddTorque(-thisVTransform.forward * 16000000);
  vRigidbody.AddForce(thisVTransform.right * -160000);
}

if(TurnLeft && TurnRight){
  vRigidbody.AddTorque(-thisVTransform.forward * -16000000);
  vRigidbody.AddForce(thisVTransform.right * 160000);
}

if(Attacking){
if(!LaunchingBomb && BombLaunchTimer == 0){
if(target){
if(target.name.Contains ("xb") && UAndD < 0 && velMag < 250){
BombModel.SetActive (true);
BombLaunchTimer = 7;
LaunchingBomb = true;
LaunchBomb();
}
}
}
}
}




if(target)
if(OnHull && target.name.Contains ("TC")){
  vRigidbody.AddTorque(-thisVTransform.up * 16000000);
  }



if(!TurnLeft && !TurnRight && !Obstacle && !StrafeLeft && !StrafeRight){

if(LAndR < -1){
vRigidbody.AddTorque(thisVTransform.forward * TorqueForce);
}

if(LAndR > 1){
vRigidbody.AddTorque(thisVTransform.forward * -TorqueForce);
}

}




if(Anger > 100){

if(TPivot1HJTP < 90)
TPivot1HJTP += 1;
if(TPivot2HJTP < 90)
TPivot2HJTP += 1;
if(TPivot3HJTP < 90)
TPivot3HJTP += 1;
if(TPivot4HJTP < 90)
TPivot4HJTP += 1;

if(TPivot1HJTP > 89){
TPivot1HJTP = 90;
Attacking = true;
}

}else{

if(TPivot1HJTP > 0)
TPivot1HJTP -= 1;
if(TPivot2HJTP > 0)
TPivot2HJTP -= 1;
if(TPivot3HJTP > 0)
TPivot3HJTP -= 1;
if(TPivot4HJTP > 0)
TPivot4HJTP -= 1;

if(TPivot1HJTP < 89)
Attacking = false;

}




if(LaunchingBomb){
if(BombLauncherHJTP < 22)
BombLauncherHJTP += 1;
}else{
if(BombLauncherHJTP > 0)
BombLauncherHJTP -= 1;
}


BombLauncherHJ.spring.targetPosition = -BombLauncherHJTP;

TPivot1HJ.spring.targetPosition = -TPivot1HJTP;
TPivot2HJ.spring.targetPosition = -TPivot2HJTP;
TPivot3HJ.spring.targetPosition = -TPivot3HJTP;
TPivot4HJ.spring.targetPosition = -TPivot4HJTP;

if(Gun1Fire){
G1RN += 1;
if(G1RN > 40){
G1RN = 0;
Gun1Fire = false;
}
Gun1Model.localPosition.y = RecoilCurve.Evaluate(G1RN);
}
if(Gun2Fire){
G2RN += 1;
if(G2RN > 40){
G2RN = 0;
Gun2Fire = false;
}
Gun2Model.localPosition.y = RecoilCurve.Evaluate(G2RN);
}
if(Gun3Fire){
G3RN += 1;
if(G3RN > 40){
G3RN = 0;
Gun3Fire = false;
}
Gun3Model.localPosition.y = RecoilCurve.Evaluate(G3RN);
}
if(Gun4Fire){
G4RN += 1;
if(G4RN > 40){
G4RN = 0;
Gun4Fire = false;
}
Gun4Model.localPosition.y = RecoilCurve.Evaluate(G4RN);
}




}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;


if(Vector3.Distance(thisTransform.position, OT.position) < 512){

if(ON.Contains ("TFC0a")){
if(PissedAtTC0a < 270)
PissedAtTC0a += 100;
}

if(ON.Contains ("TFC1")){
if(PissedAtTC1 < 270)
PissedAtTC1 += 100;
AgrianNetwork.instance.TC1CriminalLevel += 10;
}

if(ON.Contains ("TFC3")){
if(PissedAtTC3 < 270)
PissedAtTC3 += 100;
}

if(ON.Contains ("TFC4")){
if(PissedAtTC4 < 270)
PissedAtTC4 += 100;
AgrianNetwork.instance.TC4CriminalLevel += 10;
}

if(ON.Contains ("TFC5")){
if(PissedAtTC5 < 270)
PissedAtTC5 += 100;
AgrianNetwork.instance.TC5CriminalLevel += 10;
}

if(ON.Contains ("TFC6")){
if(PissedAtTC6 < 270)
PissedAtTC6 += 100;
AgrianNetwork.instance.TC6CriminalLevel += 10;
}

if(ON.Contains ("TFC7")){
if(PissedAtTC7 < 270)
PissedAtTC7 += 100;
AgrianNetwork.instance.TC7CriminalLevel += 10;
}

if(ON.Contains ("TFC8")){
if(PissedAtTC8 < 270)
PissedAtTC8 += 100;
AgrianNetwork.instance.TC8CriminalLevel += 10;
}

if(ON.Contains ("TFC9")){
if(PissedAtTC9 < 270)
PissedAtTC9 += 100;
AgrianNetwork.instance.TC9CriminalLevel += 10;
}

}



if(other.rigidbody)
if(!ON.Contains ("TFC2"))
if(ON.Contains ("TFC")){

if(target)
if(target.name.Contains ("TC")){
if(Anger < 270)
Anger += 10;
}else{

if(Anger < 1){
if(DangerSense < 1){
  
Anger = 60;
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}else{

if(target)
if (!target.name.Contains ("TC"))
Anger = 1;

}

if(DangerSense > 0){
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}
  
}

}

// --------------------------------------------------------------------------------------------------

function VicinityCheck () {

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("TC");

//var Blip = Resources.Load("Prefabs/RadarBlip", GameObject) as GameObject;
 
for (var go : GameObject in gos) {

ON = go.name;
OT = go.transform;

if(ON.Contains ("tTC"))
return;

if(Vector3.Distance(thisTransform.position, OT.position) < 6000){

if(target != null){

if(ON.Contains ("TC0a") && PissedAtTC0a > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC3") && PissedAtTC3 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC6") && PissedAtTC6 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(!ON.Contains ("sTC4"))
if(ON.Contains ("TC4") && PissedAtTC4 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC7") && PissedAtTC7 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC5") && PissedAtTC5 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC1") && PissedAtTC1 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC8") && PissedAtTC8 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC9") && PissedAtTC9 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 170;
  DangerSense = 0;
  }
  
}

}

}
}

function LaunchBomb () {

Instantiate(BombGateSFX, BombGateTF.position, BombGateTF.rotation);

yield WaitForSeconds (0.5);

BombModel.SetActive (false);

var _SpawnedObject = Instantiate(Bomb, MuzzleB.position, MuzzleB.rotation);
    _SpawnedObject.rigidbody.velocity = vRigidbody.velocity * 1;
    _SpawnedObject.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.2);

Instantiate(BombGateSFX, BombGateTF.position, BombGateTF.rotation);

LaunchingBomb = false;

}

// (RAY)--------------------------------------------------------------------------------------------------

function FireRayBurst () {

var hit : RaycastHit;

if(target != null)
if (target.name.Contains ("TC") && Dist < 1000)
if (Physics.Raycast (Muzzle1.position + Muzzle1.forward * 8, Muzzle1.forward, hit, 2000, targetLayers2)){

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;


if(!hit.collider.name.Contains("C2"))
if(hit.collider.name.Contains ("TC") && !hit.collider.name.Contains ("csTC") && velMag < 400){
Gun1Fire = true;
Instantiate(RayBurst, Muzzle1.position, Muzzle1.rotation);

}
}

yield WaitForSeconds (0.2);

if(target != null)
if (target.name.Contains ("TC") && Dist < 2000)
if (Physics.Raycast (Muzzle2.position + Muzzle2.forward * 8, Muzzle2.forward, hit, 2000, targetLayers2)){

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(!hit.collider.name.Contains("C2"))
if(hit.collider.name.Contains ("TC") && !hit.collider.name.Contains ("csTC") && velMag < 400){
Gun2Fire = true;
Instantiate(RayBurst, Muzzle2.position, Muzzle2.rotation);

}
}

yield WaitForSeconds (0.2);

if(target != null)
if (target.name.Contains ("TC") && Dist < 2000)
if (Physics.Raycast (Muzzle3.position + Muzzle3.forward * 8, Muzzle3.forward, hit, 2000, targetLayers2)){

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(!hit.collider.name.Contains("C2"))
if(hit.collider.name.Contains ("TC") && !hit.collider.name.Contains ("csTC") && velMag < 400){
Gun3Fire = true;
Instantiate(RayBurst, Muzzle3.position, Muzzle3.rotation);

}
}

yield WaitForSeconds (0.2);

if(target != null)
if (target.name.Contains ("TC") && Dist < 2000)
if (Physics.Raycast (Muzzle4.position + Muzzle4.forward * 8, Muzzle4.forward, hit, 2000, targetLayers2)){

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(hit.collider.name.Contains("TL"))
hit.collider.radius = 0.1;

if(!hit.collider.name.Contains("C2"))
if(hit.collider.name.Contains ("TC") && !hit.collider.name.Contains ("csTC") && velMag < 400){
Gun4Fire = true;
Instantiate(RayBurst, Muzzle4.position, Muzzle4.rotation);

}
}

}

function Shooty (){
if(Attacking)
FireRayBurst();
}

function Notice () {

if(target != null){

var lastTPos : Vector3 = target.transform.position;

yield WaitForSeconds (0.2);

if(target != null)
if(Anger > 100){
if(Vector3.Distance(target.transform.position, lastTPos) > 10 && target.name.Contains ("TC") && Dist < 5000){

if(target.name.Contains ("TC1"))
AgrianNetwork.instance.TC1CriminalLevel += 10;

if(target.name.Contains ("TC4"))
AgrianNetwork.instance.TC4CriminalLevel += 10;

if(target.name.Contains ("TC5"))
AgrianNetwork.instance.TC5CriminalLevel += 10;

if(target.name.Contains ("TC6"))
AgrianNetwork.instance.TC6CriminalLevel += 10;

if(target.name.Contains ("TC7"))
AgrianNetwork.instance.TC7CriminalLevel += 10;

if(target.name.Contains ("TC8"))
AgrianNetwork.instance.TC8CriminalLevel += 10;

if(target.name.Contains ("TC9"))
AgrianNetwork.instance.TC9CriminalLevel += 10;

if(Pursuit < 8)
Pursuit += 1;
}else{
Pursuit -= 1;
}
}

}
}

function Counter (){

if(Damaged)
return;

var hitV : RaycastHit;

if(target == null){

if(Anger > 100)
Anger = 20;

target = Forward;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}

if(target){
if(!target.name.Contains ("TC")){
if(DangerSense < 1)
TorqueForce = 0;

if(Anger > 50)
Anger -= 50;
}else{

if(target.name.Contains ("TC2_P"))
WorldInformation.PiriExposed = 120;

}

if(AgrianNetwork.TC1CriminalLevel > 500 || PissedAtTC1 > 200)
ExecuteTC1 = true;
if(AgrianNetwork.TC4CriminalLevel > 500 || PissedAtTC4 > 200)
ExecuteTC4 = true;
if(AgrianNetwork.TC6CriminalLevel > 500 || PissedAtTC6 > 200)
ExecuteTC6 = true;
if(AgrianNetwork.TC7CriminalLevel > 500 || PissedAtTC7 > 200)
ExecuteTC7 = true;
if(AgrianNetwork.TC8CriminalLevel > 500 || PissedAtTC8 > 200)
ExecuteTC8 = true;
if(AgrianNetwork.TC9CriminalLevel > 500 || PissedAtTC9 > 200)
ExecuteTC9 = true;

if(Attacking){

viewPoint.LookAt(target);

       Debug.DrawRay (viewPoint.position, viewPoint.forward * Dist, Color.red);
if (Physics.Raycast (viewPoint.position, viewPoint.forward, Dist, MtargetLayers)){
inView = false;
}else{
inView = true;
}

}

}

if(target != null){

if(target.name.Contains ("sT"))
FoundSmall = true;
if(target.name.Contains ("mT"))
FoundMedium = true;
if(target.name.Contains ("bT"))
FoundBig = true;

}

  if(ExecuteTC1){
  PissedAtTC1 = 210;
  if(Anger < 100 && target.name.Contains ("TC1"))
  Anger = 170;
  }
  if(ExecuteTC4){
  PissedAtTC4 = 210;
  if(Anger < 100 && target.name.Contains ("TC4"))
  Anger = 170;
  }
  if(ExecuteTC6){
  PissedAtTC6 = 210;
  if(Anger < 100 && target.name.Contains ("TC6"))
  Anger = 170;
  }
  if(ExecuteTC7){
  PissedAtTC7 = 210;
  if(Anger < 100 && target.name.Contains ("TC7"))
  Anger = 170;
  }
  if(ExecuteTC8){
  PissedAtTC8 = 210;
  if(Anger < 100 && target.name.Contains ("TC8"))
  Anger = 170;
  }
  if(ExecuteTC9){
  PissedAtTC9 = 210;
  if(Anger < 100 && target.name.Contains ("TC9"))
  Anger = 170;
  }

if(Vector3.Distance(thisTransform.position, target.position) > 500)
TorqueForce = -20000000;

if(Anger == 1){
DangerSense = 0;
Anger = 0;

target = Forward;
vRigidbody.angularDrag = 2;
}

if(AgrianNetwork.instance.RedAlertTime > 1){
Waypoint.position = AgrianNetwork.instance.FullPriorityWaypoint.position;
if(Anger < 100){
Anger = 60;
target = Waypoint;
}
}

Debug.DrawRay (thisVTransform.position + thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down * 400, Color.white);
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down * 400, Color.white);
if (Physics.Raycast (thisVTransform.position + thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down, 400, targetLayers) 
 && Physics.Raycast (thisVTransform.position + -thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down, 400, targetLayers))
vRigidbody.useGravity = true;
if (!Physics.Raycast (thisVTransform.position + thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down, 400, targetLayers) 
 || !Physics.Raycast (thisVTransform.position + -thisVTransform.up * 80 + -thisVTransform.forward * 20, Vector3.down, 400, targetLayers))
vRigidbody.useGravity = false;

if(velMag > 100)
vRigidbody.useGravity = false;

if(Pursuit > 0){

if(ExecuteTC1 || ExecuteTC4 || ExecuteTC6 || ExecuteTC7)
if(Anger < 200)
Anger = 210;

Anger += 1;
}

if(DangerSense > 0){
DangerSense -= 1;
TorqueForce = -20000000;
}

if(Anger > 0 && Pursuit < 1)
Anger -= 1;

if(BombLaunchTimer > 0)
BombLaunchTimer -= 1;

if(StillOnHull < 5){
vRigidbody.angularDrag = 2;
}else{
vRigidbody.angularDrag = 0.05;
}

if(OnHull){

if(StillOnHull < 6)
StillOnHull += 1;

}else{

if(StillOnHull > 0)
StillOnHull -= 1;

}

Obstacle = false;

TurnRight = false;
TurnLeft = false;

StrafeRight = false;
StrafeLeft = false;

OnHull = false;

Notice();

VicinityCheck();
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsStill(lastPos);
}

function IsStill(lastPos : Vector3){
Still = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 2){
  Still = true;
  yield WaitForSeconds (2);
  Still = false;
  }
}

function Damage () {
Damaged = true;
}