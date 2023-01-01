var Target : Transform; 
	
	function FixedUpdate() {
	
	        if(Target == null){
			Destroy (gameObject);
			}else{
			transform.rotation = Target.rotation;
			transform.position = Target.position;
			}
	}