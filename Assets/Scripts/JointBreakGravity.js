#pragma strict

var HomePoint : GameObject; 

var MaxDistance : float = 0.2; 

function Update () { 
if(HomePoint != null)
if(Vector3.Distance(transform.position, HomePoint.transform.position) > MaxDistance){

        var bJoint : ConfigurableJoint = gameObject.GetComponent(ConfigurableJoint);
        
        if(bJoint != null){
	    bJoint.angularXDrive.mode = JointDriveMode.None; 
	    bJoint.angularYZDrive.mode = JointDriveMode.None;
	    bJoint.xDrive.mode = JointDriveMode.None; 
	    bJoint.yDrive.mode = JointDriveMode.None;
	    bJoint.zDrive.mode = JointDriveMode.None;
	    }
	    
		rigidbody.useGravity = true;
}
}