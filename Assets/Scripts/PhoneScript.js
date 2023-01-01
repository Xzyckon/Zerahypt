
var IsNear : boolean;

var IsInUse : boolean;

var target : Transform;
var resetTarget : Transform;

var thisTransform : Transform;

var TargetCode : int;

var audioComponent : AudioSource;

var SFX1 : AudioClip;
var SFX2 : AudioClip;

var SpecialDelivery : GameObject;

var DrawerJ : ConfigurableJoint;

var HingeJ : HingeJoint;

var GunJ : HingeJoint;

var GunTF : Transform;

var GunShot : GameObject;

var BarrelLocation : Transform;

var gunAiming : boolean;

var drawerOut : boolean;

var Dist : float;

var relativePoint : Vector3;

var targetLayers : LayerMask;

function Start() {

}

function Update() {


if(IsNear)
if(!IsInUse){
if(Input.GetKeyDown(KeyCode.E)){

target = PlayerInformation.instance.PiriTarget;

FurtherActionScript.instance.UsingPhone = true;
FurtherActionScript.instance.ShowText();

IsInUse = true;

}
}else{











//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 8){
NotiScript.PiriNotis = false;
}

if(WorldInformation.pSpeech){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 8){
if(TargetCode == 2)
ProcessSpeech2(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
if(TargetCode == 3)
ProcessSpeech3(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
if(TargetCode == 9)
ProcessSpeech9(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText);
}
WorldInformation.pSpeech = null;
}
}
}

function FixedUpdate() {

if(TargetCode == 9){

if(target){
Dist = Vector3.Distance(thisTransform.position, target.position);
relativePoint = GunTF.InverseTransformPoint(target.position);
if(!gunAiming){
relativePoint = GunTF.InverseTransformPoint(resetTarget.position);
Dist = Vector3.Distance(thisTransform.position, resetTarget.position);
}
}else{
relativePoint = GunTF.InverseTransformPoint(resetTarget.position);
Dist = Vector3.Distance(thisTransform.position, resetTarget.position);
}

if(drawerOut){

if(DrawerJ.targetPosition.x > -0.4){
DrawerJ.targetPosition.x -= 0.03;
}else{
DrawerJ.targetPosition.x = -0.4;
}

}else{
if(DrawerJ.targetPosition.x < 0){
DrawerJ.targetPosition.x += 0.03;
}else{
DrawerJ.targetPosition.x = 0;
}

}

LAndR = relativePoint.x * 4000;
UAndD = -relativePoint.y * 4000;

GunJ.motor.targetVelocity = Mathf.Clamp(LAndR / Dist,-200,200);
HingeJ.motor.targetVelocity = Mathf.Clamp(UAndD / Dist,-200,200);

}

}

function OnTriggerEnter(other : Collider) {
    if(other.name.Contains("sTC1p") || other.name.Contains("csTC1p"))
        IsNear = true;

}

function OnTriggerExit(other : Collider) {
    if(other.name.Contains("sTC1p") || other.name.Contains("csTC1p")){
        IsNear = false;
        IsInUse = false;
        if(convNum < 200)
        convNum = 0;
        }
}

