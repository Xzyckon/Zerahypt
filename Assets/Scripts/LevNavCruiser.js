var target : Transform;
var Waypoint : Transform;

var TargetTrace : Transform;
var TargetLead : Transform;
var TLCol : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var ResetAimpoint : Transform;

var AIAnchor : Transform;

var orbitCurve : AnimationCurve = new AnimationCurve();

var HasRequested : boolean;

var SLPlusFiring : boolean;

var SMCooldown = 0;

var CMCooldown = 0;

var MissileAmmo : GameObject;
var Missile2Ammo : GameObject;
var Missile3Ammo : GameObject;
var Missile1 : Transform;
var Missile2 : Transform;
var Missile3 : Transform;
var Missile4 : Transform;
var Missile5 : Transform;
var Missile6 : Transform;
var Missile7 : Transform;
var Missile8 : Transform;
var Missile9 : Transform;
var Missile10 : Transform;
var Missile11 : Transform;
var Missile12 : Transform;
var Missile13 : Transform;
var Missile14 : Transform;
var Missile15 : Transform;
var Missile16 : Transform;
var Missile17 : Transform;
var Missile18 : Transform;

var Missile1GO : GameObject;
var Missile2GO : GameObject;
var Missile3GO : GameObject;
var Missile4GO : GameObject;
var Missile5GO : GameObject;
var Missile6GO : GameObject;
var Missile7GO : GameObject;
var Missile8GO : GameObject;

var Missile9GO : GameObject;
var Missile10GO : GameObject;

var Missile11GO : GameObject;
var Missile12GO : GameObject;

var Missile13GO : GameObject;
var Missile14GO : GameObject;
var Missile15GO : GameObject;
var Missile16GO : GameObject;
var Missile17GO : GameObject;
var Missile18GO : GameObject;

var topPoint : Transform;
var frontPoint : Transform;

var Turret1 : GameObject;
var Turret2 : GameObject;
var Gun1 : NPCGun;
var Gun2 : NPCGun;
var Trig : SphereCollider;
var Presence : GameObject;
var SpotSound : GameObject;
var AttackSound : GameObject;
var RejectSound : GameObject;

var Dist : float = 1;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var SkipTiny : boolean;

var FoundSmall : boolean;
var FoundMedium : boolean;
var FoundBig : boolean;
var FoundExtraBig : boolean;

var FS : boolean;
var FM : boolean;
var FB : boolean;

var Attacking : boolean;
var Obstacle : boolean = false;
var Stuck : boolean = false;
var Emergency : boolean;

var DirStrength : float = 2;

var TAimStrength : float = 2;
var TurnStrength : float = 2;

var TForce = 0;

var TurnForce = 0;

var TurnRight : boolean;
var TurnLeft : boolean;

var RightDist : float = 200;
var LeftDist : float = 200;

var AngleTH : float = 2;

var forwardPoint = 2;

var sidePoint : float = 10;
var sidePointStat : float = 10;

var RelativeTarget : Vector3;

var RPAbs = 1;
var RPClamp = 1;
var RPMod = 0;

var RUP : float = 0;

var RRUP : float = 0;
var LRUP : float = 0;

var Wall : boolean;
var RWall : boolean;
var LWall : boolean;

var Point1u : Vector3;
var Point1d : Vector3;

var RPoint1u : Vector3;
var RPoint1d : Vector3;

var LPoint1u : Vector3;
var LPoint1d : Vector3;

var localV : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var DangerSense = 0;

var DangerTick : boolean;

var StoredMissileBatches = 32;
var StoredMissile2Batches = 64;
var StoredMissile3Batches = 8;

InvokeRepeating("Regenerator", 1, 1);

InvokeRepeating("LeaveMarker", 1, 10);

InvokeRepeating("Targety", 15, 15);

InvokeRepeating("Shooty", Random.Range(2, 3), 0.3);

InvokeRepeating("CalcLead", 1, 0.15);

function Start () {
sidePointStat = sidePoint;
}

