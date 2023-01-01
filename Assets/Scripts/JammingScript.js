var target : Transform;

function Update () {
if(target){
if(target.gameObject.GetComponent("MissileScript") != null)
   target.gameObject.GetComponent("MissileScript").AimForce = 0;
   }
}

function OnTriggerStay (other : Collider) {

if(other.collider.name.Contains ("MT"))
target = other.gameObject.transform;

if(other.collider.name.Contains ("sTC7"))
other.name = "sTC7j";

if(other.collider.name.Contains ("sTC2"))
other.name = "sTC2j";

if(other.collider.name.Contains ("sTC4"))
other.name = "sTC4j";

}