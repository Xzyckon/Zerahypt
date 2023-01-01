
var target : Transform;
var Forward : Transform;
var StartTerror : GameObject;
var MusicSound : GameObject;
var Trig : SphereCollider;

var thisTransform : Transform;
var thisVTransform : Transform;

var vRigidbody : Rigidbody;

var Turret : TurretAI;

var IsBus : boolean;
var IsBejsirf : boolean;

var Terrorist1 : GameObject;
var Terrorist2 : GameObject;

var TerroristSpawn1 : Transform;
var TerroristSpawn2 : Transform;
var TerroristSpawn3 : Transform;

var TerroristDoor : GameObject;
var TerroristAudio : AudioSource;

var PissedAtTC1 : boolean;
var PissedAtTC2 : boolean;
var PissedAtTC4 : boolean;
var PissedAtTC5 : boolean;
var PissedAtTC7 : boolean;
var PissedAtTC8 : boolean;
var PissedAtTC9 : boolean;

var Ally : Transform;

var CloseToBase : boolean;

var Bored : boolean;

var IsExploding : boolean;
var Following : boolean;
var Attacking : boolean;
var Obstacle : boolean = false;
var CloseObstacle : boolean = false;
var Stuck : boolean = false;
var IsCloseEnough : boolean;
var IsTerrorizing : boolean;
var TurnRight : boolean;
var TurnLeft : boolean;

var targetLayers : LayerMask;

var MtargetLayers : LayerMask;

var Suspicion = 0;
var JustNoticed = 0;

var Force : float = 0;
var TurnForce : float = 0;

InvokeRepeating("LeaveMarker", 10, 10);

InvokeRepeating("Counter", 0.5, 0.5);

function Update () {

if(IsExploding || IsTerrorizing)
return;

if(target != null)
if(target.name.Contains ("TC6"))
target.name = "TC1";

if(target == null){
StopAllCoroutines();
Attacking = false;
target = Forward;
}

if(target == Forward){
StopAllCoroutines();
Attacking = false;
}

var localV = thisVTransform.InverseTransformDirection(vRigidbody.velocity);

var newRot : Vector3 = (thisTransform.forward * 0.6f + thisTransform.up * 0.1f).normalized;
var hit : RaycastHit;

//-------------------------------------------------------------------------------------------------------------

if(localV.y > 0.1)
Obstacle = false;

if(!IsBejsirf){

if(-localV.y > 20){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, thisTransform.forward * 40f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, thisTransform.forward, 40)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}

newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 40f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 40)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 40f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 40)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
} else if(-localV.y < 20){

if(-localV.y > 10){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, thisTransform.forward * 30f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, thisTransform.forward, 30)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}

newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 30f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 30)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 30f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 30)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
 
} else if(-localV.y < 10){

Debug.DrawRay (thisTransform.position + thisTransform.forward * 2, thisTransform.forward * 15f, Color.green);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 2, thisTransform.forward, 15)) {
		Obstacle = true;
	} else {
	    Obstacle = false;
	}

     newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 15)) {
     TurnLeft = true;
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisTransform.position + thisTransform.forward * 3, newRot * 15f, Color.black);
if (Physics.Raycast (thisTransform.position + thisTransform.forward * 3, newRot, 15)) {
		TurnRight = true;
	} else {
        TurnRight = false;
 }
}
}

}else{

if(-localV.y > 20){

if(-localV.y < 40){
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up * 40f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up, 40)) {
		Obstacle = true;
		Turret.target = null;
	} else {
	    Obstacle = false;
	}
	}else{
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up * 80f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up, 80)) {
		Obstacle = true;
		Turret.target = null;
	} else {
	    Obstacle = false;
	}
}

newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 40f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 40)) {
     if(JustNoticed < 1){
     TurnLeft = true;
     Turret.target = null;
     }
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 40f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 40)) {
		if(JustNoticed < 1){
		TurnRight = true;
		Turret.target = null;
		}
	} else {
        TurnRight = false;
 }
 
} else if(-localV.y < 20){

if(-localV.y > 10){

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up * 30f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up, 30)) {
		Obstacle = true;
		Turret.target = null;
	} else {
	    Obstacle = false;
	}

newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 30f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 30)) {
     if(JustNoticed < 1){
     TurnLeft = true;
     Turret.target = null;
     }
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 30f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 30)) {
		if(JustNoticed < 1){
		TurnRight = true;
		Turret.target = null;
		}
	} else {
        TurnRight = false;
 }
 
} else if(-localV.y < 10){

Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up * 15f, Color.green);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 2, -thisVTransform.up, 15)) {
		Obstacle = true;
		Turret.target = null;
	} else {
	    Obstacle = false;
	}

     newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * 0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 15f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 15)) {
     if(JustNoticed < 1){
     TurnLeft = true;
     Turret.target = null;
     }
 } else {
     TurnLeft = false;
 }
 
