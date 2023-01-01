
var infoText : TextMesh;
var searchText : TextMesh;

var UIFXpost : GameObject;

var UIFXmain : GameObject;
var UIFXselection1 : GameObject;
var UIFXselection2 : GameObject;

var UIIconLoad : GameObject;

var SFX : AudioSource;

var onSFX : AudioClip;
var activeSFX : AudioClip;
var actionSFX : AudioClip;

var isNear : boolean;
var isOn : boolean;

var isUsingSearch : boolean;
var isUsingBrowse : boolean;

var Lines : String[];

var totalLines : int = 24;

var ScrollPos : int;

function Start () {

UIFXpost.SetActive (false);

UIFXmain.SetActive (false);
UIFXselection2.SetActive (false);

UIIconLoad.SetActive (false);

isUsingSearch = true;
isUsingBrowse = false;

searchText.text = null;
infoText.text = null;

}

function Update () {

if(!isOn)
if(Input.GetKeyDown("e"))
if(isNear)
TurnOn();


if(isOn){

if(Input.GetKeyDown(KeyCode.UpArrow)){
isUsingSearch = true;
isUsingBrowse = false;

UIFXselection1.SetActive (true);
UIFXselection2.SetActive (false);

Lines = [];

searchText.text = "No input.";
infoText.text = "No output.";

SFX.PlayOneShot(actionSFX);

}

if(Input.GetKeyDown(KeyCode.DownArrow)){

isUsingSearch = false;
isUsingBrowse = true;

UIFXselection1.SetActive (false);
UIFXselection2.SetActive (true);

InitializeDTXT();
}

if(Input.GetKeyDown(KeyCode.Return))
InitializeTXT();

if(isUsingSearch){

if (Input.GetAxis("Mouse ScrollWheel") < 0f ){
ScrollPos += 4;

if(ScrollPos > Lines.Length -totalLines)
ScrollPos = Lines.Length -totalLines;

if(ScrollPos < 0)
ScrollPos = 0;

UpdateTXT();
}

if (Input.GetAxis("Mouse ScrollWheel") > 0f ){
ScrollPos -= 4;

if(ScrollPos < 0)
ScrollPos = 0;

UpdateTXT();
}
}



if(isUsingBrowse){

if (Input.GetAxis("Mouse ScrollWheel") < 0f ){
ScrollPos += 4;

if(ScrollPos > Lines.Length -totalLines)
ScrollPos = Lines.Length -totalLines;

if(ScrollPos < 0)
ScrollPos = 0;

UpdateTXT();
}

if (Input.GetAxis("Mouse ScrollWheel") > 0f ){
ScrollPos -= 4;

if(ScrollPos < 0)
ScrollPos = 0;

UpdateTXT();
}

}





}

}














function InitializeTXT () {

SFX.PlayOneShot(actionSFX);

var ta : TextAsset;

yield WaitForSeconds (0.1);
if(!WorldInformation.PopUp)
return;

ScrollPos = 0;

ta = null;

tBST = TalkBubbleScript.myText;

yield WaitForSeconds (0.1);

ta = Resources.Load("WikiDatabase/" + tBST, TextAsset) as TextAsset;

searchText.text = tBST;

if(!ta){
Lines = ["This search inquiry did not yield any results."];
}else{
Lines = ta.text.Split("\n"[0]);
}

UpdateTXT();

}

function InitializeDTXT () {

SFX.PlayOneShot(actionSFX);

var da : String;

yield WaitForSeconds (0.1);

ScrollPos = 0;

da = null;

if(WorldInformation.instance.objectsScanned)
da = WorldInformation.DocumentationsStat;
else
da = WorldInformation.DocumentationsStat + "\n \nNothing yet to report.";

searchText.text = "Reports of scanned objects";
infoText.text = da;

Lines = da.Split("\n"[0]);

UpdateTXT();

}


function UpdateTXT () {

//infoText.text = "\n".Lines;

infoText.text = "";

for(var offset = 0; offset < totalLines; offset += 1){

var line = ScrollPos + offset;

if(line >= Lines.Length) break;

infoText.text += Lines[line] + "\n";

}

}













function TurnOn(){

SFX.PlayOneShot(onSFX);

UIFXpost.SetActive (true);

UIIconLoad.SetActive (true);

yield WaitForSeconds (2);

SFX.PlayOneShot(activeSFX);

UIFXpost.SetActive (false);

UIFXmain.SetActive (true);
UIFXselection1.SetActive (true);
UIFXselection2.SetActive (false);

UIIconLoad.SetActive (false);

yield WaitForSeconds (0.1);

searchText.text = "No input.";
infoText.text = "No output.";

isOn = true;
}

function TurnOff(){

UIFXpost.SetActive (false);

UIFXmain.SetActive (false);
UIFXselection1.SetActive (false);
UIFXselection2.SetActive (false);

UIIconLoad.SetActive (false);

searchText.text = null;
infoText.text = null;

Lines = [];

ScrollPos = 0;

isOn = false;
}

function OnTriggerEnter(other : Collider){
if(Vector3.Distance(transform.position, other.transform.position) < 16)
if(other.name.Contains("sTC1p"))
isNear = true;
}
   
function OnTriggerExit(other : Collider){
if(other.name.Contains("sTC1p")){
isNear = false;
TurnOff();
}
}