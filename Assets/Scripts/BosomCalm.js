
function Update () {

if(rigidbody.velocity.magnitude < 15){
GetComponent(ConfigurableJoint).angularXDrive.positionDamper = 0;
GetComponent(ConfigurableJoint).angularYZDrive.positionDamper = 0;
}
if(rigidbody.velocity.magnitude > 15){
GetComponent(ConfigurableJoint).angularXDrive.positionDamper = 0.0002;
GetComponent(ConfigurableJoint).angularYZDrive.positionDamper = 0.0002;
}
if(rigidbody.velocity.magnitude > 50){
GetComponent(ConfigurableJoint).angularXDrive.positionDamper = 0.0005;
GetComponent(ConfigurableJoint).angularYZDrive.positionDamper = 0.0005;
}

}