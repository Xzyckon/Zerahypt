var target : Transform;
var Trigger : SphereCollider;
var LookTarget : Transform;
var EyeLookTarget : Transform;
var EyeResetTarget : Transform;
var ResetTarget : Transform;
var KnownTarget : Transform;

var AIAnchor : Transform;

var thisTransform : Transform;

var MainBodyTF : Transform;
var MainBodyRB : Rigidbody;

var TorsoTF : Transform;
var TorsoRB : Rigidbody;

var ModC : float = 0;

var AbRelDist : float = 0;

var BalCenTF : Transform;

var PredictPoint : Transform;

var PredictPointMod : float = 1;

private var PredictPointModStat : float = 1;

var GroundPointL : Transform;
var GroundPointR : Transform;

var GroundPointOffset : float = 0.5;

var RRelPoint1 : Vector3;
var RRelPoint2 : Vector3;
var RRelPoint3 : Vector3;

var LRelPoint1 : Vector3;
var LRelPoint2 : Vector3;
var LRelPoint3 : Vector3;

var BodyTiltMod : float = 2;
var BodyTiltModStanding : float = 2;

var LegVelMod : float = 8;

var RHipTF : Transform;
var RHipJoint : HingeJoint;
var RThighTF : Transform;
var RThighJoint : HingeJoint;
var RKneeTF : Transform;
var RKneeJoint : HingeJoint;

var LHipTF : Transform;
var LHipJoint : HingeJoint;
var LThighTF : Transform;
var LThighJoint : HingeJoint;
var LKneeTF : Transform;
var LKneeJoint : HingeJoint;

var LKneeRB : Rigidbody;
var RKneeRB : Rigidbody;

var RArmJoint : HingeJoint;
var LArmJoint : HingeJoint;

var RForeArmJoint : HingeJoint;
var LForeArmJoint : HingeJoint;

var FullStepneurysm = 80;
var StepneurysmR : float = 1;
var StepneurysmL : float = 1;

var StepneurysmSpeed : float = 1;

var RFootGO : GameObject;
var LFootGO : GameObject;

var RFootTF : Transform;
var LFootTF : Transform;

var RFootRB : Rigidbody;
var LFootRB : Rigidbody;

var RFootCol : Collider;
var LFootCol : Collider;

var FootPlaceTorque : float = 0;

var FeetMidTF : Transform;

var RFootCJoint : ConfigurableJoint;
var LFootCJoint : ConfigurableJoint;

var FootSCStartR : Transform;
var FootSCStartL : Transform;
var FootSCSize1 : float = 0.4;
var FootSCSize2 : float = 0.28;

var RFootPlaced : boolean;
var LFootPlaced : boolean;

var FootLandSFX : GameObject;

var StepHeightCurve : AnimationCurve = new AnimationCurve();

var StepHeightPlusR : float = 0;
var StepHeightPlusL : float = 0;

var SHPCurve : AnimationCurve = new AnimationCurve();

var Angle : float = 0;

var ArmBendCurve : AnimationCurve = new AnimationCurve();
var ForeArmBendCurve : AnimationCurve = new AnimationCurve();

var Perform : boolean;

var DoOnce : boolean;

private var NewRotation : Quaternion;

var IgnoreSelf : String;

var RandAim1 : Transform;
var RandAim2 : Transform;
var RandAim3 : Transform;

var EyeRandAim1 : Transform;
var EyeRandAim2 : Transform;
var EyeRandAim3 : Transform;

var LookForce : float = 0.1;
var EyeLookForce : float = 0.1;

var REye : GameObject;
var LEye : GameObject;

var RBrowMood = 100;
var LBrowMood = 100;
var RMouthMood = 10;
var LMouthMood = 10;
var JawMood = 10;
var Mood = 1;

var Spot : boolean;

var TargetCode = 2;

var Interest = 0;

var AngerLevel = 1;

var Jitter = 0;

var Walking : boolean;

var Stopping : boolean;

var Obstacle : boolean;

var Right : boolean;
var Left : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnForceCurve : AnimationCurve = new AnimationCurve();

var TurnForce : float = 1;

