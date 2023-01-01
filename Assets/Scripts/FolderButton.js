#pragma strict

var FolderScreen : GameObject;

var displayer : FolderInfoDisplayer;

var PageUp : boolean;

function Start(){
displayer = FolderInfoDisplayer.instance;
}

function OnMouseDown () {

	    if(!PageUp){
		FolderScreen.transform.Translate(Vector3.right * -8);
		PageUp = true;
		displayer.PutUp();
        PutUpPage();
		}else{
        FolderScreen.transform.Translate(Vector3.right * 8);
        PageUp = false;
        displayer.PutDown();
        }
}

function PutUpPage () {

yield WaitForSeconds (0.1);

if (FolderInfoDisplayer.instance.pages.Count > 0)
displayer.Pagionaise();
}