newRot = (-thisVTransform.up * 0.6f + thisVTransform.right * -0.4f).normalized;
Debug.DrawRay (thisVTransform.position + -thisVTransform.up * 3, newRot * 15f, Color.black);
if (Physics.Raycast (thisVTransform.position + -thisVTransform.up * 3, newRot, 15)) {
		if(JustNoticed < 1){
		TurnRight = true;
		Turret.target = null;
		}
	} else {
        TurnRight = false;
 }
}
}

}

if(TurnLeft)
  if(!IsBejsirf)
  TurnForce = -100;
  else
  TurnForce = -30;

if(TurnRight)
  if(!IsBejsirf)
  TurnForce = 100;
  else
  TurnForce = 30;

if(!TurnLeft && !TurnRight){
  TurnForce = 0;
  
  Debug.DrawRay (thisTransform.position, thisTransform.right * 5f, Color.black);
if (Physics.Raycast (thisTransform.position, thisTransform.right, 5))
     if(!IsBejsirf)
     TurnForce = -30;
     else
     TurnForce = -10;
 
Debug.DrawRay (thisTransform.position, -thisTransform.right * 5f, Color.black);
if (Physics.Raycast (thisTransform.position, -thisTransform.right, 5))
     if(!IsBejsirf)
	 TurnForce = 30;
	 else
     TurnForce = 10;
}

if(Obstacle){
  if(!IsBejsirf)
  Force = -35;

if(!TurnLeft && !TurnRight)
if(!IsBejsirf){
  if(-localV.y < 10)
  TurnForce = -100;
  }else{
  TurnForce = -30;
  }

}

if(Stuck && !Attacking){
  if(!IsBejsirf){
  Force = -20;
  TurnForce = 6;
  }
}

}


private var NewRotation : Quaternion;
function FixedUpdate () {

if(IsExploding)
return;

if(!IsBejsirf){

if(Following && MusicSound.audio.volume > 0)
MusicSound.audio.volume -= 0.05;
else
if(!Following && !IsTerrorizing && MusicSound.audio.volume < 0.8)
MusicSound.audio.volume += 0.05;

if(IsTerrorizing && MusicSound.audio.volume > 0)
MusicSound.audio.volume -= 0.05;

}

if(IsTerrorizing == true)
return;

if (target) {
 if(TurnLeft || TurnRight){
  rigidbody.freezeRotation = false;
  }
 if(!TurnLeft && !TurnRight){
  rigidbody.freezeRotation = true;
  }
  
  if(Ally == null){
  NewRotation = Quaternion.LookRotation(target.position - thisTransform.position);
  if(!IsBejsirf)
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 30);
  else
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
  if(Attacking)
  if(Vector3.Distance(thisTransform.position, target.position) < 30)
  if(!IsBejsirf && !IsBus)
  TurnForce = 100;
  }
  if(Ally != null){
  if(Vector3.Distance(thisTransform.position, Ally.position) > 20){
  NewRotation = Quaternion.LookRotation(Ally.position - thisTransform.position);
  if(Vector3.Distance(thisTransform.position, Ally.position) > 40)
  if(!IsBejsirf)
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 30);
  else
  thisTransform.rotation = Quaternion.RotateTowards(thisTransform.rotation, NewRotation, Time.deltaTime * 100);
  }else{
  if(!IsBejsirf)
  TurnForce = 100;
  else
  TurnForce = 30;
  }
  }
  }
  
   if(!IsBejsirf){
   vRigidbody.AddForce(thisVTransform.up * -Force);
   }else{
   if(!Obstacle)
   vRigidbody.AddForce(thisVTransform.up * -Force);
   }
   
   vRigidbody.AddTorque(thisTransform.up * TurnForce);

}

