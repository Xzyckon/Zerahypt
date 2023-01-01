var effect: GameObject;
var CanBreakVessel: boolean;
var ParentDamage : VehicleDamage;
var Persist: boolean;

function OnJointBreak(breakForce : float) {
transform.parent = null;

if(CanBreakVessel){
ParentDamage.DamageIn(2048, 0, 0, false);
}

Instantiate(effect, transform.position, transform.rotation);
if(!Persist)
Destroy(gameObject);
}