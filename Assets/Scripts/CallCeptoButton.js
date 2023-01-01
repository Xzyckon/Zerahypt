#pragma strict

private var entered : boolean;

var IsDismiss : boolean;

function Update () {
	if(entered && Input.GetMouseButtonDown(0)){
	    
	    if(!IsDismiss)
		CallAssistance.CallingCepto = true;
		else
		CallAssistance.DismissCepto = true;
	
		entered = false;
		}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}