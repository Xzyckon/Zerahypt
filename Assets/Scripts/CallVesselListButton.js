#pragma strict

private var entered : boolean;

var Assistance : boolean;

var VesselList : GameObject;

var VLScroller : VesselList_Scroller;

var AssistanceList : GameObject;

function Update () {
	if(entered && Input.GetMouseButtonDown(0)){
	
	    if(!Assistance){
		VesselList.transform.Translate(Vector3.right * 3);
		VLScroller.isActive = true;
		}else{
		AssistanceList.transform.Translate(Vector3.right * 5);
		}
		
		entered = false;
		}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}