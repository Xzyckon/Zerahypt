
var MainVessel: Transform;

var Gyro: GameObject;

var Force : float = 1;
var StaticForce : float = 0;
var BreakForce : float = 1;
var DampOrigi : float = 0;
var RevVel : float = 10;
var Tvelocity : float = 1500;
var TurnMod : float = 0.3;
var TorqueCompensation : boolean;
var TorqueComp : float = 100;
var SpinCompensation : boolean;
var SpinComp : float = 4;
var CompMax : float = 0.1;
var breaksOn : boolean;
var breaking : boolean;
var MirroredWheel : boolean;
var IsCenterWheel : boolean;
var IsTrailerHauler : boolean;
var HingeBroken : boolean;

var Once : boolean;

var UseCurve : boolean;
var curve : AnimationCurve = new AnimationCurve();
var VolumeAmount : float = 0;
var VolumeMod : float = 1.0;
var ForceMod : float = 1.0;
var ForcePlusMod : float = 1.0;
var RevPlusMod : float = 1.0;

var WheelObjectIntact: GameObject;
var WheelObjectBroken: GameObject;

var BrakeJoint : FixedJoint;

var RunningF : boolean;
var RunningR : boolean;

var RunningLeft : boolean;
var RunningRight : boolean;

var Broken : boolean;

function Start () {
StaticForce = Force;

hingeJoint.spring.damper = BreakForce;
if(!BrakeJoint)
BrakeJoint = gameObject.AddComponent ("FixedJoint");
BrakeJoint.connectedBody = hingeJoint.connectedBody;
}

function Update () {

if(MainVessel == null)
Destroy(this);

if(Broken)
if(!HingeBroken)
hingeJoint.motor.force = 0;

if(Broken)
return;

if(WorldInformation.playerCar.Contains(MainVessel.name)){

if(SpinCompensation){

var VesselAngVel = MainVessel.InverseTransformDirection(MainVessel.gameObject.rigidbody.angularVelocity);

var AV1 = VesselAngVel.z * SpinComp;

var AV2 = Mathf.Clamp(AV1,-CompMax,CompMax);

if(Input.GetKey("w") && !Input.GetKey("a") && !Input.GetKey("d")){
if(MirroredWheel)
Force = StaticForce - AV2;
else
Force = StaticForce + AV2;
}

if(Input.GetKey("s") && !Input.GetKey("a") && !Input.GetKey("d")){
if(MirroredWheel)
Force = StaticForce + AV2;
else
Force = StaticForce - AV2;
}

if(!Input.GetKey("w") && !Input.GetKey("s"))
Force = StaticForce;

}else{
Force = StaticForce;
}

if(CameraScript.InInterface == false){

if(RunningLeft && RunningRight){
RunningLeft = false;
RunningRight = false;
}

if(Input.GetKeyUp("d"))
if(Input.GetKey("a"))
        RunningLeft = true;
if(Input.GetKeyUp("a"))
if(Input.GetKey("d"))
        RunningRight = true;

if(Input.GetKeyDown("w"))
			RunningF = true;
if(Input.GetKeyUp("w")){
        RunningF = false;
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = Tvelocity;
}
			
if(Input.GetKeyDown("s")){
			RunningR = true;
			Force = StaticForce;
			}
if(Input.GetKeyUp("s")){
        RunningR = false;
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = -Tvelocity;
}
			
if(Input.GetKeyDown("a")){
			RunningLeft = true;
			Force = StaticForce;
			}
if(Input.GetKeyUp("a") && !IsCenterWheel){
        RunningLeft = false;
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = -Tvelocity;
}
			
if(Input.GetKeyDown("d")){
			RunningRight = true;
			Force = StaticForce;
			}
if(Input.GetKeyUp("d") && !IsCenterWheel){
        RunningRight = false;
        hingeJoint.motor.force = 0;
        hingeJoint.motor.targetVelocity = Tvelocity;
}

}
}

if(WorldInformation.playerCar.Contains(MainVessel.name)){

if (Input.GetKeyDown(KeyCode.Space)){
hingeJoint.spring.damper = BreakForce;
hingeJoint.motor.force = 0;
}

if (Input.GetKeyUp(KeyCode.Space))
hingeJoint.spring.damper = DampOrigi;

if (!Input.GetKey(KeyCode.Space)){
breaking = false;
}else{
breaking = true;
}

ParkBrake();

}
}

