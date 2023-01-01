var target : Transform;
var Waypoint : Transform;

var Forward : Transform;

var RightAim : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Turret : GameObject;
var VPoint : Transform;

var Trig : SphereCollider;

var SuperCruiser : boolean;

var AimForce = 300;
var TurnForce = 200;

var RayDist = 0;

var TorqueForce = 20000;

var Broadside : boolean;

var LaserMuzzle : Transform;

var PropelEffect : GameObject;

var MegaRayStart : GameObject;
var MegaRayDot : GameObject;
var MegaRay : GameObject;
var RayBurst : GameObject;
var RayGlow : GameObject;
var StarShot : GameObject;
var LastPos : GameObject;

var WarningSoundPatrolling : GameObject;

var Dist : float = 2;

var EngagingEntity : boolean;

var Anger = 0;
var Obstacle : boolean;
var Floorstacle : boolean;
var Stuck : boolean;
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

var RightDist : float = 32;
var LeftDist : float = 32;

var StrafeLeft : boolean;
var StrafeRight : boolean;

var AimRight : boolean;

var LookingToSide : boolean;

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
var ExecuteTC3 : boolean;
var ExecuteTC4 : boolean;
var ExecuteTC6 : boolean;
var ExecuteTC7 : boolean;
var ExecuteTC8 : boolean;
var ExecuteTC9 : boolean;

var Executing : boolean;
var Determined : boolean;

var targetLayers : LayerMask;
var targetLayers2 : LayerMask;

var LineOfFire : boolean;

var DangerDirection : Vector3;

var DangerSense = 0;

var Pursuit = 0;

var BattleTime = 0;

var Vel : float;

var RayBurstTime : float = 1.5;

var Damaged : boolean;

InvokeRepeating("Counter", 1, 1);

InvokeRepeating("Warning", 10, 60);

InvokeRepeating("LeaveMarker", 3, 3);

InvokeRepeating("Shooty", 1, RayBurstTime);

function Start (){
if(!SuperCruiser)
AimForce = 500;
else
AimForce = 5000;
}

function Update () {

if(Damaged)
return;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

LVel = -localV.y * 5;

if(target)
Dist = Vector3.Distance(thisTransform.position, target.position);
else
Dist = 64;

var VelClamp = Mathf.Clamp(LVel,100,1000);
var VelPlus = VelClamp + 100;

var hit : RaycastHit;
var newRot : Vector3 = (VPoint.forward * 0.6f ).normalized;

if(!SuperCruiser){

Debug.DrawRay (VPoint.position + VPoint.forward * 40 + VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
Debug.DrawRay (VPoint.position + VPoint.forward * 40 + -VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
if (Physics.Raycast (VPoint.position + VPoint.forward * 40 + VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)
 || Physics.Raycast (VPoint.position + VPoint.forward * 40 + -VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)){
		Obstacle = true;
		}

Debug.DrawRay (VPoint.position + -VPoint.forward * 40 + -VPoint.up * 4 + VPoint.right * RayDist, VPoint.forward * VelPlus, Color.black);
if (Physics.Raycast (VPoint.position + -VPoint.forward * 40 + -VPoint.up * 4 + VPoint.right * RayDist, VPoint.forward, hit, VelPlus, targetLayers)) {
     TurnLeft = true;
     RightDist = hit.distance;
 }else{
 RightDist = 512;
 }

Debug.DrawRay (VPoint.position + -VPoint.forward * 40 + -VPoint.up * 4 + -VPoint.right * RayDist, VPoint.forward * VelPlus, Color.black);
if (Physics.Raycast (VPoint.position + -VPoint.forward * 40 + -VPoint.up * 4 + -VPoint.right * RayDist, VPoint.forward, hit, VelPlus, targetLayers)) {
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
     if(Vel > 50)
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }

if (Physics.Raycast (LaserMuzzle.transform.position + LaserMuzzle.transform.forward * 4, LaserMuzzle.transform.forward, hit, 1100, targetLayers2)){
if (hit.collider.name.Contains("2"))
     LineOfFire = false;
 else
     LineOfFire = true;
}

}else{

Debug.DrawRay (VPoint.position + VPoint.forward * 300 + VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
Debug.DrawRay (VPoint.position + VPoint.forward * 300 + -VPoint.right * RayDist, VPoint.forward * VelClamp, Color.red);
if (Physics.Raycast (VPoint.position + VPoint.forward * 300 + VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)
 || Physics.Raycast (VPoint.position + VPoint.forward * 300 + -VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers))
		Obstacle = true;

Debug.DrawRay (VPoint.position + VPoint.forward * 300 + -VPoint.up * 4 + VPoint.right * RayDist, VPoint.forward * VelClamp, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * 300 + -VPoint.up * 4 + VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)) {
     TurnLeft = true;
 }

Debug.DrawRay (VPoint.position + VPoint.forward * 300 + -VPoint.up * 4 + -VPoint.right * RayDist, VPoint.forward * VelClamp, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * 300 + -VPoint.up * 4 + -VPoint.right * RayDist, VPoint.forward, VelClamp, targetLayers)) {
		TurnRight = true;
 }
 
var newRot2 : Vector3;

newRot2 = (VPoint.forward * 32 + VPoint.right * -SDa).normalized;
 Debug.DrawRay (VPoint.position + VPoint.forward * SDf + -VPoint.up * 4 + VPoint.right * SDl, newRot2 * SD, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * SDf + -VPoint.up * 4 + VPoint.right * SDl, newRot2, hit, SD, targetLayers))
     RightDist = hit.distance;
     else
     RightDist = 512;
 
newRot2 = (VPoint.forward * 32 + VPoint.right * SDa).normalized;
Debug.DrawRay (VPoint.position + VPoint.forward * SDf + -VPoint.up * 4 + -VPoint.right * SDr, newRot2 * SD, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * SDf + -VPoint.up * 4 + -VPoint.right * SDr, newRot2, hit, SD, targetLayers))
		LeftDist = hit.distance;
		else
		LeftDist = 512;
		
newRot2 = (VPoint.forward * 32 + VPoint.right * -SD2a).normalized;
 Debug.DrawRay (VPoint.position + VPoint.forward * SD2f + -VPoint.up * 4 + VPoint.right * SD2l, newRot2 * SD2, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * SD2f + -VPoint.up * 4 + VPoint.right * SD2l, newRot2, hit, SD2, targetLayers))
     RightDist = 1;
 
