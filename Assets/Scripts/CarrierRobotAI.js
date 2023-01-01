var target : Transform;
var Waypoint : Transform;
var Waypoint2 : Transform;
var RE : Transform;
var Sensor : Transform;
var Vessel : GameObject;
var Gyro : GyroStabilizer;
var Presence : GameObject;

var Translator: GameObject;
var Hook1: GameObject;
var Hook2: GameObject;

var TranslatorMovingOut : boolean;
var TranslatorMovingIn : boolean;

var HookMovingOut : boolean;
var HookMovingIn : boolean;

var HookOut : boolean;
var TranslatorOut : boolean;

var BackBoost : boolean;

var TranslatorEnd : float = 2.4;
var Hook1End : float = 120;
var Hook2End : float = -120;

var AimSpeed = 100;

var InService : boolean;
var Grab : boolean;
var Bring : boolean;
var PutIn : boolean;
var PutDown : boolean;
var ReverseOut : boolean;
var Repositioning : boolean;

var TurnRight : boolean;
var TurnLeft : boolean;

var Obstacle : boolean;
var CargObstacle : boolean;
var CargObstacleAble : boolean;

function Update () {

if(target == null){
InService = false;
gameObject.GetComponent(SphereCollider).radius = 20;
target = Waypoint;
StopAllCoroutines();
}

var newRot : Vector3 = (transform.forward * 0.6f + transform.up * 0.1f).normalized;

var hit : RaycastHit;

newRot = (transform.forward * 0.4f + transform.right * 0.4f).normalized;
Debug.DrawRay (transform.position + transform.forward * 1, newRot * 2.5f, Color.black);
if (Physics.Raycast (transform.position + transform.forward * 1, newRot, hit, 2.5)) {
     if(!hit.collider.tag == "ElementMaterials")
     TurnLeft = true;
     if(hit.collider.tag == "Metal" || hit.collider.tag == "Terrain" || hit.collider.tag == "MetalStructure")
     TurnLeft = true;
 } else {
     TurnLeft = false;
}

newRot = (transform.forward * 0.4f + transform.right * -0.4f).normalized;
Debug.DrawRay (transform.position + transform.forward * 1, newRot * 2.5f, Color.black);
if (Physics.Raycast (transform.position + transform.forward * 1, newRot, hit, 2.5)) {
		if(!hit.collider.tag == "ElementMaterials")
		TurnRight = true;
	} else {
        TurnRight = false;
}

if(InService){
Debug.DrawRay (Sensor.position, Sensor.up * 1f, Color.green);
if (Physics.Raycast (Sensor.position, Sensor.up, 1)) {
	TranslatorOut = true;
    TranslatorMovingOut = false;
	}
}

if(!Grab){
Debug.DrawRay (transform.position, transform.forward * 4f, Color.green);
if (Physics.Raycast (transform.position, transform.forward, hit, 4)) {
		if(hit.collider.tag == "TargetCol")
		Obstacle = false;
		else
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}
	if(Grab){
Debug.DrawRay (transform.position + transform.forward * 1.9, transform.forward * 1f, Color.green);
if (Physics.Raycast (transform.position + transform.forward * 1.9, transform.forward, hit, 1f)) {
		if(!hit.collider.tag == "ElementMaterials")
		Obstacle = true;
		if(hit.collider.tag == "ElementMaterials" && PutIn && CargObstacleAble)
		CargObstacle = true;
		if(hit.collider.tag == "Metal" || hit.collider.tag == "Terrain" || hit.collider.tag == "MetalStructure")
		Obstacle = true;
	} else {
	    Obstacle = false;
	}
}
}


private var NewRotation : Quaternion;

function FixedUpdate () {
if(!TurnLeft || !TurnRight){
  NewRotation = Quaternion.LookRotation(target.position - transform.position);
  transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * AimSpeed);
}

Translator.transform.localPosition.x = 0;
Translator.transform.localPosition.y = 0;
Translator.transform.localRotation = Quaternion.Euler(0, 0, 0);

if(TranslatorMovingIn || TranslatorMovingOut){
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.z < -TranslatorEnd){
        TranslatorOut = true;
        TranslatorMovingOut = false;
        }
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.z > 0){
        TranslatorOut = false;
        TranslatorMovingIn = false;
        }
}
if(HookMovingIn || HookMovingOut){
        if(Hook1.hingeJoint.spring.targetPosition == Hook1End){
        HookOut = true;
        HookMovingOut = false;
        }
        if(Hook1.hingeJoint.spring.targetPosition == 0){
        HookOut = false;
        HookMovingIn = false;
        }
}

        if(TranslatorMovingOut)
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.z < TranslatorEnd)
            Translator.GetComponent(ConfigurableJoint).targetPosition -= Vector3(0,0,0.01);
            
        if(TranslatorMovingIn)
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.z < 0)
            Translator.GetComponent(ConfigurableJoint).targetPosition += Vector3(0,0,0.01);
            
        if(HookMovingOut){
        if(Hook1.hingeJoint.spring.targetPosition < Hook1End)
            Hook1.hingeJoint.spring.targetPosition += 1;
        if(Hook2.hingeJoint.spring.targetPosition > Hook2End)
            Hook2.hingeJoint.spring.targetPosition -= 1;
        }
        
        if(HookMovingIn){
        if(Hook1.hingeJoint.spring.targetPosition > 0)
            Hook1.hingeJoint.spring.targetPosition -= 1;
        if(Hook2.hingeJoint.spring.targetPosition < 0)
            Hook2.hingeJoint.spring.targetPosition += 1;
        }
        
