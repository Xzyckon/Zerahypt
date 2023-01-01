#pragma strict
static var instance : ObjectNameDisplayer;

function Awake() {
	instance = this;
}

function UpdateName (name : String) {
	var tm : TextMesh = GetComponent(TextMesh);
	tm.text = name;
}