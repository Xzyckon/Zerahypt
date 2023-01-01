#pragma strict

static var ZoomDist = 0;

function Start(){
ZoomDist = -32;
Screen.lockCursor = false;
Screen.showCursor = true;
}

function FixedUpdate(){
  transform.localPosition.z = Mathf.Lerp( transform.localPosition.z, ZoomDist, 0.05 * 4);
}