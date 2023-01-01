var AkbarAI : AkbarmanController;

var Akbar : GameObject;

var MtargetLayers : LayerMask;

var Sensor : SphereCollider;

InvokeRepeating("Notice", 1, 1);

function Update () {

if(Akbar != null)
transform.position = Akbar.transform.position;
else
Destroy(gameObject);
}

function Notice () {
Sensor.radius = 100;
}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (transform.position, OT.position, MtargetLayers))
return;

if(ON.Contains ("TC0") || ON.Contains ("TC1")
                                        || ON.Contains ("TC2")
                                        || ON.Contains ("TC3")
                                        || ON.Contains ("TC4")
                                        || ON.Contains ("TC5")
                                        || ON.Contains ("TC7")
                                        || ON.Contains ("TC8")
                                        || ON.Contains ("TC9")){
if(Akbar != null)
AkbarAI.Target = OT;
Sensor.radius = 0.1;
}

}