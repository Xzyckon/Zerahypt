
var VesselTF : Transform;
var FootTF : Transform;
var FootGO : GameObject;
var FootRB : Rigidbody;
var PivotTF : Transform;

var PivotRB : Rigidbody;

var theParent : Transform;

var GroundPoint : Transform;

var targetLayers : LayerMask;

var VesselRB : Rigidbody;

var GhostLegRB : Rigidbody;

var GyroPointRB : Rigidbody;

var OtherLegScript : LegScript;

var CJoint : ConfigurableJoint;

var FootCJoint : ConfigurableJoint;

var FootAngCJoint : ConfigurableJoint;

var breaksOn : boolean;

var OnNPC : boolean;

var FootMaxForce : float = 0.5;
var FootMaxDist : float = 5;

var CounterForce : float = 1;
var CounterForceCurve : AnimationCurve = new AnimationCurve();

var DirForce : float = 2;
var AngForce : float = 2;

var MaxFVel : float = 7;
var MaxRVel : float = 7;

var Ascend : boolean = false;

var AscendSound : GameObject;
var DescendSound : GameObject;

var GroundFeelDist : float = 1;

var Stepped : boolean;

var KeyW : boolean;
var KeyA : boolean;
var KeyS : boolean;
var KeyD : boolean;

var RightSideLeg : boolean;

var UseFootAim : boolean;
var FootAimForce : float = 1;
var FootAngler : Transform;

var FullStride : float = -2.5;
var GroundClearance : float = 1;
var LegLiftSpeed : float = 1;
var LiftSpeedModCurve : AnimationCurve = new AnimationCurve();
var DropSpeedModCurve : AnimationCurve = new AnimationCurve();

var LegPivotSpeed : float = 0.2;

var MinStride : float = 0;
var MaxStride : float = 1;

var StrideDistMod : float = 0.5;
var RevStrideDistMod : float = 2;

var StepAimForce : float = 1;
var StepAimForceCurve : AnimationCurve = new AnimationCurve();

var StepTime = 100;
var StepNum = 0;

var AngMod : float = 0;

var Num : float = 0;

var curve : AnimationCurve = new AnimationCurve();

private var PStepTime = 0;
private var PStrideDistMod : float = 0;
private var PGroundClearance : float = 0;
private var PFootMaxForce : float = 0;

function Start () {

		var gO = new GameObject("GhostLeg");
		gO.transform.parent = theParent;
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

if(Ascend)
StepNum = 0;
else
StepNum = StepTime + 1;

Stepped = true;

PStepTime = StepTime;
PStrideDistMod = StrideDistMod;
PGroundClearance = GroundClearance;
PFootMaxForce = FootMaxForce;
GroundPoint.parent = theParent;

if(OnNPC)
breaksOn = false;
}

function Update () {

if(OnNPC)
breaksOn = false;

if(WorldInformation.playerCar == transform.parent.name)
if(CameraScript.InInterface == false){
if(Input.GetKeyDown("w") && !breaksOn)
		   KeyW = true;
    if(Input.GetKeyUp("w"))
		   KeyW = false;
		   
    if(Input.GetKeyDown("a") && !breaksOn)
		   KeyA = true;
    if(Input.GetKeyUp("a"))
		   KeyA = false;

    if(Input.GetKeyDown("s") && !breaksOn)
           KeyS = true;
    if(Input.GetKeyUp("s"))
           KeyS = false;
           
    if(Input.GetKeyDown("d") && !breaksOn)
		   KeyD = true;
    if(Input.GetKeyUp("d"))
		   KeyD = false;

}
}

