#pragma strict

var Sound : GameObject;

function OnTriggerEnter (other : Collider){
    if(other.name.Contains("SoundTriggerActivator")){
    
    var TheThing = Instantiate(Sound, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
		TheThing.transform.parent = gameObject.transform;
		
	}
}