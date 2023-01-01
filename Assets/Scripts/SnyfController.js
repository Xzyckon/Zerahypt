var Target : Transform;
var Lost = 0;

var forwardSpeed : float = 1;

var Handheld : boolean;

var Snyfped : boolean;
var StabForce = 10.0;
var AimForce = 0.0005;
var ContactDistance : float = 1;

var LeastTime : float = 0.2;
var MostTime : float = 1;
var Lengthrandomizer : float = 6.0;
var lastTime : float;
var soundsies : AudioClip[];

function PlayClipAndChange(){
    audio.clip = soundsies[Random.Range(0, soundsies.Length)];
    audio.pitch = Random.Range(1, 1.3);
    audio.Play();
}

function Update () {

if(!Handheld){

if(Lost == 50)
Destroy(gameObject);

if(Snyfped){
relative = transform.InverseTransformDirection(rigidbody.velocity);
animation["SnyfpedWalk"].speed = ((relative.z) * forwardSpeed);
}

}

 if(Time.time - lastTime > Lengthrandomizer) {
 
 if(!Handheld){
 
 if(!Snyfped){
 
 rigidbody.AddForce(transform.up * Random.Range (-0.02, 0.02));
 rigidbody.AddForce(transform.right * Random.Range (-0.02, 0.02));
 rigidbody.AddForce(transform.forward * Random.Range (-0.02, 0.02));

if(Target == null)
Lost += 1;
 
 if(Target != null){
Lost = 0;
if(Vector3.Distance(transform.position, Target.position) < 60){
   rigidbody.AddForce((Target.transform.position - transform.position).normalized * 0.04);
   } else {
   Target = null;
}
}
}
}
 
  Lengthrandomizer = LeastTime + Random.value * (MostTime - 0.2);
  PlayClipAndChange();
  lastTime = Time.time;
 }
}

function FixedUpdate (){

if(Handheld)
return;

if(Snyfped){
if (Physics.Raycast(transform.position, Vector3.down, ContactDistance)){
    rigidbody.AddForceAtPosition(Vector3.up*StabForce, transform.up * 1);
    rigidbody.AddForceAtPosition(-Vector3.up*StabForce, -transform.up * 1);
    
if(Target != null){
    rigidbody.AddForceAtPosition((Target.transform.position - transform.position).normalized * AimForce, transform.forward * 0.2);
    rigidbody.AddForceAtPosition((Target.transform.position - transform.position).normalized * -AimForce, -transform.forward * 0.2);
}

rigidbody.AddTorque(transform.up * Random.Range (-0.0002, 0.0002));

if(rigidbody.velocity.magnitude < 0.5)
rigidbody.AddForce(transform.forward * 0.002);
}

}
}

function OnCollisionEnter(collision : Collision) {

if(collision.gameObject.tag == "Projectile")
Destroy(gameObject);

}