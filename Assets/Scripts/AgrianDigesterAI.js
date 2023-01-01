
var LevelPoint : Transform;
var PermeatePoint : Transform;
var SpinPoint : Transform;
var Permeator : Transform;

var Container1 : GameObject;
var Container2 : GameObject;

var Arm : AgrianArmController;
var Gyro : StrongGyroStabilizer;

var Pausing : boolean;
var IsBeingRefitted : boolean;
var Continue : boolean;
var ContinueIn = 0;

var MoveForce = 10.0;

var Permeating = 0;

var WaypointDist : float = 2;
var Waypoint : Transform;

var targetLayers : LayerMask;

InvokeRepeating("Reader", 1, 0.5);

function Start () {

}

function FixedUpdate () {

if(!Pausing){
  
  LevelPoint.transform.position.y = -2000;
  LevelPoint.transform.position.x = transform.position.x;
  LevelPoint.transform.position.z = transform.position.z;

if(Permeating < 40){

if(Gyro.offset > 5)
Gyro.offset -= 5;

if(Waypoint != null){
if(Vector3.Distance(transform.position, Waypoint.position) > WaypointDist){
   rigidbody.AddForce((Waypoint.transform.position - transform.position).normalized * MoveForce);
   }
if(Vector3.Distance(transform.position, Waypoint.position) < WaypointDist){
   rigidbody.AddForce((Waypoint.transform.position - transform.position) * 0);
   }
}
}

if(Permeating > 40){

if(Gyro.offset < 1000)
Gyro.offset += 5;

Permeator.gameObject.rigidbody.AddForce((PermeatePoint.transform.position - Permeator.position).normalized * MoveForce * 2);

rigidbody.AddForce((PermeatePoint.transform.position - transform.position).normalized * MoveForce * 8);

rigidbody.AddForce((Waypoint.transform.position - transform.position).normalized * MoveForce * 8);
}

if(Permeating < 40)
if(Permeating > 30)
Permeator.gameObject.rigidbody.AddForce((PermeatePoint.transform.position - Permeator.position).normalized * -MoveForce * 2);

}
}

function Reader () {

var Interval: int = Random.Range(0, 30);

if(Pausing){

if(Container1 == null || Container2 == null)
   IsBeingRefitted = true;
   
if(Container1 != null && Container2 != null && IsBeingRefitted){
   ContinueIn = 31;
   Continue = true;
   }

if(Continue){
IsBeingRefitted = false;
ContinueIn -= 1;

if(ContinueIn == 0){
Pausing = false;
Continue = false;
Arm.Aiming = true;
Permeating = 60;
}
}
}

if(Permeating == 40 && !Pausing){
Arm.AimerTarget = SpinPoint;
if(Container1)
if(Container1.gameObject.GetComponent("AgrianContainerController").AmountOfStuff > 0)
Container1.gameObject.GetComponent("AgrianContainerController").AmountOfStuff += 40;
if(Container2)
if(Container2.gameObject.GetComponent("AgrianContainerController").AmountOfStuff > 0)
Container2.gameObject.GetComponent("AgrianContainerController").AmountOfStuff += 40;

if(Container1)
if(Container1.gameObject.GetComponent("AgrianContainerController").AmountOfStuff > 200){
if(Container2)
Container2.gameObject.GetComponent("AgrianContainerController").AmountOfStuff += 40;
Pausing = true;
Arm.Aiming = false;
}
if(Container2)
if(Container2.gameObject.GetComponent("AgrianContainerController").AmountOfStuff > 200){
if(Container1)
Container1.gameObject.GetComponent("AgrianContainerController").AmountOfStuff += 40;
Pausing = true;
Arm.Aiming = false;
}
}

if(!Pausing){
       
  switch (Interval) {
  case 1:
   if(Permeating == 1)
   Permeating = 0;
   break;
}

if(Permeating > 1)
Permeating -= 1;

var hit : RaycastHit;
Debug.DrawRay (Permeator.position + Permeator.forward * 50, Permeator.forward * 1000f, Color.red);

if (Physics.Raycast (Permeator.position + Permeator.forward * 50, Permeator.forward, hit, 1000, targetLayers))
if(hit.collider.name.Contains ("PermeatePoint") && Permeating == 0){
PermeatePoint.position = hit.point;
Arm.AimerTarget = PermeatePoint;
Permeating = 120;
}
}
}