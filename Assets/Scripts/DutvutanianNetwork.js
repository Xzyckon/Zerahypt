var PriorityWaypoint : Transform;

var EnemyTargetMin : Transform;
var EnemyTargetMinStat : Transform;
var EnemyTargetMinNum : int;
var EnemyTargetMed : Transform;
var EnemyTargetMedStat : Transform;
var EnemyTargetMedNum : int;

static var AnExtraBigTC1 : Transform;
static var AnExtraBigTC2 : Transform;
static var AnExtraBigTC3 : Transform;
static var AnExtraBigTC4 : Transform;
static var AnExtraBigTC5 : Transform;
static var AnExtraBigTC6 : Transform;
static var AnExtraBigTC7 : Transform;
static var AnExtraBigTC8 : Transform;

var DutvutanianBase : Transform;

var DutvutanianGuardPost1 : Transform;
var DutvutanianGuardPost2 : Transform;

var Elite1 : GameObject;

static var UnitsPresent : boolean;

static var TC1Nuisance = 0;

static var TC0aCriminalLevel = 0;

var TC1CL = 0;
var TC2CL = 0;
var TC3CL = 0;
var TC4CL = 0;
var TC5CL = 0;
var TC6CL = 0;
var TC7CL = 0;
var TC8CL = 0;

static var TC1CriminalLevel = 0;
static var TC2CriminalLevel = 0;
static var TC3CriminalLevel = 0;
static var TC4CriminalLevel = 0;
static var TC5CriminalLevel = 0;
static var TC6CriminalLevel = 0;
static var TC7CriminalLevel = 0;
static var TC8CriminalLevel = 0;

static var TC1CriminalPoints = 0;
static var TC2CriminalPoints = 0;
static var TC3CriminalPoints = 0;
static var TC4CriminalPoints = 0;
static var TC5CriminalPoints = 0;
static var TC6CriminalPoints = 0;
static var TC7CriminalPoints = 0;
static var TC8CriminalPoints = 0;

static var AlertTime = 0;

static var instance : DutvutanianNetwork;

static var CasualtyMeter = 0;

static var HasDropped : boolean;

InvokeRepeating("Tick", 1, 1);

InvokeRepeating("Tick2", 0.7, 3.3);

function Awake(){
	instance = this;
}

function Start(){
HasDropped = false;
}

function Tick () {

if(TC1CriminalLevel < 480){
if(TC1CriminalLevel > 0)
TC1CriminalLevel -= 1;
if(TC1CriminalPoints > 3)
TC1CriminalLevel = 500;
}else{
if(TC1CriminalLevel > 800){
AlertTime = 240;
if(TC1CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}
}

if(TC2CriminalLevel < 480){
if(TC2CriminalLevel > 0)
TC2CriminalLevel -= 1;
if(TC2CriminalPoints > 3)
TC2CriminalLevel = 500;
}else{
if(TC2CriminalLevel > 800)
AlertTime = 240;
if(TC2CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC3CriminalLevel < 480){
if(TC3CriminalLevel > 0)
TC3CriminalLevel -= 1;
if(TC3CriminalPoints > 3)
TC3CriminalLevel = 500;
}else{
if(TC3CriminalLevel > 800)
AlertTime = 240;
if(TC3CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC4CriminalLevel < 480){
if(TC4CriminalLevel > 0)
TC4CriminalLevel -= 1;
if(TC4CriminalPoints > 3)
TC4CriminalLevel = 500;
}else{
if(TC4CriminalLevel > 800)
AlertTime = 240;
if(TC4CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC5CriminalLevel < 480){
if(TC5CriminalLevel > 0)
TC5CriminalLevel -= 1;
if(TC5CriminalPoints > 3)
TC5CriminalLevel = 500;
}else{
if(TC5CriminalLevel > 800)
AlertTime = 240;
if(TC5CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC6CriminalLevel < 480){
if(TC6CriminalLevel > 0)
TC6CriminalLevel -= 1;
if(TC6CriminalPoints > 3)
TC6CriminalLevel = 500;
}else{
if(TC6CriminalLevel > 800)
AlertTime = 240;
if(TC6CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC7CriminalLevel < 480){
if(TC7CriminalLevel > 0)
TC7CriminalLevel -= 1;
if(TC7CriminalPoints > 3)
TC7CriminalLevel = 500;
}else{
if(TC7CriminalLevel > 800)
AlertTime = 240;
if(TC7CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

if(TC8CriminalLevel < 480){
if(TC8CriminalLevel > 0)
TC8CriminalLevel -= 1;
if(TC8CriminalPoints > 3)
TC8CriminalLevel = 500;
}else{
if(TC8CriminalLevel > 800)
AlertTime = 240;
if(TC8CriminalLevel > 1400)
if(Elite1)
Elite1.SetActive (true);
}

TC1CL = TC1CriminalLevel;
TC2CL = TC2CriminalLevel;
TC3CL = TC3CriminalLevel;
TC4CL = TC4CriminalLevel;
TC5CL = TC5CriminalLevel;
TC6CL = TC6CriminalLevel;
TC7CL = TC7CriminalLevel;
TC8CL = TC8CriminalLevel;

if(EnemyTargetMin){

if(EnemyTargetMinStat != EnemyTargetMin)
EnemyTargetMinNum = 15;

EnemyTargetMinStat = EnemyTargetMin;

if(EnemyTargetMinNum < 1)
EnemyTargetMin = null;
}else{
EnemyTargetMinNum = 0;
}

if(EnemyTargetMinNum > 0)
EnemyTargetMinNum -= 1;

if(AlertTime > 0)
AlertTime -= 1;

//Debug.Log(TC1CriminalLevel);

}

function Tick2 () {

if(AnExtraBigTC1)
if(AnExtraBigTC1.name.Contains ("rok"))
AnExtraBigTC1 = null;
if(AnExtraBigTC2)
if(AnExtraBigTC2.name.Contains ("rok"))
AnExtraBigTC2 = null;
if(AnExtraBigTC3)
if(AnExtraBigTC3.name.Contains ("rok"))
AnExtraBigTC3 = null;
if(AnExtraBigTC4)
if(AnExtraBigTC4.name.Contains ("rok"))
AnExtraBigTC4 = null;
if(AnExtraBigTC5)
if(AnExtraBigTC5.name.Contains ("rok"))
AnExtraBigTC5 = null;
if(AnExtraBigTC6)
if(AnExtraBigTC6.name.Contains ("rok"))
AnExtraBigTC6 = null;
if(AnExtraBigTC7)
if(AnExtraBigTC7.name.Contains ("rok"))
AnExtraBigTC7 = null;
if(AnExtraBigTC8)
if(AnExtraBigTC8.name.Contains ("rok"))
AnExtraBigTC8 = null;

UnitsPresent = false;

}