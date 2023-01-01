var thisTF : Transform;
var conTF : Transform;

var lidTF : Transform;
var lidOpening : boolean;
var lidClosing : boolean;
var lNum : int;
var lCurve : AnimationCurve = new AnimationCurve();

var thisRB : Rigidbody;

var thisCol : MeshCollider;

var holdingR : boolean;

var holdingE : boolean;

var eTimer : int;

function Start () {

yield WaitForSeconds (0.1);

WorldInformation.backpackIsPresent = true;

replaceName();

}

function replaceName () {

var newName : String;

yield WaitForSeconds (0.2);

newName = thisTF.name.Replace("(Clone)", "");

thisTF.name = newName;

}

function Update () {

if(holdingR){
eTimer += 1;

if(eTimer > 40){

GetUnworn();

holdingR = false;
eTimer = 0;
}

}

if(holdingE){
eTimer += 1;

if(eTimer > 40){

if(conTF.localPosition.z < 2){
conTF.localPosition.z = 4;
lidClosing = true;
lTimer = 0;
}else{
conTF.localPosition.z = 0;
lidOpening = true;
lTimer = 0;
}

holdingE = false;
eTimer = 0;
}

}

if(Input.GetKeyDown("r")){
holdingR = true;
}

if(Input.GetKeyUp("r")){
holdingR = false;
eTimer = 0;
}

if(Input.GetKeyDown("e")){
if(WorldInformation.isWearingBackpack)
holdingE = true;
}

if(Input.GetKeyUp("e")){
holdingE = false;
eTimer = 0;
}

lidTF.localEulerAngles.x = lCurve.Evaluate(lNum);
lidTF.localEulerAngles.y = 0;
lidTF.localEulerAngles.z = 0;

if(lidOpening)
if(lNum < 16){
lNum += 1;
}else{
lNum = 16;
lidOpening = false;
}

if(lidClosing)
if(lNum > 0){
lNum -= 1;
}else{
lNum = 0;
lidClosing = false;
}


}

function GetWorn () {

thisTF.name.Replace("(Clone)", "");

//Debug.Log(thisTF.name + "Did Get Worn");

thisRB.isKinematic = true;
thisCol.enabled = false;

thisTF.position = PlayerInformation.instance.BackpackPoint.position;
thisTF.rotation = PlayerInformation.instance.BackpackPoint.rotation;

thisTF.parent = PlayerInformation.instance.BackpackPoint;

FurtherActionScript.instance.Backpack = true;
FurtherActionScript.instance.ShowText();

WorldInformation.isWearingBackpack = true;
WorldInformation.whatBackpack = thisTF.name;

}

function GetUnworn () {

thisRB.isKinematic = false;
thisCol.enabled = true;

thisTF.parent = null;

WorldInformation.isWearingBackpack = false;
WorldInformation.whatBackpack = "null";

}