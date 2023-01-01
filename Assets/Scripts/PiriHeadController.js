var HeadRB : Rigidbody;
var HeadTF : Transform;

var target : Transform;
var LookTarget : Transform;
var EyeLookTarget : Transform;
var EyeResetTarget : Transform;
var ResetTarget : Transform;

var REyeDerp : Transform;
var LEyeDerp : Transform;

var Perform : boolean;

var Looking : boolean;

var IsLooking : boolean;
static var CanTurnHead : boolean;
var DoOnce : boolean;

private var NewRotation : Quaternion;

var IgnoreSelf : String;

var RandAim1 : Transform;
var RandAim2 : Transform;
var RandAim3 : Transform;

var EyeRandAim1 : Transform;
var EyeRandAim2 : Transform;
var EyeRandAim3 : Transform;

var LookForce : float = 0.1;
var EyeLookForce : float = 0.1;

var REyeTF : Transform;
var LEyeTF : Transform;

var LookPoints = 0;
var LookTime = 0;

var RBrowMood = 100;
var LBrowMood = 100;
var RMouthMood = 10;
var LMouthMood = 10;
var JawMood = 10;
var Mood = 1;

var RightBrow : Transform;
var LeftBrow : Transform;

var RightMouth : Transform;
var LeftMouth : Transform;

var PiriRB : Rigidbody;

InvokeRepeating("Notice", 3, 3);

InvokeRepeating("EyeNotice", 3, 0.3);

function Start () {
CanTurnHead = true;
target = GameObject.Find("PiriAimFront").transform;
}

function Update () {

if(Input.GetMouseButtonDown(1))
IsLooking = true;

    if(WorldInformation.FPMode){
    if(!DoOnce){
    IsLooking = true;
    DoOnce = true;
    }
    }
    
    if(!WorldInformation.FPMode){
    if(DoOnce){
    IsLooking = false;
    DoOnce = false;
    }
    }

if(CanTurnHead || !CameraScript.InInterface){

if(Input.GetMouseButtonUp(1)){
IsLooking = false;
DoOnce = false;
}
}

}

private var RNewRotation : Quaternion;
private var LNewRotation : Quaternion;

function FixedUpdate () {

if(LookTarget && Looking && !IsLooking){
    HeadRB.AddForceAtPosition((LookTarget.transform.position - HeadTF.position).normalized * LookForce, -HeadTF.forward * 1);
    HeadRB.AddForceAtPosition((LookTarget.transform.position - HeadTF.position).normalized * -LookForce, HeadTF.forward * 1);
}

if(WorldInformation.IsOotkinSick){
RNewRotation = Quaternion.LookRotation(REyeDerp.position - REyeTF.position);
LNewRotation = Quaternion.LookRotation(LEyeDerp.position - LEyeTF.position);
REyeTF.rotation = Quaternion.RotateTowards(REyeTF.rotation, RNewRotation, 5);
LEyeTF.rotation = Quaternion.RotateTowards(LEyeTF.rotation, LNewRotation, 5);
}

if(EyeLookTarget && Looking && !WorldInformation.IsOotkinSick){

RNewRotation = Quaternion.LookRotation(EyeLookTarget.position - REyeTF.position);
LNewRotation = Quaternion.LookRotation(EyeLookTarget.position - LEyeTF.position);
REyeTF.rotation = Quaternion.RotateTowards(REyeTF.rotation, RNewRotation, 5);
LEyeTF.rotation = Quaternion.RotateTowards(LEyeTF.rotation, LNewRotation, 5);

if(LEyeTF.localEulerAngles.x > 200)
if(LEyeTF.localEulerAngles.x < 340)
LEyeTF.localEulerAngles.x = 340;
if(LEyeTF.localEulerAngles.x < 90)
if(LEyeTF.localEulerAngles.x > 40)
LEyeTF.localEulerAngles.x = 40;

if(LEyeTF.localEulerAngles.y < 135)
LEyeTF.localEulerAngles.y = 135;
if(LEyeTF.localEulerAngles.y > 225)
LEyeTF.localEulerAngles.y = 225;

if(REyeTF.localEulerAngles.x > 200)
if(REyeTF.localEulerAngles.x < 340)
REyeTF.localEulerAngles.x = 340;
if(REyeTF.localEulerAngles.x < 90)
if(REyeTF.localEulerAngles.x > 40)
REyeTF.localEulerAngles.x = 40;

if(REyeTF.localEulerAngles.y < 135)
REyeTF.localEulerAngles.y = 135;
if(REyeTF.localEulerAngles.y > 225)
REyeTF.localEulerAngles.y = 225;

}

if(CanTurnHead || !CameraScript.InInterface){

if (IsLooking) {
    HeadRB.AddForceAtPosition((target.transform.position - HeadTF.position).normalized * LookForce, -HeadTF.forward * 1);
    HeadRB.AddForceAtPosition((target.transform.position - HeadTF.position).normalized * -LookForce, HeadTF.forward * 1);
 }
}

RightBrow.localPosition.x = -0.08 + -RBrowMood * 0.0001;
LeftBrow.localPosition.x = -0.08 + -LBrowMood * 0.0001;

RightMouth.localEulerAngles.x = RMouthMood;
RightMouth.localEulerAngles.y = 270 + RMouthMood * 0.5;

LeftMouth.localEulerAngles.x = -LMouthMood;
LeftMouth.localEulerAngles.y = 270 + LMouthMood * 0.5;

if(PiriRB.velocity.magnitude > 8){
if(JawMood < 14)
JawMood += 2;
}else{
if(JawMood > 0)
JawMood -= 2;
}

if(Mood == 0){

if(LBrowMood < 150)
if(REyeTF.localEulerAngles.y < 170 && REyeTF.localEulerAngles.y > 0)
LBrowMood += 8;
if(RBrowMood < 150)
if(LEyeTF.localEulerAngles.y > 190 && LEyeTF.localEulerAngles.y < 360)
RBrowMood += 8;

if(EyeLookTarget != EyeRandAim2)
if(RMouthMood > -14)
RMouthMood -= 1;
if(EyeLookTarget != EyeRandAim1)
if(LMouthMood > -14)
LMouthMood -= 1;
}

if(Mood == 2){


if(RMouthMood < 40){
if(REyeTF.localEulerAngles.y < 170 && REyeTF.localEulerAngles.y > 0)
RMouthMood += 1;
}

if(LBrowMood > -100)
LBrowMood -= 8;

if(LMouthMood < 40){
if(LEyeTF.localEulerAngles.y > 190 && LEyeTF.localEulerAngles.y < 360)
LMouthMood += 1;
}

if(RBrowMood > -100)
RBrowMood -= 8;


}else{
if(RBrowMood > 0)
RBrowMood -= 2;
if(LBrowMood > 0)
LBrowMood -= 2;

if(RBrowMood < 0)
RBrowMood += 2;
if(LBrowMood < 0)
LBrowMood += 2;
}
if(Mood == 1){
if(RMouthMood > 0)
RMouthMood -= 2;
if(RMouthMood < 0)
RMouthMood += 2;
if(LMouthMood > 0)
LMouthMood -= 2;
if(LMouthMood < 0)
LMouthMood += 2;
}

if(RMouthMood > 40)
RMouthMood = 40;

if(LMouthMood > 40)
LMouthMood = 40;

if(RMouthMood < -14)
RMouthMood = -14;

if(LMouthMood < -14)
LMouthMood = -14;

}

