
var IsFinish : boolean;

var OtherGateScript : SprintGateScript;

var IsRunning : boolean;
var timer : float = 0.0;

var StartTmF : TextMesh;
var StartTmB : TextMesh;

var EndTmF : TextMesh;
var EndTmB : TextMesh;

function FixedUpdate(){
if(!IsFinish){

if(IsRunning)
     timer += Time.deltaTime;

	StartTmF.text = timer.ToString("F2");
	StartTmB.text = timer.ToString("F2");
	
	EndTmF.text = timer.ToString("F2");
	EndTmB.text = timer.ToString("F2");

}
}

function OnTriggerEnter (other : Collider) {

if(other.collider.name.Contains ("TC")){

if(!IsFinish && !IsRunning)
IsRunning = true;

if(IsFinish && OtherGateScript.IsRunning){
OtherGateScript.IsRunning = false;
}

}
}