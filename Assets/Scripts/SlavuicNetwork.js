
var PriorityWaypoint : Transform;

var SlavBaseHomePoint : Transform;

var SlavBaseDock1E : Transform;
var SlavBaseDock1P : Transform;
var SlavBaseDock1A : Transform;

static var target : Transform;
static var primaryTarget : Transform;

var Elite1 : GameObject;

var Elite2 : GameObject;

var BaseDroneLauncher : SlavuicProteusAI;

var BaseRayGun1 : SlavuicProteusAI;

var BaseRayGun2 : SlavuicProteusAI;

var BaseRadar1 : SlavuicProteusAI;

var BaseRadar2 : SlavuicProteusAI;

static var TC0aDeathRow = 0;

static var TC1DeathRow = 0;
static var TC3DeathRow = 0;
static var TC4DeathRow = 0;
static var TC6DeathRow = 0;
static var TC7DeathRow = 0;
static var TC8DeathRow = 0;
static var TC9DeathRow = 0;

static var CasualtiesFromTC1 = 0;

static var FoundExtraBig : Transform;

static var Emergency : boolean;

static var Attention : boolean;

static var Confirmed : boolean;

static var instance : SlavuicNetwork;

InvokeRepeating("Tick", 1, 1);

function Awake(){

	instance = this;
}

function Tick () {

Attention = false;

//Debug.Log(FoundExtraBig.name);

if(primaryTarget){

if(TC7DeathRow > 100)
if(primaryTarget.name.Contains ("xb"))
Emergency = true;

}

if(TC0aDeathRow > 0)
TC0aDeathRow -= 1;

if(CasualtiesFromTC1 < 3){
if(TC1DeathRow > 0)
TC1DeathRow -= 1;
}else{
TC1DeathRow = 700;
}

if(TC3DeathRow > 0){
TC3DeathRow -= 1;
if(TC3DeathRow > 30)
TC3DeathRow = 30;
}

if(TC4DeathRow > 0){
TC4DeathRow -= 1;
if(TC4DeathRow > 30)
TC4DeathRow = 30;
}

if(TC6DeathRow > 0)
TC6DeathRow -= 1;

if(TC7DeathRow > 0)
TC7DeathRow -= 1;

if(TC8DeathRow > 0)
TC8DeathRow -= 1;

if(TC9DeathRow > 0)
TC9DeathRow -= 1;

}