function GunOut() {

yield WaitForSeconds (2);

drawerOut = true;

audioComponent.PlayOneShot(SFX1);

yield WaitForSeconds (0.25);

audioComponent.PlayOneShot(SFX2);

gunAiming = true;
GunJ.useMotor = true;
HingeJ.useMotor = true;

yield WaitForSeconds (0.5);

Debug.DrawRay (BarrelLocation.position, BarrelLocation.forward * 16, Color.red);
if (Physics.Raycast (BarrelLocation.position, BarrelLocation.forward, 16, targetLayers))
Instantiate(GunShot, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (0.3);
Debug.DrawRay (BarrelLocation.position, BarrelLocation.forward * 16, Color.red);
if (Physics.Raycast (BarrelLocation.position, BarrelLocation.forward, 16, targetLayers))
Instantiate(GunShot, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (0.3);
Debug.DrawRay (BarrelLocation.position, BarrelLocation.forward * 16, Color.red);
if (Physics.Raycast (BarrelLocation.position, BarrelLocation.forward, 16, targetLayers))
Instantiate(GunShot, BarrelLocation.position, BarrelLocation.rotation);

yield WaitForSeconds (0.5);

audioComponent.PlayOneShot(SFX2);

gunAiming = false;

yield WaitForSeconds (0.25);

audioComponent.PlayOneShot(SFX1);

GunJ.useMotor = false;
HingeJ.useMotor = false;
drawerOut = false;

}

function Spawnaroo() {

yield WaitForSeconds (1.5);

WorldInformation.instance.didDeliver = true;

Instantiate(SpecialDelivery, WorldInformation.instance.SpecialDeliveryArea.position, WorldInformation.instance.SpecialDeliveryArea.rotation);

}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;
var boredom = 0;

function ProcessSpeech2 (speech : String){

if(!IsInUse)
return;

yield WaitForSeconds (0.1);

if(!speech)
return;


if(convNum == 0){
//===============================================================================
if(speech == "1"){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("You have reached the Agrian call centre, \n how may I help you?"); return;}
//===============================================================================
}








if(convNum == 1){

//===============================================================================
if(speech.Contains ("carrier") && speech.Contains ("2") || speech.Contains ("tower") && speech.Contains ("2") ||
   speech.Contains ("carrier") && speech.Contains ("two") || speech.Contains ("tower") && speech.Contains ("two")){ 
convNum = 21; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Do you want to hire 2 carriers \n to be in your fleet?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("carrier") || speech.Contains ("tower")){ convNum = 2; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Do you want to hire a carrier \n to be in your fleet?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("uck") && speech.Contains ("o")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("k"); AgrianNetwork.Spawn = 4; return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("3") || speech.Contains ("three") || speech.Contains ("4") || speech.Contains ("four")
   || speech.Contains ("5") || speech.Contains ("five") || speech.Contains ("6") || speech.Contains ("six")
   || speech.Contains ("7") || speech.Contains ("seven") || speech.Contains ("7") || speech.Contains ("seven")
   || speech.Contains ("8") || speech.Contains ("eight") || speech.Contains ("9") || speech.Contains ("nine")){
convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("I'm afraid we can't offer that much."); return;}
//===============================================================================

//===============================================================================
}








if(convNum == 2){
//===============================================================================
if(speech.Contains ("ye")){ convNum = 3; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, we will have to ask you \n for your credentials"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("no")){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Well then, what other services \n are you looking for?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("2") || speech.Contains ("two")){
convNum = 3; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, 2 of them, we will have to \n ask you for your credentials"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("3") || speech.Contains ("three") || speech.Contains ("4") || speech.Contains ("four")
   || speech.Contains ("5") || speech.Contains ("five") || speech.Contains ("6") || speech.Contains ("six")
   || speech.Contains ("7") || speech.Contains ("seven") || speech.Contains ("7") || speech.Contains ("seven")
   || speech.Contains ("8") || speech.Contains ("eight") || speech.Contains ("9") || speech.Contains ("nine")){
convNum = 2; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("I'm afraid we can't offer that much."); return;}
//===============================================================================

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka") && speech.Contains ("overseer")){ 
   convNum = 6; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, Pirizuka. Is this what you want?"); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 2; boredom += 1; return;
}
//===============================================================================
}















if(convNum == 21){
//===============================================================================
if(speech.Contains ("ye")){ convNum = 31; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, we will have to ask you \n for your credentials"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("no")){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Well then, what other services \n are you looking for?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("3") || speech.Contains ("three") || speech.Contains ("4") || speech.Contains ("four")
   || speech.Contains ("5") || speech.Contains ("five") || speech.Contains ("6") || speech.Contains ("six")
   || speech.Contains ("7") || speech.Contains ("seven") || speech.Contains ("7") || speech.Contains ("seven")
   || speech.Contains ("8") || speech.Contains ("eight") || speech.Contains ("9") || speech.Contains ("nine")){
convNum = 21; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("I'm afraid we can't offer that much."); return;}
//===============================================================================

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka") && speech.Contains ("overseer")){ 
   convNum = 61; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, Pirizuka. Is this what you want?"); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 21; boredom += 1; return;
}
//===============================================================================
}








if(convNum == 3){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka") && speech.Contains ("overseer")){
   convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n a carrier in your Zerzek fleet."); 
WorldInformation.FleetMember2 = "AgrianTower_P_Warper"; PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

//===============================================================================
if(speech.Contains ("pirizuka")){ convNum = 4; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("The overseer?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("overseer")){ convNum = 5; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, but what is your name?"); return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("Excuse me?"); convNum = 3; boredom += 1; return;
}
//===============================================================================
}










if(convNum == 31){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka") && speech.Contains ("overseer")){
convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n 2 carriers in your Zerzek fleet."); 
WorldInformation.FleetMember2 = "AgrianTower_P_Warper";
WorldInformation.FleetMember3 = "AgrianTower_P_Warper";
PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.SetString("FleetMember3", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

//===============================================================================
if(speech.Contains ("pirizuka")){ convNum = 41; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("The overseer?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("overseer")){ convNum = 51; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Ok, but what is your name?"); return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("Excuse me?"); convNum = 31; boredom += 1; return;
}
//===============================================================================
}








if(convNum == 4){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("ye")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n a carrier in your Zerzek fleet.");
WorldInformation.FleetMember2 = "AgrianTower_P_Warper"; PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 4; boredom += 1; return;
}
//===============================================================================
}






if(convNum == 41){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("ye")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n 2 carriers in your Zerzek fleet."); 
WorldInformation.FleetMember2 = "AgrianTower_P_Warper";
WorldInformation.FleetMember3 = "AgrianTower_P_Warper";
PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.SetString("FleetMember3", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 41; boredom += 1; return;
}
//===============================================================================
}







if(convNum == 5){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n a carrier in your Zerzek fleet.");
WorldInformation.FleetMember2 = "AgrianTower_P_Warper"; PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("Who?"); convNum = 5; boredom += 1; return;
}
//===============================================================================
}













