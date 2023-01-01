
var Page1 : GameObject;
var Page2 : GameObject;
var Page3 : GameObject;
var Page4 : GameObject;
var Page5 : GameObject;
var Page6 : GameObject;

var Page : int = 1;

var UIcam : Camera;

function Pagionaise () {
	
	if(Page < 1)
	Page = 1;
	
	if(Page > 6)
	Page = 6;
	
	if(Page == 1){
	Page6.SetActive (false);
	Page1.SetActive (true);
	Page2.SetActive (false);
	}
	if(Page == 2){
	Page1.SetActive (false);
	Page2.SetActive (true);
	Page3.SetActive (false);
	}
	if(Page == 3){
	Page2.SetActive (false);
	Page3.SetActive (true);
	Page4.SetActive (false);
	}
	if(Page == 4){
	Page3.SetActive (false);
	Page4.SetActive (true);
	Page5.SetActive (false);
	}
	if(Page == 5){
	Page4.SetActive (false);
	Page5.SetActive (true);
	Page6.SetActive (false);
	}
	if(Page == 6){
	Page5.SetActive (false);
	Page6.SetActive (true);
	Page1.SetActive (false);
	}
}

function OnMouseDown () {
if (Input.mousePosition.x > UIcam.WorldToScreenPoint(transform.position).x) {
Page += 1;
Pagionaise();
}else{
Page -= 1;
Pagionaise();
}
}