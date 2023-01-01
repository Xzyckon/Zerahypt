var Multiplier : float;

var Num = 0;

var isTouching : boolean;
var nudge : boolean;

function FixedUpdate(){

if(Num > 0)
Num -= 1;

if(nudge){
if(Num < 1){
var Product : float = Random.Range(Multiplier, Multiplier * 1.5);
 rigidbody.AddForce(Vector3.up * Product, ForceMode.Impulse);
 nudge = false;
 isTouching = false;
 Num = 30;
 }
 }
}

function OnCollisionStay(){
if(Num < 1)
isTouching = true;
}