var DirForce : float = 1;

var MaxVel = 1;

var Vel : float = 0;

var RightDist : float = 200;
var LeftDist : float = 200;

var RUpDist : float = 200;
var RDownDist : float = 200;

var LUpDist : float = 200;
var LDownDist : float = 200;

var rSteepInc : boolean;
var lSteepInc : boolean;

var SenseDist = 50;

var IncThreshold : float = 1.5;

var TurnEndSide : float = 10;
var TurnEndVert : float = 10;

var PissedAtTC0 = 1;
var PissedAtTC1 = 1;
var PissedAtTC2 = 1;
var PissedAtTC3 = 1;
var PissedAtTC4 = 1;
var PissedAtTC5 = 1;
var PissedAtTC6 = 1;
var PissedAtTC7 = 1;
var PissedAtTC8 = 1;
var PissedAtTC9 = 1;

var RightBrow : Transform;
var LeftBrow : Transform;

var RightMouth : Transform;
var LeftMouth : Transform;

var HeadRB : Rigidbody;

var MtargetLayers : LayerMask;

InvokeRepeating("Ticker", 1, 0.5);

function Start () {

StepneurysmR = 0;
StepneurysmL = FullStepneurysm / 2;

PredictPointModStat = PredictPointMod;

}

function Update () {

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

var hit : RaycastHit;
var rHit1 : RaycastHit;
var rHit2 : RaycastHit;
var lHit1 : RaycastHit;
var lHit2 : RaycastHit;

RAngle = Mathf.Abs(RUpDist - RDownDist);

LAngle = Mathf.Abs(LUpDist - LDownDist);

var VelClamp = Mathf.Clamp(Vel * 10,SenseDist,500);

if(LookTarget)
var relativePoint = MainBodyTF.InverseTransformPoint(LookTarget.position);
LAndR = relativePoint.x;
FAndB = relativePoint.y;

PredictPoint.position = BalCenTF.position;
if (Physics.Raycast (BalCenTF.position, Vector3.down, hit, 64, MtargetLayers))
PredictPoint.position -= Vector3.up * hit.distance * 0.7;

Debug.DrawRay (PredictPoint.position + BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + -BalCenTF.forward * 4, BalCenTF.forward * VelClamp, Color.black);
if (Physics.Raycast (PredictPoint.position + BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + -BalCenTF.forward * 4, BalCenTF.forward, hit, VelClamp, MtargetLayers))
     RightDist = hit.distance;
     else
     RightDist = VelClamp;

Debug.DrawRay (PredictPoint.position + -BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + -BalCenTF.forward * 4, BalCenTF.forward * VelClamp, Color.black);
if (Physics.Raycast (PredictPoint.position + -BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + -BalCenTF.forward * 4, BalCenTF.forward, hit, VelClamp, MtargetLayers))
	 LeftDist = hit.distance;
	 else
	 LeftDist = VelClamp;
	 
Debug.DrawRay (PredictPoint.position + BalCenTF.right * TurnEndSide + BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward * VelClamp * 1.2, Color.green);
if (Physics.Raycast (PredictPoint.position + BalCenTF.right * TurnEndSide + BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward, rHit1, VelClamp, MtargetLayers))
     RUpDist = rHit1.distance;
     else
     RUpDist = 8;

Debug.DrawRay (PredictPoint.position + BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward * VelClamp * 1.2, Color.green);
if (Physics.Raycast (PredictPoint.position + BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward, rHit2, VelClamp, MtargetLayers))
     RDownDist = rHit2.distance;
     else
     RDownDist = 16;
     
Debug.DrawRay (PredictPoint.position + -BalCenTF.right * TurnEndSide + BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward * VelClamp * 1.2, Color.green);
if (Physics.Raycast (PredictPoint.position + -BalCenTF.right * TurnEndSide + BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward, lHit1, VelClamp, MtargetLayers))
     LUpDist = lHit1.distance;
     else
     LUpDist = 8;

Debug.DrawRay (PredictPoint.position + -BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward * VelClamp * 1.2, Color.green);
if (Physics.Raycast (PredictPoint.position + -BalCenTF.right * TurnEndSide + -BalCenTF.up * 0.2 + BalCenTF.forward * TurnEndVert, BalCenTF.forward, lHit2, VelClamp, MtargetLayers))
     LDownDist = lHit2.distance;
     else
     LDownDist = 16;
     
if(RAngle < IncThreshold){ rSteepInc = true; }else{ rSteepInc = false; }

if(LAngle < IncThreshold){ lSteepInc = true; }else{ lSteepInc = false; }

TurnRight = false;
TurnLeft = false;

if(!Obstacle){
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 25, Vector3.down * 25, Color.white);
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 30, Vector3.down * 25, Color.white);
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 35, Vector3.down * 25, Color.white);
if (!Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 25, Vector3.down, 25) ||
    !Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 30, Vector3.down, 25) ||
    !Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + BalCenTF.right * TurnEndSide + BalCenTF.forward * 35, Vector3.down, 25)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 25, Vector3.down * 25, Color.white);
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 30, Vector3.down * 25, Color.white);
       Debug.DrawRay (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 35, Vector3.down * 25, Color.white);