function Notice () {

if(PlayerInformation.instance.Pirizuka.gameObject.activeSelf == true && !WorldInformation.FPMode)
Notice2();

}

function Notice2 () {

Looking = false;

  var Interval: int = Random.Range(0, 2);
       
  switch (Interval) {
  case 1:
  LookTarget = ResetTarget;
  break;
}

if(LookTarget == ResetTarget){
  var Interval2: int = Random.Range(0, 10);
       
  switch (Interval2) {
  case 1:
  LookTarget = RandAim1;
  break;
  case 2:
  LookTarget = RandAim2;
  break;
  case 3:
  LookTarget = RandAim3;
  break;
}
}

yield WaitForSeconds (0.1);
Looking = true;

}

function EyeNotice () {

if(LookPoints > 0)
LookPoints -= 1;

if(LookTarget)
if(LookTarget.name.Contains ("TC"))
if(LookPoints < 1){
LookTarget = ResetTarget;
EyeLookTarget = EyeResetTarget;
}

if(EyeLookTarget){
var relativePoint = transform.InverseTransformPoint(EyeLookTarget.position);

if(relativePoint.z > 0){
LookTarget = ResetTarget;
EyeLookTarget = EyeResetTarget;
}
}

if(LookTarget == ResetTarget){
  var Interval: int = Random.Range(0, 16);
       
  switch (Interval) {
  case 1:
  EyeLookTarget = EyeResetTarget;
  break;
  case 2:
  EyeLookTarget = EyeRandAim1;
  break;
  case 3:
  EyeLookTarget = EyeRandAim2;
  break;
  case 4:
  EyeLookTarget = EyeRandAim3;
  break;
}
}

  var Interval3: int = Random.Range(0, 32);
       
  switch (Interval3) {
  case 1:
  Mood = 0;
  break;
  case 2:
  Mood = 1;
  break;
  case 3:
  Mood = 1;
  break;
  case 4:
  Mood = 2;
  break;
}

}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains (IgnoreSelf))
return;

LookTime += Random.Range(0, 4);

if(RBrowMood > 200)
RBrowMood = 200;

if(RBrowMood < -200)
RBrowMood = -200;

if(LBrowMood > 200)
LBrowMood = 200;

if(LBrowMood < -200)
LBrowMood = -200;

if(other.collider.name.Contains ("TC")){

if(LookTime > 720){
LookTarget = other.transform;
EyeLookTarget = other.transform;

LookTime = 0;
Mood = 1;
}

if(EyeLookTarget == other.transform)
if(LookPoints < 2)
LookPoints += 1;

if(LBrowMood < 150)
if(REyeTF.localEulerAngles.y < 170 && REyeTF.localEulerAngles.y > 0)
LBrowMood += 8;
if(RBrowMood < 150)
if(LEyeTF.localEulerAngles.y > 190 && LEyeTF.localEulerAngles.y < 360)
RBrowMood += 8;
}

if(other.collider.name.Contains ("TFC")){
RBrowMood -= 8;
LBrowMood -= 8;
}

}