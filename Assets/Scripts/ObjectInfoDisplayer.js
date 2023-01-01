#pragma strict
static var instance : ObjectInfoDisplayer;

function Awake() {
	instance = this;
}

function UpdateInfo (name : String) {
	var tm : TextMesh = GetComponent(TextMesh);
	tm.text = name;
}