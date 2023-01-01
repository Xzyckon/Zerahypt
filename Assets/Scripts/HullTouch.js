
var AI : GameObject;
var AIName : String = "AgrianExecutorCruiserAI";

var DoesSheRotate : boolean;

function OnCollisionStay(collision : Collision){
if(AI){
if(!DoesSheRotate){
if(collision.gameObject.tag == "Vehicle" || 
   collision.gameObject.tag == "Body" || 
   collision.gameObject.tag == "Metal" ||
   collision.gameObject.tag == "Structure" ||
   collision.gameObject.tag == "MetalStructure"){
AI.GetComponent(AIName).OnHull = true;
}
}else{
if(collision.gameObject.tag == "Vehicle" || 
   collision.gameObject.tag == "Body" || 
   collision.gameObject.tag == "Metal"){
AI.GetComponent(AIName).OnHull = true;
}
}
}
}