#pragma strict
var maxOffset : float = 100;
private var OtherOriginObject : GameObject;
var BasedOn : GameObject;

function Start () {
	OtherOriginObject = new GameObject();
	OtherOriginObject.name = "OtherFocusPointOrigin";
	OtherOriginObject.transform.position = transform.position;
	OtherOriginObject.transform.rotation = transform.rotation;
	OtherOriginObject.transform.parent = transform.parent;
}

function FixedUpdate () {
	var offset : Vector3 = BasedOn.rigidbody.velocity * 0.0238;
	
	if (offset.x > maxOffset || offset.y > maxOffset || offset.z > maxOffset)
	{
		offset = Max(offset, maxOffset);
	}
	
	var OtherNewPos : Vector3 = OtherOriginObject.transform.position + offset;
	transform.position = OtherNewPos;
}

function Max(_value : Vector3, _maxValue : float) : Vector3 {
	if(_value.x > _maxValue) _value.x = _maxValue; else if(_value.x < -_maxValue) _value.x = -_maxValue;
	if(_value.y > _maxValue) _value.y = _maxValue; else if(_value.y < -_maxValue) _value.y = -_maxValue;
	if(_value.z > _maxValue) _value.z = _maxValue; else if(_value.z < -_maxValue) _value.z = -_maxValue;
	return _value;
}