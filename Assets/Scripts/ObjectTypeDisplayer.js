#pragma strict
static var instance : ObjectTypeDisplayer;

function Awake() {
	instance = this;
}

function UpdateType (name : String) {
	var tm : TextMesh = GetComponent(TextMesh);
	tm.text = name;
}