newRot2 = (VPoint.forward * 32 + VPoint.right * SD2a).normalized;
Debug.DrawRay (VPoint.position + VPoint.forward * SD2f + -VPoint.up * 4 + -VPoint.right * SD2r, newRot2 * SD2, Color.black);
if (Physics.Raycast (VPoint.position + VPoint.forward * SD2f + -VPoint.up * 4 + -VPoint.right * SD2r, newRot2, hit, SD2, targetLayers))
		LeftDist = 1;
 
 if(RightDist > LeftDist)
     StrafeRight = true;
     
 if(LeftDist > RightDist)
     StrafeLeft = true;
 
newRot = (-VPoint.up * 0.6f).normalized;

      Debug.DrawRay (VPoint.position + VPoint.forward * 150, newRot * 100, Color.blue);
      Debug.DrawRay (VPoint.position, newRot * 100, Color.blue);
if (Physics.Raycast (VPoint.position + VPoint.forward * 150, newRot, 100, targetLayers) ||
    Physics.Raycast (VPoint.position, newRot, 100, targetLayers)) {
     if(Vel > 50)
     Floorstacle = true;
 } else {
     Floorstacle = false;
 }

if (Physics.Raycast (LaserMuzzle.transform.position + LaserMuzzle.transform.forward * 12, LaserMuzzle.transform.forward, hit, 4000, targetLayers2)){
if (hit.collider.name.Contains("2"))
     LineOfFire = false;
 else
     LineOfFire = true;
}
}

if(Determined && target == null){
Determined = false;
Anger = 100;
FireStar();
}

if(Determined){

if(LineOfFire)
if(Vel < 100){
if(ExecuteTC1 && Dist < 1000 && Determined){
if(hit.collider)
if(hit.collider.name.Contains ("bTC1")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if(hit.collider)
if(hit.collider.name.Contains ("mTC1") || hit.collider.name.Contains ("sTC1")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
}
if (ExecuteTC3 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC3")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if (ExecuteTC4 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC4")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if (ExecuteTC6 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC6")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if (ExecuteTC7 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC7")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if (ExecuteTC8 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC8")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
if (ExecuteTC9 && Dist < 1000 && Determined)
if(hit.collider)
if(hit.collider.name.Contains ("bTC9")){
Determined = false;
Anger = 100;
Pursuit = 0;
FireMegaRay();
}
}

if (ExecuteTC1 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC3 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC4 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC6 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC7 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC8 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
if (ExecuteTC9 && Dist > 1000 && Determined){
Determined = false;
Anger = 100;
Pursuit = 0;
FireStar();
}
}

}

private var NewRotation : Quaternion;
function FixedUpdate () {

if(Damaged){

if(!SuperCruiser)
vRigidbody.AddTorque(-thisVTransform.forward * 8000000);
else
vRigidbody.AddTorque(-thisVTransform.forward * 150000000);

return;
}

if(target)
var relativePoint = thisVTransform.InverseTransformPoint(target.position);

LAndR = relativePoint.x;
FAndB = relativePoint.y;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = vRigidbody.velocity.magnitude;

if(!SuperCruiser){
     if(RayDist < 50)
     RayDist += 2;
     if(RayDist == 50)
     RayDist = 2;
     }else{
     if(RayDist < 150)
     RayDist += 2;
     if(RayDist == 150)
     RayDist = 2;
     }

if(target){

if(!TurnLeft && !TurnRight && !Obstacle && !Executing)
if(Dist > 1000){
if(Pursuit < 1){
if(vRigidbody.angularVelocity.magnitude < 0.2){
if(!SuperCruiser){
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * TurnForce, -thisVTransform.up * 50);
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -TurnForce, thisVTransform.up * 50);
}else{
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * TurnForce, -thisVTransform.up * 100);
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -TurnForce, thisVTransform.up * 100);
}
}
}else{

if(vRigidbody.angularVelocity.magnitude < 1){
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * TurnForce, -thisVTransform.up * 50);
  vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -TurnForce, thisVTransform.up * 50);
}

}
}


}

