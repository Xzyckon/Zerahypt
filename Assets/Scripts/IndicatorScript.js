#pragma strict

var isDamage : boolean;
static var VehicleIsDamaged : boolean;

var isGunDamage : boolean;
static var GunIsDamaged : boolean;

var isParking : boolean;
static var ParkingBrakeOn : boolean;

var isCivilmode : boolean;
static var CivilmodeOn : boolean;

var isVSmode : boolean;
static var VSmodeOn : boolean;

var isCargo : boolean;
static var CargoIsFull : boolean;

static var IsInsideVehicle : boolean;

var Tick : boolean;

function Start () {
VehicleIsDamaged = false;
GunIsDamaged = false;
ParkingBrakeOn = false;
CivilmodeOn = false;
VSmodeOn = false;
IsInsideVehicle = false;
}

function Update () {

if(!IsInsideVehicle)
return;

if(isDamage)
if(VehicleIsDamaged)
Blinker();
if(isGunDamage)
if(GunIsDamaged)
Blinker();
if(isParking)
if(ParkingBrakeOn)
Blinker();
if(isCivilmode)
if(CivilmodeOn)
Blinker();
if(isVSmode)
if(VSmodeOn)
Blinker();
if(isCargo)
if(CargoIsFull)
Blinker();
}

function Blinker () {
if(Tick)
return;

Tick = true;
yield WaitForSeconds (0.5);
gameObject.renderer.enabled = true;
yield WaitForSeconds (0.5);
gameObject.renderer.enabled = false;
Tick = false;
}