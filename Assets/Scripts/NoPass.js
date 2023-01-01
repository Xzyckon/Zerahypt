#pragma strict
static var IsAsleep: boolean;
var Invert: boolean;
var cam: Transform;
private var TargetPosition: Transform;
  
function Start () {

if(WorldInformation.instance.InvertedNoPass == true)
Invert = true;

if(WorldInformation.instance.InvertedNoPass == false)
Invert = false;

IsAsleep = false;
cam = GameObject.Find("PhysCam").transform;
TargetPosition = transform;
}

function OnTriggerStay (trigger:Collider) {
if(!IsAsleep){
if(trigger.gameObject.name.Contains("Nopass")){
if(Invert){
cam.gameObject.layer = 23;
cam.rigidbody.isKinematic = true;
WorldInformation.IsNopass = true;
WorldInformation.FPMode = false;
FurtherActionScript.instance.NoPass = true;
FurtherActionScript.instance.ShowText();
}else{
cam.rigidbody.isKinematic = false;
WorldInformation.IsNopass = false;
}
}
}
}

function OnTriggerExit (trigger:Collider) {
if(!IsAsleep){
if(trigger.gameObject.name.Contains("Nopass")){
if(Invert){
cam.rigidbody.isKinematic = false;
cam.gameObject.layer = 8;
WorldInformation.IsNopass = false;
}else{
cam.rigidbody.isKinematic = true;
cam.gameObject.layer = 23;
WorldInformation.IsNopass = true;
WorldInformation.FPMode = false;
FurtherActionScript.instance.NoPass = true;
FurtherActionScript.instance.ShowText();
}
}
}
}