if (!Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 25, Vector3.down, 25) ||
    !Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 30, Vector3.down, 25) ||
    !Physics.Raycast (PredictPoint.position + BalCenTF.up * 20 + -BalCenTF.right * TurnEndSide + BalCenTF.forward * 35, Vector3.down, 25)){
      TurnRight = true;
     }
     }

 if(RightDist > LeftDist){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
     TurnLeft = true;
     }
     
     if(TurnRight && TurnLeft)
     Jitter += 1;
     
     if(AngerLevel < 100){
     if(TurnRight && !Right){
     Jitter += 1;
     Right = true;
     Left = false;
     }
     
     if(TurnLeft && !Left){
     Jitter += 1;
     Right = false;
     Left = true;
     }
     }else{
     if(LAndR > 0){
     TurnRight = true;
     TurnLeft = false;
     }else{
     TurnRight = false;
     TurnLeft = true;
     }
     
     }
     
if(Obstacle){
TurnRight = false;
TurnLeft = true;
}

}

function FixedUpdate () {

var hitM : RaycastHit;

var hitS : RaycastHit;

Vel = Mathf.Abs(MainBodyTF.InverseTransformDirection(MainBodyRB.velocity).z);

if (MainBodyRB.velocity != Vector3.zero)
PredictPoint.rotation = Quaternion.LookRotation(MainBodyRB.velocity);
PredictPoint.position = MainBodyTF.position;

var Y : float = PredictPoint.eulerAngles.y;
var Z : float = PredictPoint.eulerAngles.z;
PredictPoint.rotation = Quaternion.Euler(0, Y, Z);
PredictPoint.position += PredictPoint.forward * MainBodyRB.velocity.magnitude * PredictPointMod;

Debug.DrawRay (PredictPoint.position + MainBodyTF.right * GroundPointOffset, Vector3.down * 64, Color.yellow);
if (Physics.Raycast (PredictPoint.position + MainBodyTF.right * GroundPointOffset, Vector3.down, hitM, 64, MtargetLayers))
GroundPointR.position = hitM.point;

Debug.DrawRay (PredictPoint.position + MainBodyTF.right * -GroundPointOffset, Vector3.down * 64, Color.yellow);
if (Physics.Raycast (PredictPoint.position + MainBodyTF.right * -GroundPointOffset, Vector3.down, hitM, 64, MtargetLayers))
GroundPointL.position = hitM.point;

var relativePointT = TorsoTF.InverseTransformPoint(MainBodyTF.position);
AbRelDistZ = Mathf.Clamp(relativePointT.z,0,32);
AbRelDistX = relativePointT.x * 0.25;

MainBodyRB.AddTorque(MainBodyTF.right * MainBodyRB.velocity.magnitude * BodyTiltMod * AbRelDistZ);
MainBodyRB.AddTorque(MainBodyTF.forward * MainBodyRB.velocity.magnitude * BodyTiltMod * -AbRelDistX);

if(RFootPlaced)
RFootRB.AddTorque(RFootTF.right * FootPlaceTorque);
if(LFootPlaced)
LFootRB.AddTorque(LFootTF.right * FootPlaceTorque);



StepHeightR = StepHeightCurve.Evaluate(StepneurysmR);
StepHeightL = StepHeightCurve.Evaluate(StepneurysmL);

ArmMovementR = ArmBendCurve.Evaluate(StepneurysmL);
ArmMovementL = ArmBendCurve.Evaluate(StepneurysmR);

ForeArmMovementR = ForeArmBendCurve.Evaluate(StepneurysmL);
ForeArmMovementL = ForeArmBendCurve.Evaluate(StepneurysmR);

RArmJoint.motor.targetVelocity = ArmMovementR;
LArmJoint.motor.targetVelocity = ArmMovementL;

RForeArmJoint.motor.targetVelocity = ForeArmMovementR;
LForeArmJoint.motor.targetVelocity = ForeArmMovementL;




if(Walking){

if(StepneurysmR == StepneurysmL){
StepneurysmR = 0;
StepneurysmL = 50;
}

if(StepneurysmR < FullStepneurysm){
StepneurysmR += StepneurysmSpeed;
}else{
StepneurysmR = 0;
StepneurysmL = 50;
}

if(StepneurysmL < FullStepneurysm){
StepneurysmL += StepneurysmSpeed;
}else{
StepneurysmL = 0;
StepneurysmR = 50;
}

if(TurnLeft)
MainBodyRB.AddTorque(MainBodyTF.up * -TurnForce);

if(TurnRight)
MainBodyRB.AddTorque(MainBodyTF.up * TurnForce);

if(Vel < MaxVel)
MainBodyRB.AddForce(MainBodyTF.forward * DirForce);

if(RFootPlaced && LFootPlaced){
LFootPlaced = true;
RFootPlaced = false;
PlaceLFoot(false);
}

}else{

FeetMidTF.position = FootSCStartL.position;
FeetMidTF.LookAt(FootSCStartR);
FeetMidTF.position += FeetMidTF.forward * Vector3.Distance(FeetMidTF.position, FootSCStartR.position) / 2;

PredictPoint.LookAt(FeetMidTF);

PredictPoint.position = MainBodyTF.position;

Y = PredictPoint.eulerAngles.y;
Z = PredictPoint.eulerAngles.z;
PredictPoint.rotation = Quaternion.Euler(0, Y, Z);

ModV = Mathf.Abs(PredictPoint.InverseTransformPoint(FeetMidTF.position).z);

ModV2 = Mathf.Clamp(ModV,-16,16);

if(RFootPlaced || LFootPlaced)
MainBodyRB.AddForce(PredictPoint.forward * ModV2 * BodyTiltModStanding);

StepneurysmR = 0;
StepneurysmL = 0;

StepHeightR -= 1;
StepHeightL -= 1;

if(Physics.SphereCast(FootSCStartR.position, FootSCSize2, Vector3.down, hitS, FootSCSize2, MtargetLayers))
if(!RFootPlaced){
RFootPlaced = true;
PlaceRFoot(true);
Instantiate(FootLandSFX, hitS.point, Quaternion.identity);
}
if(Physics.SphereCast(FootSCStartL.position, FootSCSize2, Vector3.down, hitS, FootSCSize2, MtargetLayers))
if(!LFootPlaced){
LFootPlaced = true;
PlaceLFoot(true);
Instantiate(FootLandSFX, hitS.point, Quaternion.identity);
}

}


if(Stopping){

if(StepneurysmR > 24 && StepneurysmR < 26){
Walking = false;
Stopping = false;
}

if(StepneurysmL > 24 && StepneurysmL < 26){
Walking = false;
Stopping = false;
}

}


// GetGroundInclination ========================================================================================================

var UpDist = 2.0;

PredictPoint.position = BalCenTF.position;
if (Physics.Raycast (BalCenTF.position, Vector3.down, hitM, 64, MtargetLayers))
PredictPoint.position -= Vector3.up * hitM.distance;

Debug.DrawRay (PredictPoint.position + BalCenTF.up * 0.1, BalCenTF.forward * 8, Color.yellow);
if (Physics.Raycast (PredictPoint.position + BalCenTF.up * 0.1, BalCenTF.forward, hitM, 8, MtargetLayers))
UpDist = hitM.distance;
Debug.DrawRay (PredictPoint.position + BalCenTF.up * 0.2, BalCenTF.forward * 8, Color.yellow);
if (Physics.Raycast (PredictPoint.position + BalCenTF.up * 0.2, BalCenTF.forward, hitM, 8, MtargetLayers)){

Angle = Mathf.Abs(UpDist - hitM.distance);

StepHeightPlusR = SHPCurve.Evaluate(Angle);
StepHeightPlusL = SHPCurve.Evaluate(Angle);

}
//===============================================================================================================================


if(StepneurysmR < 50){
if(Physics.SphereCast(FootSCStartR.position, FootSCSize1, Vector3.down, hitS, FootSCSize1, MtargetLayers)){
if(StepneurysmR > 0)
StepHeightR += 1;
}
}else{
if(Physics.SphereCast(FootSCStartR.position, FootSCSize2, Vector3.down, hitS, FootSCSize2, MtargetLayers)){
StepHeightR -= 2;
if(!RFootPlaced){
RFootPlaced = true;
LFootPlaced = false;
PlaceRFoot(false);
Instantiate(FootLandSFX, hitS.point, Quaternion.identity);
}
}
StepHeightPlusR = 0;
}

if(StepneurysmL < 50){
if(Physics.SphereCast(FootSCStartL.position, FootSCSize1, Vector3.down, hitS, FootSCSize1, MtargetLayers)){
if(StepneurysmL > 0)
StepHeightL += 1;
}
}else{
if(Physics.SphereCast(FootSCStartL.position, FootSCSize2, Vector3.down, hitS, FootSCSize2, MtargetLayers)){
StepHeightL -= 2;
if(!LFootPlaced){
LFootPlaced = true;
RFootPlaced = false;
PlaceLFoot(false);
Instantiate(FootLandSFX, hitS.point, Quaternion.identity);
}
}
StepHeightPlusL = 0;
}









// FootLetGo ======================================================================================================

//if(StepneurysmR > 120)
//if(LFootCJoint)
//Destroy(LFootCJoint);

//if(StepneurysmL > 120)
//if(RFootCJoint)
//Destroy(RFootCJoint);










if(RFootPlaced)
RRelPoint1 = RHipTF.InverseTransformPoint(ResetTarget.position);
else
RRelPoint1 = RHipTF.InverseTransformPoint(GroundPointR.position);

RRelPoint2 = RThighTF.InverseTransformPoint(GroundPointR.position);
RRelPoint3 = RKneeTF.InverseTransformPoint(GroundPointR.position);

var RRelPoint2Z = RRelPoint2.z + StepHeightR;
var RRelPoint3Z = RRelPoint3.z - StepHeightR * 2;

RHipJoint.motor.targetVelocity = RRelPoint1.x * LegVelMod;
RThighJoint.motor.targetVelocity = RRelPoint2Z * LegVelMod + StepHeightPlusR;
RKneeJoint.motor.targetVelocity = RRelPoint3Z * LegVelMod;












if(LFootPlaced)
LRelPoint1 = LHipTF.InverseTransformPoint(ResetTarget.position);
else
LRelPoint1 = LHipTF.InverseTransformPoint(GroundPointL.position);

LRelPoint2 = LThighTF.InverseTransformPoint(GroundPointL.position);
LRelPoint3 = LKneeTF.InverseTransformPoint(GroundPointL.position);

var LRelPoint2Z = LRelPoint2.z + StepHeightL;
var LRelPoint3Z = LRelPoint3.z - StepHeightL * 2;

LHipJoint.motor.targetVelocity = LRelPoint1.x * LegVelMod;
LThighJoint.motor.targetVelocity = LRelPoint2Z * LegVelMod + StepHeightPlusL;
LKneeJoint.motor.targetVelocity = LRelPoint3Z * LegVelMod;

















if(LookTarget){
    HeadRB.AddForceAtPosition((LookTarget.transform.position - transform.position).normalized * LookForce, -transform.forward * 1);
    HeadRB.AddForceAtPosition((LookTarget.transform.position - transform.position).normalized * -LookForce, transform.forward * 1);
}

if(EyeLookTarget){
    REye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - REye.transform.position).normalized * EyeLookForce, -REye.transform.forward * 1);
    REye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - REye.transform.position).normalized * -EyeLookForce, REye.transform.forward * 1);
    LEye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - LEye.transform.position).normalized * EyeLookForce, -LEye.transform.forward * 1);
    LEye.rigidbody.AddForceAtPosition((EyeLookTarget.transform.position - LEye.transform.position).normalized * -EyeLookForce, LEye.transform.forward * 1);

}

