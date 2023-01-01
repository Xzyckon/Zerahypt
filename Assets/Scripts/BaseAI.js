
var target : Transform;

var thisTransform : Transform;

var Ogle = 0;

var BaseGun1 : TurretAI;
var BaseGun2 : TurretAI;
var BaseGun3 : TurretAI;
var BaseGun4 : TurretAI;

var BaseGun5 : TurretAI;
var BaseGun6 : TurretAI;

var PissedAtTC0a = 0;
var PissedAtTC1 = 0;
var PissedAtTC2 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

InvokeRepeating("Ticker", 4, 1);

function Start () {
thisTransform = transform;

PissedAtTC0a = 64;
PissedAtTC1 = 64;
PissedAtTC2 = 0;
PissedAtTC3 = 0;
PissedAtTC4 = 64;
PissedAtTC5 = 64;
PissedAtTC6 = 64;
PissedAtTC7 = 64;
PissedAtTC8 = 64;
PissedAtTC9 = 64;

if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 512){
convNum = 64;
PissedAtTC0a = 0;
PissedAtTC1 = 0;
}

}

function Update () {

}

function Process (){
yield WaitForSeconds (12);
if(TerrahyptianNetwork.TC1CriminalLevel > 10){
TerrahyptianNetwork.AlertLVL2 = 1;
ReturnSpeech("I am sorry, Pirizuka, \n but you are a wanted criminal.");
convNum = 66;
WorldInformation.PiriExposed = 32;
PissedAtTC0a = 64;
PissedAtTC1 = 64;
}else{
ReturnSpeech("Overseer Pirizuka, \n you are permitted to enter.");
convNum = 63;
boredom = 1;
WorldInformation.PiriExposed = 32;
PissedAtTC0a = 0;
PissedAtTC1 = 0;

BaseGun1.Suspicion = 0;
BaseGun2.Suspicion = 0;
BaseGun3.Suspicion = 0;
BaseGun4.Suspicion = 0;
BaseGun6.Suspicion = 0;

Ticker();

}
}

function Reminder (){
yield WaitForSeconds (20);
if(convNum < 3)
ReturnSpeech("You need to identify yourself! \n You will be swiftly eliminated if you proceed any further!");
}

function Reminder2 (){
yield WaitForSeconds (20);
if(convNum < 3){
ReturnSpeech("Driver, you need to identify yourself! \n You may be marked for elimination.");
boredom = 64;
}
}

