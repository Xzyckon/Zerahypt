#pragma strict

var VacantArea : GameObject;

var Vacant : boolean;

var Occupied : boolean;

var MachineDigester : AgrianDigesterAI;

var MDContainer1 : boolean;
var MDContainer2 : boolean;

function Update () {

if(Vacant){
Vacant = false;
VacantArea.gameObject.SetActive (true);
}
if(Occupied){
Occupied = false;
VacantArea.gameObject.name = "TowerDispatchArea";
VacantArea.gameObject.SetActive (false);
}
}

function OnTriggerEnter (other : Collider) {

if(MachineDigester)
if(other.collider.name.Contains ("Magnet")){
if(MDContainer1)
MachineDigester.Container1 = other.gameObject.transform.parent.gameObject;
if(MDContainer2)
MachineDigester.Container2 = other.gameObject.transform.parent.gameObject;
}
}

function OnTriggerExit (other : Collider) {
if(other.collider.name.Contains ("Magnet")){
Vacant = true;
if(MDContainer1)
MachineDigester.Container1 = null;
if(MDContainer2)
MachineDigester.Container2 = null;
}
}