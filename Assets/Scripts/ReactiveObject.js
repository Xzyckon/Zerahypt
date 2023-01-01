
var Health = 2;

var Missile: boolean;
var Radio: boolean;

var CanDropItem: boolean;

var Item : GameObject;
var Item2 : GameObject;

var ItemSpawnTF : Transform;

var unsetOther: boolean;
var otherScript : ReactiveObject;

var DropChance: boolean;
var RandomDrop: boolean;

var skipForce : boolean;

var Reaction : GameObject;
var MissilePrefab : GameObject;

var Entered : boolean;

var IsOn : boolean;

var lastVelocity : float;
var lastTVelocity : float;
var Gs : float;
var TGs : float;
var Threshold : float;

var C : boolean;

function Start () {
C = true;

Threshold = 300 / Mathf.Pow(rigidbody.mass, 0.33);

yield WaitForSeconds (0.2);

C = false;
}

function Update () {

if(Entered){
if(Input.GetKeyDown("e") && Missile){
var _SpawnedObject = Instantiate(MissilePrefab, transform.position, transform.rotation);
_SpawnedObject.transform.GetComponent(MissileScript).MeshEnableTime = 0;
gameObject.GetComponent("NotifyDoorScript").target.gameObject.SetActive (false);
Destroy(gameObject);
}

if(Input.GetKeyDown("e") && Radio){
if(!IsOn){
audio.Play();
IsOn = true;
}else{
audio.Stop();
IsOn = false;
}
}

}
}

function FixedUpdate () {

if(skipForce)
return;

var acceleration = (rigidbody.velocity.magnitude - lastVelocity) / Time.deltaTime;
    lastVelocity = rigidbody.velocity.magnitude;
    
    Gs = Mathf.Abs(acceleration);
    
var Tacceleration = (rigidbody.angularVelocity.magnitude - lastTVelocity) / Time.deltaTime;
    lastTVelocity = rigidbody.angularVelocity.magnitude;
    
    TGs = Mathf.Abs(Tacceleration);
    
    if(TGs > Threshold && !C){
    C = true;
    Break();
    }

    if(Gs > Threshold && !C){
    C = true;
    Break();
    }
}

function DamageIn (Damage : float, DamageCode : int) {
Health -= Damage;

if(Health < 1){

if(C)
return;

C = true;
Break();
}
}

function Break(){

if(unsetOther)
otherScript.CanDropItem = false;

if(CanDropItem){
if(!ItemSpawnTF){
Instantiate(Item, transform.position, transform.rotation);
}else{
if(!DropChance){
Instantiate(Item, ItemSpawnTF.position, ItemSpawnTF.rotation);
}else{




if(RandomDrop){

var R1: int = Random.Range(0, 3);
switch (R1) {
case 1: Instantiate(Item, ItemSpawnTF.position, ItemSpawnTF.rotation); break;
case 2: Instantiate(Item2, ItemSpawnTF.position, ItemSpawnTF.rotation); break;
}



}else{



var R2: int = Random.Range(0, 2);
switch (R2) {
case 1: Instantiate(Item, ItemSpawnTF.position, ItemSpawnTF.rotation); break;
}

}








}
}

}
    
Entered = false;
    
Instantiate(Reaction, transform.position, transform.rotation);
Destroy(gameObject);
}

public function OnTriggerEnter (other : Collider) {
	if (other.name == "Pirizuka") {
	Entered = true;
	}
}

public function OnTriggerExit (other : Collider) {
	if (other.name == "Pirizuka") {
	Entered = false;
	}
}