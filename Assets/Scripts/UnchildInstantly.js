#pragma strict

var ChangeTrig : boolean;
var Delayed : boolean;
var UnchildUp : boolean;
var TrigRad : float = 20;

var Trig : SphereCollider;
var CTrig : CapsuleCollider;

function Start () {
if(!Delayed && !UnchildUp)
transform.parent = null;

if(UnchildUp)
transform.parent = transform.parent.parent;

yield WaitForSeconds (0.25);

if(ChangeTrig){
if(Trig)
Trig.radius = TrigRad;
if(CTrig)
CTrig.radius = TrigRad;
}

yield WaitForSeconds (0.25);

if(Delayed)
transform.parent = null;
}