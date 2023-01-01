
var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Obstacle : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var StrafeRight : boolean;
var StrafeLeft : boolean;

var useRaySpread : boolean;
var RaySpreadMod : float;
var RaySpreadWidth : float;
private var RaySpread : float;

var RayLengthObstacle : float;
var RayLengthTurn : float;


var SD = 0;   //Front Shaped obstacle circumvent ray : Distance
var SDf = 0;  //Front Shaped obstacle circumvent ray : Forward Location
var SDl = 0;  //Front Shaped obstacle circumvent ray : Right Outwards Location
var SDr = 0;  //Front Shaped obstacle circumvent ray : Left Outwards Location
var SDa = 2;  //Front Shaped obstacle circumvent ray : Both Rotation Angle

var SD2 = 0;   //Rear Shaped obstacle circumvent ray : Distance
var SD2f = 0;  //Rear Shaped obstacle circumvent ray : Forward Location
var SD2l = 0;  //Rear Shaped obstacle circumvent ray : Right Outwards Location
var SD2r = 0;  //Rear Shaped obstacle circumvent ray : Left Outwards Location
var SD2a = 2;  //Rear Shaped obstacle circumvent ray : Both Rotation Angle

var Parked : boolean;

var DirForce : float;
var BrakeForce : float;

var AngForce : float;

var Vel : float;

var VelClampMod : float;

var MaxVel : float;

var targetLayers : LayerMask;

function Start () {

}

function Update () {

}

function FixedUpdate () {

var VelClamp = Mathf.Clamp(Vel * VelClampMod,16,2048);

var hit : RaycastHit;





var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

Vel = -localV.y * 2.24;




if(useRaySpread){
if(RaySpread < RaySpreadWidth)
RaySpread += RaySpreadMod;
else
RaySpread = RaySpreadMod;
}

Obstacle = false;
TurnLeft = false;
TurnRight = false;
StrafeRight = false;
StrafeLeft = false;






Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthObstacle + thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.red);
Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthObstacle + -thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.red);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthObstacle + thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers)
|| Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthObstacle + -thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers))
Obstacle = true;

Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthTurn + thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthTurn + thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers)) {
TurnLeft = true;
}

Debug.DrawRay (thisTransform.position + thisTransform.forward * RayLengthTurn + -thisTransform.right * RaySpread, thisTransform.forward * VelClamp, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * RayLengthTurn + -thisTransform.right * RaySpread, thisTransform.forward, VelClamp, targetLayers)) {
TurnRight = true;
}

var newRot2 : Vector3;

newRot2 = (thisTransform.forward * 32 + thisTransform.right * -SDa).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SDf + thisTransform.right * SDl, newRot2 * SD, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SDf + thisTransform.right * SDl, newRot2, hit, SD, targetLayers))
RightDist = hit.distance;
else
RightDist = 512;
 
newRot2 = (thisTransform.forward * 32 + thisTransform.right * SDa).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SDf + -thisTransform.right * SDr, newRot2 * SD, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SDf + -thisTransform.right * SDr, newRot2, hit, SD, targetLayers))
LeftDist = hit.distance;
else
LeftDist = 512;
		
newRot2 = (thisTransform.forward * 32 + thisTransform.right * -SD2a).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SD2f + thisTransform.right * SD2l, newRot2 * SD2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SD2f + thisTransform.right * SD2l, newRot2, hit, SD2, targetLayers))
RightDist = 1;
 
newRot2 = (thisTransform.forward * 32 + thisTransform.right * SD2a).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * SD2f + -thisTransform.right * SD2r, newRot2 * SD2, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * SD2f + -thisTransform.right * SD2r, newRot2, hit, SD2, targetLayers))
LeftDist = 1;
 
if(RightDist > LeftDist)
StrafeRight = true;
     
if(LeftDist > RightDist)
StrafeLeft = true;


















if(TurnLeft && !TurnRight)
vRigidbody.AddTorque(thisTransform.up * -AngForce * vRigidbody.mass);

if(TurnRight && !TurnLeft)
vRigidbody.AddTorque(thisTransform.up * AngForce * vRigidbody.mass);







if(StrafeRight && !StrafeLeft){
  vRigidbody.AddForce(thisVTransform.right * DirForce * vRigidbody.mass);
}

if(StrafeLeft && !StrafeRight){
  vRigidbody.AddForce(-thisVTransform.right * DirForce * vRigidbody.mass);
}








if(!Parked){
if(Obstacle){
if(Vel > 0)
vRigidbody.AddForce(thisVTransform.up * BrakeForce * vRigidbody.mass);
}else{
if(Vel < MaxVel)
vRigidbody.AddForce(-thisVTransform.up * DirForce * vRigidbody.mass);
}
}

















}