var TheParent : GameObject;
var Relier : GameObject;
var CoWorker : RemoveOverTime;
var UseRelier : boolean;
var UseCoWorker : boolean;
var Active : boolean;
var SkipStillDespawn : boolean;
var UseDistanceDespawn : boolean;
var UseCustomDespawn : boolean;
var UCDAIgo : GameObject;
var UCDAIname : String = "PersonMcPersonface";
var UseNPCDenum : boolean;
var UNDAIgo : GameObject;
var UNDAIname : String = "PersonMcPersonface";

var thisGO : GameObject;
var SavedName : String;

var AppearanceEnsurement = 0;

var Points = 0;
var RemovalPoints = 20;
var RemovalTime = 80;

var DespawnDist = 100;

var DespawnX = 35000;
var DespawnY = 35000;
var DespawnZ = 35000;

var isVesselCarrier : boolean;

InvokeRepeating("Ticker", 5, 1);

function Start () {

thisGO = gameObject;

SavedName = thisGO.name;

if(AppearanceEnsurement < 8)
AppearanceEnsurement = 8;

if(WorldInformation.instance.AreaCode == 64)
UseDistanceDespawn = false;
}

function Update () {

if(!SkipStillDespawn){

if (transform.parent == null && !Active){
     Active = true;
     rigidbody.isKinematic = false;
}

if(Active){

if(Points > RemovalPoints){
transform.parent = null;
rigidbody.isKinematic = true;
transform.Translate(Vector3.down * 0.15 * Time.deltaTime, Space.World);
}
if(Points > RemovalTime){

Removal();
}
}
}
}

function Ticker () {

if(!thisGO.activeSelf){
StopAllCoroutines();

//var Blip = Resources.Load("Prefabs/RadarBlip", GameObject) as GameObject;
//Instantiate(Blip, transform.position, transform.rotation);
//Debug.Log(SavedName);
//Time.timeScale = 0;

return;

}

if(transform.position.x > DespawnX)
Removal();

if(transform.position.y > DespawnY)
Removal();

if(transform.position.z > DespawnZ)
Removal();

if(-transform.position.x > DespawnX)
Removal();

if(-transform.position.y > DespawnY)
Removal();

if(-transform.position.z > DespawnZ)
Removal();


if(UseDistanceDespawn){
if(Vector3.Distance(transform.position, PlayerInformation.instance.PiriPresence.position) > DespawnDist){
if(AppearanceEnsurement < 1){
Removal();
}else{
AppearanceEnsurement -= 1;
}
}else{
AppearanceEnsurement = 0;
}
}


if(!SkipStillDespawn){

if (Relier != null && UseRelier)
     Points = 0;

if (UseCoWorker){

if (CoWorker == null)
Removal();

if(CoWorker.Points > RemovalPoints){
if(Points < RemovalPoints){
     transform.parent = null;
     Points = RemovalPoints + 1;
}
Points += 1;
}
}

if(!gameObject.activeSelf)
return;

if(TheParent != null)
if(!TheParent.activeSelf)
return;

if (!UseCoWorker){
var lastPos : Vector3 = transform.position;
IsStill(lastPos);
}
}
}

function Removal () {

if(UseNPCDenum)
if(UNDAIgo){
UNDAIgo.GetComponent(UNDAIname).Damage();

yield WaitForSeconds (0.3);

}

if(isVesselCarrier)
VesselList.instance.StaticStringOut = null;

if(!UseCustomDespawn){
if(TheParent != null)
Destroy(TheParent);
Destroy(gameObject);
}else{
if(UCDAIgo)
UCDAIgo.GetComponent(UCDAIname).Despawn();
}
}

function IsStill(lastPos : Vector3){

yield WaitForSeconds (1);

  if(Vector3.Distance(transform.position, lastPos) > 0.2 && Points < RemovalPoints)
  Points = 0;
  
  if(Points < RemovalPoints){
  if(Vector3.Distance(transform.position, lastPos) < 0.2)
  Points += 1;
  }else{
  Points += 1;
  }
}

function OnJointBreak(breakForce : float) {
if(!SkipStillDespawn){
Active = true;
transform.parent = null;
rigidbody.isKinematic = false;
}
}