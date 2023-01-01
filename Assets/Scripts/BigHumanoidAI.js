
var ThisTF : Transform;
var ThisRB : Rigidbody;

var DirForce : float = 50;
var AngForce : float = 50;
static var StaticAngForce : float = 50;

var MaxVel : float = 7;

var MoodAtTC1 = 0;
var MoodAtTC2 = 0;
var MoodAtTC3 = 0;
var MoodAtTC4 = 0;
var MoodAtTC5 = 0;
var MoodAtTC6 = 0;
var MoodAtTC7 = 0;

var Interest = 0;

var AngerLevel = 0;

var Jitter = 0;

var Stay : boolean;

var Walking : boolean;

var Obstacle : boolean;

var Right : boolean;
var Left : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnForceCurve : AnimationCurve = new AnimationCurve();

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

var HeadController : CyraHeadController;

var RGhostHandRB : Rigidbody;
var RHandMaxDist : float = 5;
var RArmPivotTF : Transform;
var RArmPivotRB : Rigidbody;

var RCJoint : ConfigurableJoint;
var RHandCJoint : ConfigurableJoint;
var RHandGO : GameObject;

var LGhostHandRB : Rigidbody;
var LHandMaxDist : float = 5;
var LArmPivotTF : Transform;
var LArmPivotRB : Rigidbody;

var LCJoint : ConfigurableJoint;
var LHandCJoint : ConfigurableJoint;
var LHandGO : GameObject;

var RReachPoint : Transform;
var LReachPoint : Transform;

var ArmAimForce : float = 8;
var ArmPivotSpeed : float = 2;

var ReachPointRF : Transform;
var ReachPointR : Transform;

var ReachPointLF : Transform;
var ReachPointL : Transform;

var ArmSwingCurveZ : AnimationCurve = new AnimationCurve();
var ArmSwingCurveZ2 : AnimationCurve = new AnimationCurve();
var ArmSwingCurveY : AnimationCurve = new AnimationCurve();
var ArmSwingCurveY2 : AnimationCurve = new AnimationCurve();

var LLegScript : LegScript2;
var RLegScript : LegScript2;

var RAscend : boolean;
var LAscend : boolean;

var StepTime = 90;

var RStepNum = 0;
var LStepNum = 0;

var RAngle : float = 0;
var LAngle : float = 0;

var RNum : float = 0;
var LNum : float = 0;

var LAndR : float = 0;
var FAndB : float = 0;

var MtargetLayers : LayerMask;

InvokeRepeating("Ticker", 1, 0.5);

