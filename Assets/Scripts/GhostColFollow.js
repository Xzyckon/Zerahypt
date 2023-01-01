#pragma strict

var Target : Transform; 

function Start () {
transform.parent = null;
}

function LateUpdate() {
	if(Target == null){
	Destroy(gameObject);
    return;
    }
    
			transform.rotation = Target.transform.rotation;
			transform.position = Target.transform.position;
}