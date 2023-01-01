var explosion: GameObject; // drag your explosion prefab here

var DirectedExplosion : boolean;

var UnchildFX1 : Transform;
var UnchildFX2 : Transform;

var C : boolean;

function OnCollisionEnter(collision : Collision) {

if(C || collision.gameObject.tag == "Explosions")
return;

C = true;

if(UnchildFX1 != null){
    UnchildFX1.parent = null;
    UnchildFX1.gameObject.GetComponent(ParticleSystem).emissionRate = 0;
    }
if(UnchildFX2 != null){
    UnchildFX2.parent = null;
    UnchildFX2.gameObject.GetComponent(ParticleSystem).emissionRate = 0;
    }
    
    if(DirectedExplosion){
    Instantiate(explosion, transform.position, transform.rotation);
    }
    
    if(!DirectedExplosion)
    Instantiate(explosion, transform.position, explosion.transform.rotation);
    
    Destroy(gameObject);
}