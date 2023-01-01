var target : Transform;
var Waypoint : GameObject;
var Home : Transform;

var AIAnchor : Transform;

var MainHealth : VehicleDamage;

var Vessel: GameObject;
var Gun : NPCGun;
var Trig : CapsuleCollider;
var Presence : GameObject;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Wing : GameObject;

var Sounds: AudioSource;

var Dodging : boolean;
var Maneuver = 0;
var Attacking : boolean;
var Shots = 0;
var Obscurity : boolean = false;
var Stuck = 0;
var Damaged : boolean;

var Jammed : boolean;

var IsActive : boolean;

var Aberrant : boolean;
var AgrianVigil : boolean;

var Obstacle : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var PissedAtTC0a = 0;

var PissedAtTC1 = 0;
var PissedAtTC3 = 0;
var PissedAtTC4 = 0;
var PissedAtTC5 = 0;
var PissedAtTC6 = 0;
var PissedAtTC7 = 0;
var PissedAtTC8 = 0;
var PissedAtTC9 = 0;

var DangerSense = 0;
var DangerDirection : Vector3;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var GyroForce = 10.0;
var TurnForce : float = 0;

var Faultyness = 0;

var GyroOff : boolean;

InvokeRepeating("Regenerator", 0.5, 1);

InvokeRepeating("ManeuvTick", 0.5, 0.2);

InvokeRepeating("Shooty", Random.Range(0.1, 1.1), Random.Range(0.4, 0.5));

function Start (){

if(Aberrant){
Trig.center = Vector3(0,0,25);
Trig.radius = 10;
Trig.height = 50;
}else{
Trig.center = Vector3(0,0,50);
Trig.radius = 100;
Trig.height = 200;

KabrianLaw.KabrianPolicePresent = true;
}

if(AgrianVigil){
IsActive = true;
vRigidbody.drag = 2;
vRigidbody.angularDrag = 20;
Wing.gameObject.SetActive (true);
}
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

if(!IsActive)
return;

if(AIAnchor && thisVTransform && vRigidbody){
thisTransform.rotation = AIAnchor.transform.rotation;
thisTransform.position = AIAnchor.transform.position;
}else{
Destroy(Waypoint);
Destroy(gameObject);
return;
}

if(target == null && Attacking){
StopAllCoroutines();
if(Aberrant){
Trig.center = Vector3(0,0,25);
Trig.radius = 10;
Trig.height = 50;
}else{
Trig.center = Vector3(0,0,50);
Trig.radius = 100;
Trig.height = 200;
}
Attacking = false;
Dodging = false;
}

var hit : RaycastHit;

if(!AgrianVigil)
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up, hit, 100, targetLayers)){
 
 if(target)
 if(hit.collider.name.Contains (target.name)){
                                        
     Gun.LineOfFire = true;
 }else{
     Gun.LineOfFire = false;
 }
}

if(TurnLeft && !Attacking){
if(!AgrianVigil)
  TurnForce = -0.05;
  else
  TurnForce = -0.005;
}

if(TurnRight && !Attacking){
if(!AgrianVigil)
  TurnForce = 0.05;
  else
  TurnForce = 0.005;
}

if(!TurnRight && !TurnLeft){
  TurnForce = 0;
}

if(TurnRight && TurnLeft){
  TurnForce = 0;
}
	
var newRot : Vector3 = (thisTransform.forward * 0.6f ).normalized;
if(!AgrianVigil){
newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 15)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 15)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
}else{
newRot = (thisTransform.forward * 0.6f + thisTransform.right * 0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 5f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 5)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (thisTransform.forward * 0.6f + thisTransform.right * -0.4f).normalized;

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, newRot * 5f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, newRot, 5)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
}
Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, thisTransform.forward * 20f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, thisTransform.forward, 20)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
	
if(target)
if(Vector3.Distance(thisTransform.position, target.position) < 10 && Attacking){
Obstacle = true;
}
	
