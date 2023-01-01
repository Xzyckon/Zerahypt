#pragma strict
public static var instance : Camera;

function Awake () {
	instance = this.camera;
}