#pragma strict

enum hState { Idle, Idle2, Idle3 }
var aState: hState = hState.Idle;
private var lastTime: float;

function FixedUpdate () {
 if( (Time.time - lastTime) < 0.5)
  return;
 else
  lastTime = Time.time;
 
 var randomValue: int = Random.Range(0, 10);
 
 switch (randomValue) {
  case 1://when randomValue is 1
   aState = hState.Idle2;
   animation.Play();
   break;
  case 2://when randomValue is 2
   aState = hState.Idle3;
   break;
  default://When randomValue is not 1 or 2
   aState = hState.Idle;
   break;
 }
}

function PlayAnimation(ani: String) {
 if (!animation.IsPlaying(ani)){
  animation.Play(ani);
 }
}