if(convNum == 51){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("pirizuka")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n 2 carriers in your Zerzek fleet."); 
WorldInformation.FleetMember2 = "AgrianTower_P_Warper";
WorldInformation.FleetMember3 = "AgrianTower_P_Warper";
PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.SetString("FleetMember3", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("Who?"); convNum = 51; boredom += 1; return;
}
//===============================================================================
}












if(convNum == 6){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("ye")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n a carrier in your Zerzek fleet.");
WorldInformation.FleetMember2 = "AgrianTower_P_Warper"; PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

//===============================================================================
if(speech.Contains ("no")){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Well then, what other services \n are you looking for?"); return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 6; boredom += 1; return;
}
//===============================================================================
}














if(convNum == 61){

//===============================================================================
if(AgrianNetwork.TC1CriminalLevel < 200){
if(speech.Contains ("ye")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Alright, you will be accompanied by \n 2 carriers in your Zerzek fleet."); 
WorldInformation.FleetMember2 = "AgrianTower_P_Warper";
WorldInformation.FleetMember3 = "AgrianTower_P_Warper";
PlayerPrefs.SetString("FleetMember2", "AgrianTower_P_Warper");
PlayerPrefs.SetString("FleetMember3", "AgrianTower_P_Warper");
PlayerPrefs.Save(); return;}
}else{
if(speech.Contains ("ye")){ convNum = 512; yield WaitForSeconds (3);
ReturnSpeech("Oh, it's Pirizuka! \n Why don't you just stay here for a bit?"); AgrianNetwork.Spawn = 4; return;}
}
//===============================================================================

//===============================================================================
if(speech.Contains ("no")){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Well then, what other services \n are you looking for?"); return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 61; boredom += 1; return;
}
//===============================================================================
}
















yield WaitForSeconds (4);

if(convNum > 0){

if(convNum == 512){
if(boredom == 0){ReturnSpeech("So, how does it feel to be \n an enemy of the Kabrians?");}
if(boredom == 1){ReturnSpeech("Pretty rough, isn't it?");}
if(boredom == 2){ReturnSpeech("Well, it was nice talking to you.");}
boredom += 1;
}else{
if(boredom == 0){ReturnSpeech("Please elaborate?");}
if(boredom == 1){ReturnSpeech("I do not think that I can \n help you with that.");}
if(boredom == 2){ReturnSpeech("Well, it was nice talking to you."); convNum = 128;}
boredom += 1;
}

}else{
{ReturnSpeech("The number you have dialed \n is currently not in use.");}
}








if(convNum == 128){
        IsNear = false;
        IsInUse = false;
        convNum = 0;
        boredom = 0;
}

}








