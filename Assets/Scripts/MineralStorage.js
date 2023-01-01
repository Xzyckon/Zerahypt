#pragma strict

var isInside : boolean;


function Update (){

if(Input.GetKeyDown("r")){

}
}

function OnTriggerEnter (other : Collider) {
if(other.collider.gameObject.name.Contains("ProspectorPresence")) {

isInside = true;

}
}

function OnTriggerExit (other : Collider) {
if(other.collider.gameObject.name.Contains("ProspectorPresence")) {

isInside = false;

}
}