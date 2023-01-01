var target : Transform;
var Waypoint : GameObject;
var Home : Transform;
var Detect : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var AIAnchor : Transform;

var Vessel: GameObject;
var Trig : CapsuleCollider;
var Presence : GameObject;

var Wing : GameObject;

var Sounds: AudioSource;

var Beep: AudioSource;

var Obscurity : boolean = false;
var Damaged : boolean;

var IsActive : boolean;

var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var HomeIsMoving : boolean;

var SkipTC0 : boolean;
var SkipTC2 : boolean;
var SkipTC4 : boolean;
var SkipTC5 : boolean;
var SkipTC6 : boolean;
var SkipTC7 : boolean;

var SkipTiny : boolean;
var SkipSmall : boolean;
var SkipMedium : boolean;
var SkipBig : boolean;
var SkipHuge : boolean;

var targetLayers : LayerMask;

var GyroForce = 10.0;
var TurnForce : float = 0;
var Force : float = 0.2;

var ManeuvForce : float = 0;

var DetDist : float = 5000;

var TrigDir = 0;

InvokeRepeating("Regenerator", 0.7, 1);

function Start (){
Force = 0.1;

yield WaitForSeconds (2);

ReturnSpeech("Hello, my new user. \n State my name to order me something.");
}

function Update () {

 if (Vessel == null){
  Destroy(Waypoint);
  Destroy(gameObject);
 }

 if (Damaged) {
  Sounds.volume = 0;
  vRigidbody.drag = 0.1;
  vRigidbody.angularDrag = 0.1;
  Destroy(Presence);
  Destroy(Waypoint);
  Destroy(gameObject);
 }

if(Damaged)
return;

if(!IsActive || Vessel == null)
return;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(target == null){
Trig.center = Vector3(0,0,20);
Trig.radius = 10;
Trig.height = 60;
}

var hit : RaycastHit;

if(TurnLeft)
  TurnForce = -0.005;

if(TurnRight)
  TurnForce = 0.005;

if(!TurnRight && !TurnLeft){
  TurnForce = 0;
}

if(TurnRight && TurnLeft){
  TurnForce = 0;
}
	
var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;

newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }

if(vRigidbody.velocity.magnitude > 10){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * 20f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, 20, targetLayers)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}else{
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, 10, targetLayers)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}
	
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 12) && hit.collider.tag.Contains ("Te")){
		Obscurity = true;
		target = null;
	  } else {
	    Obscurity = false;
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 128){
target = PlayerInformation.instance.PiriTarget;
NotiScript.PiriNotis = false;
}

if(WorldInformation.pSpeech){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 128){
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
}
WorldInformation.pSpeech = null;
}
}


function FixedUpdate () {

 if(Vessel){
 if(!IsActive)
 if(Sounds.volume > 0)
 Sounds.volume -= 0.05;
 
 if(IsActive)
 if(Sounds.volume < 0.5)
 Sounds.volume += 0.05;
 }
 
 if(!IsActive || Vessel == null)
return;
 
var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);
 
var hit : RaycastHit;

if(-localV.y > 2){
vRigidbody.AddTorque(thisTransform.up * TurnForce);

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.1);

}else{

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.07);
}

if (ManeuvForce != 0)
vRigidbody.AddForce(thisTransform.up * ManeuvForce);

if(target){
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.01, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.01, -thisTransform.forward * 0.8);
}

    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.4);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.4);
 
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 5)){
     if(hit.collider.tag.Contains ("Te"))
        vRigidbody.AddForce(thisVTransform.forward * 0.1);
     if(hit.collider.tag.Contains ("Str"))
		vRigidbody.AddForce(thisVTransform.forward * 0.1);
}

if(Obstacle && -localV.y > 1){

if(-localV.y > 10)
  vRigidbody.AddForce(-thisVTransform.up * -0.8);
  else
  vRigidbody.AddForce(-thisVTransform.up * -0.2);
  
}
  
if(!Obstacle) {
  vRigidbody.AddForce(-thisVTransform.up * Force);
}
 
if(Obscurity)
  vRigidbody.AddForce(thisVTransform.forward *  0.1);
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TC1")){
if(!other.collider.name.Contains ("TC1d")){
rigidbody.isKinematic = true;
Home = other.gameObject.transform;
}
}else{

if(other.collider.name.Contains ("tTC") && SkipTiny)
return;

if(other.collider.name.Contains ("sTC") && SkipSmall)
return;

if(other.collider.name.Contains ("mTC") && SkipMedium)
return;

if(other.collider.name.Contains ("bTC") && SkipBig)
return;

if(other.collider.name.Contains ("xbTC") && SkipHuge)
return;

if(other.collider.name.Contains ("TC0") && !SkipTC0)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC2") && !SkipTC2)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC5") && !SkipTC5)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC4") && !SkipTC4)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC6") && !SkipTC6)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC7") && !SkipTC7)
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC8"))
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;
if(other.collider.name.Contains ("TC9"))
if(Vector3.Distance(thisTransform.position, other.transform.position) < DetDist)
Detect = other.gameObject.transform;

