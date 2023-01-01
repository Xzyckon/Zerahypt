var BreakEffect: GameObject;
var BreakEffect2: GameObject;

var BrokenUp : boolean;

var CanSound : boolean;

InvokeRepeating("Tick", 1, 0.3);

function OnCollisionEnter(collision : Collision) {

if(!CanSound)
return;

if(collision.gameObject.tag == "SoftTerrain" || collision.gameObject.tag == "Terrain" || collision.gameObject.tag == "Structure"){

    CanSound = false;
    
    if(collision.relativeVelocity.magnitude > 30){
    Instantiate(BreakEffect2, transform.position, transform.rotation);
    Destroy(gameObject);
    }
    if(collision.relativeVelocity.magnitude > 15)
    Instantiate(BreakEffect, transform.position, transform.rotation);
    }
}

function Tick () {
CanSound = true;
}