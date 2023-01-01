var Target : Transform; 
	
	function LateUpdate() {
	if(Target == null)
    return;
			transform.rotation = Target.transform.rotation;
			transform.position = Target.transform.position;
	}