#pragma strict

private var IsNearDoor : boolean = false;
var WhereToGo : String;
var IsExit1 : boolean;
var IsExit2 : boolean;
var IsExit3 : boolean;

var ActivateFP : boolean;

function OnTriggerEnter(other : Collider) {
    if(other.name.Contains("TC1"))
      IsNearDoor = true;
}
  
function OnTriggerExit(other : Collider) {
    if(other.name.Contains("TC1"))
        IsNearDoor = false;
}

function Update () {
         
	if(Input.GetKeyDown(KeyCode.E) && IsNearDoor)
		SwitchScene();
}

function SwitchScene () {
	ScreenFadeScript.FadeOut = true;
	
	if(IsExit1)
	LoadPiriLocation.Exit1 = true;
	if(IsExit2)
	LoadPiriLocation.Exit2 = true;
	if(IsExit3)
	LoadPiriLocation.Exit3 = true;
	
	yield WaitForSeconds (2);
	
	if(ActivateFP){
	WorldInformation.FPMode = true;
	}else{
	WorldInformation.FPMode = false;
	PlayerCamFollow.HoldCam = true;
	}
	
	Application.LoadLevel(WhereToGo);
}