function FixedUpdate () {

if(!DangerTick)
thisTransform.rotation = AIAnchor.transform.rotation;

thisTransform.position = AIAnchor.transform.position;

if(target){
RelativeTarget = thisTransform.InverseTransformPoint(target.position);
var RPModX = RelativeTarget.x * 10;
RPAbs = Mathf.Abs(RPModX);
Dist = Vector3.Distance(thisTransform.position, target.position);
}

if(Attacking){
if(target == ResetAimpoint){
target = ResetAimpoint;
Attacking = false;
FoundSmall = false;
}
if(target == null){
target = ResetAimpoint;
Attacking = false;
FoundSmall = false;
}else{
if(target.name.Contains ("broken")){
target = ResetAimpoint;
Attacking = false;
}
}
}

if(TurnLeft)
  TurnForce = -1500000;

if(TurnRight)
  TurnForce = 1500000;

if(TurnRight && TurnLeft && Obstacle)
  TurnForce = -1500000;

if(target){
if(!TurnRight && !TurnLeft){

if(Dist < 850){

RPMod = RelativeTarget.z;

TForce = orbitCurve.Evaluate(RPMod);
TForce = TForce * 4 * Dist;

TurnForce = Mathf.Clamp(TForce,-800000,800000);

}else{
TForce = RelativeTarget.x * 1024;

TurnForce = Mathf.Clamp(TForce,-800000,800000);
}

}
}
	
localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var newRot2 : Vector3;

if(-localV.y > 10)
newRot2 = (vRigidbody.velocity);
else
newRot2 = (thisTransform.forward);

var hit : RaycastHit;

var hit1 : RaycastHit;
var hit2 : RaycastHit;

var VelClamp = Mathf.Clamp(vRigidbody.velocity.magnitude * 8,192,512);

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.up * 2 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.up * 2 + thisTransform.up * RUP, newRot2, hit1, VelClamp, targetLayers))
Point1u = hit1.point;
else
Point1u = Vector3(2,2,2);

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.up * 3 + thisTransform.up * RUP, newRot2 * VelClamp, Color.white);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.up * 3 + thisTransform.up * RUP, newRot2, hit2, VelClamp, targetLayers))
Point1d = hit2.point;
else
Point1d = Vector3(8,8,8);

if(Vector3.Distance(Point1u, Point1d) < AngleTH){
Wall = true;
}

Obstacle = false;

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * 4, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * 4, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * 4, newRot2 * VelClamp, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * 4, newRot2, hit, VelClamp, targetLayers))
     if(Wall)
     Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * sidePoint + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * sidePoint + -thisTransform.up * 2 + thisTransform.up * RRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
RPoint1u = hit1.point;
}else{
RPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * sidePoint + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.right * sidePoint + -thisTransform.up * 3 + thisTransform.up * RRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
RPoint1d = hit2.point;
RightDist = hit2.distance;
}else{
RPoint1d = Vector3(8,8,8);
RightDist = 512;
}

if(Vector3.Distance(RPoint1u, RPoint1d) < AngleTH){
RWall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * sidePoint + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * sidePoint + -thisTransform.up * 2 + thisTransform.up * LRUP, thisTransform.forward, hit1, VelClamp, targetLayers)){
LPoint1u = hit1.point;
}else{
LPoint1u = Vector3(2,2,2);
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * sidePoint + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + -thisTransform.right * sidePoint + -thisTransform.up * 3 + thisTransform.up * LRUP, thisTransform.forward, hit2, VelClamp, targetLayers)){
LPoint1d = hit2.point;
LeftDist = hit2.distance;
}else{
LPoint1d = Vector3(8,8,8);
LeftDist = 512;
}

if(Vector3.Distance(LPoint1u, LPoint1d) < AngleTH){
LWall = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.up * 10 + thisTransform.forward * VelClamp, thisTransform.up * -64, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.forward * forwardPoint + thisTransform.up * 10 + thisTransform.forward * VelClamp, -thisTransform.up, 64))
     Obstacle = true;

//---------------------------------------------------------------------------------------------
             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -64, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 64))
     TurnLeft = true;

             Debug.DrawRay (thisTransform.position + thisTransform.up * 10 
                                  + -thisTransform.right * 20
                                  + thisTransform.forward * VelClamp, thisTransform.up * -64, Color.white);
if (!Physics.Raycast (thisTransform.position + thisTransform.up * 10 
                                        + -thisTransform.right * 20 
                                        + thisTransform.forward * VelClamp, -thisTransform.up, 64))
     TurnRight = true;
//---------------------------------------------------------------------------------------------

if(RightDist > LeftDist && LWall){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist && RWall){
     TurnLeft = true;
     }
     
