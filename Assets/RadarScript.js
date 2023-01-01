#pragma strict

var target : Transform;

var thisTransform : Transform;

var thisGTransform : Transform;
var thisGRB : Rigidbody;

var GyroStabForce : float;

var Beep : AudioSource;

var canBeepTime : boolean;
var BeepTime : int;

var CommandSuccessfulSFX : AudioClip;
var CommandFailedSFX : AudioClip;
var RadarRegisterSFX : AudioClip;
var RadarBeepSFX : AudioClip;

var FindSmall : boolean;
var FindMedium : boolean;
var FindLarge : boolean;

var FindTC0 : boolean;
var FindTC2 : boolean;
var FindTC3 : boolean;
var FindTC4 : boolean;
var FindTC5 : boolean;
var FindTC6 : boolean;
var FindTC7 : boolean;
var FindTC8 : boolean;
var FindTC9 : boolean;

var rProd1 : float;
var rProd2 : float;

InvokeRepeating("Tick", 1, 0.66);

function Start () {

}

function Update (){
if(Input.GetKeyDown(KeyCode.Return))
InitiateRadar();
}

function FixedUpdate () {

if(target){
var RelativeG = thisTransform.InverseTransformPoint(target.position);

var TDist = Vector3.Distance(thisTransform.position, target.position);

rProd1 = RelativeG.x / TDist * 4;
}else{
rProd1 = 4;
canBeepTime = false;
}

rProd2 = Mathf.Clamp(rProd1,-4,4);

thisTransform.localEulerAngles.z += rProd2;

thisGRB.AddForceAtPosition(Vector3.up * GyroStabForce, thisGTransform.up * 0.5);
thisGRB.AddForceAtPosition(-Vector3.up * GyroStabForce, -thisGTransform.up * 0.5);

if(canBeepTime){
if(BeepTime < 1){
BeepTime = Mathf.Clamp(TDist,300,2000) * 0.05;
Beep.PlayOneShot(RadarBeepSFX);
}else{
BeepTime -= 1;
}
}

}

function InitiateRadar (){
yield WaitForSeconds (0.2);
if(WorldInformation.pSpeech)
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 64)
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
}

function ProcessSpeech (speech : String){

yield WaitForSeconds (0.1);

if(!speech)
return;

//===============================================================================
if(speech.Contains ("adar")){ yield WaitForSeconds (1);

if(speech.Contains ("mall") || speech.Contains ("st") || speech.Contains ("sT")){
FindSmall = true;
}
if(speech.Contains ("edium") || speech.Contains ("mt") || speech.Contains ("mT")){
FindMedium = true;
}
if(speech.Contains ("arge") || speech.Contains ("bt") || speech.Contains ("bT")){
FindLarge = true;
}

if(speech.Contains ("reature") || speech.Contains ("nimal") || speech.Contains ("ivilian") || speech.Contains ("eople") || speech.Contains ("c0")){
CommandSuccessful(); FindTC0 = true; target = null; return; }
if(speech.Contains ("grian") || speech.Contains ("c2")){
CommandSuccessful(); FindTC2 = true; target = null; return; }
if(speech.Contains ("errahypt") || speech.Contains ("c3")){
CommandSuccessful(); FindTC3 = true; target = null; return; }
if(speech.Contains ("berrant") || speech.Contains ("c4")){
CommandSuccessful(); FindTC4 = true; target = null; return; }
if(speech.Contains ("lavui") || speech.Contains ("c5")){
CommandSuccessful(); FindTC5 = true; target = null; return; }
if(speech.Contains ("tiba") || speech.Contains ("bia") || speech.Contains ("c6")){
CommandSuccessful(); FindTC6 = true; target = null; return; }
if(speech.Contains ("evnav") || speech.Contains ("c7")){
CommandSuccessful(); FindTC7 = true; target = null; return; }
if(speech.Contains ("utvuta") || speech.Contains ("c9")){
CommandSuccessful(); FindTC9 = true; target = null; return; }

if(speech.Contains ("eset") || speech.Contains ("dle") || speech.Contains ("eactiva")){
CommandFailed();
FindLarge = false;
FindMedium = false;
FindSmall = false;
FindTC0 = false;
FindTC2 = false;
FindTC3 = false;
FindTC4 = false;
FindTC5 = false;
FindTC6 = false;
FindTC7 = false;
FindTC8 = false;
FindTC9 = false;
target = null; 
return; 
}

CommandFailed(); return;
}

}

function RadarRegister(){
Beep.PlayOneShot(RadarRegisterSFX);
yield WaitForSeconds (0.6);
canBeepTime = true;
}

function CommandSuccessful(){
Beep.PlayOneShot(CommandSuccessfulSFX);
canBeepTime = false;
}

function CommandFailed(){
Beep.PlayOneShot(CommandFailedSFX);
canBeepTime = false;
}

function Tick () {

if(target)
return;

var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("TC");

//var Blip = Resources.Load("Prefabs/RadarBlip", GameObject) as GameObject;
 
for (var go : GameObject in gos) {

var ON = go.name;
var OT = go.transform;

//Debug.Log(ON);
//Instantiate(Blip, OT.position, OT.rotation);

var RTF = thisGTransform.InverseTransformPoint(OT.position);

if(Vector3.Distance(thisTransform.position, OT.position) > 32)
if(RTF.y < 64){

if(FindTC0)
 if(ON.Contains ("TC0")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC2)
if(ON.Contains ("TC2")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC3)
if(ON.Contains ("TC3")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC4)
 if(ON.Contains ("TC4")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC5)
 if(ON.Contains ("TC5")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC6)
 if(ON.Contains ("TC6")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC7)
 if(ON.Contains ("TC7")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC8)
if(ON.Contains ("TC8")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

if(FindTC9)
if(ON.Contains ("TC9")){
 
 if(ON.Contains ("sT") && FindSmall ||
    ON.Contains ("mT") && FindMedium ||
    ON.Contains ("bT") && FindLarge){
 
  target = OT;
  RadarRegister();
}
}

//++loops;
//if(loops > 64) {
//Debug.LogError("64 loops");
//loops = 0;
//break;
//}

}

}

//Debug.Log(loops + " loops");
//loops = 0;

//VPFX.startSize = VPRadius * 2;

}