if(!Attacking){
Obscurity = false;
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, thisTransform.forward, hit, 20) && hit.collider.tag.Contains ("Te")){
Obscurity = true;
}
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
 
if(!AIAnchor || !thisVTransform || !vRigidbody){
Destroy(Waypoint);
Destroy(gameObject);
return;
}
 
 if(!IsActive)
return;
 
 var hit : RaycastHit;
 
if(!Jammed){
 
vRigidbody.AddTorque(thisTransform.up * TurnForce);

if (Physics.Raycast (thisTransform.position, Vector3.down, 2, targetLayers))
if(!AgrianVigil){
if(!Aberrant)
vRigidbody.AddForce(Vector3.up * 0.4);
else
vRigidbody.AddForce(Vector3.up * 0.2);
}else{
vRigidbody.AddForce(Vector3.up * 0.05);
}

if(target){
if(Maneuver < 1){
if(DangerSense < 1){
if(!AgrianVigil){
if(!Aberrant){
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.1, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.1, -thisTransform.forward * 0.8);
}else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.05, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.05, -thisTransform.forward * 0.8);
}
}else{
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * 0.01, thisTransform.forward * 0.8);
    vRigidbody.AddForceAtPosition((target.transform.position - thisVTransform.position).normalized * -0.01, -thisTransform.forward * 0.8);
}
}else{
if(!AgrianVigil){
if(!Aberrant){
vRigidbody.AddForceAtPosition(DangerDirection * 0.1, thisTransform.forward * 0.8);
vRigidbody.AddForceAtPosition(DangerDirection * -0.1, -thisTransform.forward * 0.8);
}else{
vRigidbody.AddForceAtPosition(DangerDirection * 0.05, thisTransform.forward * 0.8);
vRigidbody.AddForceAtPosition(DangerDirection * -0.05, -thisTransform.forward * 0.8);
}
}else{
vRigidbody.AddForceAtPosition(DangerDirection * 0.005, thisTransform.forward * 0.8);
vRigidbody.AddForceAtPosition(DangerDirection * -0.005, -thisTransform.forward * 0.8);
}
}
}
}

if(!AgrianVigil){
    if(!Aberrant){
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.4);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.4);
    }else{
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.3);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.3);
    }
    }else{
    vRigidbody.AddForceAtPosition(Vector3.up*GyroForce, thisTransform.up * 0.1);
    vRigidbody.AddForceAtPosition(-Vector3.up*GyroForce, -thisTransform.up * 0.1);
    }
 
if(Attacking){
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 1, thisTransform.forward, hit, 5)){
     if(hit.collider.tag.Contains ("Te"))
     if(!AgrianVigil){
        if(!Aberrant){
        vRigidbody.AddForce(thisVTransform.forward * 0.4);
        }else{
        vRigidbody.AddForce(thisVTransform.forward * 0.2);
        }
        }else{
        vRigidbody.AddForce(thisVTransform.forward * 0.05);
        }
        
     if(hit.collider.tag.Contains ("Structure"))
     if(!AgrianVigil){
        if(!Aberrant){
		vRigidbody.AddForce(thisVTransform.forward * 0.4);
		}else{
		vRigidbody.AddForce(thisVTransform.forward * 0.2);
		}
		}else{
		vRigidbody.AddForce(thisVTransform.forward * 0.05);
		}
}
}

if(Obstacle){

if(vRigidbody.velocity.magnitude > 10)
if(!AgrianVigil){
if(!Aberrant){
  vRigidbody.AddForce(-thisVTransform.up * -0.2);
  }else{
  vRigidbody.AddForce(-thisVTransform.up * -0.1);
  }
  }else{
  vRigidbody.AddForce(-thisVTransform.up * -0.1);
  }
  
if(vRigidbody.velocity.magnitude < 10)
if(!AgrianVigil)
  vRigidbody.AddForce(-thisVTransform.up * -0.1);
  else
  vRigidbody.AddForce(-thisVTransform.up * -0.05);
  
}