function Ticker () {

if(BaseGun1){
BaseGun1.PissedAtTC0a = PissedAtTC0a;
BaseGun1.PissedAtTC1 = PissedAtTC1;
BaseGun1.PissedAtTC2 = PissedAtTC2;
BaseGun1.PissedAtTC3 = PissedAtTC3;
BaseGun1.PissedAtTC4 = PissedAtTC4;
BaseGun1.PissedAtTC5 = PissedAtTC5;
BaseGun1.PissedAtTC6 = PissedAtTC6;
BaseGun1.PissedAtTC7 = PissedAtTC7;
BaseGun1.PissedAtTC8 = PissedAtTC8;
BaseGun1.PissedAtTC9 = PissedAtTC9;
}

if(BaseGun2){
BaseGun2.PissedAtTC0a = PissedAtTC0a;
BaseGun2.PissedAtTC1 = PissedAtTC1;
BaseGun2.PissedAtTC2 = PissedAtTC2;
BaseGun2.PissedAtTC3 = PissedAtTC3;
BaseGun2.PissedAtTC4 = PissedAtTC4;
BaseGun2.PissedAtTC5 = PissedAtTC5;
BaseGun2.PissedAtTC6 = PissedAtTC6;
BaseGun2.PissedAtTC7 = PissedAtTC7;
BaseGun2.PissedAtTC8 = PissedAtTC8;
BaseGun2.PissedAtTC9 = PissedAtTC9;
}

if(BaseGun3){
BaseGun3.PissedAtTC0a = PissedAtTC0a;
BaseGun3.PissedAtTC1 = PissedAtTC1;
BaseGun3.PissedAtTC2 = PissedAtTC2;
BaseGun3.PissedAtTC3 = PissedAtTC3;
BaseGun3.PissedAtTC4 = PissedAtTC4;
BaseGun3.PissedAtTC5 = PissedAtTC5;
BaseGun3.PissedAtTC6 = PissedAtTC6;
BaseGun3.PissedAtTC7 = PissedAtTC7;
BaseGun3.PissedAtTC8 = PissedAtTC8;
BaseGun3.PissedAtTC9 = PissedAtTC9;
}

if(BaseGun4){
BaseGun4.PissedAtTC0a = PissedAtTC0a;
BaseGun4.PissedAtTC1 = PissedAtTC1;
BaseGun4.PissedAtTC2 = PissedAtTC2;
BaseGun4.PissedAtTC3 = PissedAtTC3;
BaseGun4.PissedAtTC4 = PissedAtTC4;
BaseGun4.PissedAtTC5 = PissedAtTC5;
BaseGun4.PissedAtTC6 = PissedAtTC6;
BaseGun4.PissedAtTC7 = PissedAtTC7;
BaseGun4.PissedAtTC8 = PissedAtTC8;
BaseGun4.PissedAtTC9 = PissedAtTC9;
}

if(BaseGun5){
BaseGun5.PissedAtTC0a = PissedAtTC0a;
BaseGun5.PissedAtTC1 = PissedAtTC1;
BaseGun5.PissedAtTC2 = PissedAtTC2;
BaseGun5.PissedAtTC3 = PissedAtTC3;
BaseGun5.PissedAtTC4 = PissedAtTC4;
BaseGun5.PissedAtTC5 = PissedAtTC5;
BaseGun5.PissedAtTC6 = PissedAtTC6;
BaseGun5.PissedAtTC7 = PissedAtTC7;
BaseGun5.PissedAtTC8 = PissedAtTC8;
BaseGun5.PissedAtTC9 = PissedAtTC9;
}

if(BaseGun6){
BaseGun6.PissedAtTC0a = PissedAtTC0a;
BaseGun6.PissedAtTC1 = PissedAtTC1;
BaseGun6.PissedAtTC2 = PissedAtTC2;
BaseGun6.PissedAtTC3 = PissedAtTC3;
BaseGun6.PissedAtTC4 = PissedAtTC4;
BaseGun6.PissedAtTC5 = PissedAtTC5;
BaseGun6.PissedAtTC6 = PissedAtTC6;
BaseGun6.PissedAtTC7 = PissedAtTC7;
BaseGun6.PissedAtTC8 = PissedAtTC8;
BaseGun6.PissedAtTC9 = PissedAtTC9;
}

if(Ogle > 0)
Ogle -= 1;

if(!TCChanger.TCName.Contains ("2")){

if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 1024){
target = PlayerInformation.instance.PiriTarget;
if(TCChanger.TCName.Contains ("3")){
if(Ogle < 1 && convNum < 4){
Ogle = 120;
convNum = 2;
ReturnSpeech("Driver, what is your identification?");
Reminder2();
}
if(convNum == 63)
WorldInformation.PiriExposed = 32;
}else{
if(Ogle < 1 && convNum < 4){
Ogle = 120;
convNum = 2;
ReturnSpeech("Traveler, you are entering restricted area, \n identify yourself or you will be killed!");
Reminder();
}
if(convNum == 63)
WorldInformation.PiriExposed = 32;
}
}else{
if(convNum == 63){
ReturnSpeech("When you come back, \n you need to identify yourself again.");
convNum = 1;
}
if(convNum == 16)
convNum = 1;
}

}

if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 330){
if(convNum < 32){
BaseGun1.target = target;
BaseGun2.target = target;
BaseGun3.target = target;
BaseGun4.target = target;
BaseGun6.target = target;
}

if(boredom > 32){
BaseGun1.Suspicion = 31;
BaseGun2.Suspicion = 31;
BaseGun3.Suspicion = 31;
BaseGun4.Suspicion = 31;
BaseGun6.Suspicion = 31;
}
}

if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 700){
if(convNum < 32)
BaseGun5.target = target;

if(convNum == 63){
convNum = 64;
WorldInformation.PiriExposed = 32;
}

if(convNum == 64)
WorldInformation.PiriExposed = 32;

}else{
if(convNum == 64){
convNum = 16;
boredom = 5;
ReturnSpeech("When you come back, \n you need to identify yourself again.");
}
}


