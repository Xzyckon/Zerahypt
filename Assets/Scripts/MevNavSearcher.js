var target : Transform;
static var MevNavPriorityWaypoint : Transform;
var ScanArea = 3000;

InvokeRepeating("DoStuff", 10, 30);

function Start () {
MevNavPriorityWaypoint = gameObject.transform;
}

function Update () {

}

function FixedUpdate(){

 if(target != null)
  transform.position = target.position;
}

function OnTriggerStay (other : Collider)
{
 if(other.name.Contains("TC1") || other.name.Contains("TC3")
                               || other.name.Contains("TC4")
                               || other.name.Contains("TC5")
                               || other.name.Contains("TC6")
                               || other.name.Contains("TC7")
                               || other.name.Contains("TC8")
                               || other.name.Contains("TC9")){
  target = other.gameObject.transform;
  }
 }
 
  function DoStuff () {
 Scan();
 }
 
 function Scan () {
 gameObject.GetComponent(SphereCollider).radius = ScanArea;
 yield WaitForSeconds (0.3);
 gameObject.GetComponent(SphereCollider).radius = 50;
 }