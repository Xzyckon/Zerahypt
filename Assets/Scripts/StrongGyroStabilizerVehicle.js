var target : GameObject;
var AimTarget : GameObject;
var VesselScript : MainVehicleController;
var HJoint : HingeJoint;

var force = 10.0;
var AimAngleCalibration = 0;
var AimGyroForce = 10.0;
var AimForce = 10.0;
var AimSpeed = 50;
var AimForceDamp = 20.0;
var AimForceOrginalDamp = 2.0;

var offset = 1.0;

var Up : boolean = true;
var Forward : boolean = false;
var Right : boolean = false;

var MainVessel: Transform;
var CanRotFreely : boolean;
var Aiming : boolean;
var StopIfAim : boolean;
var UseLookRotation : boolean;
var UseEngine : boolean;
var ShutOff : boolean;

function Start (){
if(UseLookRotation)
AimTarget = GameObject.Find("PlayerCameraAim").gameObject;
else
AimTarget = PlayerInformation.instance.PiriTurretAim.gameObject;
}

function Update () {
if(UseEngine){
if(VesselScript.EngineRunning == true)
ShutOff = false;
if(VesselScript.EngineRunning == false)
ShutOff = true;
}

if(!ShutOff){
if(Aiming)
if(!WorldInformation.playerCar.Contains(MainVessel.name)){
target.rigidbody.angularDrag = AimForceOrginalDamp;
Aiming = false;
}

if(WorldInformation.playerCar.Contains(MainVessel.name)){
if(Input.GetMouseButtonDown(1) && CameraScript.InInterface == false){
if(!UseLookRotation)
target.rigidbody.angularDrag = AimForceDamp;
Aiming = true;
if(UseLookRotation)
rigidbody.constraints = RigidbodyConstraints.FreezeRotationX 
                      | RigidbodyConstraints.FreezeRotationY
                      | RigidbodyConstraints.FreezeRotationZ;
if(CanRotFreely)
HJoint.useSpring = false;
}
if(Input.GetMouseButtonUp(1) && CameraScript.InInterface == false || Input.GetKeyDown("e")){
if(!UseLookRotation)
target.rigidbody.angularDrag = AimForceOrginalDamp;
Aiming = false;
if(UseLookRotation)
rigidbody.constraints = RigidbodyConstraints.None;
if(CanRotFreely)
HJoint.useSpring = true;
}
}
}
}

function FixedUpdate (){
if(!ShutOff){
if(Aiming){

    target.rigidbody.AddTorque(transform.right * -AimAngleCalibration);
    
    if(StopIfAim){
    target.rigidbody.AddForceAtPosition(Vector3.up*AimGyroForce, transform.up*offset);
    target.rigidbody.AddForceAtPosition(-Vector3.up*AimGyroForce, -transform.up*offset);
    }
    
    if(UseLookRotation){
    NewRotation = Quaternion.LookRotation(AimTarget.transform.position - transform.position);
    transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * AimSpeed);
    }else{
    target.rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * AimForce, transform.forward*offset);
    target.rigidbody.AddForceAtPosition((AimTarget.transform.position - transform.position).normalized * -AimForce, -transform.forward*offset);
    }
}

if(StopIfAim)
if(Aiming)
return;

if(Up == true){
    target.rigidbody.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    target.rigidbody.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
}
}
}