function Start () {

StaticAngForce = AngForce;
        
        var RgO = new GameObject("RGhostHand");
		var LgO = new GameObject("LGhostHand");
        RgO.transform.position = RArmPivotTF.position;
        RgO.transform.rotation = RArmPivotTF.rotation;
        RgO.transform.Translate(Vector3.down * 5);
        RgO.layer = 23;
        LgO.transform.position = LArmPivotTF.position;
        LgO.transform.rotation = LArmPivotTF.rotation;
        LgO.transform.Translate(Vector3.down * 5);
        LgO.layer = 23;
        
        RGhostHandRB = RgO.AddComponent ("Rigidbody");
		RGhostHandRB.mass = 0.01;
		LGhostHandRB = LgO.AddComponent ("Rigidbody");
		LGhostHandRB.mass = 0.01;
        
        RCJoint = RgO.AddComponent ("ConfigurableJoint");
		RCJoint.autoConfigureConnectedAnchor = false;
		RCJoint.connectedBody = RArmPivotRB;
		RCJoint.anchor = Vector3(0,0,0);
		RCJoint.connectedAnchor = Vector3(0,0,-5.5);
		RCJoint.axis = Vector3(0,0,0);
		LCJoint = LgO.AddComponent ("ConfigurableJoint");
		LCJoint.autoConfigureConnectedAnchor = false;
		LCJoint.connectedBody = LArmPivotRB;
		LCJoint.anchor = Vector3(0,0,0);
		LCJoint.connectedAnchor = Vector3(0,0,-5.5);
		LCJoint.axis = Vector3(0,0,0);
		
		RCJoint.xDrive.mode = JointDriveMode.Position;
        RCJoint.yDrive.mode = JointDriveMode.Position;
        RCJoint.zDrive.mode = JointDriveMode.Position;
        RCJoint.angularXDrive.mode = JointDriveMode.Position;
        RCJoint.angularYZDrive.mode = JointDriveMode.Position;
		LCJoint.xDrive.mode = JointDriveMode.Position;
        LCJoint.yDrive.mode = JointDriveMode.Position;
        LCJoint.zDrive.mode = JointDriveMode.Position;
        LCJoint.angularXDrive.mode = JointDriveMode.Position;
        LCJoint.angularYZDrive.mode = JointDriveMode.Position;
        
        RCJoint.xDrive.positionSpring = 1000;
        RCJoint.yDrive.positionSpring = 1000;
        RCJoint.zDrive.positionSpring = 1;
        RCJoint.angularXDrive.positionSpring = 1000;
        RCJoint.angularYZDrive.positionSpring = 1000;
        LCJoint.xDrive.positionSpring = 1000;
        LCJoint.yDrive.positionSpring = 1000;
        LCJoint.zDrive.positionSpring = 1;
        LCJoint.angularXDrive.positionSpring = 1000;
        LCJoint.angularYZDrive.positionSpring = 1000;
        
        RHandCJoint = RHandGO.AddComponent ("ConfigurableJoint");
        RHandCJoint.autoConfigureConnectedAnchor = false;
        RHandCJoint.connectedBody = RGhostHandRB;
		RHandCJoint.anchor = Vector3(0,0,0);
		RHandCJoint.connectedAnchor = Vector3(0,0,0);
		RHandCJoint.axis = Vector3(0,0,0);
        LHandCJoint = LHandGO.AddComponent ("ConfigurableJoint");
        LHandCJoint.autoConfigureConnectedAnchor = false;
        LHandCJoint.connectedBody = LGhostHandRB;
		LHandCJoint.anchor = Vector3(0,0,0);
		LHandCJoint.connectedAnchor = Vector3(0,0,0);
		LHandCJoint.axis = Vector3(0,0,0);
		
		RHandCJoint.xDrive.mode = JointDriveMode.Position;
        RHandCJoint.yDrive.mode = JointDriveMode.Position;
        RHandCJoint.zDrive.mode = JointDriveMode.Position;
        RHandCJoint.xDrive.positionSpring = 0.1;
        RHandCJoint.yDrive.positionSpring = 0.1;
        RHandCJoint.zDrive.positionSpring = 0.1;
        RHandCJoint.xDrive.positionDamper = 0.05;
        RHandCJoint.yDrive.positionDamper = 0.05;
        RHandCJoint.zDrive.positionDamper = 0.05;
		LHandCJoint.xDrive.mode = JointDriveMode.Position;
        LHandCJoint.yDrive.mode = JointDriveMode.Position;
        LHandCJoint.zDrive.mode = JointDriveMode.Position;
        LHandCJoint.xDrive.positionSpring = 0.1;
        LHandCJoint.yDrive.positionSpring = 0.1;
        LHandCJoint.zDrive.positionSpring = 0.1;
        LHandCJoint.xDrive.positionDamper = 0.05;
        LHandCJoint.yDrive.positionDamper = 0.05;
        LHandCJoint.zDrive.positionDamper = 0.05;
        
        RHandCJoint.angularXDrive.mode = JointDriveMode.Position;
        RHandCJoint.angularYZDrive.mode = JointDriveMode.Position;
        LHandCJoint.angularXDrive.mode = JointDriveMode.Position;
        LHandCJoint.angularYZDrive.mode = JointDriveMode.Position;
        
        RHandCJoint.angularXDrive.positionSpring = 0.1;
        RHandCJoint.angularYZDrive.positionSpring = 0.1;
        RHandCJoint.angularXDrive.positionDamper = 0.05;
        RHandCJoint.angularYZDrive.positionDamper = 0.05;
        LHandCJoint.angularXDrive.positionSpring = 0.1;
        LHandCJoint.angularYZDrive.positionSpring = 0.1;
        LHandCJoint.angularXDrive.positionDamper = 0.05;
        LHandCJoint.angularYZDrive.positionDamper = 0.05;

RReachPoint.parent = null;
LReachPoint.parent = null;

if(RAscend){
RStepNum = 0;
LStepNum = StepTime;
}else{
LStepNum = 0;
RStepNum = StepTime;
}

}

