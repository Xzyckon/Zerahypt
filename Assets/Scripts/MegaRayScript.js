#pragma strict

var AgrianTurretRay : boolean;

var AgrianSuperRay : boolean;

var RegularRay : boolean;

var PulseRay : boolean;

var PlayerShot : boolean;

var Unchild : boolean;

var RayStart : Transform;

var startPoint : float = 0.1;

var RayReach = 20000;

var RayLevel = 20;

var TimeDelay : float = 0.25;

var FinalSFX : AudioSource;

var collision : GameObject;
var finalCollision : GameObject;
var RayLight : GameObject;
var RayEffect : GameObject;
var ChargeEffect : GameObject;
var RayOn : boolean;

var ReadyMode : boolean;
var FireMode : boolean;

var targetLayers : LayerMask;
var MtargetLayers : LayerMask;

private var P1Go : boolean;
private var P2Go : boolean;
private var P3Go : boolean;

InvokeRepeating("HitTick", 0, 0.05);

function Start () {

if(!RegularRay){

if(!AgrianSuperRay){
if(!AgrianTurretRay){

if(ReadyMode){
yield WaitForSeconds (3.2);
ChargeEffect.gameObject.SetActive (true);
}

if(FireMode){
RayLight.SetActive (true);
RayEffect.SetActive (true);
yield WaitForSeconds (0.1);
RayOn = true;
yield WaitForSeconds (4.1);
RayOn = false;
RayLight.SetActive (false);
RayEffect.SetActive (false);
}

}else{

yield WaitForSeconds (0.15);
RayEffect.SetActive (true);
RayLight.SetActive (true);
RayOn = true;
yield WaitForSeconds (0.7);
RayOn = false;
RayLight.SetActive (false);
RayEffect.SetActive (false);
}

}else{
yield WaitForSeconds (TimeDelay);
RayLight.gameObject.SetActive (true);


if(Unchild)
transform.parent = null;


var hit1 : RaycastHit;
if(Physics.Raycast(transform.position, transform.forward, hit1, 20000, targetLayers)){
Instantiate(collision, hit1.point, Quaternion.identity);
if(hit1.rigidbody){
if(hit1.rigidbody.mass > 6){

var Point1 = hit1.point;	
var NormalAngle1 = Quaternion.LookRotation(hit1.normal);
yield WaitForSeconds (hit1.distance * 0.00015);
Instantiate(finalCollision, Point1, NormalAngle1);
}else{
var hit2 : RaycastHit;
if(Physics.Raycast(transform.position, transform.forward, hit2, 20000, MtargetLayers)){
var Point2 = hit2.point;
var NormalAngle2 = Quaternion.LookRotation(hit2.normal);
yield WaitForSeconds (hit2.distance * 0.00015);
Instantiate(finalCollision, Point2, NormalAngle2);
}
}
}else{
var hit3 : RaycastHit;
if(Physics.Raycast(transform.position, transform.forward, hit3, 20000, MtargetLayers)){
var Point3 = hit3.point;
var NormalAngle3 = Quaternion.LookRotation(hit3.normal);
yield WaitForSeconds (hit3.distance * 0.00015);
Instantiate(finalCollision, Point3, NormalAngle3);

}
}














}

}


}else{
if(!PulseRay){
RayOn = true;
}else{

yield WaitForSeconds (TimeDelay);

var hit : RaycastHit;

if(PlayerShot){

AgrianNetwork.instance.Curiosity += RayLevel;

if(AgrianNetwork.instance.Curiosity > 200){
AgrianNetwork.instance.PriorityWaypoint.position = transform.position;
if(AgrianNetwork.TC1CriminalLevel > 500 && AgrianNetwork.instance.Curiosity > 500){
AgrianNetwork.instance.FullPriorityWaypoint.position = transform.position;
WorldInformation.PiriExposed = 120;
}
}

}

if(RayEffect)
RayEffect.SetActive (true);

if(FinalSFX)
FinalSFX.Play();

if(Physics.Raycast(transform.position + transform.forward * startPoint, transform.forward, hit, RayReach, targetLayers))
Instantiate(collision, hit.point, Quaternion.identity);

}
}
}

function HitTick () {

if(RayOn){

if(AgrianTurretRay)
transform.Rotate(0.002,0,0);

if(!RegularRay){
var hit : RaycastHit;

		if(Physics.Raycast(transform.position, transform.forward, hit, RayReach, targetLayers)){
			Instantiate(collision, hit.point, Quaternion.identity);
		}
}else{
var hit2 : RaycastHit;
		
		if(Physics.SphereCast(RayStart.position, 1, transform.forward, hit2, RayReach, targetLayers)){
			Instantiate(collision, hit2.point, Quaternion.identity);
		}
}

}
}