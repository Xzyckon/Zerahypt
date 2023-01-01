#pragma strict

var Pirizuka : Transform;
var PirizukaRB : Rigidbody;
var PiriTarget : Transform;
var PiriAim : Transform;
var PiriTurretAim : Transform;
var PiriHead : Transform;
var PiriNose : Transform;
var PiriREye : Transform;
var PiriLEye : Transform;
var PiriHeldThing : Transform;
var PiriHeldWeapon : Transform;
var PiriHeldToy : Transform;
var BackpackPoint : Transform;
var RBosom : Transform;
var LBosom : Transform;
var PiriTorso : GameObject;
var PiriWheel : GameObject;
var PiriPivot : GameObject;
var PiriAni : Animation;
var PiriCol2 : GameObject;
var PiriPresence : Transform;
var PhysCam : Transform;
var PlayerCam : Transform;
var TCCol : CapsuleCollider;

static var instance : PlayerInformation;

function Awake()
{
	instance = this;
}
