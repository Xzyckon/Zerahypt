#pragma strict

private var entered : boolean;

var CallCeptopod : boolean;

var CallPiriDrone : boolean;

var CallPolice : boolean;

var CallAmmo : boolean;

var CallKatovari : boolean;

var CallCargo : boolean;

var CallCargoAgrian : boolean;

var IsDismiss : boolean;

function Update () {
	if(entered && Input.GetMouseButtonDown(0)){
	    if(CallPolice){
	    if(!IsDismiss){
		CallAssistance.CallingAssistance = true;
		IsDismiss = true;
		}else{
		CallAssistance.DismissAssistance = true;
		IsDismiss = false;
		}
		}
		if(CallAmmo){
	    if(!IsDismiss){
		CallAssistance.CallingAmmo = true;
		IsDismiss = true;
		}else{
		CallAssistance.DismissAmmo = true;
		IsDismiss = false;
		}
		}
		if(CallCargo){
		CallAssistance.CallingCargo = true;
		}
		if(CallKatovari){
		CallAssistance.CallingKatovari = true;
		}
		if(CallCargoAgrian){
		CallAssistance.CallingCargoAgrian = true;
		}
		if(CallCeptopod){
	    if(!IsDismiss){
		CallAssistance.CallingCepto = true;
		IsDismiss = true;
		}else{
		CallAssistance.DismissCepto = true;
		IsDismiss = false;
		}
		}
		if(CallPiriDrone){
	    if(!IsDismiss){
		CallAssistance.CallingPiriDrone = true;
		IsDismiss = true;
		}else{
		CallAssistance.DismissPiriDrone = true;
		IsDismiss = false;
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