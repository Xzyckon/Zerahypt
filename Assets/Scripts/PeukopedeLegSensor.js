var MainPeuk : PeukopedeAI;

var LiftPower = 0;

InvokeRepeating("Resetter", 1, 0.3);

function FixedUpdate (){
if(MainPeuk)
rigidbody.AddForce(transform.right * LiftPower);
else
Destroy(this);
}

function Resetter (){
MainPeuk.Standing = false;
}

function OnCollisionStay(collision : Collision) {

if(collision.gameObject.tag == "SoftTerrain" || collision.gameObject.tag == "Terrain"
                                              || collision.gameObject.tag == "Structure" 
                                              || collision.gameObject.tag == "Metal" 
                                              || collision.gameObject.tag == "Vehicle")
     MainPeuk.Standing = true;
}