function FixedUpdate () {

if(Broken)
return;

if(!breaksOn){

var WAngVel = transform.InverseTransformDirection(rigidbody.angularVelocity);

if(UseCurve){

var p = rigidbody.angularVelocity.magnitude;

VolumeAmount = curve.Evaluate(p) * VolumeMod;
ForceMod = VolumeAmount;

}

if(RunningF){
        
        hingeJoint.motor.targetVelocity = Tvelocity;
        
        hingeJoint.motor.force = Force * ForceMod * ForcePlusMod;
}

if(RunningR){

var AngVel = transform.InverseTransformDirection(rigidbody.angularVelocity);

if (!Input.GetKey(KeyCode.Space))
if (-AngVel.x < RevVel) {

        hingeJoint.motor.targetVelocity = -Tvelocity;
        
        if(AngVel.x > 0){
        hingeJoint.motor.force = Force * RevPlusMod;
        }else{
        hingeJoint.motor.force = Force * ForceMod * RevPlusMod;
        }
}
}

if(RunningLeft && !IsCenterWheel){

if(!UseCurve){
if(ForceMod < TurnMod)
ForceMod = TurnMod;
}else{
if(ForceMod < TurnMod){

if(!MirroredWheel){
if(WAngVel.x > 0)
ForceMod  = curve.Evaluate(p) * TurnMod;
else
ForceMod = TurnMod;
}else{
if(WAngVel.x < 0)
ForceMod  = curve.Evaluate(p) * TurnMod;
else
ForceMod = TurnMod;
}

}
}
        if(!IsTrailerHauler){
        hingeJoint.motor.force = Force * ForceMod;
        }else{
        if(RunningF){
        if(MirroredWheel)
        hingeJoint.motor.force = 0;
        }else{
        hingeJoint.motor.force = Force * ForceMod;
        }
        }
        
        if(!MirroredWheel)
        hingeJoint.motor.targetVelocity = Tvelocity;
        if(MirroredWheel)
        hingeJoint.motor.targetVelocity = -Tvelocity;
}

if(RunningRight && !IsCenterWheel){

if(!UseCurve){
if(ForceMod < TurnMod)
ForceMod = TurnMod;
}else{
if(ForceMod < TurnMod){

if(!MirroredWheel){
if(WAngVel.x < 0)
ForceMod  = curve.Evaluate(p) * TurnMod;
else
ForceMod = TurnMod;
}else{
if(WAngVel.x > 0)
ForceMod  = curve.Evaluate(p) * TurnMod;
else
ForceMod = TurnMod;
}

}
}

        if(!IsTrailerHauler){
        hingeJoint.motor.force = Force * ForceMod;
        }else{
        if(RunningF){
        if(!MirroredWheel)
        hingeJoint.motor.force = 0;
        }else{
        hingeJoint.motor.force = Force * ForceMod;
        }
        }
        
        if(!MirroredWheel)
        hingeJoint.motor.targetVelocity = -Tvelocity;
        if(MirroredWheel)
        hingeJoint.motor.targetVelocity = Tvelocity;
}

if(TorqueCompensation){

if(RunningR && !RunningLeft && !RunningRight){


if (-AngVel.x < RevVel)
Gyro.rigidbody.AddTorque(Gyro.transform.right * -TorqueComp);


}
			
if(RunningF && !RunningLeft && !RunningRight){
			Gyro.rigidbody.AddTorque(Gyro.transform.right * TorqueComp * ForceMod);
}
}
}

}

function ParkBrake () {
if(!breaking){
        if(!breaksOn){
            hingeJoint.motor.force = 0;
            hingeJoint.spring.damper = DampOrigi;
            if(BrakeJoint)
            Destroy(BrakeJoint);
            Once = false;
        } else {
            hingeJoint.motor.force = 0;
            if(rigidbody.angularVelocity.magnitude > 1){
            hingeJoint.spring.damper = BreakForce;
            if(BrakeJoint)
            Destroy(BrakeJoint);
            }else{
            if(!Once){
            if(!BrakeJoint)
            BrakeJoint = gameObject.AddComponent ("FixedJoint");
            BrakeJoint.connectedBody = hingeJoint.connectedBody;
            Once = true;
            }
            }
        }
}else{
hingeJoint.motor.force = 0;
            if(rigidbody.angularVelocity.magnitude > 1){
            hingeJoint.spring.damper = BreakForce;
            if(BrakeJoint)
            Destroy(BrakeJoint);
            }else{
            if(!Once){
            if(!BrakeJoint)
            BrakeJoint = gameObject.AddComponent ("FixedJoint");
            BrakeJoint.connectedBody = hingeJoint.connectedBody;
            Once = true;
            }
            }
}
}

function OnJointBreak(breakForce : float) {
if(BrakeJoint)
Destroy(BrakeJoint);
HingeBroken = true;
transform.parent = null;
WheelObjectBroken.gameObject.SetActive (true);
Destroy(WheelObjectIntact);
Broken = true;
}

//if(!BrakeJoint)
//BrakeJoint = gameObject.AddComponent (ConfigurableJoint);
//BrakeJoint.connectedBody = hingeJoint.connectedBody;
//BrakeJoint.xDrive.mode = JointDriveMode.Position;
//BrakeJoint.yDrive.mode = JointDriveMode.Position;
//BrakeJoint.zDrive.mode = JointDriveMode.Position;
//BrakeJoint.angularXDrive.mode = JointDriveMode.Position;
//BrakeJoint.angularYZDrive.mode = JointDriveMode.Position;
   
//BrakeJoint.xDrive.positionSpring = 10000;
//BrakeJoint.yDrive.positionSpring = 10000;
//BrakeJoint.zDrive.positionSpring = 10000;
    
//BrakeJoint.angularXDrive.positionSpring = 10000;
//BrakeJoint.angularYZDrive.positionSpring = 10000;
   
//BrakeJoint.xDrive.positionDamper = 1;
//BrakeJoint.yDrive.positionDamper = 1;
//BrakeJoint.zDrive.positionDamper = 1;
    
//BrakeJoint.angularXDrive.positionDamper = 1;
//BrakeJoint.angularYZDrive.positionDamper = 1;