if(LeftDist < 20 && LWall)
Obstacle = true;

if(RightDist < 20 && RWall)
Obstacle = true;
    
if(Stuck){
  TurnRight = true;
  TurnLeft = false;
  }
 
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

if(RUP < 8)
RUP += 1;
else
RUP = 0;

if(RRUP < 4)
RRUP += 0.5;
else
RRUP = 0;

if(LRUP < 4)
LRUP += 0.5;
else
LRUP = 0;

if(sidePoint < sidePointStat)
sidePoint += 1;
else
sidePoint = 8;

if(Obstacle){

if(-localV.y > 0){
  vRigidbody.AddForce(-thisVTransform.up * -24000 * DirStrength);
  }
  
}

if(Stuck)
if(-localV.y < 4)
  vRigidbody.AddForce(thisVTransform.up * 12000 * DirStrength);

if(Attacking && !Obstacle && !Stuck){
if(-localV.y < 70)
  vRigidbody.AddForce(-thisVTransform.up * 24000 * DirStrength);
}
  
if(!Attacking && !Obstacle && !Stuck && !TurnLeft && !TurnRight) {
if(-localV.y < 70)
  vRigidbody.AddForce(-thisVTransform.up * 24000 * DirStrength);
}

vRigidbody.AddTorque(thisVTransform.forward * TurnForce * TurnStrength);
 
if(target){

if(Turret1){
Turret1.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret1.transform.position).normalized * 10, -Turret1.transform.up * TAimStrength);
Turret1.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret1.transform.position).normalized * -10, Turret1.transform.up * TAimStrength);
}
if(Turret2){
Turret2.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret2.transform.position).normalized * 10, -Turret2.transform.up * TAimStrength);
Turret2.rigidbody.AddForceAtPosition((TargetLead.transform.position - Turret2.transform.position).normalized * -10, Turret2.transform.up * TAimStrength);
}
}
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC3")){

