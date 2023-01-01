
var VesselTF : Transform;
var FootTF : Transform;
var FootGO : GameObject;
var FootRB : Rigidbody;
var PivotTF : Transform;

var PivotRB : Rigidbody;

var BodyTF : Transform;

var MainAI : BigHumanoidAI;

var GroundPoint : Transform;

var GroundPointOffset : float = 0;

var targetLayers : LayerMask;

var VesselRB : Rigidbody;
var Vessel2RB : Rigidbody;

var GhostLegRB : Rigidbody;

var GyroPointRB : Rigidbody;

var OtherLegScript : LegScript;

var CJoint : ConfigurableJoint;

var FootCJoint : ConfigurableJoint;

var FootAngCJoint : ConfigurableJoint;

var FootSensorY : float = 1;
var FootSensorZ : float = 1.5;

var FootForce : float = 0.5;
var FootMaxForceCurve : AnimationCurve = new AnimationCurve();
var FootMaxDist : float = 5;

var GroundDistForce : float = 0;
var GroundDistForceCurve : AnimationCurve = new AnimationCurve();

var UseCounterForce : boolean;
var CounterForceCurve : AnimationCurve = new AnimationCurve();
var CounterForceCurve2 : AnimationCurve = new AnimationCurve();

var Obstacle : boolean;

var Nullstacle : boolean;

var GroundFeelDist : float = 1;

var FootPlaced : boolean;

var Ascend : boolean = false;

var AscendSound : GameObject;
var DescendSound : GameObject;

var Stepped : boolean;

var RightSideLeg : boolean;

var KneeJoint : HingeJoint;

var UseLegAim : boolean;
var LegTF : Transform;
var LegRB : Rigidbody;

var UseFootAim : boolean;
var FootAngler : Transform;

var FootTorqueCurve : AnimationCurve = new AnimationCurve();
var FootTorqueCurve2 : AnimationCurve = new AnimationCurve();

var GroundClearanceCurve : AnimationCurve = new AnimationCurve();

var FullStride : float = -2.5;
var GroundClearance : float = 1;
var LiftSpeedMod : float = 0.1;

var LegLiftCurve : AnimationCurve = new AnimationCurve();
var LegDownCurve : AnimationCurve = new AnimationCurve();

var LegPivotSpeed : float = 0.2;

var KneeDampCurve : AnimationCurve = new AnimationCurve();

var StrideDistMod : AnimationCurve = new AnimationCurve();

var Vel : float = 0;

var VelCurve : AnimationCurve = new AnimationCurve();
var VelCurve2 : AnimationCurve = new AnimationCurve();
var VelCurve3 : AnimationCurve = new AnimationCurve();
var VelCurve4 : AnimationCurve = new AnimationCurve();
var StraightenCurve : AnimationCurve = new AnimationCurve();

var FootDistForceCurve : AnimationCurve = new AnimationCurve();

var StepAimForce : float = 1;
var StepAimForceCurve : AnimationCurve = new AnimationCurve();

var StepNum = 0;

var AngMod : float = 0;

var Num : float = 0;

private var PGroundClearance : float = 0;