RightBrow.localPosition.x = -0.08 + -RBrowMood * 0.0002;
LeftBrow.localPosition.x = -0.08 + -LBrowMood * 0.0002;

RightMouth.localEulerAngles.x = RMouthMood;
RightMouth.localEulerAngles.y = 270 + RMouthMood * 0.5;

LeftMouth.localEulerAngles.x = -LMouthMood;
LeftMouth.localEulerAngles.y = 270 + LMouthMood * 0.5;

if(Mood == 2){
if(EyeLookTarget != EyeRandAim2){
if(RMouthMood < 40)
RMouthMood += 1;
}else{
if(LBrowMood > -100)
LBrowMood -= 1;
}
if(EyeLookTarget != EyeRandAim1){
if(LMouthMood < 40)
LMouthMood += 1;
}else{
if(RBrowMood > -100)
RBrowMood -= 1;
}

}

if(Mood == 0){
if(RMouthMood > -14)
RMouthMood -= 1;
if(LMouthMood > -14)
LMouthMood -= 1;

if(RBrowMood > -200)
RBrowMood -= 2;
if(LBrowMood > -200)
LBrowMood -= 2;
}

if(Mood == 1){

if(RBrowMood > 0)
RBrowMood -= 1;
if(LBrowMood > 0)
LBrowMood -= 1;

if(RBrowMood < 0)
RBrowMood += 1;
if(LBrowMood < 0)
LBrowMood += 1;

if(RMouthMood > 0)
RMouthMood -= 2;
if(RMouthMood < 0)
RMouthMood += 2;
if(LMouthMood > 0)
LMouthMood -= 2;
if(LMouthMood < 0)
LMouthMood += 2;
}

