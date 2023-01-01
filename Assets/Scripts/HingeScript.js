#pragma strict

var ConnectedDoor : GameObject;
var RecieveNode : GameObject;

var LockTF : boolean;

var Open : boolean;

var Out : boolean;

var MovingOut : boolean;
var MovingIn : boolean;

var PosX : float = 0;
var PosY : float = 0;
var PosZ : float = 0;

function Start () {

if(LockTF){
PosX = transform.localPosition.x;
PosY = transform.localPosition.y;
PosZ = transform.localPosition.z;
}

if(Open)
Move();
}

function FixedUpdate () {
if(LockTF){
transform.localPosition.x = PosX;
transform.localPosition.y = PosY;
transform.localPosition.z = PosZ;

transform.localRotation.y = 0;
transform.localRotation.z = 0;
}

if(MovingIn || MovingOut){
        if(hingeJoint.spring.targetPosition == -90){
        Out = true;
        MovingOut = false;
        }
        if(hingeJoint.spring.targetPosition == 0){
        Out = false;
        MovingIn = false;
        }
}
        if(MovingOut)
        if(hingeJoint.spring.targetPosition > -90)
            hingeJoint.spring.targetPosition -= 1;
            
        if(MovingIn)
        if(hingeJoint.spring.targetPosition < 0)
            hingeJoint.spring.targetPosition += 1;
}

function Move () {
if(ConnectedDoor)
ConnectedDoor.GetComponent(HingeScript).Move2();

            if(!Out){
            if(RecieveNode)
            RecieveNode.gameObject.SetActive (true);
            hingeJoint.spring.targetPosition += 1;
            MovingOut = true;
            MovingIn = false;
            }
            if(Out){
            if(RecieveNode)
            RecieveNode.gameObject.SetActive (false);
            hingeJoint.spring.targetPosition -= 1;
            MovingOut = false;
            MovingIn = true;
            }
}

function Move2 () {

            if(!Out){
            hingeJoint.spring.targetPosition += 1;
            MovingOut = true;
            MovingIn = false;
            }
            if(Out){
            hingeJoint.spring.targetPosition -= 1;
            MovingOut = false;
            MovingIn = true;
            }
}