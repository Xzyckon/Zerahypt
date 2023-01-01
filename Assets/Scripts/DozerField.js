var Power : float = 0.05;

var ChangeDrag : boolean;

var UseCurve : boolean;
var ForceCurve : AnimationCurve = new AnimationCurve();
var ForceAmount : float = 0;

function OnTriggerEnter (other : Collider) {
   if(ChangeDrag)
   if(other.rigidbody){
    other.rigidbody.drag = 0.5;
    other.rigidbody.useGravity = false;
    }
}

function OnTriggerStay (other : Collider) {
if(!other.rigidbody)
return;

   if(!UseCurve){
    other.rigidbody.AddForce((other.transform.position - transform.position).normalized * Power);
    }else{
    var p = Vector3.Distance(other.transform.position, transform.position);
    ForceAmount = ForceCurve.Evaluate(p);
    other.rigidbody.AddForce((other.transform.position - transform.position).normalized * -ForceAmount);
    }
}

function OnTriggerExit (other : Collider) {
   if(ChangeDrag)
   if(other.rigidbody){
    other.rigidbody.drag = 0.05;
    other.rigidbody.useGravity = true;
    }
}