if(TerrahyptianNetwork.instance.EnemyTarget1){

if(ON.Contains ("TFC0a"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC0"))
PissedAtTC0a = 2;

if(ON.Contains ("TFC1"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC1"))
PissedAtTC1 = 2;

if(ON.Contains ("TFC4"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC4"))
PissedAtTC4 = 2;

if(ON.Contains ("TFC5"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC5"))
PissedAtTC5 = 2;

if(ON.Contains ("TFC6"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC6"))
PissedAtTC6 = 2;

if(ON.Contains ("TFC7"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC7"))
PissedAtTC7 = 2;

if(ON.Contains ("TFC8"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC7"))
PissedAtTC8 = 2;

if(ON.Contains ("TFC9"))
if(TerrahyptianNetwork.instance.EnemyTarget1.name.Contains ("TFC7"))
PissedAtTC9 = 2;

}else{

if(ON.Contains ("TFC0a"))
PissedAtTC0a = 2;

if(ON.Contains ("TFC1"))
PissedAtTC1 = 2;

if(ON.Contains ("TFC4"))
PissedAtTC4 = 2;

if(ON.Contains ("TFC5"))
PissedAtTC5 = 2;

if(ON.Contains ("TFC6"))
PissedAtTC6 = 2;

if(ON.Contains ("TFC7"))
PissedAtTC7 = 2;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 2;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 2;

}

if(!Attacking){
DangerSense = 10;
target = Waypoint;
if(other.rigidbody)
Waypoint.position = OT.position;
}
}

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(ON.Contains ("TC"))
if(!ON.Contains ("TC3")){

if(SkipTiny){
if(ON.Contains ("tT"))
return;

}
  
if(ON.Contains ("xb")){
if(ON.Contains ("C1")){TerrahyptianNetwork.AnExtraBigTC1 = OT;}
if(ON.Contains ("C4")){TerrahyptianNetwork.AnExtraBigTC4 = OT;}
if(ON.Contains ("C5")){TerrahyptianNetwork.AnExtraBigTC5 = OT;}
if(ON.Contains ("C6")){TerrahyptianNetwork.AnExtraBigTC6 = OT;}
if(ON.Contains ("C7")){TerrahyptianNetwork.AnExtraBigTC7 = OT;}
if(ON.Contains ("C8")){TerrahyptianNetwork.AnExtraBigTC8 = OT;}
if(ON.Contains ("C9")){TerrahyptianNetwork.AnExtraBigTC9 = OT;}
}

if(ON.Contains ("sT"))
FS = true;

if(ON.Contains ("mT"))
FM = true;

if(ON.Contains ("bT"))
FB = true;

if(FoundBig)
return;
  
if(PissedAtTC0a > 1)
if(ON.Contains ("TC0a")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;
  
}
}
  
if(PissedAtTC1 > 1)
if(ON.Contains ("TC1")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC4 > 1)
 if(ON.Contains ("TC4")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC5 > 1)
 if(ON.Contains ("TC5")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC6 > 1)
 if(ON.Contains ("TC6")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC7 > 1)
 if(ON.Contains ("TC7")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC8 > 1)
 if(ON.Contains ("TC8")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

if(PissedAtTC9 > 1)
 if(ON.Contains ("TC9")){
 
if(FS && !FoundSmall ||
   FM && !FoundMedium ||
   FB){
  target = OT;
  
  if(!Attacking)
  AttackNoise();
  
  Attacking = true;
  
if(FS)
FoundSmall = true;
if(FM)
FoundMedium = true;
if(FB)
FoundBig = true;

}
}

FS = false;
FM = false;
FB = false;

}

}

function AttackNoise () {
var TheThing = Instantiate(AttackSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
}

function Looking () {
yield WaitForSeconds (15);

  if(!Attacking){
  var TheThing = Instantiate(RejectSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing.transform.parent = thisTransform;
  Targety();
  }
}

function Shooty () {

if(Attacking){
Shoot();
if(SMCooldown < 1)
LaunchSM();
if(FoundBig){

if(CMCooldown < 1)
LaunchCM();
}
}
}

function Shoot () {
if(Attacking){
if(Turret1)
Gun1.Fire();
yield WaitForSeconds (0.4);
if(Turret2)
Gun2.Fire();
}
}

function LaunchSM () {

if(!MissileAmmo)
return;

if(target)
if(Physics.Linecast (topPoint.position, target.position, MtargetLayers)){
return;
}else{
topPoint.LookAt(target);

var hitM : RaycastHit;

      Debug.DrawRay (topPoint.position, topPoint.forward * 5000, Color.yellow);
if (Physics.Raycast (topPoint.position, topPoint.forward, hitM, 5000, targetLayers))
if(hitM.collider.name.Contains ("C3"))
return;
}

if(target)
if(Attacking && StoredMissileBatches > 0 && Dist > 256 && Dist < 1000){

SMCooldown = 3;

if(Missile3GO)
if(!Missile3GO.name.Contains ("rok"))
return;

if(Missile4GO)
if(!Missile4GO.name.Contains ("rok"))
return;

if(Missile7GO)
if(!Missile7GO.name.Contains ("rok"))
return;

if(Missile8GO)
if(!Missile8GO.name.Contains ("rok"))
return;

StoredMissileBatches -= 1;

Missile1GO = Instantiate(MissileAmmo, Missile1.position, Missile1.rotation);
Missile1GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile1GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile2GO = Instantiate(MissileAmmo, Missile2.position, Missile2.rotation);
Missile2GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile2GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile3GO = Instantiate(MissileAmmo, Missile3.position, Missile3.rotation);
Missile3GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile3GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile4GO = Instantiate(MissileAmmo, Missile4.position, Missile4.rotation);
Missile4GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile4GO.transform.GetComponent(MissileScript).target = target;
    
yield WaitForSeconds (0.3);
Missile5GO = Instantiate(MissileAmmo, Missile5.position, Missile5.rotation);
Missile5GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile5GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile6GO = Instantiate(MissileAmmo, Missile6.position, Missile6.rotation);
Missile6GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile6GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile7GO = Instantiate(MissileAmmo, Missile7.position, Missile7.rotation);
Missile7GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile7GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile8GO = Instantiate(MissileAmmo, Missile8.position, Missile8.rotation);
Missile8GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile8GO.transform.GetComponent(MissileScript).target = target;

}

if(!Missile2Ammo)
return;

if(target)
if(Attacking && StoredMissile2Batches > 0 && Dist < 512){

SMCooldown = 3;

if(Missile9GO)
if(!Missile9GO.name.Contains ("rok"))
return;

if(Missile10GO)
if(!Missile10GO.name.Contains ("rok"))
return;

StoredMissile2Batches -= 1;

if(!SLPlusFiring){

Missile9GO = Instantiate(Missile2Ammo, Missile9.position, Missile9.rotation);
Missile9GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile9GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile10GO = Instantiate(Missile2Ammo, Missile10.position, Missile10.rotation);
Missile10GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile10GO.transform.GetComponent(MissileScript).target = target;

SLPlusFiring = true;

}else{

yield WaitForSeconds (0.3);
Missile11GO = Instantiate(Missile2Ammo, Missile11.position, Missile11.rotation);
Missile11GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile11GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.3);
Missile12GO = Instantiate(Missile2Ammo, Missile12.position, Missile12.rotation);
Missile12GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile12GO.transform.GetComponent(MissileScript).target = target;

SLPlusFiring = false;
}
}

}

function LaunchCM () {

if(!Missile3Ammo)
return;

if(target)
if(Physics.Linecast (topPoint.position, target.position, MtargetLayers)){
return;
}else{
topPoint.LookAt(target);

var hitM : RaycastHit;

      Debug.DrawRay (topPoint.position, topPoint.forward * 5000, Color.yellow);
if (Physics.Raycast (topPoint.position, topPoint.forward, hitM, 5000, targetLayers))
if(hitM.collider.name.Contains ("C3"))
return;
}

if(target != null)
if(Attacking && FoundBig && FoundExtraBig && StoredMissile3Batches > 0 && Dist < 3000){

CMCooldown = 4;

if(Missile13GO)
if(!Missile13GO.name.Contains ("rok"))
return;

if(Missile14GO)
if(!Missile14GO.name.Contains ("rok"))
return;

if(Missile15GO)
if(!Missile15GO.name.Contains ("rok"))
return;

if(Missile16GO)
if(!Missile16GO.name.Contains ("rok"))
return;

StoredMissile3Batches -= 1;

Missile13GO = Instantiate(Missile3Ammo, Missile13.position, Missile13.rotation);
Missile13GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile13GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.4);
    
Missile14GO = Instantiate(Missile3Ammo, Missile14.position, Missile14.rotation);
Missile14GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile14GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.4);

Missile15GO = Instantiate(Missile3Ammo, Missile15.position, Missile15.rotation);
Missile15GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile15GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.4);
    
Missile16GO = Instantiate(Missile3Ammo, Missile16.position, Missile16.rotation);
Missile16GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile16GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.4);

Missile170GO = Instantiate(Missile3Ammo, Missile17.position, Missile17.rotation);
Missile170GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile170GO.transform.GetComponent(MissileScript).target = target;

yield WaitForSeconds (0.4);
    
Missile180GO = Instantiate(Missile3Ammo, Missile18.position, Missile18.rotation);
Missile180GO.rigidbody.velocity = vRigidbody.velocity * 1;
Missile180GO.transform.GetComponent(MissileScript).target = target;

}
}

function Targety () {
if(!Attacking)
TargetArea();
}

function TargetArea () {

if(TerrahyptianNetwork.AlertTime > 0 && !Attacking){
Waypoint.transform.position = TerrahyptianNetwork.instance.PriorityWaypoint.position;
target = Waypoint;
}
yield WaitForSeconds (10);
if(!Attacking)
target = ResetAimpoint;
}

function LeaveMarker () {
var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 3){
  Stuck = true;
  yield WaitForSeconds (3);
  Stuck = false;
  }
}

function CalcLead () {
Lead();
}

function Lead (){

if(target)
TargetTrace.position = target.position;

yield WaitForSeconds (0.1);

if(target){

var Dist1 = Vector3.Distance(thisTransform.position, target.position);
var Dist2 = Vector3.Distance(TargetTrace.position, target.position);

TargetTrace.LookAt(target);

TargetLead.position = TargetTrace.position;
TargetLead.rotation = TargetTrace.rotation;
TargetLead.position += TargetLead.forward * Dist1 * Dist2 * 0.02;

if(Attacking)
TLCol.radius = Dist * 0.05;
else
TLCol.radius = 0.1;

}
}

function Regenerator () {

PissedAtTC1 = TerrahyptianNetwork.TC1CriminalLevel;
PissedAtTC4 = TerrahyptianNetwork.TC4CriminalLevel;
PissedAtTC5 = TerrahyptianNetwork.TC5CriminalLevel;
PissedAtTC6 = TerrahyptianNetwork.TC6CriminalLevel;
PissedAtTC7 = TerrahyptianNetwork.TC7CriminalLevel;
PissedAtTC8 = TerrahyptianNetwork.TC8CriminalLevel;
PissedAtTC9 = TerrahyptianNetwork.TC9CriminalLevel;

if(target){

if(target.name.Contains ("xbT"))
FoundExtraBig = true;
else
FoundExtraBig = false;

if(target.name.Contains ("bT"))
FoundBig = true;
else
FoundBig = false;

if(!target.name.Contains ("mT"))
FoundMedium = false;

if(!target.name.Contains ("sT"))
FoundSmall = false;

if(!Attacking){

if(TerrahyptianNetwork.TC1CriminalLevel > 480){

if(target.name.Contains ("C1")){
TerrahyptianNetwork.instance.EnemyTarget2 = target;
TerrahyptianNetwork.instance.PriorityWaypoint.position = target.position;
}else{
if(TerrahyptianNetwork.instance.EnemyTarget2)
if(Vector3.Distance(thisTransform.position, TerrahyptianNetwork.instance.EnemyTarget2.position) < 3000){
target = TerrahyptianNetwork.instance.EnemyTarget2;
if(!Attacking)
AttackNoise();
Attacking = true;

}
}

}

if(TerrahyptianNetwork.TC1CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC1){
target = TerrahyptianNetwork.AnExtraBigTC1;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;

}

if(TerrahyptianNetwork.TC4CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC4){
target = TerrahyptianNetwork.AnExtraBigTC4;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

if(TerrahyptianNetwork.TC5CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC5){
target = TerrahyptianNetwork.AnExtraBigTC5;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

if(TerrahyptianNetwork.TC6CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC6){
target = TerrahyptianNetwork.AnExtraBigTC6;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

if(TerrahyptianNetwork.TC7CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC7){
target = TerrahyptianNetwork.AnExtraBigTC7;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

if(TerrahyptianNetwork.TC8CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC8){
target = TerrahyptianNetwork.AnExtraBigTC8;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

if(TerrahyptianNetwork.TC9CriminalLevel > 480)
if(TerrahyptianNetwork.AnExtraBigTC9){
target = TerrahyptianNetwork.AnExtraBigTC9;
TerrahyptianNetwork.AlertTime = 240;
FoundExtraBig = true;
Attacking = true;
}

}

}

if(Attacking)
TrigSweepAT();
else
TrigSweep();

if(DangerSense > 0){
if(DangerSense < 2 && !Attacking){
target = ResetAimpoint;
}

DangerSense -= 1;
}

if(SMCooldown > 0)
SMCooldown -= 1;

if(CMCooldown > 0)
CMCooldown -= 1;

TurnForce = 0;

Wall = false;
RWall = false;
LWall = false;

TurnRight = false;
TurnLeft = false;

Notice();

}

function TrigSweep(){
Trig.center = Vector3(0,0,512);
Trig.radius = 512;
yield WaitForSeconds (0.12);
Trig.center = Vector3(370,0,370);
yield WaitForSeconds (0.12);
Trig.center = Vector3(512,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(370,0,-370);
yield WaitForSeconds (0.12);
Trig.center = Vector3(0,0,-512);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-370,0,-370);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-512,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-370,0,370);
}

function TrigSweepAT(){
Trig.center = Vector3(0,0,256);
Trig.radius = 256;
yield WaitForSeconds (0.12);
Trig.center = Vector3(185,0,185);
yield WaitForSeconds (0.12);
Trig.center = Vector3(256,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(185,0,-185);
yield WaitForSeconds (0.12);
Trig.center = Vector3(0,0,-256);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-185,0,-185);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-256,0,0);
yield WaitForSeconds (0.12);
Trig.center = Vector3(-185,0,185);
}

function Notice (){

if(Attacking)
if(target)
if(Emergency)
TerrahyptianNetwork.instance.EnemyTarget1 = target;

if(DangerSense > 0){
DangerTick = true;
thisTransform.LookAt(Waypoint);
yield WaitForSeconds (0.1);
DangerTick = false;
}
}