function Update () {

var hit : RaycastHit;
var rHit1 : RaycastHit;
var rHit2 : RaycastHit;
var lHit1 : RaycastHit;
var lHit2 : RaycastHit;

RAngle = Mathf.Abs(RUpDist - RDownDist);

LAngle = Mathf.Abs(LUpDist - LDownDist);

var newRot : Vector3 = (-ThisTF.up).normalized;

var VelClamp = Mathf.Clamp(ThisRB.velocity.magnitude * 10,SenseDist,500);

if(HeadController.LookTarget)
var relativePoint = ThisTF.InverseTransformPoint(HeadController.LookTarget.position);
LAndR = relativePoint.x;
FAndB = relativePoint.y;

Debug.DrawRay (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * TurnEndVert + ThisTF.up * 4, newRot * VelClamp, Color.black);
if (Physics.Raycast (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * TurnEndVert + ThisTF.up * 4, newRot, hit, VelClamp, MtargetLayers))
     RightDist = hit.distance;
     else
     RightDist = VelClamp;

Debug.DrawRay (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * TurnEndVert + ThisTF.up * 4, newRot * VelClamp, Color.black);
if (Physics.Raycast (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * TurnEndVert + ThisTF.up * 4, newRot, hit, VelClamp, MtargetLayers))
	 LeftDist = hit.distance;
	 else
	 LeftDist = VelClamp;
	 
Debug.DrawRay (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * 0.2 + ThisTF.forward * TurnEndVert, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * 0.2 + ThisTF.forward * TurnEndVert, -ThisTF.up, rHit1, VelClamp, MtargetLayers))
     RUpDist = rHit1.distance;
     else
     RUpDist = 8;

Debug.DrawRay (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * -0.2 + ThisTF.forward * TurnEndVert, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (ThisTF.position + ThisTF.right * TurnEndSide + ThisTF.forward * -0.2 + ThisTF.forward * TurnEndVert, -ThisTF.up, rHit2, VelClamp, MtargetLayers))
     RDownDist = rHit2.distance;
     else
     RDownDist = 16;
     
Debug.DrawRay (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * 0.2 + ThisTF.forward * TurnEndVert, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * 0.2 + ThisTF.forward * TurnEndVert, -ThisTF.up, lHit1, VelClamp, MtargetLayers))
     LUpDist = lHit1.distance;
     else
     LUpDist = 8;

Debug.DrawRay (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * -0.2 + ThisTF.forward * TurnEndVert, newRot * VelClamp * 1.2, Color.green);
if (Physics.Raycast (ThisTF.position + -ThisTF.right * TurnEndSide + ThisTF.forward * -0.2 + ThisTF.forward * TurnEndVert, -ThisTF.up, lHit2, VelClamp, MtargetLayers))
     LDownDist = lHit2.distance;
     else
     LDownDist = 16;
     
if(RAngle < IncThreshold){ rSteepInc = true; }else{ rSteepInc = false; }

if(LAngle < IncThreshold){ lSteepInc = true; }else{ lSteepInc = false; }

TurnRight = false;
TurnLeft = false;

       Debug.DrawRay (ThisTF.position + ThisTF.forward * 20 
                                      + ThisTF.right * TurnEndSide
                                      + -ThisTF.up * 25, -ThisTF.forward * 35, Color.white);
