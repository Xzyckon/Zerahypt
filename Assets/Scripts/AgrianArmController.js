#pragma strict
var Aimer : GameObject;
var Arm : GameObject;

var Aiming : boolean;
var AimerTip : GameObject;
var AimerTarget : Transform;
var AimForce = 10.0;
var AimVel : float = 50;

private var NewRotation : Quaternion;

function Start () {

}

function FixedUpdate () {
if(Aiming){

NewRotation = Quaternion.LookRotation(AimerTarget.position - Aimer.transform.position);
  Aimer.transform.rotation = Quaternion.RotateTowards(Aimer.transform.rotation, NewRotation, Time.deltaTime * AimVel);

    Arm.rigidbody.AddForceAtPosition((AimerTip.transform.position - Arm.transform.position).normalized * -AimForce, -Arm.transform.forward*100);
    Arm.rigidbody.AddForceAtPosition((AimerTip.transform.position - Arm.transform.position).normalized * AimForce, Arm.transform.forward*100);
}
}