
static var Amount1 = 0;
static var Amount2 = 0;

static var KabrianPolicePresent : boolean;

InvokeRepeating("Counter", 0.33, 1);

function Start (){
KabrianPolicePresent = false;
}

function Counter () {

if(KabrianPolicePresent)
if(WorldInformation.vehicleSpeed > 1200)
AgrianNetwork.Spawn = 16;

if(Amount1 > 1)
Amount1 -= 128;

if(Amount1 < 0)
Amount1 = 0;

if(Amount1 > 400){
AgrianNetwork.Spawn = 4;
Amount1 = 400;
}

if(Amount2 > 1)
Amount2 -= 520;

if(Amount2 < 0)
Amount2 = 0;

if(Amount2 > 10000){
AgrianNetwork.Spawn = 4;
Amount2 = 10000;
}

}