function FixedUpdate () {

var localV = VesselTF.InverseTransformDirection(VesselRB.velocity);

var Vel = -localV.z;

var hit : RaycastHit;

var VelClamp = LiftSpeedModCurve.Evaluate(GyroPointRB.velocity.magnitude);

var VelClamp2 = DropSpeedModCurve.Evaluate(GyroPointRB.velocity.magnitude);

var LVelClamp = Mathf.Clamp(Vel,0.5,FootMaxForce);

AngMod = VesselRB.angularVelocity.magnitude * 2;

var AngClamp = Mathf.Clamp(AngMod,1,4);

if (GyroPointRB.velocity != Vector3.zero)
GroundPoint.rotation = Quaternion.LookRotation(GyroPointRB.velocity);

Debug.DrawRay (PivotTF.position, Vector3.down * 32f, Color.green);
if (Physics.Raycast (PivotTF.position, Vector3.down, hit, 32, targetLayers)) {
    FootMaxForce = curve.Evaluate(hit.distance);
	GroundPoint.position = hit.point;
}

StepAimForce = StepAimForceCurve.Evaluate(GyroPointRB.velocity.magnitude);

var Y : float = GroundPoint.eulerAngles.y;
var Z : float = GroundPoint.eulerAngles.z;

if(!breaksOn){
if(Ascend){
StepNum += 1;

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

FootCJoint.angularXDrive.mode = JointDriveMode.None;
FootCJoint.angularYZDrive.mode = JointDriveMode.None;

GroundPoint.rotation = Quaternion.Euler(0, Y, Z);
GroundPoint.position += GroundPoint.forward * GyroPointRB.velocity.magnitude * StrideDistMod;

if(Num > FullStride){
Debug.DrawRay (FootTF.position + -VesselTF.up * 1.5 , Vector3.down * GroundClearance, Color.green);
if (Physics.Raycast (FootTF.position + -VesselTF.up * 1.5 , Vector3.down, hit, GroundClearance, targetLayers) ||
    Physics.Raycast (FootTF.position, Vector3.down, hit, GroundClearance, targetLayers))
   Num -= VelClamp * LegLiftSpeed;
}

}else{
StepNum -= 1;

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
GroundPoint.position += GroundPoint.forward * GyroPointRB.velocity.magnitude * StrideDistMod;

if(Num < 0)
   Num += VelClamp2 * LegLiftSpeed;
}
}

if(PivotRB.angularVelocity.magnitude < LegPivotSpeed){
PivotRB.AddForceAtPosition((GroundPoint.position - PivotTF.position).normalized * StepAimForce * AngClamp, -PivotTF.forward * 2);
PivotRB.AddForceAtPosition((GroundPoint.position - PivotTF.position).normalized * -StepAimForce * AngClamp, PivotTF.forward * 2);
}

if(UseFootAim){
Debug.DrawRay (FootTF.position, Vector3.down * GroundClearance, Color.green);
if (Physics.Raycast (FootTF.position, Vector3.down, hit, GroundClearance, targetLayers))
   FootAngler.rotation = Quaternion.LookRotation(hit.normal);
}

if(StepNum > StepTime)
Ascend = false;

if(StepNum < 1){
Ascend = true;

if(OtherLegScript)
OtherLegScript.StepNum = StepTime;

}

if(KeyW && !KeyS){
GroundClearance = PGroundClearance;
if(GyroPointRB.velocity.magnitude < MaxFVel)
VesselRB.rigidbody.AddForce(VesselRB.transform.up * -DirForce);
if(Ascend){
CounterForce = CounterForceCurve.Evaluate(StepNum);

if(!RightSideLeg)
VesselRB.rigidbody.AddTorque(VesselRB.transform.forward * CounterForce);
else
VesselRB.rigidbody.AddTorque(VesselRB.transform.forward * -CounterForce);

StrideDistMod = PStrideDistMod;
}else{
StrideDistMod = PStrideDistMod;
}
}

if(KeyS && !KeyW){
GroundClearance = PGroundClearance;
if(GyroPointRB.velocity.magnitude < MaxRVel)
VesselRB.rigidbody.AddForce(VesselRB.transform.up * DirForce);
if(Ascend)
StrideDistMod = RevStrideDistMod;
else
StrideDistMod = PStrideDistMod;
}

if(KeyA){
VesselRB.rigidbody.AddTorque(VesselRB.transform.forward * -AngForce);
GroundClearance = PGroundClearance;
}

if(KeyD){
VesselRB.rigidbody.AddTorque(VesselRB.transform.forward * AngForce);
GroundClearance = PGroundClearance;
}

if(!KeyW && !KeyA && !KeyS && !KeyD){
StrideDistMod = PStrideDistMod;
var GCClamp = Mathf.Clamp(Vector3.Distance(FootTF.position, GroundPoint.position),0.01,PGroundClearance);
GroundClearance = GCClamp;
}

FootCJoint.xDrive.maximumForce = FootMaxForce * LVelClamp;
FootCJoint.yDrive.maximumForce = FootMaxForce * LVelClamp;
FootCJoint.zDrive.maximumForce = FootMaxForce * LVelClamp;

CJoint.targetPosition = Vector3(0,0,Num);

}