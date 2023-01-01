#pragma strict

var Ally : Transform;
var AllyFollowDist : float = 2;
var Power : float = 0.05;

var LookForce : float = 0.1;

function Start () {

}

function FixedUpdate () {
if(Ally != null){

    rigidbody.AddForceAtPosition((Ally.transform.position - transform.position).normalized * LookForce, transform.forward * 1);
    rigidbody.AddForceAtPosition((Ally.transform.position - transform.position).normalized * -LookForce, -transform.forward * 1);

if(Vector3.Distance(transform.position, Ally.position) > AllyFollowDist){
   rigidbody.AddForce((Ally.transform.position - transform.position).normalized * Power);
   }
if(Vector3.Distance(transform.position, Ally.position) < AllyFollowDist){
   rigidbody.AddForce((Ally.transform.position - transform.position) * 0);
   }
}
}