var localV = Vessel.transform.InverseTransformDirection(Vessel.rigidbody.velocity);
 
if(TurnLeft && !PutDown){
Gyro.rigidbody.AddTorque(transform.up * -80);
}

if(TurnRight && !PutDown){
Gyro.rigidbody.AddTorque(transform.up * 80);
}

if(BackBoost)
if(localV.y > 2)
Vessel.rigidbody.AddForce(Vessel.transform.up * 20);

if(Obstacle){
if(-localV.y > 0.5)
Vessel.rigidbody.AddForce(Vessel.transform.up * 4);

if(InService && -localV.y < 0.4)
Vessel.rigidbody.AddForce(Vessel.transform.up * -1);

if(Grab)
Vessel.rigidbody.AddForce(Vessel.transform.up * 1);
}

if(!Obstacle && InService && !Grab && !ReverseOut){
if(-localV.y < 2)
Vessel.rigidbody.AddForce(Vessel.transform.up * -5);
}

if(!Obstacle && InService && Bring && !ReverseOut){
if(-localV.y < 2)
Vessel.rigidbody.AddForce(Vessel.transform.up * -4);
}

if(InService && ReverseOut){
if(localV.y > 2)
Vessel.rigidbody.AddForce(Vessel.transform.up * 4);
}

if(!Obstacle && InService && Repositioning){
if(-localV.y < 2)
Vessel.rigidbody.AddForce(Vessel.transform.up * -5);
}

//-----------------------------------------------------------------------------------------------------------------

if(target){

if(Vector3.Distance(transform.position, target.position) < 2 && target.name == "RecieveStart")
if(localV.y > -0.1)
Vessel.rigidbody.AddForce(Vessel.transform.up * 20);

if(Vector3.Distance(transform.position, target.position) < 2 && target.name == "RecieveEnd")
if(localV.y > -0.1)
Vessel.rigidbody.AddForce(Vessel.transform.up * 20);

if(Vector3.Distance(transform.position, target.position) < 2 && target.name == "CRPosition")
if(localV.y > -0.1)
Vessel.rigidbody.AddForce(Vessel.transform.up * 20);

}

if(CargObstacle)
if(localV.y > -0.1)
Vessel.rigidbody.AddForce(Vessel.transform.up * 20);

