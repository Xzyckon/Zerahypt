var PageTF : Transform;

var Zoom1 : Transform;
var ZoomReset : Transform;

var IsActivated: boolean;

var zoomed: boolean;

function Start () {

}

function Update () {
if(IsActivated)
if(PageTF){
if(zoomed){
PageTF.position.x = Mathf.Lerp( PageTF.position.x, Zoom1.position.x, Time.deltaTime * 12);
PageTF.position.y = Mathf.Lerp( PageTF.position.y, Zoom1.position.y, Time.deltaTime * 12);
PageTF.position.z = Mathf.Lerp( PageTF.position.z, Zoom1.position.z, Time.deltaTime * 12);

PageTF.localScale.x = Mathf.Lerp( PageTF.localScale.x, Zoom1.localScale.x, Time.deltaTime * 12);
PageTF.localScale.y = Mathf.Lerp( PageTF.localScale.y, Zoom1.localScale.y, Time.deltaTime * 12);
PageTF.localScale.z = Mathf.Lerp( PageTF.localScale.z, Zoom1.localScale.z, Time.deltaTime * 12);
}else{
PageTF.position.x = Mathf.Lerp( PageTF.position.x, ZoomReset.position.x, Time.deltaTime * 12);
PageTF.position.y = Mathf.Lerp( PageTF.position.y, ZoomReset.position.y, Time.deltaTime * 12);
PageTF.position.z = Mathf.Lerp( PageTF.position.z, ZoomReset.position.z, Time.deltaTime * 12);

PageTF.localScale.x = Mathf.Lerp( PageTF.localScale.x, ZoomReset.localScale.x, Time.deltaTime * 12);
PageTF.localScale.y = Mathf.Lerp( PageTF.localScale.y, ZoomReset.localScale.y, Time.deltaTime * 12);
PageTF.localScale.z = Mathf.Lerp( PageTF.localScale.z, ZoomReset.localScale.z, Time.deltaTime * 12);
}
}
}

function Reset () {
zoomed = false;
IsActivated = false;
if(PageTF){
PageTF.position.x = ZoomReset.position.x;
PageTF.position.y = ZoomReset.position.y;
PageTF.position.z = ZoomReset.position.z;
PageTF.localScale.x = ZoomReset.localScale.x;
PageTF.localScale.y = ZoomReset.localScale.y;
PageTF.localScale.z = ZoomReset.localScale.z;
}
}

function OnMouseDown () {
if(!zoomed)
zoomed = true;
else
zoomed = false;
}