var host : Transform;

var CJ : ConfigurableJoint;

var targetLayers : LayerMask;

InvokeRepeating("Tick", 1, 0.73);

function Start () {
transform.parent = null;

var hit : RaycastHit;

if(Physics.Raycast (transform.position, transform.forward, hit, 5, targetLayers)){
if(hit.collider.rigidbody){
     
CJ = gameObject.AddComponent ("ConfigurableJoint");
CJ.connectedBody = hit.rigidbody;
CJ.xDrive.mode = JointDriveMode.Position;
CJ.yDrive.mode = JointDriveMode.Position;
CJ.zDrive.mode = JointDriveMode.Position;
CJ.angularXDrive.mode = JointDriveMode.Position;
CJ.angularYZDrive.mode = JointDriveMode.Position;
   
CJ.xDrive.positionSpring = 1000;
CJ.yDrive.positionSpring = 1000;
CJ.zDrive.positionSpring = 1000;
    
CJ.angularXDrive.positionSpring = 1000;
CJ.angularYZDrive.positionSpring = 1000;
   
CJ.xDrive.positionDamper = 1;
CJ.yDrive.positionDamper = 1;
CJ.zDrive.positionDamper = 1;
    
CJ.angularXDrive.positionDamper = 1;
CJ.angularYZDrive.positionDamper = 1;
CJ.targetPosition = Vector3(0,0,-hit.distance);

transform.name = hit.transform.name;

host = hit.transform;

if(host.name.Contains ("C3")){
Destroy(gameObject);
}else{
TerrahyptianNetwork.instance.NukeMarker = transform;
}

}
}

}

function Tick () {
if(host){
if(Vector3.Distance(transform.position, host.position) > 1024)
Destroy(gameObject);

if(host.name.Contains ("C3"))
Destroy(gameObject);
}else{
Destroy(gameObject);
}
}