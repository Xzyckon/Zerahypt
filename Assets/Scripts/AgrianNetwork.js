#pragma strict

var Deactivated : boolean;

var PriorityWaypoint : Transform;

var FullPriorityWaypoint : Transform;

var TurretsTarget : Transform;

var SubdueTarget : Transform;

static var TargetSubdual = 0;

static var DoomstarActive : boolean;

static var DismissDoomstar : boolean;

static var theDoomstar : Transform;

static var doomstarTarget : Transform;

static var DoomclawActive : boolean;

static var theDoomclaw : Transform;

static var RedAlert : boolean;

static var Alert : boolean;

static var TC1CriminalLevel = 0;
static var TC3CriminalLevel = 0;
static var TC4CriminalLevel = 0;
static var TC5CriminalLevel = 0;
static var TC6CriminalLevel = 0;
static var TC7CriminalLevel = 0;
static var TC8CriminalLevel = 0;
static var TC9CriminalLevel = 0;

var RedAlertTime = 0;

var AlertTime = 0;

var Curiosity = 0;

static var Spawn = 0;

static var instance : AgrianNetwork;

InvokeRepeating("Tick", 1, 1);

function Awake(){

	instance = this;
}

function Start(){

if(!FullPriorityWaypoint){
var gO = new GameObject("FullPriorityWaypoint");
		gO.transform.position = transform.position;
        gO.transform.rotation = transform.rotation;
        FullPriorityWaypoint = gO.transform;
}

Spawn = 0;

TargetSubdual = 0;

SubdueTarget = null;

DismissDoomstar = false;
}

function Tick () {

if(Deactivated)
return;

if(Curiosity > 1){
Curiosity -= 1;

if(Curiosity > 200){
AlertTime = 120;
if(Curiosity > 1000)
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
}

}

if(RedAlertTime == 1){
RedAlertTime = 0;
AlertTime = 300;
RedAlert = false;
}

if(RedAlertTime > 1){
RedAlertTime -= 1;
RedAlert = true;
}

if(AlertTime == 1){
AlertTime = 0;
Alert = false;
}

if(AlertTime > 1){
AlertTime -= 1;
Alert = true;
}

if(SubdueTarget){
//Debug.Log("Needs Subduing with " + TargetSubdual + " Target Subdual");
if(TargetSubdual > 6){
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
FullPriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
AlertTime = 120;
RedAlertTime = 120;
}
}

if(Spawn > 0){
if(TC1CriminalLevel < 200)
TC1CriminalLevel = 270;
if(AlertTime < 150)
AlertTime = 150;
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
FullPriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
Spawn -= 1;
}

if(TC1CriminalLevel > 0){

if(TC1CriminalLevel > 500){
if(WorldInformation.PiriFree == true){
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
FullPriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
}

if(WorldInformation.instance.AreaKabrian == true)
if(WorldInformation.PiriTopFree == true){
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
FullPriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
}

if(WorldInformation.instance.AreaKabrian == true)
if(WorldInformation.PiriBottomFree == true){
PriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
FullPriorityWaypoint.position = PlayerInformation.instance.PiriTarget.position;
}
}else{
TC1CriminalLevel -= 1;
}
}

//Debug.Log(Curiosity);
//Debug.Log(TC1CriminalLevel);

if(TC3CriminalLevel > 0){
TC3CriminalLevel -= 1;

if(TC3CriminalLevel > 300)
TC3CriminalLevel = 300;
}

if(TC4CriminalLevel > 0)
TC4CriminalLevel -= 1;

if(TC5CriminalLevel > 0)
TC5CriminalLevel -= 1;

if(TC6CriminalLevel > 0)
TC6CriminalLevel -= 1;

if(TC7CriminalLevel > 0)
TC7CriminalLevel -= 1;

if(TC8CriminalLevel > 0)
TC8CriminalLevel -= 1;

if(TC9CriminalLevel > 0)
TC9CriminalLevel -= 1;

}