function OnTriggerStay (other : Collider) {

ON = other.name;
OT = other.transform;

if(Physics.Linecast (thisTransform.position, OT.position, MtargetLayers))
return;

if(IsExploding || IsTerrorizing)
return;

if(!IsBus && Suspicion < 20)
if(ON.Contains("AkbarLeader"))
  Ally = OT;

if(IsBus && Suspicion < 20)
if(ON.Contains("AkbarGuncarrier") || ON.Contains("AkbarLeader"))
  Ally = OT;
  
  
if(ON.Contains ("TFC1") && !PissedAtTC1){
PissedAtTC1 = true;
} 
if(ON.Contains ("TFC2") && !PissedAtTC2){
PissedAtTC2 = true;
}
if(ON.Contains ("TFC4") && !PissedAtTC4){
PissedAtTC4 = true;
}
if(ON.Contains ("TFC7") && !PissedAtTC7){
PissedAtTC7 = true;
}
if(ON.Contains ("TFC8") && !PissedAtTC8){
PissedAtTC8 = true;
}
if(ON.Contains ("TFC9") && !PissedAtTC9){
PissedAtTC9 = true;
}

if(CloseToBase || Bored)
return;
 
 if(ON.Contains ("TC1")){
 if(!ON.Contains ("C1f")){
 if(!ON.Contains ("csT")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  }else{
  if(PissedAtTC1){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  }
  
  }
 
 if(PissedAtTC2)
 if(ON.Contains ("TC2")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 
 if(ON.Contains ("TC3"))
 if(!ON.Contains ("csT")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 
 if(PissedAtTC4)
 if(ON.Contains ("TC4")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  } 
 
 if(ON.Contains ("TC5")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
 
if(ON.Contains ("TC7"))
if(!ON.Contains ("csT")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC8"))
if(!ON.Contains ("csT")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }
  
if(ON.Contains ("TC9"))
if(!ON.Contains ("csT")){
  Spot = false;
  Hunting = false;
  Ally = null;
  target = OT;
  if(!Attacking){
  Attacking = true;
  StopAllCoroutines();
  }
  }

}

function IsPissed () {
  Ally = null;
  Attacking = true;
  if(IsBus)
  StopForTerror();
}

function Breaking () {
  Attacking = false;
  Obstacle = true;
yield WaitForSeconds (2);
  Attacking = true;
  Obstacle = false;
}

function Counter () {

if(IsExploding)
return;

if(Attacking)
Trig.radius = 50;
else
Trig.radius = 150;

if(AbiaSyndicateNetwork.instance.AbiaBaseHomePoint){
if(Vector3.Distance(thisTransform.position, AbiaSyndicateNetwork.instance.AbiaBaseHomePoint.position) < 1500)
CloseToBase = true;
else
CloseToBase = false;
}

if(AbiaSyndicateNetwork.TC1CriminalLevel > 0)
PissedAtTC1 = true;

if(AbiaSyndicateNetwork.TC2CriminalLevel > 0)
PissedAtTC2 = true;

if(AbiaSyndicateNetwork.TC4CriminalLevel > 0)
PissedAtTC4 = true;

if(AbiaSyndicateNetwork.TC5CriminalLevel > 0)
PissedAtTC5 = true;

if(AbiaSyndicateNetwork.TC7CriminalLevel > 0)
PissedAtTC7 = true;

if(AbiaSyndicateNetwork.TC8CriminalLevel > 0)
PissedAtTC8 = true;

if(AbiaSyndicateNetwork.TC9CriminalLevel > 0)
PissedAtTC9 = true;

if(target)
if(!Obstacle){

if(Vector3.Distance(thisTransform.position, target.position) > 100){
   if(!IsBejsirf)
  Force = 35;
  else
  Force = 7;
  TurnForce = 0;
  } else if(Vector3.Distance(thisTransform.position, target.position) < 100){
  if(!IsBejsirf)
  Force = 30;
  else
  Force = 5;
  }

if(Ally){
if(Vector3.Distance(thisTransform.position, Ally.position) > 40){
 if(!IsBejsirf)
  Force = 35;
  else
  Force = 7;
  TurnForce = 0;
  } else if(Vector3.Distance(thisTransform.position, Ally.position) < 40){
  if(!IsBejsirf)
  Force = 30;
  else
  Force = 5;
  }
}
}

if(Ally)
   Following = true;
   else
   Following = false;

if(Suspicion > 60){
IsPissed();
}

if(!IsBus){
Turret.target = target;

if(Attacking)
Turret.Attacking = true;
else
Turret.Attacking = false;

if(target != null)
if(Attacking)
if (!Physics.Linecast (thisTransform.position, target.position, targetLayers)){
TurnRight = false;
TurnLeft = false;
JustNoticed = 2;
}
}

if(JustNoticed > 0)
JustNoticed -= 1;

TurnRight = false;
TurnLeft = false;

if(IsBus){
if(target)
var TargPos : Vector3 = target.position;
if(Vector3.Distance(thisTransform.position, TargPos) < 20){
  IsCloseEnough = true;
if(!IsExploding)
  StopForTerror();
  }else{
  IsCloseEnough = false;
}
}
}

function StopForTerror () {
yield WaitForSeconds (1);
if(Attacking && IsCloseEnough && !IsTerrorizing){
IsTerrorizing = true;
yield WaitForSeconds (2);
if(IsBus){

TerroristAudio.Play();

Destroy(TerroristDoor.GetComponent(FixedJoint));
TerroristDoor.transform.parent = null;

Instantiate(Terrorist1, TerroristSpawn1.position, TerroristSpawn1.rotation);
Instantiate(Terrorist2, TerroristSpawn2.position, TerroristSpawn2.rotation);
Instantiate(Terrorist2, TerroristSpawn3.position, TerroristSpawn3.rotation);

}
}
}

function LeaveMarker () {

if(IsExploding)
return;

if(Bored){
Bored = false;
}else{
Bored = true;
Attacking = false;
target = Forward;
}

var lastPos : Vector3 = thisTransform.position;
IsEscaping(lastPos);
}

function IsEscaping(lastPos : Vector3){
Stuck = false;
yield WaitForSeconds (2);

  if(Vector3.Distance(thisTransform.position, lastPos) < 5){
  Stuck = true;
  yield WaitForSeconds (3);
  Stuck = false;
  }
}

function Exploding () {
IsExploding = true;
StopAllCoroutines();
}