
var PriorityWaypoint : Transform;

var AbiaBaseHomePoint : Transform;

var AbiaBaseDock1E : Transform;
var AbiaBaseDock1P : Transform;
var AbiaBaseDock1A : Transform;

var BasePath0 : Transform;
var BasePath1 : Transform;
var BasePath2 : Transform;
var BasePath3 : Transform;
var BasePath4 : Transform;

static var target : Transform;

var Elite1 : GameObject;

var Elite2 : GameObject;

static var TC0aCriminalLevel = 0;

static var TC1CriminalLevel = 0;
static var TC2CriminalLevel = 0;
static var TC3CriminalLevel = 0;
static var TC4CriminalLevel = 0;
static var TC5CriminalLevel = 0;
static var TC7CriminalLevel = 0;
static var TC8CriminalLevel = 0;
static var TC9CriminalLevel = 0;

static var Alert : boolean;

static var Emergency : boolean;

static var Confirmed : boolean;

static var instance : AbiaSyndicateNetwork;

InvokeRepeating("Tick", 1, 1);

function Awake(){

	instance = this;
}

function Tick () {
if(!Alert){
if(TC0aCriminalLevel > 0)
TC0aCriminalLevel -= 1;

if(TC1CriminalLevel > 0)
TC1CriminalLevel -= 1;

if(TC2CriminalLevel > 0)
TC2CriminalLevel -= 1;

if(TC3CriminalLevel > 0)
TC3CriminalLevel -= 1;

if(TC4CriminalLevel > 0)
TC4CriminalLevel -= 1;

if(TC5CriminalLevel > 0)
TC5CriminalLevel -= 1;

if(TC7CriminalLevel > 0)
TC7CriminalLevel -= 1;

if(TC8CriminalLevel > 0)
TC8CriminalLevel -= 1;

if(TC9CriminalLevel > 0)
TC9CriminalLevel -= 1;
}
}