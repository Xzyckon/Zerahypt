var target : Transform;

var useAimPoint : boolean;
var Point : Transform;

function Start (){
if(useAimPoint)
Point = GameObject.Find("AimPointTarget").gameObject.transform;
}

function LateUpdate () {
if(!useAimPoint)
transform.LookAt(target);
else
transform.LookAt(Point);
}