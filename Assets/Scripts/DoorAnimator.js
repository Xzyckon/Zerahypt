#pragma strict

var Door : Transform;

var MainBody : Transform;

var LeftDoor : boolean;

var DoorOpen : boolean;

var Entered : boolean;

function Update () {

if(Input.GetKeyDown(KeyCode.E) && Entered){

if(DoorOpen)
DoorOpen = false;
else
DoorOpen = true;

}
}

function FixedUpdate () {
if(LeftDoor){
if(!DoorOpen){
if(Door.transform.localPosition.y > -0.001)
if(Door.transform.localPosition.x < 0)
Door.transform.localPosition.x += 0.005;

if(Door.transform.localPosition.y < -0.001)
Door.transform.localPosition.y += 0.01;

}else{

if(Door.transform.localPosition.x > -0.3)
Door.transform.localPosition.x -= 0.005;

if(Door.transform.localPosition.x < -0.3)
if(Door.transform.localPosition.y > -1.8)
Door.transform.localPosition.y -= 0.01;
}
}else{
if(!DoorOpen){
if(Door.transform.localPosition.y > -0.001)
if(Door.transform.localPosition.x > 0)
Door.transform.localPosition.x -= 0.005;

if(Door.transform.localPosition.y < -0.001)
Door.transform.localPosition.y += 0.01;

}else{

if(Door.transform.localPosition.x < 0.3)
Door.transform.localPosition.x += 0.005;

if(Door.transform.localPosition.x > 0.3)
if(Door.transform.localPosition.y > -1.8)
Door.transform.localPosition.y -= 0.01;
}
}

}

function OnTriggerEnter(other : Collider){

if(other.name.Contains("csTC1") || other.name.Contains("sTC1"))
if(!other.name.Contains("TC1d"))
Entered = true;

}
   
function OnTriggerExit(other : Collider){

if(other.name.Contains("csTC1") || other.name.Contains("sTC1"))
if(!other.name.Contains("TC1d"))
Entered = false;
    
}