Trig.center = Vector3(0,0,20);
Trig.radius = 10;
Trig.height = 60;

}

}

function Unstick () {
ManeuvForce = -0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0;
}

function Regenerator () {

if(Damaged)
return;

if(Home){
IsActive = true;
vRigidbody.drag = 0.4;
vRigidbody.angularDrag = 20;
Wing.gameObject.SetActive (true);

if(Vector3.Distance(thisTransform.position, Home.position) > 15){
target = Home;
}else{
if(Detect){

if(!HomeIsMoving)
target = Detect;
else
target = Home;

}else{
target = null;
}
}

if(Vector3.Distance(thisTransform.position, Home.position) > 15)
Force = 0.1;
else
Force = 0;

TrigDir += 1;

if(TrigDir == 1){
Trig.center = Vector3(0,0,2500);
Trig.radius = 2500;
Trig.height = 2500;
}
if(TrigDir == 2){
Trig.center = Vector3(2500,0,0);
Trig.radius = 2500;
Trig.height = 2500;
}
if(TrigDir == 3){
Trig.center = Vector3(0,0,-2500);
Trig.radius = 2500;
Trig.height = 2500;
}
if(TrigDir == 4){
Trig.center = Vector3(-2500,0,0);
Trig.radius = 2500;
Trig.height = 2500;
TrigDir = 0;
}

ManeuvForce = 0;

Blip();

var lastPos : Vector3 = thisTransform.position;
HomeMoving(lastPos);

}

}

function HomeMoving(lastPos : Vector3){

yield WaitForSeconds (0.5);

  if(Vector3.Distance(transform.position, lastPos) > 1){
  HomeIsMoving = true;
  }else{
  HomeIsMoving = false;
  }
}

