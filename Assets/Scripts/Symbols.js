#pragma strict

var Enter : Transform;
var Interact : Transform;
var Talk : Transform;
var Open : Transform;
var Ammo : Transform;

var Reticle : Transform;

static var instance : Symbols;

function Awake()
{
	instance = this;
}