if(target){
if(Vector3.Distance(transform.position, target.position) < 3 && InService 
                                                             && !HookOut 
                                                             && !Grab 
                                                             && !Bring 
                                                             && !PutIn 
                                                             && !HookMovingOut
                                                             && !Repositioning){
HookControl();
}
if(Vector3.Distance(transform.position, target.position) < 1.6 && InService 
                                                               && HookOut 
                                                               && !Grab
                                                               && !Bring
                                                               && !PutIn
                                                               && !Repositioning){
HookControl();
Grab = true;
}
if(Vector3.Distance(transform.position, target.position) < 1.6 && InService 
                                                               && !TranslatorMovingOut 
                                                               && Grab 
                                                               && !Bring
                                                               && !PutIn
                                                               && !HookOut
                                                               && !Repositioning){
TranslatorControl();
Vessel.rigidbody.centerOfMass = Vector3(0, 2, 0);
Gyro.force = 100;
gameObject.GetComponent(SphereCollider).radius = 30;
}
if(Vector3.Distance(transform.position, target.position) < 1.5 && target.name == "RecieveStart"
                                                               && InService
                                                               && Grab
                                                               && Bring
                                                               && !Repositioning){
if(localV.y < 0.1){
gameObject.GetComponent(SphereCollider).radius = 30;
}
}
if(Vector3.Distance(transform.position, target.position) < 1.8 && target.name == "RecieveEnd"
                                                               && InService
                                                               && Grab
                                                               && Bring
                                                               && PutIn
                                                               && !CargObstacle
                                                               && !Repositioning){
TranslatorControl();
PutDown = true;
target = Waypoint;
}
if(target.name == "RecieveEnd"
                                                               && InService
                                                               && Grab
                                                               && Bring
                                                               && PutIn
                                                               && CargObstacle
                                                               && !Repositioning){
TranslatorControl();
PutDown = true;
target = Waypoint;
}

if(target.name == "DirectionForward"
             && InService
             && Grab
             && Bring 
             && PutIn
             && !TranslatorOut
             && !HookOut 
             && !ReverseOut){
HookControl();
Grab = false;
AimSpeed = 100;
Vessel.rigidbody.centerOfMass = Vector3(0, 0, 0);
Gyro.force = 10;
CargObstacle = false;
ReverseOut = true;
}

if(RE)
if(Vector3.Distance(transform.position, RE.position) > 20 && target.name == "DirectionForward"
                                                          && InService
                                                          && ReverseOut
                                                          && !Repositioning){
Repositioning = true;
Bring = false;
PutIn = false;
PutDown = false;
ReverseOut = false;
CargObstacleAble = false;
HookControl();
RE = null;
gameObject.GetComponent(SphereCollider).radius = 30;
}

if(Vector3.Distance(transform.position, target.position) < 1.5 && target.name == "CRPosition"
                                                          && Repositioning
                                                          && InService){
InService = false;
Repositioning = false;
target = Waypoint;
gameObject.GetComponent(SphereCollider).radius = 30;
}
}
}

//-----------------------------------------------------------------------------------------------------------------

function OnTriggerStay (other : Collider) {
if(!Grab && !InService && !ReverseOut && !Repositioning){
if(other.tag == "ElementMaterials" && !other.name.Contains ("SM") && other.name.Contains ("CM8")){
InService = true;
gameObject.GetComponent(SphereCollider).radius = 0.1;
target = other.gameObject.transform;
other.gameObject.name = "SM";
}
}
if(Grab && !Bring && !PutIn && !ReverseOut && !Repositioning){
if(other.name == "RecieveStart"){
Bring = true;
gameObject.GetComponent(SphereCollider).radius = 0.1;
AimSpeed = 0;
AimAgain();
target = other.gameObject.transform;
}
}
if(Grab && Bring && !PutIn && !ReverseOut && !TranslatorMovingOut && !Repositioning){
if(other.name == "RecieveEnd"){
PutIn = true;
gameObject.GetComponent(SphereCollider).radius = 0.1;
target = other.gameObject.transform;
RE = other.gameObject.transform;
CargObstacleAbler();
}
}
if(Repositioning){
if(other.name == "CRPosition"){
gameObject.GetComponent(SphereCollider).radius = 0.1;
target = other.gameObject.transform;
}
}
}

function HookControl () {
            if(!HookOut){
            Hook1.hingeJoint.spring.targetPosition -= 1;
            Hook2.hingeJoint.spring.targetPosition += 1;
            HookMovingOut = true;
            HookMovingIn = false;
            }
            if(HookOut){
            Hook1.hingeJoint.spring.targetPosition += 1;
            Hook2.hingeJoint.spring.targetPosition -= 1;
            HookMovingOut = false;
            HookMovingIn = true;
            }
}

function TranslatorControl () {
            if(!TranslatorOut){
            Translator.GetComponent(ConfigurableJoint).targetPosition -= Vector3(0,0,0.01);
            TranslatorMovingOut = true;
            TranslatorMovingIn = false;
            }
            if(TranslatorOut){
            Translator.GetComponent(ConfigurableJoint).targetPosition += Vector3(0,0,0.01);
            TranslatorMovingOut = false;
            TranslatorMovingIn = true;
            }
}

function AimAgain () {
yield WaitForSeconds (1.3);
AimSpeed = 50;
BackBoost = true;
yield WaitForSeconds (1);
BackBoost = false;
}
function CargObstacleAbler () {
yield WaitForSeconds (1);
CargObstacleAble = true;
}