if (!Physics.Raycast (ThisTF.position + ThisTF.forward * 20 
                                      + ThisTF.right * TurnEndSide
                                      + -ThisTF.up * 25, -ThisTF.forward, 35)){
     TurnLeft = true;
     }
     
       Debug.DrawRay (ThisTF.position + ThisTF.forward * 20 
                                      + -ThisTF.right * TurnEndSide
                                      + -ThisTF.up * 25, -ThisTF.forward * 35, Color.white);
if (!Physics.Raycast (ThisTF.position + ThisTF.forward * 20 
                                      + -ThisTF.right * TurnEndSide
                                      + -ThisTF.up * 25, -ThisTF.forward, 35)){
     TurnRight = true;
     }

 if(RightDist > LeftDist){
     TurnRight = true;
     }
     
 if(LeftDist > RightDist){
     TurnLeft = true;
     }
     
     if(TurnRight && TurnLeft)
     Jitter += 1;
     
     if(!Stay)
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
     
     if(FAndB > -11)
     Walking = false;
     else
     Walking = true;
     }
     
if(Obstacle){
TurnRight = false;
TurnLeft = true;
}

if(Walking){
LReachPoint.position = ReachPointL.position;
RReachPoint.position = ReachPointR.position;

if(RAscend){
ReachPointR.localPosition.y = ArmSwingCurveZ.Evaluate(RStepNum);
RNum = ArmSwingCurveY.Evaluate(RStepNum);
}else{
ReachPointR.localPosition.y = ArmSwingCurveZ2.Evaluate(RStepNum);
RNum = ArmSwingCurveY2.Evaluate(RStepNum);
}

if(LAscend){
ReachPointL.localPosition.y = ArmSwingCurveZ.Evaluate(LStepNum);
LNum = ArmSwingCurveY.Evaluate(LStepNum);
}else{
ReachPointL.localPosition.y = ArmSwingCurveZ2.Evaluate(LStepNum);
LNum = ArmSwingCurveY2.Evaluate(LStepNum);
}
}else{
LReachPoint.position = ReachPointLF.position;
RReachPoint.position = ReachPointRF.position;
RNum = 2;
LNum = 2;
}

}

function FixedUpdate () {

if(Walking)
if(ThisRB.velocity.magnitude < MaxVel)
ThisRB.AddForce(ThisTF.up * -DirForce);

if(AngerLevel > 100)
AngForce = TurnForceCurve.Evaluate(LAndR);
else
AngForce = StaticAngForce;

if(TurnLeft && !TurnRight){
  ThisRB.AddTorque(ThisTF.forward * -AngForce);
}

if(TurnRight && !TurnLeft){
  ThisRB.AddTorque(ThisTF.forward * AngForce);
}

if(RArmPivotRB.angularVelocity.magnitude < ArmPivotSpeed){
RArmPivotRB.AddForceAtPosition((RReachPoint.position - RArmPivotTF.position).normalized * ArmAimForce, -RArmPivotTF.forward * 2);
RArmPivotRB.AddForceAtPosition((RReachPoint.position - RArmPivotTF.position).normalized * -ArmAimForce, RArmPivotTF.forward * 2);
}
if(LArmPivotRB.angularVelocity.magnitude < ArmPivotSpeed){
LArmPivotRB.AddForceAtPosition((LReachPoint.position - LArmPivotTF.position).normalized * ArmAimForce, -LArmPivotTF.forward * 2);
LArmPivotRB.AddForceAtPosition((LReachPoint.position - LArmPivotTF.position).normalized * -ArmAimForce, LArmPivotTF.forward * 2);
}

RCJoint.targetPosition = Vector3(0,0,RNum);
LCJoint.targetPosition = Vector3(0,0,LNum);

if(RAscend){
RStepNum += 1;
}else{
RStepNum -= 1;
}
if(LAscend){
LStepNum += 1;
}else{
LStepNum -= 1;
}

if(RStepNum > StepTime)
RAscend = false;
if(LStepNum > StepTime)
LAscend = false;

if(RStepNum < 1){
RAscend = true;
LLegScript.StepNum = StepTime;
}

if(RStepNum > StepTime - 1){
RAscend = false;
LLegScript.StepNum = StepTime;
}

if(LStepNum < 1){
LAscend = true;
RLegScript.StepNum = StepTime;
}

if(LStepNum > StepTime - 1){
LAscend = false;
RLegScript.StepNum = StepTime;
}

RLegScript.Ascend = RAscend;
LLegScript.Ascend = LAscend;

RLegScript.StepNum = RStepNum;
LLegScript.StepNum = LStepNum;

}