if(!SuperCruiser){
if(Turret.rigidbody.angularVelocity.magnitude < 2){
if(!AimRight){

if(target){
  Turret.rigidbody.AddForceAtPosition((target.transform.position - Turret.transform.position).normalized * AimForce, -Turret.transform.up * 2);
  Turret.rigidbody.AddForceAtPosition((target.transform.position - Turret.transform.position).normalized * -AimForce, Turret.transform.up * 2);
}

}else{
  Turret.rigidbody.AddForceAtPosition((RightAim.transform.position - Turret.transform.position).normalized * AimForce, -Turret.transform.up * 2);
  Turret.rigidbody.AddForceAtPosition((RightAim.transform.position - Turret.transform.position).normalized * -AimForce, Turret.transform.up * 2);
}
}

}else{
if(Turret.rigidbody.angularVelocity.magnitude < 1){
if(target){
  Turret.rigidbody.AddForceAtPosition((target.transform.position - Turret.transform.position).normalized * AimForce, -Turret.transform.up * 20);
  Turret.rigidbody.AddForceAtPosition((target.transform.position - Turret.transform.position).normalized * -AimForce, Turret.transform.up * 20);
}
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
	
if(!SuperCruiser){

if(target)
if(!Obstacle && !Stuck){

if(Anger > 50){

  if(Pursuit < 1){
  
  if(Dist < 300){
  
  TurnForce = 200000;
  
  if(Dist < 100){
  if(localV.y < 25)
  vRigidbody.AddForce(-thisVTransform.up * -40000);
  }
  if(Dist > 150){
  if(-localV.y < 50)
  vRigidbody.AddForce(-thisVTransform.up * 40000);
  }
  
  }else{
  
  if(vRigidbody.angularVelocity.magnitude < 0.02)
  if(-FAndB > 600){
  if(-localV.y < 2000)
  vRigidbody.AddForce(-thisVTransform.up * 16000000);
  }
  TurnForce = 800000;
  
  }
  
  if(-FAndB < 500)
  if(-localV.y > 100){
  vRigidbody.AddForce(-thisVTransform.up * -24000000);
  }
  
  }else{
  
  if(vRigidbody.angularVelocity.magnitude > 0.5)
  TurnForce = 800000;
  else
  TurnForce = 200000;
  
 if(Dist < 150)
  vRigidbody.AddForce(thisVTransform.up * -localV.y * 20000);
  
  if(Dist > 200)
  if(-localV.y < 280)
  vRigidbody.AddForce(-thisVTransform.up * 800000);
  
  if(Dist < 300)
  if(FAndB > 0)
  if(-localV.y > 160)
  vRigidbody.AddForce(-thisVTransform.up * -24000000);
  
  }
  
  if(!LineOfFire){
  vRigidbody.AddTorque(-thisVTransform.forward * 4000000);
  }
  
}else{

  if(Dist < 100){
  if(localV.y < 25)
  vRigidbody.AddForce(-thisVTransform.up * -30000);
  }
  if(Dist > 150){
  if(-localV.y < 25)
  vRigidbody.AddForce(-thisVTransform.up * 30000);
  }
}

}

if(TurnRight && !TurnLeft){
if(!Executing){
  vRigidbody.AddTorque(-thisVTransform.forward * -8000000);

  vRigidbody.AddForce(thisVTransform.right * 80000);
  }
}

if(TurnLeft && !TurnRight){
if(!Executing){
  vRigidbody.AddTorque(-thisVTransform.forward * 8000000);

  vRigidbody.AddForce(thisVTransform.right * -80000);
  }
}

if(TurnLeft && TurnRight){
if(!Executing){
  vRigidbody.AddTorque(-thisVTransform.forward * -8000000);

  vRigidbody.AddForce(thisVTransform.right * 80000);
  }
}

if(Floorstacle){
if(Pursuit < 2){
vRigidbody.AddTorque(-thisVTransform.right * 8000000);
}else{
vRigidbody.AddTorque(-thisVTransform.right * 16000000);
}
}

if(Obstacle){
if(-localV.y > 25){

vRigidbody.AddForce(-thisVTransform.up * 15000 * localV.y);
}

if(TurnLeft || TurnRight)
if(!Executing){
  vRigidbody.AddForce(-thisVTransform.up * 40000);
  }

}


if(Stuck && !Executing){
  if(localV.y < 25)
  vRigidbody.AddForce(-thisVTransform.up * -100000);
  vRigidbody.AddTorque(-thisVTransform.forward * 4000000);

}

if(target)
if(OnHull && EngagingEntity){
  vRigidbody.AddTorque(-thisVTransform.up * 16000000);
  }

}else{

if(target)
if(!Obstacle){

if(Anger > 50){

  if(Dist > 600)
  vRigidbody.AddTorque(-thisVTransform.right * 200000000);
  
  if(Dist > 100){
  if(-localV.y < 60)
  if(Dist < 600)
  vRigidbody.AddForce(-thisVTransform.up * 500000);
  }
  
}else{

  if(Dist > 100){
  if(-localV.y < 60)
  vRigidbody.AddForce(-thisVTransform.up * 500000);
  }
}

}else{
if(-localV.y > 30){

if(-localV.y > 100){
 vRigidbody.AddForce(-thisVTransform.up * -10000000);
 }else{
 vRigidbody.AddForce(-thisVTransform.up * -1000000);
 }
}
}

if(TurnRight && !TurnLeft){
if(!Executing){
  vRigidbody.AddTorque(-thisVTransform.forward * -150000000);

  }
}

if(TurnLeft && !TurnRight){
  vRigidbody.AddTorque(-thisVTransform.forward * 150000000);

}

if(TurnLeft && TurnRight){
  vRigidbody.AddTorque(-thisVTransform.forward * -150000000);

}

if(StrafeRight && !StrafeLeft){
  vRigidbody.AddForce(thisVTransform.right * 2000000);
}

if(StrafeLeft && !StrafeRight){
  vRigidbody.AddForce(thisVTransform.right * -2000000);
}

if(Floorstacle){
vRigidbody.AddTorque(-thisVTransform.right * 100000000);
}

}

if(Broadside) {
if(FAndB < 0){

 if(SuperCruiser)
  LookingToSide = true;
  if(!TurnLeft && !TurnRight && !StrafeLeft && !StrafeRight){
  vRigidbody.AddTorque(thisVTransform.forward * TorqueForce);

  }

}else{

 if(SuperCruiser)
  LookingToSide = true;
  if(!TurnLeft && !TurnRight && !StrafeLeft && !StrafeRight){
  vRigidbody.AddTorque(thisVTransform.forward * -TorqueForce);

  }

}

}else{

if(LAndR < -1){

 if(SuperCruiser)
  LookingToSide = true;
  if(!TurnLeft && !TurnRight && !Obstacle && !StrafeLeft && !StrafeRight){
  vRigidbody.AddTorque(thisVTransform.forward * TorqueForce);

  }

}
if(LAndR > 1){

 if(SuperCruiser)
  LookingToSide = true;
  if(!TurnLeft && !TurnRight && !Obstacle && !StrafeLeft && !StrafeRight){
  vRigidbody.AddTorque(thisVTransform.forward * -TorqueForce);

  }

}
}
 
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

var DNum = 0;

if(ON.Contains ("#1"))
DNum = 20;
if(ON.Contains ("#2"))
DNum = 50;
if(ON.Contains ("#3"))
DNum = 200;

if(!Determined && !Executing){

if(other.rigidbody)
if(!ON.Contains ("TFC2")){
if(ON.Contains ("TFC")){

if(target)
if(EngagingEntity){
if(Anger < 120)
Anger += 10;
}else{

if(Anger < 1){
if(DangerSense < 1){
  
Anger = 100;
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}else{

if(target)
if (!EngagingEntity)
Anger = 1;

}

if(DangerSense > 0){
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}
  
}
}else{
if(ON.Contains ("FC2_P")){

if(EngagingEntity){
if(Anger < 120)
Anger += 10;
}else{

if(Anger < 1){
if(DangerSense < 1){
  
Anger = 100;
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}else{

if (!EngagingEntity)
Anger = 1;

}

if(DangerSense > 0){
  
DangerSense = 60;
  
DangerDirection = -other.rigidbody.velocity.normalized;
}
}
  
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

if(OT == AgrianNetwork.doomstarTarget)
return;

if(Vector3.Distance(thisTransform.position, OT.position) < 3000){

if(Determined){

if(ON.Contains ("mTC1") && ExecuteTC1){
  target = OT;
  }
if(ON.Contains ("bTC3") && ExecuteTC3){
  target = OT;
  }
if(ON.Contains ("bTC4") && ExecuteTC4){
  target = OT;
  }
if(ON.Contains ("bTC6") && ExecuteTC6){
  target = OT;
  }
if(ON.Contains ("bTC7") && ExecuteTC7){
  target = OT;
  }
if(ON.Contains ("bTC8") && ExecuteTC8){
  target = OT;
  }
if(ON.Contains ("bTC9") && ExecuteTC9){
  target = OT;
  }
}

if(!Determined){

if(target != null)
if(!Executing){

if(ON.Contains ("TC0a") && PissedAtTC0a > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC3") && PissedAtTC3 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC6") && PissedAtTC6 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
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
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC7") && PissedAtTC7 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC5") && PissedAtTC5 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC1") && PissedAtTC1 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("csT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC8") && PissedAtTC8 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
if(ON.Contains ("TC9") && PissedAtTC9 > 100)
if(ON.Contains ("sT") && !FoundSmall ||
   ON.Contains ("mT") && !FoundMedium ||
   ON.Contains ("bT") && !FoundBig ||
   !ON.Contains ("cT")){
  target = OT;
if(Anger < 100)
  Anger = 110;
  DangerSense = 0;
  }
  
}

}

}
}
}

// (RAY)--------------------------------------------------------------------------------------------------

function FireRayBurst () {

var hit : RaycastHit;

if(!SuperCruiser){

if(target != null)
if (EngagingEntity && Dist < 1000)
if (Physics.Raycast (Turret.transform.position + -Turret.transform.up * 5, -Turret.transform.up, hit, 1000, targetLayers2)){

if(hit.collider.name.Contains ("TC") && !hit.collider.name.Contains ("csTC") && Vel < 200){

var TheThing = Instantiate(RayGlow, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);
  TheThing.transform.parent = LaserMuzzle.transform;
  
yield WaitForSeconds (1);

Anger = 100;

  Instantiate(RayBurst, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);

if(target){
if(target.name.Contains ("TC1"))
PissedAtTC1 = 90;
if(target.name.Contains ("TC3"))
PissedAtTC3 = 90;
if(target.name.Contains ("TC4"))
PissedAtTC4 = 90;
if(target.name.Contains ("TC5"))
PissedAtTC5 = 90;
if(target.name.Contains ("TC6"))
PissedAtTC6 = 90;
if(target.name.Contains ("TC7"))
PissedAtTC7 = 90;
if(target.name.Contains ("TC8"))
PissedAtTC8 = 90;
if(target.name.Contains ("TC9"))
PissedAtTC9 = 90;
}

}
}
}else{
if(target != null)
if (EngagingEntity && Dist < 1000)
if (Physics.Raycast (Turret.transform.position + -Turret.transform.up * 5, -Turret.transform.up, hit, 1000, targetLayers2))
if(hit.collider.name.Contains ("TC") && Vel < 200){

Anger = 100;

var TheThing1 = Instantiate(RayBurst, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);
  TheThing1.transform.parent = LaserMuzzle.transform;

}
}
}

// (MEGARAY)--------------------------------------------------------------------------------------------------

function ReadyMegaRay () {

Broadside = true;

yield WaitForSeconds (2);

var TheThing = Instantiate(MegaRayStart, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);
  TheThing.transform.parent = LaserMuzzle.transform;

AimForce = 1200;
yield WaitForSeconds (2);
AimForce = 1400;
yield WaitForSeconds (2);
AimForce = 1600;
yield WaitForSeconds (2);
AimForce = 1800;

yield WaitForSeconds (1.30);
MegaRayDot.gameObject.SetActive (true);

AimForce = 2000;

yield WaitForSeconds (0.7);

Determined = true;
}

function FireMegaRay () {

if(target.name.Contains ("TC1"))
ExecuteTC1 = false;

if(target.name.Contains ("TC3"))
ExecuteTC3 = false;

if(target.name.Contains ("TC4"))
ExecuteTC4 = false;

if(target.name.Contains ("TC6"))
ExecuteTC6 = false;

if(target.name.Contains ("TC7"))
ExecuteTC7 = false;

if(target.name.Contains ("TC8"))
ExecuteTC8 = false;

if(target.name.Contains ("TC9"))
ExecuteTC9 = false;


MegaRayDot.gameObject.SetActive (false);

var TheThing = Instantiate(MegaRay, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);
  TheThing.transform.parent = LaserMuzzle.transform;
  
yield WaitForSeconds (5.2);
  
  Executing = false;
  vRigidbody.drag = 0.1;
  vRigidbody.angularDrag = 2;
  TorqueForce = -20000000;
  Anger = 100;
}

function FireStar () {

AimRight = true;

yield WaitForSeconds (2);

MegaRayDot.gameObject.SetActive (false);

var TheThing = Instantiate(StarShot, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);
var TheThing2 = Instantiate(PropelEffect, LaserMuzzle.transform.position, LaserMuzzle.transform.rotation);

    TheThing2.transform.parent = LaserMuzzle.transform;
    TheThing.GetComponent(ArchocapacitorScript).target = target;
    TheThing.rigidbody.velocity = vRigidbody.velocity * 1;
    TheThing.rigidbody.velocity = LaserMuzzle.transform.forward * 250;
  
yield WaitForSeconds (1);

if(target){
if(target.name.Contains ("TC1")){
ExecuteTC1 = false;
PissedAtTC1 = 0;
}
if(target.name.Contains ("TC3")){
ExecuteTC3 = false;
PissedAtTC3 = 0;
}
if(target.name.Contains ("TC4")){
ExecuteTC4 = false;
PissedAtTC4 = 0;
}
if(target.name.Contains ("TC6")){
ExecuteTC6 = false;
PissedAtTC6 = 0;
}
if(target.name.Contains ("TC7")){
ExecuteTC7 = false;
PissedAtTC7 = 0;
}
if(target.name.Contains ("TC8")){
ExecuteTC8 = false;
PissedAtTC8 = 0;
}
if(target.name.Contains ("TC9")){
ExecuteTC9 = false;
PissedAtTC9 = 0;
}
}

AimRight = false;

AgrianNetwork.instance.RedAlertTime = 0;

  PissedAtTC3 = 0;
  PissedAtTC5 = 0;
  
  Executing = false;
  vRigidbody.drag = 0.1;
  if(!SuperCruiser)
  vRigidbody.angularDrag = 2;
  else
  vRigidbody.angularDrag = 1;
  target = Forward;
  Anger = 0;
  Pursuit = 0;
}

function Shooty (){
if(!Executing)
if(Anger > 110)
if(LineOfFire)
FireRayBurst();
}

function Warning () {
  if(Anger < 50 && !Executing && !SuperCruiser){
  var TheThing = Instantiate(WarningSoundPatrolling, thisTransform.position + Vector3(0,-2,0), Quaternion.identity);
  TheThing.transform.parent = gameObject.transform;
  }
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (1);

  if(Vector3.Distance(thisTransform.position, lastPos) < 1 && Anger < 50){
  Stuck = true;
  yield WaitForSeconds (2);
  Stuck = false;
  }
}

function Notice () {

if(target != null){

var lastTPos : Vector3 = target.transform.position;
yield WaitForSeconds (0.2);
if(target != null)
if(Anger > 100)
if(Vector3.Distance(target.transform.position, lastTPos) > 10 && target.name.Contains ("TC") && Dist < 5000){

if(target.name.Contains ("C1"))
if(AgrianNetwork.TC1CriminalLevel < 200)
AgrianNetwork.TC1CriminalLevel = 270;

if(target.name.Contains ("C3"))
if(AgrianNetwork.TC3CriminalLevel < 200)
AgrianNetwork.TC3CriminalLevel = 270;

if(target.name.Contains ("C4"))
if(AgrianNetwork.TC4CriminalLevel < 200)
AgrianNetwork.TC4CriminalLevel = 270;

if(target.name.Contains ("C5"))
if(AgrianNetwork.TC5CriminalLevel < 200)
AgrianNetwork.TC5CriminalLevel = 270;

if(target.name.Contains ("C6"))
if(AgrianNetwork.TC6CriminalLevel < 200)
AgrianNetwork.TC6CriminalLevel = 270;

if(target.name.Contains ("C7"))
if(AgrianNetwork.TC7CriminalLevel < 200)
AgrianNetwork.TC7CriminalLevel = 270;

if(target.name.Contains ("C8"))
if(AgrianNetwork.TC8CriminalLevel < 200)
AgrianNetwork.TC8CriminalLevel = 270;

if(target.name.Contains ("C9"))
if(AgrianNetwork.TC9CriminalLevel < 200)
AgrianNetwork.TC9CriminalLevel = 270;

Pursuit = 4;
}
}
}

function Counter (){

if(Damaged)
return;

if(!target){

EngagingEntity = false;

if(!Executing){

BattleTime = 0;

target = Forward;
FoundSmall = false;
FoundMedium = false;
FoundBig = false;
}

}else{

if(target.name.Contains ("TC")){
EngagingEntity = true;
}else{
EngagingEntity = false;
if(DangerSense < 1)
TorqueForce = 0;
}
}

if(AgrianNetwork.TC1CriminalLevel > 240 || PissedAtTC1 > 200)
ExecuteTC1 = true;
if(AgrianNetwork.TC3CriminalLevel > 240 || PissedAtTC3 > 200)
ExecuteTC3 = true;
if(AgrianNetwork.TC4CriminalLevel > 240 || PissedAtTC4 > 200)
ExecuteTC4 = true;
if(AgrianNetwork.TC6CriminalLevel > 240 || PissedAtTC6 > 200)
ExecuteTC6 = true;
if(AgrianNetwork.TC7CriminalLevel > 240 || PissedAtTC7 > 200)
ExecuteTC7 = true;
if(AgrianNetwork.TC8CriminalLevel > 240 || PissedAtTC8 > 200)
ExecuteTC8 = true;
if(AgrianNetwork.TC9CriminalLevel > 240 || PissedAtTC9 > 200)
ExecuteTC9 = true;

if(Anger > 96){
if(EngagingEntity){
Trig.radius = 10;

if(BattleTime < 60){
BattleTime += 1;
}else{
if(target.name.Contains ("TC2_P")){
WorldInformation.PiriExposed = 120;
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC1CriminalLevel = 620;
if(target.name.Contains ("bT"))
AgrianNetwork.instance.SubdueTarget = target;
}
}

}else{
Trig.radius = 300;

BattleTime = 0;

}
}else{
Trig.radius = 300;

BattleTime = 0;

}

if(DangerSense > 1){
Trig.radius = 300;
}

if(Vel > 1000){
Trig.radius = 300;
}

if(target != null){

if(target.name.Contains ("Executor")){
Trig.radius = 300;
}

if(target.name.Contains ("sT"))
FoundSmall = true;
if(target.name.Contains ("mT"))
FoundMedium = true;
if(target.name.Contains ("bT"))
FoundBig = true;

if(ExecuteTC1 || ExecuteTC3 || ExecuteTC4 || ExecuteTC6 || ExecuteTC7 || ExecuteTC8 || ExecuteTC9){
if(AgrianNetwork.DoomstarActive == false){





if(target == AgrianNetwork.instance.SubdueTarget){
if(!Executing && AgrianNetwork.TargetSubdual > 8){

if(!SuperCruiser){

if(Dist < 400 && Vel < 150){

if(target.name.Contains ("bTC1")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC4")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC6")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC7")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC8")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC9")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
  }
  }

}
}else{
if(!Executing){

if(!SuperCruiser){

if(Dist < 400 && Vel < 150){

if(target.name.Contains ("bTC1")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC4")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC6")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC7")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC8")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
if(target.name.Contains ("bTC9")){
  Executing = true;
  StopAllCoroutines();
  ReadyMegaRay();
  }
  }
  }

}
}




if(target == AgrianNetwork.instance.SubdueTarget)
if(AgrianNetwork.TargetSubdual > 8)
Pursuit = 4;

}else{

if(target.name.Contains ("bTC")){
ArchocapacitorScript.newTarget = target;

if(target.name.Contains ("TC1")){
ExecuteTC1 = false;
PissedAtTC1 = 0;
}
if(target.name.Contains ("TC3")){
ExecuteTC3 = false;
PissedAtTC3 = 0;
}
if(target.name.Contains ("TC4")){
ExecuteTC4 = false;
PissedAtTC4 = 0;
}
if(target.name.Contains ("TC6")){
ExecuteTC6 = false;
PissedAtTC6 = 0;
}
if(target.name.Contains ("TC7")){
ExecuteTC7 = false;
PissedAtTC7 = 0;
}
if(target.name.Contains ("TC8")){
ExecuteTC8 = false;
PissedAtTC8 = 0;
}
if(target.name.Contains ("TC9")){
ExecuteTC9 = false;
PissedAtTC9 = 0;
}

}

if(target == AgrianNetwork.instance.SubdueTarget){
if(AgrianNetwork.TargetSubdual > 8){
AgrianNetwork.DismissDoomstar = true;
AgrianNetwork.DoomstarActive = false;
Pursuit = 4;
}

}else{
if(Vector3.Distance(thisTransform.position, AgrianNetwork.doomstarTarget.position) < 1000){
AgrianNetwork.DismissDoomstar = true;
AgrianNetwork.DoomstarActive = false;
}
}

}
}

  if(ExecuteTC1){
  PissedAtTC1 = 210;
  if(Anger < 120){
  if(target.name.Contains ("TC1")){
  WorldInformation.PiriExposed = 120;
  Anger = 120;
  }
  if(target.name.Contains ("2_P")){
  WorldInformation.PiriExposed = 120;
  Anger = 120;
  }
  }
  }
  if(ExecuteTC3){
  PissedAtTC3 = 210;
  if(Anger < 120 && target.name.Contains ("TC3"))
  Anger = 120;
  }
  if(ExecuteTC4){
  PissedAtTC4 = 210;
  if(Anger < 120 && target.name.Contains ("TC4"))
  Anger = 120;
  }
  if(ExecuteTC6){
  PissedAtTC6 = 210;
  if(Anger < 120 && target.name.Contains ("TC6"))
  Anger = 120;
  }
  if(ExecuteTC7){
  PissedAtTC7 = 210;
  if(Anger < 120 && target.name.Contains ("TC7"))
  Anger = 120;
  }
  if(ExecuteTC8){
  PissedAtTC8 = 210;
  if(Anger < 120 && target.name.Contains ("TC8"))
  Anger = 120;
  }
  if(ExecuteTC9){
  PissedAtTC9 = 210;
  if(Anger < 120 && target.name.Contains ("TC9"))
  Anger = 120;
  }

if(!Executing){

if(LineOfFire){
 if(!SuperCruiser)
  TorqueForce = -20000000;
  else
  TorqueForce = -100000000;
  }
  
if(Dist < 300)
if(DangerSense < 1)
Broadside = true;

if(!SuperCruiser){
if(Dist > 500){
Broadside = false;
TorqueForce = -20000000;
}
}else{

if(target){
if(target.name.Contains ("C1"))
if(AgrianNetwork.TC1CriminalLevel < 200)
AgrianNetwork.TC1CriminalLevel = 270;

if(target.name.Contains ("C3"))
if(AgrianNetwork.TC3CriminalLevel < 200)
AgrianNetwork.TC3CriminalLevel = 270;

if(target.name.Contains ("C4"))
if(AgrianNetwork.TC4CriminalLevel < 200)
AgrianNetwork.TC4CriminalLevel = 270;

if(target.name.Contains ("C5"))
if(AgrianNetwork.TC5CriminalLevel < 200)
AgrianNetwork.TC5CriminalLevel = 270;

if(target.name.Contains ("C6"))
if(AgrianNetwork.TC6CriminalLevel < 200)
AgrianNetwork.TC6CriminalLevel = 270;

if(target.name.Contains ("C7"))
if(AgrianNetwork.TC7CriminalLevel < 200)
AgrianNetwork.TC7CriminalLevel = 270;

if(target.name.Contains ("C8"))
if(AgrianNetwork.TC8CriminalLevel < 200)
AgrianNetwork.TC8CriminalLevel = 270;

if(target.name.Contains ("C9"))
if(AgrianNetwork.TC9CriminalLevel < 200)
AgrianNetwork.TC9CriminalLevel = 270;
}

if(Dist > 1500){
if(Anger > 110){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.AlertTime = 120;
Dismiss();
}
}
}

if(TurnLeft || TurnRight || Obstacle){
if(LookingToSide)
Stuck = true;
}

}else{
TorqueForce = -20000000;
}
}

if(!Determined)
if(DangerSense > 0)
Broadside = false;

if(Anger == 1 && !Executing){
DangerSense = 0;
Anger = 0;

target = Forward;
if(!SuperCruiser)
  vRigidbody.angularDrag = 2;
  else
  vRigidbody.angularDrag = 1;
}

if(!SuperCruiser)
if(AgrianNetwork.instance.RedAlertTime > 1){
Waypoint.position = AgrianNetwork.instance.FullPriorityWaypoint.position;
if(!EngagingEntity)
if(Anger < 100){
Anger = 100;
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

if(Vel > 100)
vRigidbody.useGravity = false;

if(Anger > 100){
if(!SuperCruiser)
AimForce = 1000;
else
AimForce = 10000;
}

if(Pursuit > 0){
Pursuit -= 1;

if(ExecuteTC1 || ExecuteTC3 || ExecuteTC4 || ExecuteTC6 || ExecuteTC7 || ExecuteTC8 || ExecuteTC9){
if(Anger < 120)
Anger = 120;

if(target)
if(target.name.Contains ("TC")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.AlertTime = 120;
}


}

Anger += 1;
}

if(DangerSense > 0){
DangerSense -= 1;
TorqueForce = -20000000;
}

if(!EngagingEntity)
if(Anger > 0)
Anger -= 1;

if(StillOnHull < 5){
if(!SuperCruiser)
  vRigidbody.angularDrag = 2;
  else
  vRigidbody.angularDrag = 1;
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

LookingToSide = false;

if(!Executing)
Notice();

VicinityCheck();
}

function Dismiss (){
yield WaitForSeconds (15);
Anger = 10;
target = Forward;
}

function Damage () {
Damaged = true;
}