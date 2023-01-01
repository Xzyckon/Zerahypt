var MainVessel: Transform;
var target : Rigidbody;

var AimTarget : GameObject;

var Col : CapsuleCollider;

var force = 10.0;
var offset = 1.0;

var AimSpeed = 50;
var AimForceDamp = 20.0;
var AimForceOrginalDamp = 2.0;

var AngDamp : float = 0;

var Deactivated : boolean;

var DirectForce : boolean;

var UseContact : boolean;
var UseKey : boolean;
var UseAim : boolean;
var Aiming : boolean;
var ContactDistance : float = 1;
var Contact : boolean;
var targetLayers: LayerMask;

var Up : boolean = true;
var Forward : boolean = false;
var Right : boolean = false;

function Start (){
AimTarget = GameObject.Find("PlayerCameraAim").gameObject;
}

function Update(){

if(UseAim){
if(!Deactivated){
if(WorldInformation.playerCar.Contains(MainVessel.name)){

if(Input.GetMouseButtonDown(1))
if(!WorldInformation.IsNopass && CameraScript.InInterface == false){
target.rigidbody.angularDrag = AimForceDamp;
Aiming = true;
rigidbody.constraints = RigidbodyConstraints.FreezeRotationX 
                      | RigidbodyConstraints.FreezeRotationY
                      | RigidbodyConstraints.FreezeRotationZ;
}

if(Input.GetMouseButtonUp(1) || Input.GetKeyDown("e"))
if(!WorldInformation.IsNopass && CameraScript.InInterface == false){
target.rigidbody.angularDrag = AimForceOrginalDamp;
Aiming = false;
rigidbody.constraints = RigidbodyConstraints.None;
}

}
}
}
}

function FixedUpdate (){

if(AngDamp > 0){
if(Deactivated){
rigidbody.angularDrag = 0;

}else{
rigidbody.angularDrag = AngDamp;

}
}

if(!Deactivated){

if(!Aiming){
if (Physics.Raycast(transform.position, -transform.up, ContactDistance, targetLayers)){
Contact = true;
}else{
Contact = false;
}

if(UseKey)
if(Input.GetKey("g"))
if(!CameraScript.InInterface)
if(rigidbody.angularVelocity.magnitude < 2)
if(WorldInformation.playerCar == transform.parent.name)
    rigidbody.AddTorque(transform.forward * force);

if(!UseKey){

if(!UseContact){

if(!DirectForce){
if(Up == true){
    rigidbody.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    rigidbody.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
}
}else{
if(Up == true){
    target.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    target.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
}
}

if(Forward == true){
    rigidbody.AddForceAtPosition(Vector3.forward*force, transform.forward*offset);
    rigidbody.AddForceAtPosition(-Vector3.forward*force, -transform.forward*offset);
}

if(Right == true){
    rigidbody.AddForceAtPosition(Vector3.right*force, transform.forward*offset);
    rigidbody.AddForceAtPosition(-Vector3.right*force, -transform.forward*offset);
}
}

if(UseContact && !Contact){
if(Up == true){
    rigidbody.AddForceAtPosition(Vector3.up*force, transform.up*offset);
    rigidbody.AddForceAtPosition(-Vector3.up*force, -transform.up*offset);
}

if(Forward == true){
    rigidbody.AddForceAtPosition(Vector3.forward*force, transform.forward*offset);
    rigidbody.AddForceAtPosition(-Vector3.forward*force, -transform.forward*offset);
}

if(Right == true){
    rigidbody.AddForceAtPosition(Vector3.right*force, transform.forward*offset);
    rigidbody.AddForceAtPosition(-Vector3.right*force, -transform.forward*offset);
}
}
}

}else{
NewRotation = Quaternion.LookRotation(AimTarget.transform.position - transform.position);
transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * AimSpeed);
}

}
}