
var IsGate : boolean;
var SingleSound : boolean;

var LeftOpener : boolean;

var IsNear : boolean = false;

var Ascend : boolean = false;

var Moved : boolean;

var Moving : boolean;

var VesselRB : Rigidbody;

var LockJoint : FixedJoint;

var ElevatorJoint : ConfigurableJoint;
var Elevator : GameObject;
var YAxis : boolean;
var XAxis : boolean;

var GateJoint : HingeJoint;
var Gate : GameObject;

var ContAudio : AudioSource;
var StartAudio : AudioSource;
var StopAudio : AudioSource;

var ElevatorVolume : float = 1;

var Num : float = 0;

var Speed : float = 0.1;

var AscendedNum : float = 6;

var OtherGO : GameObject;

function Start () {
Moved = true;
}

function Update () {
  if(IsNear)
  if(Input.GetKeyDown(KeyCode.E)){
  
  if(!OtherGO.name.Contains("sTC1p") || WorldInformation.UsingVessel){
  IsNear = false;
  return;
  }
  
  if(SingleSound){
  if(Moved){
  if(!Ascend){
  Ascend = true;
  Moving = true;
  Moved = false;
  StartAudio.Play();
  if(LockJoint)
  Destroy(LockJoint);
  StopCoroutine("LockRB");
  }else{
  Ascend = false;
  Moving = true;
  Moved = false;
  StartAudio.Play();
  if(LockJoint)
  Destroy(LockJoint);
  StopCoroutine("LockRB");
  }
  }
  }else{
  if(!Ascend){
  Ascend = true;
  Moving = true;
  Moved = false;
  StartAudio.Play();
  if(LockJoint)
  Destroy(LockJoint);
  StopCoroutine("LockRB");
  }else{
  Ascend = false;
  Moving = true;
  Moved = false;
  StartAudio.Play();
  if(LockJoint)
  Destroy(LockJoint);
  StopCoroutine("LockRB");
  }
  }
  
  }
}

function FixedUpdate(){

if(Ascend){
if(!LeftOpener){
if(Num > AscendedNum){
   Num -= Speed;
   Moving = true;
   }else{
   Moving = false;
   }
   }else{
   if(-Num > AscendedNum){
   Num -= Speed;
   Moving = true;
   }else{
   Moving = false;
   }
   }
}

if(!Ascend){
if(!LeftOpener){
if(Num < 0){
   Num += Speed;
   Moving = true;
   }else{
   Moving = false;
   }
   }else{
   if(-Num < 0){
   Num += Speed;
   Moving = true;
   }else{
   Moving = false;
   }
   }
}


if(!Moving && !Moved){
if(!SingleSound)
StopAudio.Play();
Moved = true;
StartCoroutine("LockRB");
}

if(!IsGate){
if(XAxis){
ElevatorJoint.targetPosition = Vector3(Num,0,0);
}else{
if(YAxis){
ElevatorJoint.targetPosition = Vector3(0,Num,0);
}else{
ElevatorJoint.targetPosition = Vector3(0,0,Num);
}
}
}else{
GateJoint.spring.targetPosition = Num;
}

if(!SingleSound){
if(Moving && ContAudio.volume < ElevatorVolume)
ContAudio.volume += 0.02;
if(!Moving && ContAudio.volume > 0)
ContAudio.volume -= 0.02;
}

}

function LockRB(){

if(Moving)
return;

yield WaitForSeconds (0.5);

if(Moving)
return;

if(Elevator){
LockJoint = Elevator.AddComponent ("FixedJoint");
if(VesselRB)
LockJoint.connectedBody = VesselRB;
}
if(Gate){
LockJoint = Gate.AddComponent ("FixedJoint");
if(VesselRB)
LockJoint.connectedBody = VesselRB;
}
}

function OnTriggerEnter(other : Collider) {
    if(other.name.Contains("sTC1p") || other.name.Contains("csTC1p")){
        IsNear = true;
        OtherGO = other.gameObject;
        }
}

function OnTriggerExit(other : Collider) {
    if(other.name.Contains("sTC1p") || other.name.Contains("csTC1p"))
        IsNear = false;
}