function Start () {

		var gO = new GameObject("GhostLeg");
		//gO.transform.parent = gameObject.transform;
		gO.transform.position = transform.position;
        gO.transform.rotation = transform.rotation;
        gO.transform.Translate(Vector3.back * 5);
        gO.layer = 23;
        
		GhostLegRB = gO.AddComponent ("Rigidbody");
		GhostLegRB.mass = 0.1;
		
        //var SCol = gO.AddComponent ("SphereCollider");
        //SCol.radius = 1;
        
		CJoint = gO.AddComponent ("ConfigurableJoint");
		CJoint.autoConfigureConnectedAnchor = false;
		CJoint.connectedBody = PivotRB;
		CJoint.anchor = Vector3(0,0,0);
		CJoint.connectedAnchor = Vector3(0,0,-FootMaxDist);
		CJoint.axis = Vector3(0,0,0);
		
		CJoint.xDrive.mode = JointDriveMode.Position;
        CJoint.yDrive.mode = JointDriveMode.Position;
        CJoint.zDrive.mode = JointDriveMode.Position;
        CJoint.angularXDrive.mode = JointDriveMode.Position;
        CJoint.angularYZDrive.mode = JointDriveMode.Position;
   
        CJoint.xDrive.positionSpring = 1000;
        CJoint.yDrive.positionSpring = 1000;
        CJoint.zDrive.positionSpring = 1000;
    
        CJoint.angularXDrive.positionSpring = 1000;
        CJoint.angularYZDrive.positionSpring = 1000;
        
        FootCJoint = FootGO.AddComponent ("ConfigurableJoint");
        FootCJoint.autoConfigureConnectedAnchor = false;
        FootCJoint.connectedBody = GhostLegRB;
		FootCJoint.anchor = Vector3(0,0,0);
		FootCJoint.connectedAnchor = Vector3(0,0,0);
		FootCJoint.axis = Vector3(0,0,0);
		
		FootCJoint.xDrive.mode = JointDriveMode.Position;
        FootCJoint.yDrive.mode = JointDriveMode.Position;
        FootCJoint.zDrive.mode = JointDriveMode.Position;
        FootCJoint.xDrive.positionSpring = 1000;
        FootCJoint.yDrive.positionSpring = 1000;
        FootCJoint.zDrive.positionSpring = 1000;
        FootCJoint.xDrive.positionDamper = 100;
        FootCJoint.yDrive.positionDamper = 100;
        FootCJoint.zDrive.positionDamper = 100;
        
        FootCJoint.angularXDrive.mode = JointDriveMode.Position;
        FootCJoint.angularYZDrive.mode = JointDriveMode.Position;
   
        FootCJoint.angularXDrive.positionSpring = 0.1;
        FootCJoint.angularYZDrive.positionSpring = 0.1;
        FootCJoint.angularXDrive.positionDamper = 0.05;
        FootCJoint.angularYZDrive.positionDamper = 0.05;

Stepped = true;

PGroundClearance = GroundClearance;
GroundPoint.parent = null;
}

