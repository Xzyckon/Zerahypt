var Fire : GameObject;
var BarrelLocation : Transform;

var TargetCode = 6;

var RigidFlash : boolean;

var Firing : boolean;

var SkipBursts : boolean;
var BurstTime : float = 0.1;

var ShotChanceIn = 8;

var Counter = 0;

var RepTime = 0.3;

InvokeRepeating("Shoot", Random.Range(0.1f, 2.9f), RepTime);

function Shot(){

if(RigidFlash){
var TheThing = Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
TheThing.transform.parent = gameObject.transform;
}

if(!RigidFlash)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
}

function Burst1(){
yield WaitForSeconds (BurstTime);
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
}

function Burst2(){
yield WaitForSeconds (BurstTime);
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
}

function Burst3(){
yield WaitForSeconds (BurstTime);
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
}

function Burst4(){
yield WaitForSeconds (BurstTime);
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
yield WaitForSeconds (BurstTime);
if(Firing)
Instantiate(Fire, BarrelLocation.position, BarrelLocation.rotation);
}

function Shoot () {
if(gameObject.activeSelf == true && Firing){
var Interval: int = Random.Range(0, ShotChanceIn);
if(!SkipBursts){
if(Counter == 0 && TargetCode == 7){
  switch (Interval) {
  case 1:
  Shot();
  Counter = 1;
  break;
}
}

if(Counter == 0 && TargetCode == 5){
  switch (Interval) {
  case 1:
  Burst1();
  Counter = 3;
  break;
  case 2:
  Burst2();
  Counter = 4;
  break;
  case 3:
  Burst3();
  Counter = 5;
  break;
  case 4:
  Burst4();
  Counter = 7;
  break;
}
}

if(Counter == 0 && TargetCode == 6){
  switch (Interval) {
  case 1:
  Shot();
  Counter = 3;
  break;
  case 2:
  Burst1();
  Counter = 4;
  break;
  case 3:
  Burst2();
  Counter = 5;
  break;
}
}

if(Counter > 0)
Counter -= 1;
}else{
if(Counter == 0 && TargetCode == 7){
  switch (Interval) {
  case 1:
  Shot();
  Counter = 1;
  break;
}
}

if(Counter == 0 && TargetCode == 5){
  switch (Interval) {
  case 1:
  Shot();
  Counter = 1;
  break;
}
}
if(Counter == 0 && TargetCode == 6){
  switch (Interval) {
  case 1:
  Shot();
  Counter = 1;
  break;
}
}

if(Counter > 0)
Counter -= 1;
}

}
}