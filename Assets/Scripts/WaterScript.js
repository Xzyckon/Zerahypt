
var Proddy : float = 1;

var Orientator : Transform;

var StrikePrefabPar: GameObject;
var StrikePrefabPer: GameObject;
var PerturbPrefab: GameObject;

var PerCount = 0;

var ParCount = 0;

var Object1: GameObject;
var ParCount1 = 0;
var Object2: GameObject;
var ParCount2 = 0;

function FixedUpdate () {

if(PerCount < 64)
PerCount += 1;

if(ParCount < 64)
ParCount += 1;

if(Object1)
if(ParCount1 < 64)
ParCount1 += 1;

if(Object2)
if(ParCount2 < 64)
ParCount2 += 1;
}

function OnTriggerExit (other : Collider) {
if(other.rigidbody){

if(other.rigidbody.angularDrag < 16)
other.rigidbody.angularDrag = 0.1;

if(other.gameObject == Object1)
Object1 = null;
if(other.gameObject == Object2)
Object2 = null;

}
}

function OnTriggerEnter (other : Collider) {
if(other.rigidbody){
var ORB = other.rigidbody;
var OTF = other.transform;
var localV = transform.InverseTransformDirection(ORB.velocity);

if(PerCount > 8)
if (-localV.y > 5)
if (ORB.mass > 0.045){

PerCount = 0;

if (ORB.mass < 0.15){
if (-localV.y > 10){
var Thing1 = Instantiate(StrikePrefabPer, other.transform.position, transform.rotation);
Thing1.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
}
}else{
var Thing0 = Instantiate(StrikePrefabPer, other.transform.position, transform.rotation);
Thing0.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
}

}

if(Vector3.Distance(OTF.position, PlayerInformation.instance.PiriPresence.position) < 512){
if(!Object1)
Object1 = other.gameObject;
if(!Object2)
Object2 = other.gameObject;
}

if(Object1 == Object2)
Object2 = null;

}
}

function OnTriggerStay (other : Collider) {

if(other.rigidbody){
    var ORB = other.rigidbody;
    var OTF = other.transform;

    var relativePoint = transform.InverseTransformPoint(OTF.position);
    ContactDist = relativePoint.y;
    
    if(ContactDist > 0){
    var ORBvel = ORB.velocity.magnitude;
    
    if(Vector3.Distance(OTF.position, PlayerInformation.instance.PiriPresence.position) < 2){
    
    if(ParCount > 6)
    if(ORB.velocity.magnitude > 10){
    var Thing1 = Instantiate(StrikePrefabPar, OTF.position, transform.rotation);
    Thing1.rigidbody.velocity = ORB.velocity * 1;
    Thing1.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount = 0;
    }else{
    if(ParCount > 8){
    var Thing2 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing2.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount = 0;
    }
    }
    }else{
    if(ParCount1 > 6)
    if(ORB.velocity.magnitude > 10){
    var Thing3 = Instantiate(StrikePrefabPar, OTF.position, transform.rotation);
    Thing3.rigidbody.velocity = ORB.velocity * 1;
    Thing3.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount1 = 0;
    }else{
    if(ParCount1 > 8){
    var Thing4 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing4.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount1 = 0;
    }
    }
    
    if(ParCount2 > 6)
    if(ORB.velocity.magnitude > 10){
    var Thing5 = Instantiate(StrikePrefabPar, OTF.position, transform.rotation);
    Thing5.rigidbody.velocity = ORB.velocity * 1;
    Thing5.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount2 = 0;
    }else{
    if(ParCount2 > 8){
    var Thing6 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing6.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount2 = 0;
    }
    }
    }
    
    if (ORB.velocity != Vector3.zero)
    Orientator.rotation = Quaternion.LookRotation(ORB.velocity);
    
    ORB.AddTorque(Orientator.right * ORBvel * ORB.mass * ContactDist);
    ORB.AddForce(ORB.velocity * ORB.mass * -1);
    }else{
    var Clamp = Mathf.Clamp(ContactDist,-1,0);
    
    if(Vector3.Distance(OTF.position, PlayerInformation.instance.PiriPresence.position) < 2){
    
    if(ParCount > 8){
    var Thing7 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing7.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount = 0;
    }
    }else{
    if(ParCount1 > 8){
    var Thing8 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing8.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount1 = 0;
    }
    if(ParCount2 > 8){
    var Thing9 = Instantiate(PerturbPrefab, OTF.position, transform.rotation);
    Thing9.transform.position = Vector3(OTF.position.x,transform.position.y,OTF.position.z);
    ParCount2 = 0;
    }
    }
    if(ORB.angularDrag < 16)
    ORB.angularDrag = 8;
    ORB.AddForce(ORB.velocity * ORB.mass * -4);
    ORB.AddForce(Vector3.up * ORB.mass * 21 * -Clamp);
    }
    
    }
}