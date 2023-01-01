#pragma strict
var offsetMultiplier : float;
var maxOffset : float = 30f;
private var originObject : GameObject;

function Start () {
	originObject = new GameObject();
	originObject.name = "FocusPointOrigin";
	originObject.transform.position = transform.position;
	originObject.transform.rotation = transform.rotation;
	originObject.transform.parent = transform.parent;
}

function Update () {
	var offset : Vector3 = -transform.up * transform.parent.rigidbody.velocity.magnitude / 10 * offsetMultiplier;
	
	offset = Max(offset, maxOffset);
	
	var newPos : Vector3 = originObject.transform.position + offset;
	transform.position = newPos;
}

function Max(_value : Vector3, _maxValue : float) : Vector3 {
	if(_value.x > _maxValue) _value.x = _maxValue; else if(_value.x < -_maxValue) _value.x = -_maxValue;
	if(_value.y > _maxValue) _value.y = _maxValue; else if(_value.y < -_maxValue) _value.y = -_maxValue;
	if(_value.z > _maxValue) _value.z = _maxValue; else if(_value.z < -_maxValue) _value.z = -_maxValue;
	return _value;
}