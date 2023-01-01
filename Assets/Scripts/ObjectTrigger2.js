
var Triggered : boolean;

InvokeRepeating("Reader", 1, 0.5);

function OnTriggerStay (other : Collider) {
Triggered = true;
}

function Reader () {
Triggered = false;
}