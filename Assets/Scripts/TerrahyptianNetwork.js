var PriorityWaypoint : Transform;

var EnemyTarget1 : Transform;
var EnemyTarget2 : Transform;

static var AnExtraBigTC1 : Transform;
static var AnExtraBigTC4 : Transform;
static var AnExtraBigTC5 : Transform;
static var AnExtraBigTC6 : Transform;
static var AnExtraBigTC7 : Transform;
static var AnExtraBigTC8 : Transform;
static var AnExtraBigTC9 : Transform;

var NukeMarker : Transform;

var TerrahyptianBase : Transform;
var AnodianBase : Transform;
var LevianBase : Transform;

var TerrahyptianGuardPost1 : Transform;
var TerrahyptianGuardPost2 : Transform;

static var AlertLVL1 : int;
static var AlertLVL2 : int;

static var UnitsPresent : boolean;

static var TC1Nuisance = 0;
static var TC4Nuisance = 0;
static var TC5Nuisance = 0;
static var TC6Nuisance = 0;
static var TC7Nuisance = 0;
static var TC8Nuisance = 0;
static var TC9Nuisance = 0;

static var TC0aCriminalLevel = 0;

static var TC1CriminalLevel = 0;
static var TC4CriminalLevel = 0;
static var TC5CriminalLevel = 0;
static var TC6CriminalLevel = 0;
static var TC7CriminalLevel = 0;
static var TC8CriminalLevel = 0;
static var TC9CriminalLevel = 0;

static var AlertTime = 0;

static var instance : TerrahyptianNetwork;

static var CasualtyMeter = 0;

static var HasDropped : boolean;

InvokeRepeating("Tick", 1, 1);

InvokeRepeating("Tick2", 0.7, 3.3);

function Awake(){

	instance = this;
}

function Start(){
HasDropped = false;

AlertLVL1 = 0;
AlertLVL2 = 0;
}

function Tick () {

//Debug.Log(TC1CriminalLevel);

//if(EnemyTarget2)
//Debug.Log(EnemyTarget2.name);

if(TC1CriminalLevel < 480){
if(TC1CriminalLevel > 0)
TC1CriminalLevel -= 1;

if(TC1Nuisance > 2){
TC1CriminalLevel = 500;
}
}

if(TC4CriminalLevel < 480){
if(TC4CriminalLevel > 0)
TC4CriminalLevel -= 1;

if(TC4Nuisance > 2){
TC4CriminalLevel = 500;
}
}

if(TC5CriminalLevel < 480){
if(TC5CriminalLevel > 0)
TC5CriminalLevel -= 1;

if(TC5Nuisance > 2){
TC5CriminalLevel = 500;
}
}

if(TC6CriminalLevel < 480){
if(TC6CriminalLevel > 0)
TC6CriminalLevel -= 1;

if(TC6Nuisance > 2){
TC6CriminalLevel = 500;
}
}

if(TC7CriminalLevel < 480){
if(TC7CriminalLevel > 0)
TC7CriminalLevel -= 1;

if(TC7Nuisance > 2){
TC7CriminalLevel = 500;
}
}

if(TC8CriminalLevel < 480){
if(TC8CriminalLevel > 0)
TC8CriminalLevel -= 1;

if(TC8Nuisance > 2){
TC81CriminalLevel = 500;
}
}

if(TC9CriminalLevel < 480){
if(TC9CriminalLevel > 0)
TC9CriminalLevel -= 1;

if(TC9Nuisance > 2){
TC9CriminalLevel = 500;
}
}

}

function Tick2 () {

if(AnExtraBigTC1)
if(AnExtraBigTC1.name.Contains ("rok"))
AnExtraBigTC1 = null;
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
if(AnExtraBigTC9)
if(AnExtraBigTC9.name.Contains ("rok"))
AnExtraBigTC9 = null;

EnemyTarget2 = null;

UnitsPresent = false;

}