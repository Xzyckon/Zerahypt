#pragma strict

var CallZerzek : boolean;

private var entered : boolean;

function Update () {
	if(entered && Input.GetMouseButtonDown(0)){
	    if(CallZerzek){
	    if(!WorldInformation.PiriZerzekPresent){
		WorldInformation.instance.Home();
		CallButton.CallingOther = true;
		entered = false;
		}else{
		FurtherActionScript.instance.ZerzekAlreadyPresent = true;
        FurtherActionScript.instance.ShowText();
		CallButton.CallingOther0 = true;
		entered = false;
		}
		}else{
		if(AgrianNetwork.TC1CriminalLevel > 240 || WorldInformation.PiriWanted > 240){
        FurtherActionScript.instance.Wanted = true;
        FurtherActionScript.instance.ShowText();
        CallButton.CallingOther0 = true;
		entered = false;
        }else{
		LoadPiriLocation.CallingAmbulance = true;
		CallButton.CallingOther = true;
		entered = false;
		}
		}
		}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}