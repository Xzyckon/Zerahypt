var Type : GameObject;
var Type2 : GameObject;
var DifferentTypes : boolean;
var RareType : boolean;
var PlayerPresence : Transform;
var SpawnTick : float = 0.1;

var DropDist = 5;

var IsActive : boolean;
var ForceSpawn : boolean;

var SpawnAtStart : boolean;

var UsePlayerProxy : boolean = true;
var UseSpecialProxy : boolean;

var SPMinDist = 1000;
var SPMaxDist = 2000;

var RotateRandomly : boolean;
var RotateSlightly : boolean;
var ButtonSpawned : boolean;
var SpawnOnce : boolean;
var LocalSpawn : boolean;

var UseSpawnChance : boolean;
var OneIn : float = 2;

InvokeRepeating("Spawnie", SpawnTick, SpawnTick);

var TheThingie : GameObject;

function Update () {
if(Input.GetKeyDown("y") && ButtonSpawned)
KeySpawn();

if(ForceSpawn){
ForceSpawn = false;
SpawnIt();
}
}

function Start () {

PlayerPresence = PlayerInformation.instance.PiriPresence;

if(!UseSpawnChance)
IsActive = true;
else
IsActive = false;

if(SpawnAtStart){
Spawnie();
Destroy(this);
}

}

function Spawnie () {

  var Interval: int = Random.Range(0, OneIn);

if(UseSpawnChance){
  switch (Interval) {
  case 1:
   IsActive = true;
   break;
}
}

if(IsActive){
if(!ButtonSpawned && !SpawnOnce && !LocalSpawn)
Spawn1();
if(!ButtonSpawned && SpawnOnce && !LocalSpawn)
Spawn2();
if(!ButtonSpawned && !SpawnOnce && LocalSpawn)
Spawn3();
}
}

function Spawn1 () {

var hit : RaycastHit;

if (Physics.Raycast (transform.position, -transform.up, hit, 20000)) {

if(UsePlayerProxy || UseSpecialProxy)
var PresPos : Vector3 = PlayerPresence.position;

var randomRotation = Quaternion.Euler( 0 , Random.Range(0, 360) , 0);

if(UsePlayerProxy && TheThingie == null && Vector3.Distance(hit.point, PresPos) > 2000){
   
   if(RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   }else{
            if(!RareType){
            var randomValue1 : int = Random.Range(1, 3);
            switch (randomValue1) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		}
    		}else{
    		var randomValue2 : int = Random.Range(1, 5);
    		switch (randomValue2) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 3:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 4:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		}
    		}
   }
   }
   
   if(!RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
   }else{
            if(!RareType){
            var randomValue3 : int = Random.Range(1, 3);
            switch (randomValue3) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
    		}else{
    		var randomValue4 : int = Random.Range(1, 5);
    		switch (randomValue4) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 3:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 4:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
    		}
   }
   }
if(RotateSlightly)
TheThingie.transform.Rotate(Vector3.up * Random.Range (-30, 30));
}

if(UseSpecialProxy && !TheThingie && Vector3.Distance(hit.point, PresPos) > SPMinDist && Vector3.Distance(hit.point, PresPos) < SPMaxDist){
   
   if(RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   }else{
            if(!RareType){
            var randomValue5 : int = Random.Range(1, 3);
            switch (randomValue5) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		}
    		}else{
    		var randomValue6 : int = Random.Range(1, 5);
    		switch (randomValue6) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 3:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		case 4:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, randomRotation);
    		break;
    		}
    		}
   }
   }
   
   if(!RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
   }else{
            if(!RareType){
            var randomValue7 : int = Random.Range(1, 3);
            switch (randomValue7) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
    		}else{
    		var randomValue8 : int = Random.Range(1, 5);
    		switch (randomValue8) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 3:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 4:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
    		}
   }
   }
if(RotateSlightly)
TheThingie.transform.Rotate(Vector3.up * Random.Range (-30, 30));
}
   
if(!UsePlayerProxy && !UseSpecialProxy && TheThingie == null){

   if(RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   }else{
   var randomValue9 : int = Random.Range(1, 3);
   switch (randomValue9) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
   }
   }
   if(!RotateRandomly){
   if(!DifferentTypes){
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
   }else{
   var randomValue0 : int = Random.Range(1, 3);
   switch (randomValue0) {
    		case 1:
    		TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		case 2:
    		TheThingie = Instantiate(Type2, hit.point + transform.up * DropDist, transform.rotation);
    		break;
    		}
   }
   }
   }
}
}

function Spawn2 () {

var hit : RaycastHit;

if (Physics.Raycast (transform.position, -transform.up, hit, 20000)) {

if(UsePlayerProxy)
var PresPos : Vector3 = PlayerPresence.position;

var randomRotation = Quaternion.Euler( 0 , Random.Range(0, 360) , 0);

if(UsePlayerProxy && TheThingie == null && Vector3.Distance(hit.point, PresPos) > 2000){
   
   if(RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
   IsActive = false;
   }
if(!UsePlayerProxy && TheThingie == null){

   if(RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
   IsActive = false;
   }
}
}

function Spawn3 () {

if(UsePlayerProxy || UseSpecialProxy)
var PresPos : Vector3 = PlayerPresence.position;

var randomRotation = Quaternion.Euler( 0 , Random.Range(0, 360) , 0);

if(UsePlayerProxy && TheThingie == null && Vector3.Distance(transform.position, PresPos) > 2000){
   
   if(RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, transform.rotation);
   }
   
if(UseSpecialProxy && !TheThingie && Vector3.Distance(transform.position, PresPos) > SPMinDist && Vector3.Distance(transform.position, PresPos) < SPMaxDist){
   if(RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, transform.rotation);
   }
   
if(!UsePlayerProxy && !UseSpecialProxy &&  TheThingie == null){
   if(RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, transform.position, transform.rotation);
   }
}

function SpawnIt () {

var hit : RaycastHit;

if(UsePlayerProxy)
var PresPos : Vector3 = PlayerPresence.position;

if (Physics.Raycast (transform.position, -transform.up, hit, 20000)) {

var randomRotation = Quaternion.Euler( 0 , Random.Range(0, 360) , 0);

if(UsePlayerProxy && TheThingie == null && Vector3.Distance(hit.point, PresPos) > 2000){
   if(RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);
}
}
}

function KeySpawn () {

var hit : RaycastHit;

if (Physics.Raycast (transform.position, -transform.up, hit, 20000)) {

var randomRotation = Quaternion.Euler( 0 , Random.Range(0, 360) , 0);

   if(RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, randomRotation);
   if(!RotateRandomly)
   TheThingie = Instantiate(Type, hit.point + transform.up * DropDist, transform.rotation);

}
}