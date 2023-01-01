#pragma strict
var offset : Vector3;
var maxOffset : float = 100;
private var originObject : GameObject;

var BasedOn : GameObject;

var OtherTarget : Transform;

var LookingAtOther : boolean;

var OriginalTarget : Transform;

var CanSwitchTarget : boolean;

var Line : GameObject;

var NameGO : GameObject;

var NameTag : TextMesh;

var Trig : CapsuleCollider;

function Start () {
	originObject = new GameObject();
	originObject.name = "FocusPointOrigin";
	originObject.transform.position = transform.position;
	originObject.transform.rotation = transform.rotation;
	originObject.transform.parent = transform.parent;
}

function Update () {
    if(!CanSwitchTarget){
    if(!BasedOn)
	offset = transform.parent.rigidbody.velocity * 0.24;
	else
	offset = BasedOn.rigidbody.velocity * 0.23;
	}
	
	if(CanSwitchTarget){
	if(Input.GetMouseButtonDown(0))
	if(WorldInformation.playerCar == transform.parent.name && OtherTarget != null){
	Trig.center = Vector3(0,0,0);
    Trig.radius = 1;
    Trig.height = 1;
	LookingAtOther = true;
	transform.position = OtherTarget.position;
	transform.rotation = OtherTarget.rotation;
	CameraScript.instance.CheckCars(OtherTarget, 10);
	NameGO.SetActive (false);
	Line.SetActive (false);
	}
	
	if(Input.GetMouseButtonDown(1)){
	LookingAtOther = false;
	transform.position = originObject.transform.position;
	transform.rotation = originObject.transform.rotation;
	if(WorldInformation.playerCar == transform.parent.name){
	Trig.center = Vector3(0,-1000,0);
    Trig.radius = 16;
    Trig.height = 2000;
    CameraScript.instance.CheckCars(gameObject.transform, 10);
    Line.SetActive (true);
	}
	}
	
	if(Input.GetMouseButtonUp(1))
	if(WorldInformation.playerCar == transform.parent.name){
	Trig.center = Vector3(0,0,0);
    Trig.radius = 1;
    Trig.height = 1;
    Line.SetActive (false);
    NameGO.SetActive (false);
	}
	
	if(LookingAtOther){
	if(OtherTarget != null)
	transform.position = OtherTarget.position;
	}
	
	}
	
	
	if (offset.x > maxOffset || offset.y > maxOffset || offset.z > maxOffset)
	{
		offset = Max(offset, maxOffset);
	}
	
	var newPos : Vector3 = originObject.transform.position + offset;
	transform.position = newPos;

}

function OnTriggerEnter (other : Collider) {
if(other.collider.name.Contains ("TC") && !other.collider.name.Contains ("TC1")){
  OtherTarget = other.gameObject.transform;
  NameTag.text = other.name;
  NameGO.SetActive (true);
  }
}

function Max(_value : Vector3, _maxValue : float) : Vector3 {
	if(_value.x > _maxValue) _value.x = _maxValue; else if(_value.x < -_maxValue) _value.x = -_maxValue;
	if(_value.y > _maxValue) _value.y = _maxValue; else if(_value.y < -_maxValue) _value.y = -_maxValue;
	if(_value.z > _maxValue) _value.z = _maxValue; else if(_value.z < -_maxValue) _value.z = -_maxValue;
	return _value;
}