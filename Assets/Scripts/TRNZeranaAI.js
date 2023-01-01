
var thisVTransform : Transform;

var targetLayers : LayerMask;

var TurnRight : boolean;
var TurnLeft : boolean;

var TurnRF : float;
var TurnLF : float;

var TurnRaySideness : float;

function Start () {
TurnRaySideness = 300;
}

function Update () {

var hit : RaycastHit;

TurnLeft = false;
TurnRight = false;

Debug.DrawRay (thisVTransform.position + thisVTransform.right * TurnRaySideness + -thisVTransform.forward * 900, -thisVTransform.up * 20000, Color.green);
if (Physics.Raycast (thisVTransform.position + thisVTransform.right * TurnRaySideness + -thisVTransform.forward * 900, -thisVTransform.up, hit, 20000, targetLayers))
     TurnLeft = true;
     
Debug.DrawRay (thisVTransform.position + -thisVTransform.right * TurnRaySideness + -thisVTransform.forward * 900, -thisVTransform.up * 20000, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.right * TurnRaySideness + -thisVTransform.forward * 900, -thisVTransform.up, hit, 20000, targetLayers))
     TurnRight = true;

}

function FixedUpdate () {

if(!TurnRight && !TurnLeft){
if(TurnRaySideness < 600){
TurnRaySideness += 2;
}else{
TurnRaySideness = 300;
}
}

if(TurnRight){
if(TurnRF < 0.05)
TurnRF += 0.00005;
}else{
if(TurnRF > 0)
TurnRF -= 0.00005;
else
TurnRF = 0;
}

if(TurnLeft){
if(TurnLF < 0.05)
TurnLF += 0.00005;
}else{
if(TurnLF > 0)
TurnLF -= 0.00005;
else
TurnLF = 0;
}

thisVTransform.localEulerAngles.z -= TurnLF;

thisVTransform.localEulerAngles.z += TurnRF;

thisVTransform.position -= thisVTransform.up * 2;

}