if(WorldInformation.bigMissile)
if(Vector3.Distance(thisTransform.position, WorldInformation.bigMissile.position) < 1024){
BaseGun6.target = WorldInformation.bigMissile;
}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//

if(NotiScript.PiriNotis)
if(convNum > 1){
if(Vector3.Distance(thisTransform.position, PlayerInformation.instance.Pirizuka.position) < 1024){

target = PlayerInformation.instance.PiriTarget;
Ogle = 30;

NotiScript.PiriNotis = false;
}
}

if(Ogle > 0)
if(WorldInformation.pSpeech){
if(Vector3.Distance(thisTransform.position, WorldInformation.pSpeech.position) < 1024)
ProcessSpeech(WorldInformation.pSpeech.gameObject.GetComponent(TalkBubbleScript).myText, 0, 0);

WorldInformation.pSpeech = null;
}

}

//========================================================================================================================//
//////////////////////////////////////////////////////[INTERACTION]/////////////////////////////////////////////////////////
//========================================================================================================================//


var convNum = 0;
var boredom = 0;

function ProcessSpeech (speech : String, mode : int, code : int){

yield WaitForSeconds (0.1);

if(!speech)
return;

if(convNum == 2){
//===============================================================================
if(speech.Contains ("pirizuka") && speech.Contains ("overseer")){ convNum = 4; Ogle = 20; boredom = 4; yield WaitForSeconds (4);
ReturnSpeech("Please be patient while we process you."); Process(); return;}

if(speech.Contains ("pirizuka")){ convNum = 3; Ogle = 20; yield WaitForSeconds (8);
ReturnSpeech("Are you an overseer?"); return;}

if(speech.Contains ("overseer")){ convNum = 31; Ogle = 20; boredom = 4; yield WaitForSeconds (3);
ReturnSpeech("What is your name?"); return;}
//===============================================================================
}
if(convNum == 3){
//===============================================================================
if(speech.Contains ("ye") || speech.Contains ("yu") || speech.Contains ("sure")){ convNum = 4; Ogle = 20; boredom = 4; yield WaitForSeconds (4);
ReturnSpeech("Remain where you are."); Process(); return;}

if(speech.Contains ("overseer")){ convNum = 4; Ogle = 20; boredom = 4; yield WaitForSeconds (4);
ReturnSpeech("Do not go anywhere."); Process(); return;}
//===============================================================================
}

if(convNum == 16){
//===============================================================================
if(speech.Contains ("pirizuka") || speech.Contains ("overseer")){ convNum = 4; Ogle = 20; boredom = 4; yield WaitForSeconds (4);
ReturnSpeech("Please be patient while we process you."); Process(); return;}
//===============================================================================
}

if(convNum == 31){
//===============================================================================
if(speech.Contains ("pirizuka")){ convNum = 4; Ogle = 20; yield WaitForSeconds (2);
ReturnSpeech("Remain where you are."); Process(); return;}

if(speech.Contains ("overseer")){ convNum = 32; Ogle = 20; boredom = 4; yield WaitForSeconds (4);
ReturnSpeech("You need to state your name \n so we can process you!"); Process(); return;}
//===============================================================================
}

if(convNum == 32){
//===============================================================================
if(speech.Contains ("pirizuka")){ convNum = 4; Ogle = 20; yield WaitForSeconds (2);
ReturnSpeech("Remain where you are."); Process(); return;}
//===============================================================================
}

if(boredom == 4) return;

yield WaitForSeconds (4);
if(boredom == 0){ReturnSpeech("What is your identification?");}
if(boredom == 1){ReturnSpeech("We need an accurate identification!");}
if(boredom == 2){ReturnSpeech("You need to leave. \n If you try to enter, we will eliminate you."); convNum = 5;}
if(convNum == 16){ReturnSpeech("Please state your proper \n identification again.");}
boredom += 1;

}

function ReturnSpeech (yourText : String){
var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;
var TGO = Instantiate(Load, thisTransform.position, Load.transform.rotation);
TGO.name = "CFC3";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = thisTransform;
}