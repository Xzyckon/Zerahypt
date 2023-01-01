var warpTF : Transform;
var warpCol : GameObject;

var endProduct : GameObject;

var FleetNum : int;

var isWarping : boolean;

var warpStartSpeed : float;
var warpStartCurve : AnimationCurve = new AnimationCurve();
var warpStartNum : float;

var warpStartFX : GameObject;
var warpStartFXNum : float;
var warpStartFXed : boolean;

var warpEndSpeed : float;
var warpEndCurve : AnimationCurve = new AnimationCurve();
var warpEndNum : float;

var warpEndFX : GameObject;
var warpEndFXNum : float;
var warpEndFXed : boolean;

var warpSpeed : float;
var warpDist : int;

function Start () {
isWarping = true;

warpDist -= 256;
}

function FixedUpdate () {

if(!isWarping)
return;




if(warpTF.localPosition.z < warpDist){
if(warpStartNum < 1){
warpStartNum += warpStartSpeed;
warpSpeed = warpStartCurve.Evaluate(warpStartNum);
if(!warpStartFXed)
if(warpStartNum > warpStartFXNum){
warpStartFXed = true;
Instantiate(warpStartFX, warpTF.position, transform.rotation);
}
}

}else{
if(warpEndNum < 1){
warpEndNum += warpEndSpeed;
warpSpeed = warpEndCurve.Evaluate(warpEndNum);
if(!warpEndFXed)
if(warpEndNum > warpEndFXNum){
warpStartFXed = false;
warpEndFXed = true;
Instantiate(warpEndFX, warpTF.position, transform.rotation);
}
}else{
isWarping = false;
WarpEnd();
}
}


warpTF.localPosition.z += warpSpeed;



}

function WarpEnd () {
Destroy(warpCol);
yield WaitForSeconds (0.1);





var prodInst = Instantiate(endProduct, warpTF.position, warpTF.rotation);

switch (FleetNum) {
case 1:
prodInst.transform.GetChild(0).GetComponent(AgrianTowerAI).isFleetVessel1 = true;
break;
case 2:
prodInst.transform.GetChild(0).GetComponent(AgrianTowerAI).isFleetVessel2 = true;
break;
case 3:
prodInst.transform.GetChild(0).GetComponent(AgrianTowerAI).isFleetVessel3 = true;
break;
}




Destroy(gameObject);
}