    var target : Transform;
	
	var entered : boolean = false;

function OnTriggerEnter (other : Collider) {
if(other.name.Contains("FPCnose")){
	entered = true;
    }
}

function OnTriggerExit (other : Collider) {
if(other.name.Contains("FPCnose")){
	entered = false;
    }
}

	function Update() {
	if (Input.GetMouseButton (0) && entered == true){
		transform.LookAt(target);
	}
}