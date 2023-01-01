var Piri : Transform;
var PiriGO : GameObject;
var PiriRB : Rigidbody;

var thisTransform : Transform;
var thisRigidbody : Rigidbody;

var dirFAmount = 0;

var RotAmount = 0;

var UpRotAmount = 0;
var DownRotAmount = 0;

static var insideNPC : boolean;

var targetLayers : LayerMask;

InvokeRepeating("Tick", 0.33, 0.33);

function Start (){
thisTransform.position = Piri.position;
}

function FixedUpdate(){

if(!PiriGO.active){
if(!insideNPC)
thisTransform.position = WorldInformation.vehicleController.transform.position;
else
thisTransform.position = WorldInformation.npcVehicleTF.position;
}else{

if(WorldInformation.FPMode){
//thisRigidbody.velocity = PiriRB.velocity;
//thisTransform.position = Piri.position;

if(dirFAmount < 1000)
dirFAmount += 10;

if(WorldInformation.UsingVessel)
thisRigidbody.AddForce((Piri.position - thisTransform.position) * 50);
else
thisRigidbody.AddForce((Piri.position - thisTransform.position) * dirFAmount);

}else{

if(dirFAmount > 50)
dirFAmount -= 10;
else
dirFAmount = 50;

thisRigidbody.AddForce((Piri.position - thisTransform.position) * dirFAmount);
}

}
}


function Tick(){

var newRot : Vector3 = (thisTransform.up * 2 + thisTransform.right * 2).normalized;
var newRot2 : Vector3 = (thisTransform.up * -2 + thisTransform.right * -2).normalized;


if (!Physics.Raycast (thisTransform.position + thisTransform.up, newRot, 128, targetLayers) && 
    !Physics.Raycast (thisTransform.position + thisTransform.up, newRot2, 128, targetLayers)){
Debug.DrawRay (thisTransform.position + thisTransform.up, newRot * 128, Color.white);
Debug.DrawRay (thisTransform.position + thisTransform.up, newRot2 * 128, Color.white);
thisTransform.localEulerAngles.y += 30;
RotAmount += 1;
}else{
RotAmount = 0;
WorldInformation.PiriFree = false;

if (!Physics.Raycast (thisTransform.position + thisTransform.up, newRot, 128, targetLayers)){
Debug.DrawRay (thisTransform.position + thisTransform.up, newRot * 128, Color.white);
thisTransform.localEulerAngles.y += 30;
UpRotAmount += 1;
}else{
UpRotAmount = 0;
WorldInformation.PiriTopFree = false;
}

if (!Physics.Raycast (thisTransform.position + thisTransform.up, newRot2, 128, targetLayers)){
Debug.DrawRay (thisTransform.position + thisTransform.up, newRot2 * 128, Color.white);
thisTransform.localEulerAngles.y += 30;
DownRotAmount += 1;
}else{
DownRotAmount = 0;
WorldInformation.PiriBottomFree = false;
}
}

if(RotAmount > 11){
thisTransform.localEulerAngles.y = 0;
RotAmount = 0;
WorldInformation.PiriFree = true;
}
if(UpRotAmount > 11){
thisTransform.localEulerAngles.y = 0;
UpRotAmount = 0;
WorldInformation.PiriTopFree = true;
}
if(DownRotAmount > 11){
thisTransform.localEulerAngles.y = 0;
DownRotAmount = 0;
WorldInformation.PiriBottomFree = true;
}
}