if(Dodging && !Obscurity){
if(!AgrianVigil){
if(!Aberrant){
  vRigidbody.AddForce(thisVTransform.forward *  0.4);
  }else{
  vRigidbody.AddForce(thisVTransform.forward *  0.2);
  }
  }else{
  vRigidbody.AddForce(thisVTransform.forward *  0.05);
  }
}

if(Stuck > 0){
if(!AgrianVigil){
if(!Aberrant){
  vRigidbody.AddForce(-thisVTransform.up * -0.4);
  }else{
  vRigidbody.AddForce(-thisVTransform.up * -0.2);
  }
  }else{
  vRigidbody.AddForce(-thisVTransform.up * -0.1);
  }
}
}
  
if(!Obstacle && Stuck < 1) {
if(!AgrianVigil){
if(!Aberrant){
  vRigidbody.AddForce(-thisVTransform.up * 0.4);
  }else{
  vRigidbody.AddForce(-thisVTransform.up * 0.2);
  }
  }else{
  vRigidbody.AddForce(-thisVTransform.up * 0.075);
  }
}
 
if(Obscurity)
if(!AgrianVigil){
if(!Aberrant){
  vRigidbody.AddForce(thisVTransform.forward *  0.4);
  }else{
  vRigidbody.AddForce(thisVTransform.forward *  0.2);
  }
  }else{
  vRigidbody.AddForce(thisVTransform.forward *  0.05);
  }
}

function OnTriggerEnter (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!IsActive)
return;

if(!Aberrant){
if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC2")){

if(!Attacking){
DangerSense = 3;
target = Waypoint.transform;
if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;
}

Dodge();
}
}else{
if(ON.Contains ("TFC"))
if(!ON.Contains ("TFC4")){

if(!Attacking){
DangerSense = 3;
target = Waypoint.transform;
if(other.rigidbody)
DangerDirection = -other.rigidbody.velocity.normalized;
}

Dodge();
}
}

if(ON.Contains ("TFC0a"))
PissedAtTC0a = 10;

if(ON.Contains ("TFC1"))
PissedAtTC1 = 10;

if(ON.Contains ("TFC3"))
PissedAtTC3 = 10;

if(ON.Contains ("TFC4"))
PissedAtTC4 = 10;

if(ON.Contains ("TFC5"))
PissedAtTC5 = 10;

if(ON.Contains ("TFC6"))
PissedAtTC6 = 10;

if(ON.Contains ("TFC7"))
PissedAtTC7 = 10;

if(ON.Contains ("TFC8"))
PissedAtTC8 = 10;

if(ON.Contains ("TFC9"))
PissedAtTC9 = 10;

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(!AgrianVigil){

if(!Aberrant){
if(ON.Contains ("HC2")){
rigidbody.isKinematic = true;
Home = OT;
}
}else{
if(Home == null)
if(ON.Contains ("TC") && !ON.Contains ("sTC4")){
rigidbody.isKinematic = true;
Home = OT;
}
}
}else{
if(AgrianNetwork.TC1CriminalLevel > 240 && ON.Contains ("TC1"))
target = OT;

if(AgrianNetwork.instance.Curiosity > 200)
if(AgrianNetwork.TC1CriminalLevel > 500 && ON.Contains ("2_P"))
target = OT;

if(AgrianNetwork.TC3CriminalLevel > 240 && ON.Contains ("TC3"))
target = OT;

if(AgrianNetwork.TC4CriminalLevel > 240 && ON.Contains ("TC4"))
target = OT;

if(AgrianNetwork.TC5CriminalLevel > 240 && ON.Contains ("TC5"))
target = OT;

if(AgrianNetwork.TC6CriminalLevel > 240 && ON.Contains ("TC6") &&
   !ON.Contains ("csT"))
target = OT;

if(AgrianNetwork.TC7CriminalLevel > 240 && ON.Contains ("TC7"))
target = OT;

if(AgrianNetwork.TC8CriminalLevel > 240 && ON.Contains ("TC8"))
target = OT;

if(AgrianNetwork.TC9CriminalLevel > 240 && ON.Contains ("TC9"))
target = OT;
}