if(RMouthMood > 40)
RMouthMood = 40;

if(LMouthMood > 40)
LMouthMood = 40;

if(RMouthMood < -14)
RMouthMood = -14;

if(LMouthMood < -14)
LMouthMood = -14;

if(RBrowMood > 200)
RBrowMood = 200;

if(RBrowMood < -200)
RBrowMood = -200;

if(LBrowMood > 200)
LBrowMood = 200;

if(LBrowMood < -200)
LBrowMood = -200;

if(AngerLevel > 24)
Mood = 0;

}

function OnTriggerEnter (other : Collider) {

if(other == null)
return;

ON = other.name;
OT = other.transform;

if(ON.Contains (IgnoreSelf))
return;

if(ON.Contains ("TFC")){

Trigger.radius = 128;

if(TargetCode != 0){
if(ON.Contains ("TFC0a")){
if(PissedAtTC0 < 32)
PissedAtTC0 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}
}

if(TargetCode != 1)
if(ON.Contains ("TFC1")){
if(PissedAtTC1 < 32)
PissedAtTC1 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 2 && TargetCode != 3)
if(ON.Contains ("TFC2")){
if(PissedAtTC2 < 32)
PissedAtTC2 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 3)
if(ON.Contains ("TFC3")){
if(PissedAtTC3 < 32)
PissedAtTC3 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 4)
if(ON.Contains ("TFC4")){
if(PissedAtTC4 < 32)
PissedAtTC4 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 5)
if(ON.Contains ("TFC5")){
if(PissedAtTC5 < 32)
PissedAtTC5 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 6)
if(ON.Contains ("TFC6")){
if(PissedAtTC6 < 32)
PissedAtTC6 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 7)
if(ON.Contains ("TFC7")){
if(PissedAtTC7 < 32)
PissedAtTC7 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 8)
if(ON.Contains ("TFC8")){
if(PissedAtTC8 < 32)
PissedAtTC8 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

if(TargetCode != 9)
if(ON.Contains ("TFC9")){
if(PissedAtTC9 < 32)
PissedAtTC9 += 8;
if(AngerLevel < 64)
AngerLevel += 18;
Spot = false;
}

}



}

function OnTriggerStay (other : Collider) {

if(other == null)
return;

ON = other.name;
OT = other.transform;

if(ON.Contains (IgnoreSelf))
return;

if(ON.Contains ("TC")){

if(LookTarget)
if(Interest < 1)
if(!LookTarget.name.Contains ("TC")){
LookTarget = OT;
EyeLookTarget = OT;
Interest = 32;
}

if(TargetCode != 1)
if(ON.Contains ("TC1"))
if(PissedAtTC1 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 2)
if(ON.Contains ("TC2"))
if(PissedAtTC3 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 3)
if(ON.Contains ("TC3"))
if(PissedAtTC3 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 4)
if(ON.Contains ("TC4"))
if(PissedAtTC4 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 5)
if(ON.Contains ("TC5"))
if(PissedAtTC5 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 6)
if(ON.Contains ("TC6"))
if(PissedAtTC6 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 7)
if(ON.Contains ("TC7"))
if(PissedAtTC7 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 8)
if(ON.Contains ("TC8"))
if(PissedAtTC8 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

if(TargetCode != 9)
if(ON.Contains ("TC9"))
if(PissedAtTC9 > 8){
LookTarget = OT;
EyeLookTarget = OT;
}

}

}

function PlaceRFoot(RFullPlace : boolean){

if(Walking)
if(LFootCJoint)
Destroy(LFootCJoint);

if(RFootCJoint)
Destroy(RFootCJoint);

RFootCJoint = RFootGO.AddComponent ("ConfigurableJoint");
RFootCJoint.autoConfigureConnectedAnchor = true;
		
RFootCJoint.xDrive.mode = JointDriveMode.Position;
RFootCJoint.yDrive.mode = JointDriveMode.Position;
RFootCJoint.zDrive.mode = JointDriveMode.Position;
RFootCJoint.xDrive.positionSpring = 1000;
RFootCJoint.yDrive.positionSpring = 1000;
RFootCJoint.zDrive.positionSpring = 1000;
RFootCJoint.xDrive.positionDamper = 10;
RFootCJoint.yDrive.positionDamper = 10;
RFootCJoint.zDrive.positionDamper = 10;
        
RFootCJoint.angularXDrive.mode = JointDriveMode.Position;
RFootCJoint.angularYZDrive.mode = JointDriveMode.Position;
   
RFootCJoint.angularXDrive.positionSpring = 0;
RFootCJoint.angularYZDrive.positionSpring = 0;
RFootCJoint.angularXDrive.positionDamper = 0;
RFootCJoint.angularYZDrive.positionDamper = 0;

RFootCol.enabled = true;
if(!RFullPlace)
LFootCol.enabled = false;

}

function PlaceLFoot(LFullPlace : boolean){

if(Walking)
if(RFootCJoint)
Destroy(RFootCJoint);

if(LFootCJoint)
Destroy(LFootCJoint);

LFootCJoint = LFootGO.AddComponent ("ConfigurableJoint");
LFootCJoint.autoConfigureConnectedAnchor = true;
		
LFootCJoint.xDrive.mode = JointDriveMode.Position;
LFootCJoint.yDrive.mode = JointDriveMode.Position;
LFootCJoint.zDrive.mode = JointDriveMode.Position;
LFootCJoint.xDrive.positionSpring = 1000;
LFootCJoint.yDrive.positionSpring = 1000;
LFootCJoint.zDrive.positionSpring = 1000;
LFootCJoint.xDrive.positionDamper = 10;
LFootCJoint.yDrive.positionDamper = 10;
LFootCJoint.zDrive.positionDamper = 10;
        
LFootCJoint.angularXDrive.mode = JointDriveMode.Position;
LFootCJoint.angularYZDrive.mode = JointDriveMode.Position;
   
LFootCJoint.angularXDrive.positionSpring = 0;
LFootCJoint.angularYZDrive.positionSpring = 0;
LFootCJoint.angularXDrive.positionDamper = 0;
LFootCJoint.angularYZDrive.positionDamper = 0;


LFootCol.enabled = true;
if(!LFullPlace)
RFootCol.enabled = false;

}

function Ticker () {

if(LookTarget){

if(AngerLevel < 100){
if(Interest < 16){
Notice();
if(!Walking){
Walking = true;
StartWalking();
}
}else{
if(Interest > 24){
if(LookTarget.name.Contains ("TC")){
if(LookTarget == KnownTarget)
Reset();
else
Stopping = true;
}
}
}
}else{
if(LookTarget.name.Contains ("TC1"))
if(PissedAtTC1 > 8)
Reset();
if(LookTarget.name.Contains ("TC3"))
if(PissedAtTC3 > 8)
Reset();
if(LookTarget.name.Contains ("TC4"))
if(PissedAtTC4 > 8)
Reset();
if(LookTarget.name.Contains ("TC5"))
if(PissedAtTC5 > 8)
Reset();
if(LookTarget.name.Contains ("TC6"))
if(PissedAtTC6 > 8)
Reset();
if(LookTarget.name.Contains ("TC7"))
if(PissedAtTC7 > 8)
Reset();
if(LookTarget.name.Contains ("TC8"))
if(PissedAtTC8 > 8)
Reset();
if(LookTarget.name.Contains ("TC9"))
if(PissedAtTC9 > 8)
Reset();

}

}else{
Notice();
}

if(Jitter > 4){
Obsy();
Jitter = 0;
}

if(Jitter > 0)
Jitter -= 1;

if(Interest > 0)
Interest -= 1;

if(AngerLevel > 4)
AngerLevel -= 5;

if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
if(PissedAtTC2 > 0)
PissedAtTC2 -= 1;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
if(PissedAtTC4 > 0)
PissedAtTC4 -= 1;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;
if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;

if(Trigger.radius < 64){
Trigger.center -= Vector3(0,0,2);
Trigger.radius += 4;
}

}

function Notice () {

if(AngerLevel > 1)
return;

//Trigger.center = Vector3(0,0,-32);
//Trigger.radius = 64;

if(LookTarget)
if(LookTarget.name.Contains ("TC"))
KnownTarget = LookTarget;

var Interval: int = Random.Range(0, 8);
       
switch (Interval) {
case 1:
Trigger.center = Vector3(0,0,0);
Trigger.radius = 0.1;
LookTarget = ResetTarget;
break;
}

if(LookTarget == ResetTarget){
var Interval1: int = Random.Range(0, 16);
var Interval2: int = Random.Range(0, 16);
       
switch (Interval1) {
case 1:
EyeLookTarget = EyeResetTarget;
break;
case 2:
EyeLookTarget = EyeRandAim1;
break;
case 3:
EyeLookTarget = EyeRandAim2;
break;
case 4:
EyeLookTarget = EyeRandAim3;
break;
}
       
switch (Interval) {
case 1:
LookTarget = RandAim1;
break;
case 2:
LookTarget = RandAim2;
break;
case 3:
LookTarget = RandAim3;
break;
}
}

var Interval3: int = Random.Range(0, 32);
       
switch (Interval3) {
case 1:
Mood = 2;
break;
case 2:
Mood = 1;
break;
case 3:
Mood = 1;
break;
}

}

function Reset () {

Trigger.center = Vector3(0,0,-32);
Trigger.radius = 64;

EyeLookTarget = EyeResetTarget;
LookTarget = ResetTarget;

}

function StartWalking(){
Stopping = false;
PredictPointMod = PredictPointModStat * 3;
yield WaitForSeconds (0.5);
PredictPointMod = PredictPointModStat;
}

function Obsy (){
Obstacle = true;
yield WaitForSeconds (1);
Obstacle = false;
}