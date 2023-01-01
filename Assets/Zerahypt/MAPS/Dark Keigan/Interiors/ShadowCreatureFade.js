#pragma strict
var Name : String;
var targetAlpha : GameObject;
var fadedistance : float = 30;
var fadespeed : float = 0.05;
private var lastDistance : float; 
function Update () { 
    if(Vector3.Distance(transform.position, targetAlpha.transform.position) <= fadedistance) { 
        targetAlpha.renderer.material.color.a = 0; 
    } else if(Vector3.Distance(transform.position, targetAlpha.transform.position) > fadedistance) { 
        targetAlpha.renderer.material.color.a = (Vector3.Distance(transform.position, targetAlpha.transform.position) - fadedistance) * fadespeed; 
    } 
    lastDistance = Vector3.Distance(transform.position, targetAlpha.transform.position);
}
function Start () {
	if(targetAlpha == null)
	targetAlpha = GameObject.Find(Name);
}