static var AkbarArmyTarget : Transform;

var Following : Transform;

var Parent : GameObject;

var ArmyDeathEffect : GameObject;

var Sensor : SphereCollider;

var Damaged : boolean;

function FixedUpdate () {
if(Following)
transform.position = Following.transform.position;

if(Sensor.radius < 300)
Sensor.radius += 1;

if(Damaged){
Instantiate(ArmyDeathEffect, transform.position, transform.rotation);
Destroy(Parent);
}
}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains ("TC1") || other.collider.name.Contains ("TC2")
                                        || other.collider.name.Contains ("TC3")
                                        || other.collider.name.Contains ("TC4")
                                        || other.collider.name.Contains ("TC5")
                                        || other.collider.name.Contains ("TC7")
                                        || other.collider.name.Contains ("TC8")
                                        || other.collider.name.Contains ("TC9")){
AkbarArmyTarget = other.gameObject.transform;
Sensor.radius = 1;
}

}