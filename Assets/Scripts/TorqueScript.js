var Force : float = 1;
var Torque : float = 1;

var TorqueX : float = 0;
var TorqueY : float = 0;
var TorqueZ : float = 0;

var SkipY : boolean;

var UseRandom : boolean = true;
var UseUpdate : boolean;
var UseTorque : boolean = true;
var UseForce : boolean;

function Start() {
 if(!UseUpdate && UseTorque && !UseRandom){
 rigidbody.AddTorque(transform.up * TorqueY);
 rigidbody.AddTorque(transform.right * TorqueX);
 rigidbody.AddTorque(transform.forward * TorqueZ);
 }
 if(!UseUpdate && UseTorque && UseRandom){
 if(!SkipY)
 rigidbody.AddTorque(transform.up * Random.Range (-Torque, Torque));
 rigidbody.AddTorque(transform.right * Random.Range (-Torque, Torque));
 rigidbody.AddTorque(transform.forward * Random.Range (-Torque, Torque));
 }
 if(!UseUpdate && UseForce){
 rigidbody.AddForce(transform.up * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.right * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.forward * Random.Range (-Force, Force));
 }
}
 
 function FixedUpdate() {
 if(UseUpdate && UseTorque){
 rigidbody.AddTorque(transform.up * Random.Range (-TorqueY, TorqueY));
 rigidbody.AddTorque(transform.right * Random.Range (-TorqueX, TorqueX));
 rigidbody.AddTorque(transform.forward * Random.Range (-TorqueZ, TorqueZ));
 }
 if(UseUpdate && UseForce){
 rigidbody.AddForce(transform.up * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.right * Random.Range (-Force, Force));
 rigidbody.AddForce(transform.forward * Random.Range (-Force, Force));
 }
}