function FixedUpdate () {

transform.LookAt(FootTF);

var relativePoint = BodyTF.InverseTransformPoint(FootTF.position);

var GCD = Mathf.Clamp(relativePoint.y,0.01,GroundClearance);

var FootVelC = Mathf.Clamp(FootRB.velocity.magnitude * 0.3,1,8);

var hit : RaycastHit;

var VelMod = GyroPointRB.velocity.magnitude * LiftSpeedMod;

var VelClamp = VelCurve.Evaluate(VelMod);

var VelClamp2 = VelCurve2.Evaluate(VelMod);

var VelClamp3 = VelCurve3.Evaluate(VelMod);

var VelClamp4 = VelCurve4.Evaluate(VelMod);

var Straighten = StraightenCurve.Evaluate(VelMod);

AngMod = VesselRB.angularVelocity.magnitude * 2;

var AngClamp = Mathf.Clamp(AngMod,1,8);

if (GyroPointRB.velocity != Vector3.zero)
GroundPoint.rotation = Quaternion.LookRotation(GyroPointRB.velocity);

Debug.DrawRay (PivotTF.position + PivotTF.right * GroundPointOffset, transform.forward * 32f, Color.green);
if (Physics.Raycast (PivotTF.position + PivotTF.right * GroundPointOffset, transform.forward, hit, 32, targetLayers)) {
    if(!Nullstacle){
    if(Ascend){
    if(!Obstacle){
    
    var v2FootForce = 50 * VelClamp2;
    
    FootForce = Mathf.Clamp(v2FootForce,FootDistForceCurve.Evaluate(relativePoint.y),8000);
    }else{
    FootForce = FootMaxForceCurve.Evaluate(StepNum) * VelClamp2;
    }
    }else{
    if(!FootPlaced){
    if(!Obstacle){
    
    var v4FootForce = 50 * VelClamp2;
    
    FootForce = Mathf.Clamp(v4FootForce,FootDistForceCurve.Evaluate(relativePoint.y),8000);
    }else{
    FootForce = FootMaxForceCurve.Evaluate(StepNum) * VelClamp2;
    }
    }else{
    GroundDistForce = GroundDistForceCurve.Evaluate(hit.distance);
    FootForce = VelClamp4 * GroundDistForce;
    }
    }
    }else{
    FootForce = FootMaxForceCurve.Evaluate(StepNum) * VelClamp4;
    }
}

Debug.DrawRay (PivotTF.position + PivotTF.right * GroundPointOffset, Vector3.down * 32f, Color.green);
if (Physics.Raycast (PivotTF.position + PivotTF.right * GroundPointOffset, Vector3.down, hit, 32, targetLayers)) {
    
GroundPoint.position = hit.point;
}

StepAimForce = StepAimForceCurve.Evaluate(GyroPointRB.velocity.magnitude);

var Y : float = GroundPoint.eulerAngles.y;
var Z : float = GroundPoint.eulerAngles.z;

if(Ascend){
//(Ascend)=====================================================================================================================

if(UseCounterForce){
if(!RightSideLeg)
Vessel2RB.rigidbody.AddTorque(Vessel2RB.transform.forward * -CounterForceCurve.Evaluate(StepNum) * VelClamp3);
else
Vessel2RB.rigidbody.AddTorque(Vessel2RB.transform.forward * CounterForceCurve.Evaluate(StepNum) * VelClamp3);
}

if(Stepped)
if (!Physics.Raycast (FootTF.position, -FootTF.forward, GroundFeelDist, targetLayers)){
if(AscendSound){
var TheSound1 = Instantiate(AscendSound, transform.position, transform.rotation);
TheSound1.transform.parent = PivotTF;
}
Stepped = false;
}

if(UseFootAim)
FootAngCJoint.angularXMotion = ConfigurableJointMotion.Free;

FootCJoint.angularXDrive.mode = JointDriveMode.Position;
FootCJoint.angularYZDrive.mode = JointDriveMode.Position;

GroundPoint.rotation = Quaternion.Euler(0, Y, Z);
GroundPoint.position += GroundPoint.forward * GyroPointRB.velocity.magnitude * StrideDistMod.Evaluate(StepNum);

if(UseFootAim){
FootRB.rigidbody.AddTorque(FootRB.transform.right * FootTorqueCurve.Evaluate(StepNum) * VelClamp3);
}

KneeJoint.spring.damper = KneeDampCurve.Evaluate(StepNum);

if(!Nullstacle){
if(Num > FullStride){
Debug.DrawRay (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * FootSensorY + -FootTF.right * 0.5 , Vector3.down * GCD, Color.green);
Debug.DrawRay (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * FootSensorY + FootTF.right * 0.5 , Vector3.down * GCD, Color.green);
if (Physics.Raycast (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * FootSensorY + -FootTF.right * 0.5 , Vector3.down, hit, GCD, targetLayers) ||
    Physics.Raycast (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * FootSensorY + FootTF.right * 0.5 , Vector3.down, hit, GCD, targetLayers)){
   var NumAmount1 = LegLiftCurve.Evaluate(StepNum) * VelClamp;
   
   //if(Vector3.Distance(FootTF.position, OtherFootTF.position) < 2)
   //NumAmount1 = LegLiftCurve.Evaluate(StepNum) * VelClamp;
   
   Num -= Mathf.Clamp(NumAmount1,FootDistForceCurve.Evaluate(relativePoint.y),800);
   Obstacle = true;
   }else{
   Obstacle = false;
   }
   
Debug.DrawRay (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * 1 , VesselTF.forward * FootVelC, Color.green);
if (Physics.Raycast (FootTF.position + -FootTF.up * FootSensorZ + -FootTF.forward * 1 , VesselTF.forward, hit, FootVelC, targetLayers)){
   var NumAmount2 = LegLiftCurve.Evaluate(StepNum) * VelClamp;
   
   Num -= Mathf.Clamp(NumAmount2,FootDistForceCurve.Evaluate(relativePoint.y),800);
   if(!FootPlaced)
   FootForce = FootMaxForceCurve.Evaluate(StepNum) * VelClamp2;
   Obstacle = true;
   }
}else{
Obstacle = false;
}
}else{
if(Num < 0)
   Num += VelClamp;
}

}else{
//(Descend)=====================================================================================================================

if(UseCounterForce){
if(!RightSideLeg)
Vessel2RB.rigidbody.AddTorque(Vessel2RB.transform.forward * CounterForceCurve2.Evaluate(StepNum) * VelClamp3);
else
Vessel2RB.rigidbody.AddTorque(Vessel2RB.transform.forward * -CounterForceCurve2.Evaluate(StepNum) * VelClamp3);
}

if(!Stepped)
if (Physics.Raycast (FootTF.position, -FootTF.forward, GroundFeelDist, targetLayers)){
if(DescendSound){
var TheSound2 = Instantiate(DescendSound, FootTF.position, FootTF.rotation);
TheSound2.transform.parent = FootTF;
}
Stepped = true;
}

if(UseFootAim)
FootAngCJoint.angularXMotion = ConfigurableJointMotion.Locked;

FootCJoint.angularXDrive.mode = JointDriveMode.Position;
FootCJoint.angularYZDrive.mode = JointDriveMode.Position;

GroundPoint.rotation = Quaternion.Euler(0, Y, Z);
GroundPoint.position += GroundPoint.forward * GyroPointRB.velocity.magnitude * StrideDistMod.Evaluate(StepNum);

if(Num < 0)
   Num += LegDownCurve.Evaluate(StepNum) * VelClamp;
}

       Debug.DrawRay (FootTF.position + -FootTF.up * 1.1 + -FootTF.forward * 1 , Vector3.down * 2, Color.red);
if (!Physics.Raycast (FootTF.position + -FootTF.up * 1.1 + -FootTF.forward * 1 , Vector3.down, hit, 2, targetLayers)){
   Nullstacle = true;
   }else{
   Nullstacle = false;
   }
   
      Debug.DrawRay (FootTF.position + -FootTF.up * 0.7, Vector3.down * GroundFeelDist, Color.blue);
if (Physics.Raycast (FootTF.position + -FootTF.up * 0.7, Vector3.down, hit, GroundFeelDist, targetLayers)){
   FootPlaced = true;
   }else{
   FootPlaced = false;
   }

if(PivotRB.angularVelocity.magnitude < LegPivotSpeed){
PivotRB.AddForceAtPosition((GroundPoint.position - PivotTF.position).normalized * StepAimForce * AngClamp, -PivotTF.forward * 2);
PivotRB.AddForceAtPosition((GroundPoint.position - PivotTF.position).normalized * -StepAimForce * AngClamp, PivotTF.forward * 2);
}

if(Num < 0)
   Num += Straighten;

if(UseFootAim){
FootRB.rigidbody.AddTorque(FootRB.transform.right * FootTorqueCurve2.Evaluate(StepNum) * VelClamp3);
Debug.DrawRay (FootTF.position, Vector3.down * GroundClearance, Color.green);
if (Physics.Raycast (FootTF.position, Vector3.down, hit, GroundClearance, targetLayers))
   FootAngler.rotation = Quaternion.LookRotation(hit.normal);
}

var GCClamp = Mathf.Clamp(Vector3.Distance(FootTF.position, GroundPoint.position),1,PGroundClearance);
GroundClearance = GCClamp;

FootCJoint.xDrive.maximumForce = FootForce;
FootCJoint.yDrive.maximumForce = FootForce;
FootCJoint.zDrive.maximumForce = FootForce;

CJoint.targetPosition = Vector3(0,0,Num);

}