if(!IsActive)
return;

if(Aberrant && Attacking)
return;

if(ON.Contains ("TC0a") && PissedAtTC0a > 0){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC1") && PissedAtTC1 > 0){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC3") && PissedAtTC3 > 0){
  Attacking = true;
  target = OT;
}
if(!Aberrant){
if(ON.Contains ("TC4")){
  Attacking = true;
  target = OT;
}
}else{
if(ON.Contains ("TC2")){
  Attacking = true;
  target = OT;
}
}
if(ON.Contains ("TC5") && PissedAtTC5 > 0){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC6") && PissedAtTC6 > 0)
if(!ON.Contains ("csT")){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC7") && PissedAtTC7 > 0){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC8") && PissedAtTC8 > 0){
  Attacking = true;
  target = OT;
}
if(ON.Contains ("TC9") && PissedAtTC9 > 0){
  Attacking = true;
  target = OT;
}
}

function Shoot () {
if(Attacking && !AgrianVigil){
if(Gun.LineOfFire){
Maneuver = 5;
if(Aberrant){
Shots += 1;
if(Shots > 16)
MainHealth.DamageIn(32, 0, 0, false);
}else{
if(PissedAtTC0a > 0)
PissedAtTC0a -= 1;
if(PissedAtTC1 > 0)
PissedAtTC1 -= 1;
if(PissedAtTC3 > 0)
PissedAtTC3 -= 1;
if(PissedAtTC5 > 0)
PissedAtTC5 -= 1;
if(PissedAtTC6 > 0)
PissedAtTC6 -= 1;
if(PissedAtTC7 > 0)
PissedAtTC7 -= 1;
if(PissedAtTC8 > 0)
PissedAtTC8 -= 1;
if(PissedAtTC9 > 0)
PissedAtTC9 -= 1;
}
}

Gun.Fire();
}
}

function Shooty () {
if(IsActive)
Shoot();
}

function Dodge () {
Dodging = true;
yield WaitForSeconds (0.5);
Dodging = false;
}

function ManeuvTick () {
var randomValue : int = Random.Range(1, 4);

         if(Maneuver > 0)
    		Maneuver -= 1;

            switch (randomValue) {
    		case 1:
    	 if(Maneuver > 1)
    		Maneuver -= 2;
    		break;
    		case 2:
    	 if(Maneuver > 3)
    		Maneuver -= 4;
    		break;
    		}
}

