var UseStepping : boolean;
var StepAmount : float;
var StepSpeed : int;
var Step : int;

var Broken : boolean;

var Ratex : float = 23.4;
var Ratey : float = 0;
var Ratez : float = 0;
 
function FixedUpdate() {
if(!Broken){
if(UseStepping){
if(Step > StepSpeed){
transform.Rotate(Ratex,Ratey,Ratez * StepAmount);
Step = 0;
}else{
Step += 1;
}
}else{
transform.Rotate(Ratex,Ratey,Ratez*Time.deltaTime);
}
}
}