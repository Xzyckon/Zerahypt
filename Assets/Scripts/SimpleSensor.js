
var MainScript : PiriDefenseDroneAI;

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("MT"))
MainScript.EnteredMissile = other.gameObject.transform;

}

function OnTriggerExit (other : Collider) {

if(other.collider.name.Contains ("MT"))
MainScript.EnteredMissile = null;

}