function Regenerator () {

if(Damaged)
return;

if(!AgrianVigil){
if(!Aberrant){
if(Home != null){
IsActive = true;
vRigidbody.drag = 2;
vRigidbody.angularDrag = 20;
Wing.gameObject.SetActive (true);
}else{
IsActive = false;
vRigidbody.drag = 0.1;
vRigidbody.angularDrag = 0.1;
Wing.gameObject.SetActive (false);
}
}else{

if(Presence.name.Contains ("j"))
Jammed = true;

IsActive = true;
vRigidbody.drag = 2;
vRigidbody.angularDrag = 20;
Wing.gameObject.SetActive (true);

if(Jammed){
Faultyness += 1;

if(Faultyness > 3)
MainHealth.DamageIn(32, 0, 0, false);
}

}
}

if(!IsActive)
return;

if(Home){
if(!Attacking && DangerSense < 1){
if(Vector3.Distance(thisTransform.position, Home.position) > 50)
target = Home;
else
target = null;
}
}

if(Attacking){
Trig.center = Vector3(0,0,0);
Trig.radius = 10;
Trig.height = 10;
GyroForce = 0.01;
}else{
if(Aberrant){
Trig.center = Vector3(0,0,25);
Trig.radius = 10;
Trig.height = 50;
GyroForce = 0.02;
}else{
Trig.center = Vector3(0,0,50);
Trig.radius = 100;
Trig.height = 200;
GyroForce = 0.02;
}
}

if(DangerSense > 0)
DangerSense -= 1;

if(target){

if(target.name.Contains ("TC0a"))
if(PissedAtTC0a < 1)
Attacking = false;

if(target.name.Contains ("TC1"))
if(PissedAtTC1 < 1)
Attacking = false;

if(target.name.Contains ("TC3"))
if(PissedAtTC3 < 1)
Attacking = false;

if(target.name.Contains ("TC5"))
if(PissedAtTC5 < 1)
Attacking = false;

if(target.name.Contains ("TC6"))
if(PissedAtTC6 < 1)
Attacking = false;

if(target.name.Contains ("TC7"))
if(PissedAtTC7 < 1)
Attacking = false;

if(target.name.Contains ("TC8"))
if(PissedAtTC8 < 1)
Attacking = false;

if(target.name.Contains ("TC9"))
if(PissedAtTC9 < 1)
Attacking = false;

if(AgrianVigil){

if(DangerSense > 0 && AgrianNetwork.Alert == false)
AgrianNetwork.instance.PriorityWaypoint.transform.position = thisTransform.position;

if(AgrianNetwork.TC1CriminalLevel < 500){
if(AgrianNetwork.TC1CriminalLevel > 120 && target.name.Contains ("TC1")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC1CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC1")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC1CriminalLevel = 620;
}else{
if(target.name.Contains ("2_P"))
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}
}

if(AgrianNetwork.TC3CriminalLevel < 500){
if(AgrianNetwork.TC3CriminalLevel > 120 && target.name.Contains ("TC3")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC3CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC3")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC3CriminalLevel = 620;
}
}

if(AgrianNetwork.TC4CriminalLevel < 500){
if(AgrianNetwork.TC4CriminalLevel > 120 && target.name.Contains ("TC4")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC4CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC4")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC4CriminalLevel = 620;
}
}

if(AgrianNetwork.TC5CriminalLevel < 500){
if(AgrianNetwork.TC5CriminalLevel > 120 && target.name.Contains ("TC5")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC5CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC5")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC5CriminalLevel = 620;
}
}

if(AgrianNetwork.TC6CriminalLevel < 500){
if(AgrianNetwork.TC6CriminalLevel > 120 && target.name.Contains ("TC6")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC6CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC6")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC6CriminalLevel = 620;
}
}

if(AgrianNetwork.TC7CriminalLevel < 500){
if(AgrianNetwork.TC7CriminalLevel > 120 && target.name.Contains ("TC7")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC7CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC7")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC7CriminalLevel = 620;
}
}

if(AgrianNetwork.TC8CriminalLevel < 500){
if(AgrianNetwork.TC8CriminalLevel > 120 && target.name.Contains ("TC8")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC8CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC8")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC8CriminalLevel = 620;
}
}

if(AgrianNetwork.TC9CriminalLevel < 500){
if(AgrianNetwork.TC9CriminalLevel > 120 && target.name.Contains ("TC9")){
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
AgrianNetwork.instance.TC9CriminalLevel = 360;
}
}else{
if(target.name.Contains ("TC9")){
if(AgrianNetwork.instance.RedAlertTime > 0){
AgrianNetwork.instance.FullPriorityWaypoint.position = target.position;
}else{
AgrianNetwork.instance.PriorityWaypoint.position = target.position;
}
if(AgrianNetwork.instance.AlertTime < 300)
AgrianNetwork.instance.AlertTime = 300;
AgrianNetwork.instance.TC9CriminalLevel = 620;
}
}

}

if(Vector3.Distance(thisTransform.position, target.position) > 500)
target = null;


}

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){

yield WaitForSeconds (0.5);

  if(Vector3.Distance(thisTransform.position, lastPos) < 0.5){
  Stuck += 1;
  }else{
  if(Stuck > 0)
  Stuck -= 1;
  }
  
if(Stuck > 16)
if(MainHealth)
MainHealth.DamageIn(32, 0, 0, false);
}