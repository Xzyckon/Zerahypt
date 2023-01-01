var Target : Transform; 

var damping = 6.0;
	
	function LateUpdate() {
		var rotation = Quaternion.LookRotation(Target.position - transform.position);
			transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
	}