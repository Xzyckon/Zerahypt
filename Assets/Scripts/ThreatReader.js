var IgnoreThis : String = "PersonMcPersonface";

function OnTriggerEnter (other : Collider) {
if(other.collider.name.Contains ("TC"))
if(!other.collider.name.Contains (IgnoreThis))
Destroy(gameObject);
}