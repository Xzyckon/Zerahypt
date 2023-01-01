#pragma strict

var NPC : GameObject;
var forwardSpeed = 1F;
var sprintSpeed = 1F;
var WalkingThreshold = 2.5F;
var Idle : String;
var forward : String;
var sprint : String;
var falling : String;
var backward : String;
var targetRigidbody : GameObject;
enum npcState { Idle, WalkForward, WalkBackward, Sprinting }
var state : npcState;
private var relative : Vector3;
 
function Start () {

}
 
function Update () {
    relative = transform.InverseTransformDirection(targetRigidbody.rigidbody.velocity);
   
        if(relative.z > relative.x && relative.z > 0.4){
                if(relative.z < WalkingThreshold){
                        if(state != npcState.WalkForward){
                                animation.CrossFade(forward);
                                state = npcState.WalkForward;
                        }
                        if(animation.IsPlaying(forward))
                        animation[forward].speed = ((relative.z) * forwardSpeed);
                } else {
                        if(state != npcState.Sprinting){
                                animation.CrossFade(sprint);
                                state = npcState.Sprinting;
                        }
                        if(animation.IsPlaying(sprint))
                        animation[sprint].speed = ((relative.z) * sprintSpeed);
                }
        }
      reset();
}
 
function reset () {
    if(relative.x >= -0.4 && relative.x < 0.4 && relative.z >= -0.4 && relative.z < 0.4){
        if(!animation.IsPlaying(Idle)){
            animation.CrossFade(Idle, 0.5);
            state = npcState.Idle;
        }
    }
}