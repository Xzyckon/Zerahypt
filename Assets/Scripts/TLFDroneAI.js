var target : Transform;
var Waypoint : GameObject;
var Home : Transform;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var AIAnchor : Transform;

var Vessel: GameObject;
var Trig : CapsuleCollider;
var Presence : GameObject;
var thisTC : Transform;

var ShotTC1 : GameObject;
var Muzzle1 : Transform;
var Muzzle2 : Transform;

var Wing : GameObject;

var Sounds: AudioSource;

var AlarmSound : GameObject;

var Obscurity : boolean = false;
var Damaged : boolean;

var IsActive : boolean;

var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var PissedAtTC0a = 0;

var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var Attacking: boolean;

var LineOfFire : boolean;

var HomeIsMoving : boolean;

var targetLayers : LayerMask;

var GyroForce = 10.0;
var TurnForce : float = 0;
var Force : float = 0.2;

var ManeuvForce : float = 0;

InvokeRepeating("Regenerator", 0.7, 1);

InvokeRepeating("Shooty", Random.Range(0.1, 1.1), Random.Range(0.49, 0.51));

function Start (){
Force = 0.1;
}

function Update () {

 if (Vessel == null){
  Destroy(Waypoint);
  Destroy(gameObject);
 }

 if (Damaged) {
  Sounds.volume = 0;
  vRigidbody.drag = 0.1;
  vRigidbody.angularDrag = 0.1;
  Destroy(Presence);
  Destroy(Waypoint);
  Destroy(gameObject);
 }

if(Damaged)
return;

if(!IsActive || Vessel == null)
return;

thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;

if(target == null){
Trig.center = Vector3(0,0,20);
Trig.radius = 30;
Trig.height = 100;
}

var hit : RaycastHit;

if(target){

Debug.DrawRay (thisTransform.position, thisTransform.forward * 100f, Color.red);
if (Physics.Raycast (thisTransform.position, thisTransform.forward, hit, 100, targetLayers)){

if(hit.collider.name.Contains (target.name))
LineOfFire = true;
else
LineOfFire = false;

}
}

if(TurnLeft)
  TurnForce = -0.005;

if(TurnRight)
  TurnForce = 0.005;

if(!TurnRight && !TurnLeft){
  TurnForce = 0;
}

if(TurnRight && TurnLeft){
  TurnForce = 0;
}

var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;

newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, newRot * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, newRot, 10, targetLayers)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }

if(vRigidbody.velocity.magnitude > 10){
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * 20f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, 20, targetLayers)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}else{
Debug.DrawRay (thisTransform.position + thisTransform.forward * 1, thisTransform.forward * 10f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, 10, targetLayers)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}
	
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 12) && hit.collider.tag.Contains ("Te")){
		Obscurity = true;
		target = null;
	  } else {
	    Obscurity = false;
}

}


function FixedUpdate () {

 if(Vessel){
 if(!IsActive)
 if(Sounds.volume > 0)
 Sounds.volume -= 0.05;
 
 if(IsActive)
 if(Sounds.volume < 0.5)
 Sounds.volume += 0.05;
 }
 
 if(!IsActive || Vessel == null)
return;

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity); 

var hit : RaycastHit;
 
if(-localV.y > 2){
vRigidbody.AddTorque(thisTransform.up * TurnForce);

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.1);

}else{

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
vRigidbody.AddForce(Vector3.up * 0.07);
}

if (ManeuvForce != 0)
vRigidbody.AddForce(thisTransform.up * ManeuvForce);

if(target){
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.04, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.04, -thisTransform.forward * 0.8);
}

if(Attacking){
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.1);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.1);
    }else{
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.2);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.2);
    }
 
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 5)){
     if(hit.collider.tag.Contains ("Te"))
        vRigidbody.AddForce(thisVTransform.forward * 0.1);
     if(hit.collider.tag.Contains ("Str"))
		vRigidbody.AddForce(thisVTransform.forward * 0.1);
}