function Ticker () {

if(HeadController.LookTarget){

if(Vector3.Distance(transform.position, HeadController.LookTarget.position) < 100){
if(HeadController.LookTarget.name.Contains ("TC1")){
if(MoodAtTC1 < 200){
MoodAtTC1 += 100;
Walking = false;
Interest = 40;
}
}
if(HeadController.LookTarget.name.Contains ("TC3")){
if(MoodAtTC3 < 200){
MoodAtTC3 += 100;
Walking = false;
Interest = 40;
}
}
if(HeadController.LookTarget.name.Contains ("TC4")){
if(MoodAtTC4 < 200){
MoodAtTC4 += 100;
Walking = false;
Interest = 40;
}
}
if(HeadController.LookTarget.name.Contains ("TC5")){
if(MoodAtTC5 < 200){
MoodAtTC5 += 100;
Walking = false;
Interest = 40;
}
}
if(HeadController.LookTarget.name.Contains ("TC6")){
if(MoodAtTC6 < 200){
MoodAtTC6 += 100;
Walking = false;
Interest = 40;
}
}
if(HeadController.LookTarget.name.Contains ("TC7")){
if(MoodAtTC7 < 200){
MoodAtTC7 += 100;
Walking = false;
Interest = 40;
}
}

}

if(AngerLevel < 100){
if(Interest < 1){
HeadController.Notice();
if(!Walking && !Stay){
Walking = true;
RStepNum = 0;
LStepNum = StepTime;
}
}
}else{
if(HeadController.LookTarget.name.Contains ("TC1"))
if(MoodAtTC1 > 200)
HeadController.Reset();
if(HeadController.LookTarget.name.Contains ("TC3"))
if(MoodAtTC3 > 200)
HeadController.Reset();
if(HeadController.LookTarget.name.Contains ("TC4"))
if(MoodAtTC4 > 200)
HeadController.Reset();
if(HeadController.LookTarget.name.Contains ("TC5"))
if(MoodAtTC5 > 200)
HeadController.Reset();
if(HeadController.LookTarget.name.Contains ("TC6"))
if(MoodAtTC6 > 200)
HeadController.Reset();
if(HeadController.LookTarget.name.Contains ("TC7"))
if(MoodAtTC7 > 200)
HeadController.Reset();

}

}else{
HeadController.Notice();
}

if(Jitter > 0)
Jitter -= 1;

if(Jitter > 10){
Obsy();
Jitter = 0;
}

if(Interest > 0)
Interest -= 2;

if(AngerLevel > 4)
AngerLevel -= 5;

if(MoodAtTC1 > 0)
MoodAtTC1 -= 1;
if(MoodAtTC3 > 0)
MoodAtTC3 -= 1;
if(MoodAtTC4 > 0)
MoodAtTC4 -= 1;
if(MoodAtTC5 > 0)
MoodAtTC5 -= 1;
if(MoodAtTC6 > 0)
MoodAtTC6 -= 1;
if(MoodAtTC7 > 0)
MoodAtTC7 -= 1;

}

function Obsy (){
Obstacle = true;
yield WaitForSeconds (1);
Obstacle = false;
}