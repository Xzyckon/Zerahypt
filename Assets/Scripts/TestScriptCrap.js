var target : Transform;

var WhatToSpawn : GameObject;

var Dist : float;

var RelativeTarget : Vector3;

var EndMultiplier : float = 0.5;

var DistMultiplier : float = 0.5;

var RPX : float = 0;
var RPY : float = 0;

var FuckingRead1 : float = 0;
var FuckingRead2 : float = 0;

function Update () {

if(FuckingRead2 > 0.48 && FuckingRead2 < 0.52){
var TheThing1 = Instantiate(WhatToSpawn, target.position, target.rotation);
    TheThing1.transform.parent = transform;
}

//if(FuckingRead1 > 0.08 && FuckingRead1 < 0.12){
//var TheThing2 = Instantiate(WhatToSpawn, target.position, target.rotation);
//    TheThing2.transform.parent = transform;
//}

}

function FixedUpdate () {

if(target){

RelativeTarget = transform.InverseTransformPoint(target.position);

Dist = RelativeTarget.z;

DistMod = Dist * DistMultiplier;

RPModX = RelativeTarget.x / DistMod;
RPModY = RelativeTarget.y / Dist / DistMod;
RPX = RPModX;
RPY = RPModY * EndMultiplier;
FuckingRead1 = Mathf.Abs(RPX);
FuckingRead2 = Mathf.Abs(RPY);
}
}