function Blip () {

if(Detect == null){

DetDist = 5000;

}else{

DetDist = Vector3.Distance(transform.position, Detect.position);

yield WaitForSeconds (0.25);

if(Detect != null)
var Dist = Vector3.Distance(transform.position, Detect.position);

var p = 2000 / Dist;
var q = p * 1;

Beep.pitch = Mathf.Clamp( q, 1.0, 3.0);
Beep.Play();
}
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;

function ProcessSpeech (speech : String){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(convNum == 0){
//===============================================================================
if(speech.Contains ("radar") && speech.Contains ("drone")){ convNum = 1; yield WaitForSeconds (2);
ReturnSpeech("Yes, my user. Say your command. \n You can say 'manual' for other commands."); return;}
//===============================================================================
}

if(convNum == 1){
//===============================================================================
if(speech.Contains ("kip") || speech.Contains ("gnore")){ yield WaitForSeconds (2);
if(speech.Contains ("reature") || speech.Contains ("nimal") || speech.Contains ("ivilian") || speech.Contains ("eople") || speech.Contains ("c0")){
ReturnSpeech("I am now ignoring civilians \n and other creatures."); SkipTC0 = true; target = null; Detect = null; convNum = 0; return; }
if(speech.Contains ("grian") || speech.Contains ("c2")){
ReturnSpeech("I am now ignoring Agrians."); convNum = 0; SkipTC2 = true; target = null; Detect = null; return; }
if(speech.Contains ("berrant") || speech.Contains ("c4")){
ReturnSpeech("I am now ignoring Aberrants."); convNum = 0; SkipTC4 = true; target = null; Detect = null; return; }
if(speech.Contains ("lav") || speech.Contains ("c5")){
ReturnSpeech("I am now ignoring Slavuics."); convNum = 0; SkipTC5 = true; target = null; Detect = null; return; }
if(speech.Contains ("tiba") || speech.Contains ("abia") || speech.Contains ("c6")){
ReturnSpeech("I am now ignoring the Abia Syndicate."); convNum = 0; SkipTC6 = true; target = null; Detect = null; return; }
if(speech.Contains ("evnav") || speech.Contains ("c7")){
ReturnSpeech("I am now ignoring MevNav."); convNum = 0; SkipTC7 = true; target = null; Detect = null; return; }
if(speech.Contains ("iny") || speech.Contains ("tt") || speech.Contains ("tT")){
ReturnSpeech("I am now ignoring tiny targets."); convNum = 0; SkipTiny = true; target = null; Detect = null; return; }
if(speech.Contains ("mall") || speech.Contains ("st") || speech.Contains ("sT")){
ReturnSpeech("I am now ignoring small targets."); convNum = 0; SkipSmall = true; target = null; Detect = null; return; }
if(speech.Contains ("edium") || speech.Contains ("mt") || speech.Contains ("mT")){
ReturnSpeech("I am now ignoring medium targets."); convNum = 0; SkipMedium = true; target = null; Detect = null; return; }
if(speech.Contains ("ig") || speech.Contains ("bt") || speech.Contains ("bT")){
ReturnSpeech("I am now ignoring big targets."); convNum = 0; SkipBig = true; target = null; Detect = null; return; }
if(speech.Contains ("uge") || speech.Contains ("xbt") || speech.Contains ("xbT")){
ReturnSpeech("I am now ignoring huge targets."); convNum = 0; SkipHuge = true; target = null; Detect = null; return; }

ReturnSpeech("I can not process your request. \n Try another word."); convNum = 1; return;
}

if(speech.Contains ("pot") || speech.Contains ("ook") || speech.Contains ("earch") || speech.Contains ("ind")){ yield WaitForSeconds (2);
if(speech.Contains ("reature") || speech.Contains ("nimal") || speech.Contains ("ivilian") || speech.Contains ("eople") || speech.Contains ("c0")){
ReturnSpeech("I am now searching for civilians \n and other creatures."); convNum = 0; SkipTC0 = false; return; }
if(speech.Contains ("grian") || speech.Contains ("c2")){
ReturnSpeech("I am now searching for Agrians."); convNum = 0; SkipTC2 = false; return; }
if(speech.Contains ("berrant") || speech.Contains ("c4")){
ReturnSpeech("I am now searching for Aberrants."); convNum = 0; SkipTC4 = false; return; }
if(speech.Contains ("lav") || speech.Contains ("tc5")){
ReturnSpeech("I am now searching for Slavuics."); convNum = 0; SkipTC5 = false; return; }
if(speech.Contains ("tiba") || speech.Contains ("abia") || speech.Contains ("c6")){
ReturnSpeech("I am now searching for the Abia Syndicate."); convNum = 0; SkipTC6 = false; return; }
if(speech.Contains ("evnav") || speech.Contains ("c7")){
ReturnSpeech("I am now searching for MevNav."); convNum = 0; SkipTC7 = false; return; }
if(speech.Contains ("iny") || speech.Contains ("tt") || speech.Contains ("tT")){
ReturnSpeech("I am now searching for tiny targets."); convNum = 0; SkipTiny = false; return; }
if(speech.Contains ("mall") || speech.Contains ("st") || speech.Contains ("sT")){
ReturnSpeech("I am now searching for small targets."); convNum = 0; SkipSmall = false; return; }
if(speech.Contains ("edium") || speech.Contains ("mt") || speech.Contains ("mT")){
ReturnSpeech("I am now searching for medium targets."); convNum = 0; SkipMedium = false; return; }
if(speech.Contains ("ig") || speech.Contains ("bt") || speech.Contains ("bT")){
ReturnSpeech("I am now searching for big targets."); convNum = 0; SkipBig = false; return; }
if(speech.Contains ("uge") || speech.Contains ("xbt") || speech.Contains ("xbT")){
ReturnSpeech("I am now searching for huge targets."); convNum = 0; SkipHuge = false; return; }

ReturnSpeech("I can not process your request. \n Try another word."); convNum = 1; return;
}
//===============================================================================

if(speech.Contains ("target name")){ yield WaitForSeconds (2);
ReturnSpeech("I am looking at target code: " + target.name); convNum = 0; target = null; Detect = null; return; }

if(speech.Contains ("command 1") || speech.Contains ("command1")){ yield WaitForSeconds (2);
ReturnSpeech("Command 1. Say 'target name' if you \n want the name of what I'm looking at"); convNum = 1; target = null; Detect = null; return; }

if(speech.Contains ("command 2") || speech.Contains ("command2")){ yield WaitForSeconds (2);
ReturnSpeech("Command 2. Say 'search' and then type \n your target name to make me search for it."); convNum = 1; target = null; Detect = null; return; }

if(speech.Contains ("command 3") || speech.Contains ("command3")){ yield WaitForSeconds (2);
ReturnSpeech("Command 3. Say 'skip' and then type \n your target name to make me ignore it."); convNum = 1; target = null; Detect = null; return; }

if(speech.Contains ("anual")){ yield WaitForSeconds (2);
ReturnSpeech("Alright, type 'command' and any \n number to browse different commands."); convNum = 1; target = null; Detect = null; return; }

yield WaitForSeconds (2);
ReturnSpeech("I can not process your command. \n type your command correctly"); convNum = 1; return;

}

}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC0";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisVTransform;
}