function ProcessSpeech3 (speech : String){

if(!IsInUse)
return;

yield WaitForSeconds (0.1);

if(!speech)
return;


if(convNum == 0){
//===============================================================================
if(speech == "1"){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("You have reached the Terrahyptian call centre, \n how may I help you?"); return;}
//===============================================================================
}








if(convNum == 1){

//===============================================================================
if(speech.Contains ("carrier") || speech.Contains ("tower")){ convNum = 2; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Are you sure you do not want to ask \n the Agrians for this kind of service?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("uck") && speech.Contains ("o")){ convNum = 128; yield WaitForSeconds (3);
ReturnSpeech("Well, I will see you later"); return;}
//===============================================================================

//===============================================================================
}








if(convNum == 2){
//===============================================================================
if(speech.Contains ("ye")){ convNum = 128; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Good luck then"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("no")){ convNum = 128; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Well, we are sorry to tell you that we don't have \n any of those services available at this moment"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("ok")){ convNum = 128; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("Good luck then"); return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What?"); convNum = 2; boredom += 1; return;
}
//===============================================================================
}









yield WaitForSeconds (3);

if(convNum > 0){

if(boredom == 0){ReturnSpeech("Please elaborate?");}
if(boredom == 1){ReturnSpeech("I do not think that I can \n help you with that.");}
if(boredom == 2){ReturnSpeech("Well, it was nice talking to you."); convNum = 128;}
boredom += 1;

}else{
{ReturnSpeech("The number you have dialed \n is currently not in use.");}
}






if(convNum == 128){
        IsNear = false;
        IsInUse = false;
        convNum = 0;
        boredom = 0;
}






}
















function ProcessSpeech9 (speech : String){

if(!IsInUse)
return;

yield WaitForSeconds (0.1);

if(!speech)
return;


if(convNum == 0){
//===============================================================================
if(speech == "1"){ convNum = 1; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("This is the Dutvutanian call centre, \n What do you want?"); return;}
//===============================================================================
}







if(convNum == 200){

//===============================================================================
if(speech.Contains ("trigger remains untouched")){ convNum = 201; boredom = 1; yield WaitForSeconds (2);
GunOut(); return;}
//===============================================================================

yield WaitForSeconds (4);

ReturnSpeech("You again? We do not have any \n services for you at the moment."); convNum = 201; boredom += 1; return;
}

if(convNum == 201){

yield WaitForSeconds (2);

GunOut(); return;
}








if(convNum == 1){

//===============================================================================
if(speech.Contains ("prank")){ convNum = 200; boredom = 1; yield WaitForSeconds (2);
ReturnSpeech("Ok, good for making it easy for us."); GunOut(); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("trigger remains untouched")){ convNum = 20; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("What are you on about?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("carrier") || speech.Contains ("tower")){ convNum = 2; boredom = 0; yield WaitForSeconds (3);
ReturnSpeech("We don't even know who you are. \nstate your name."); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("irizuka")){ convNum = 2; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("And?"); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("verseer")){ convNum = 2; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("So?"); return;}
//===============================================================================
}








if(convNum == 2){
//===============================================================================
if(speech.Contains ("irizuka")){ convNum = 128; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("We don't know who that person is. \nDon't bother us in the future."); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("verseer")){ convNum = 128; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("Good for you. \nWe don't respect your kind, beat it."); return;}
//===============================================================================

//===============================================================================
if(speech.Contains ("no") || speech.Contains ("ye")){ convNum = 128; boredom = 2; yield WaitForSeconds (3);
return;}
//===============================================================================

yield WaitForSeconds (4);

if(boredom < 1){
ReturnSpeech("What do you want?"); convNum = 2; boredom += 1; return;
}
//===============================================================================
}








if(convNum == 20){
//===============================================================================
if(speech.Contains ("thought you would know")){ convNum = 21; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("I don't know who you are, or what you want \nstop wasting our time"); return;}
//===============================================================================

yield WaitForSeconds (3);

GunOut();
convNum = 200; 
return;
//===============================================================================
}
if(convNum == 21){
//===============================================================================
if(speech.Contains ("it be like that sometimes huh")){ convNum = 128; boredom = 1; yield WaitForSeconds (3);
ReturnSpeech("Step away from this phone \n or I'll shoot your face off..."); Spawnaroo(); return;}
//===============================================================================

yield WaitForSeconds (3);

GunOut();
convNum = 200; 
return;
//===============================================================================
}








yield WaitForSeconds (3);

if(convNum > 0){

if(boredom == 0){ReturnSpeech("Tell us something more important");}
if(boredom == 1){ReturnSpeech("I'm going to request you to be killed \nif you do not give us any reason to waste our time on you");}
if(boredom == 2){GunOut(); convNum = 200;}
boredom += 1;

}else{
{ReturnSpeech("The number you have dialed \n is currently not in use.");}
}






if(convNum == 128){
        IsNear = false;
        IsInUse = false;
        convNum = 0;
        boredom = 0;
}


}









function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "C";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisTransform;
}