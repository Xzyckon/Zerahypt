var Ally : Transform;
var Sensor : GameObject;
var DeathEffect : GameObject;
var AllyFollowDist : float = 2;
var Power : float = 0.05;

function FixedUpdate () {
if(Ally != null){
if(Vector3.Distance(transform.position, Ally.position) > AllyFollowDist){
   rigidbody.AddForce((Ally.transform.position - transform.position).normalized * Power);
   }
if(Vector3.Distance(transform.position, Ally.position) < AllyFollowDist){
   rigidbody.AddForce((Ally.transform.position - transform.position) * 0);
   }
}
}

function OnCollisionEnter(collision : Collision) {

if(collision.gameObject.tag == "NPCProjectile" || collision.gameObject.tag == "PlayerThreat" ){
Instantiate(DeathEffect, transform.position, transform.rotation);
Destroy(gameObject);
}
}