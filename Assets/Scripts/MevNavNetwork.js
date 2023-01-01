
var PriorityWaypoint : Transform;

var EnemyTarget1 : Transform;
var EnemyTarget2 : Transform;

static var xbTarget : Transform;
static var xbTargetTick = 0;

var Threat1 : Transform;

var Elite1 : GameObject;
var Elite2 : GameObject;
var Elite3 : GameObject;
var Elite4 : GameObject;

static var AlertLVL1 : int;
static var AlertLVL2 : int;
static var AlertLVL3 : int;

static var TC1Nuisance = 0;
static var TC2Nuisance = 0;
static var TC3Nuisance = 0;
static var TC4Nuisance = 0;
static var TC5Nuisance = 0;
static var TC6Nuisance = 0;
static var TC8Nuisance = 0;
static var TC9Nuisance = 0;

static var TC0aDeathRow = 0;

static var TC1DeathRow = 0;
static var TC2DeathRow = 0;
static var TC3DeathRow = 0;
static var TC4DeathRow = 0;
static var TC5DeathRow = 0;
static var TC6DeathRow = 0;
static var TC8DeathRow = 0;
static var TC9DeathRow = 0;

static var AlertTime = 0;

static var RequestCruiseMissile : boolean;

static var instance : MevNavNetwork;

InvokeRepeating("Tick", 0.3, 1);

function Awake(){

	instance = this;
}

function Start(){
AlertLVL1 = 0;
AlertLVL2 = 0;
}

function Tick () {

if(xbTargetTick > 0){
xbTargetTick -= 1;
}else{
xbTargetTick = 8;
xbTarget = null;
}

if(TC1Nuisance > 2){
if(TC1DeathRow < 600)
TC1DeathRow = 630;
TC1Nuisance = 0;
}

if(TC2Nuisance > 2){
if(TC2DeathRow < 600)
TC2DeathRow = 630;
TC2Nuisance = 0;
}

if(TC3Nuisance > 2){
if(TC3DeathRow < 600)
TC3DeathRow = 630;
TC3Nuisance = 0;
}

if(TC4Nuisance > 2){
if(TC4DeathRow < 600)
TC4DeathRow = 630;
TC4Nuisance = 0;
}

if(TC5Nuisance > 2){
if(TC5DeathRow < 600)
TC5DeathRow = 630;
TC5Nuisance = 0;
}

if(TC6Nuisance > 2){
if(TC6DeathRow < 600)
TC6DeathRow = 630;
TC6Nuisance = 0;
}

if(TC8Nuisance > 2){
if(TC8DeathRow < 600)
TC8DeathRow = 630;
TC8Nuisance = 0;
}

if(TC9Nuisance > 2){
if(TC9DeathRow < 600)
TC9DeathRow = 630;
TC9Nuisance = 0;
}

if(TC0aDeathRow > 0)
TC0aDeathRow -= 1;

if(TC1DeathRow < 600)
if(TC1DeathRow > 0)
TC1DeathRow -= 1;

if(TC2DeathRow < 600)
if(TC2DeathRow > 0)
TC2DeathRow -= 1;

if(TC3DeathRow < 600)
if(TC3DeathRow > 0)
TC3DeathRow -= 1;

if(TC4DeathRow < 600)
if(TC4DeathRow > 0)
TC4DeathRow -= 1;

if(TC5DeathRow < 600)
if(TC5DeathRow > 0)
TC5DeathRow -= 1;

if(TC6DeathRow < 600)
if(TC6DeathRow > 0)
TC6DeathRow -= 1;

if(TC8DeathRow < 600)
if(TC8DeathRow > 0)
TC8DeathRow -= 1;

if(TC9DeathRow < 600)
if(TC9DeathRow > 0)
TC9DeathRow -= 1;

if(AlertTime > 0)
AlertTime -= 1;

//Debug.Log("Dut " + TC9DeathRow);
//Debug.Log("Piri " + TC1DeathRow);

}