if(Obstacle && -localV.y > 1){

if(-localV.y > 10)
  vRigidbody.AddForce(-thisVTransform.up * -0.8);
  else
  vRigidbody.AddForce(-thisVTransform.up * -0.2);
  
}
  
if(!Obstacle) {
  vRigidbody.AddForce(-thisVTransform.up * Force);
}
 
if(Obscurity)
  vRigidbody.AddForce(thisVTransform.forward *  0.1);
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TFC4"))
PissedAtTC4 = 1;
if(other.collider.name.Contains ("TFC5"))
PissedAtTC5 = 1;
if(other.collider.name.Contains ("TFC6"))
PissedAtTC6 = 1;
if(other.collider.name.Contains ("TFC7"))
PissedAtTC7 = 1;
if(other.collider.name.Contains ("TFC8"))
PissedAtTC8 = 1;
if(other.collider.name.Contains ("TFC9"))
PissedAtTC9 = 1;

if(other.collider.name.Contains ("TC1"))
if(!other.collider.name.Contains ("TC1d")){
rigidbody.isKinematic = true;
Home = other.gameObject.transform;
}
}

function OnTriggerStay (other : Collider) {

if(!IsActive)
return;

if(other.collider.name.Contains ("TC0a") && PissedAtTC0a > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}

if(other.collider.name.Contains ("TC4") && PissedAtTC4 > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}
if(other.collider.name.Contains ("TC5") && PissedAtTC5 > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}
if(other.collider.name.Contains ("TC6") && PissedAtTC6 > 0){
  
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}
if(other.collider.name.Contains ("TC7") && PissedAtTC7 > 0){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}

if(other.collider.name.Contains ("TC8") && PissedAtTC8 > 0){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}

if(other.collider.name.Contains ("TC9") && PissedAtTC9 > 0){
 
if(!Attacking)
  Warning();
  
  Attacking = true;
  target = other.gameObject.transform;
}

  Trig.center = Vector3(0,0,20);
  Trig.radius = 30;
  Trig.height = 100;

}

function Unstick () {
ManeuvForce = -0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0.2;
yield WaitForSeconds (0.5);
ManeuvForce = 0;
}

function Warning () {
var TheThing3 = Instantiate(AlarmSound, thisTransform.position + Vector3(0,0,0), Quaternion.identity);
  TheThing3.transform.parent = gameObject.transform;
}

function Shoot () {

if(LineOfFire){
var TheThing1 = Instantiate(ShotTC1, Muzzle1.position, Muzzle1.rotation);
  TheThing1.transform.parent = Muzzle1;
  thisTC.name = "TC0a";
}
  
yield WaitForSeconds (0.25);

  if(LineOfFire){
var TheThing3 = Instantiate(ShotTC1, Muzzle2.position, Muzzle2.rotation);
  TheThing3.transform.parent = Muzzle1;
  thisTC.name = "TC0a";
}
  
LineOfFire = false;

yield WaitForSeconds (10);

thisTC.name = "TC0";

}

function Shooty () {
if(IsActive)
if(Attacking)
Shoot();
}

function Regenerator () {

if(Damaged)
return;

if(Home){
IsActive = true;
vRigidbody.drag = 0.4;
vRigidbody.angularDrag = 15;
Wing.gameObject.SetActive (true);

if(!Attacking)
if(Vector3.Distance(thisTransform.position, Home.position) > 15){
target = Home;
}else{
target = null;
}

if(!Attacking){
if(Vector3.Distance(thisTransform.position, Home.position) > 15)
Force = 0.1;
else
Force = 0;
}else{
Force = 0.1;
}

}

var lastPos : Vector3 = thisTransform.position;
HomeMoving(lastPos);

if(target == null)
Attacking = false;

LineOfFire = false;

}

function HomeMoving(lastPos : Vector3){

yield WaitForSeconds (0.5);

  if(Vector3.Distance(thisTransform.position, lastPos) > 1){
  HomeIsMoving = true;
  }else{
  HomeIsMoving = false;
  }
}