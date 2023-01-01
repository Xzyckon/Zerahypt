
var ShowUpAnimationName : String = "Name";
var HideAnimationName : String = "Name";
var Arrow : GameObject;
var ArrowPoint0 : Transform;
var ArrowPoint1 : Transform;
var ArrowPoint2 : Transform;
var ArrowPoint3 : Transform;
var ArrowPoint4 : Transform;
var ArrowPoint5 : Transform;
private var entered : boolean;
var Once : boolean;

var Page1 : GameObject;
var Page2 : GameObject;
var Page3 : GameObject;
var Page4 : GameObject;
var Page5 : GameObject;
var Page6 : GameObject;
var Page7 : GameObject;
var Page8 : GameObject;
var Page9 : GameObject;
var Page10 : GameObject;
var Page11 : GameObject;
var Page12 : GameObject;
var Page13 : GameObject;
var Page14 : GameObject;
var Page15 : GameObject;

var Page : int = 1;

function Update () {

if(entered == true){
if(Input.GetMouseButtonDown(0) && Once == false)
Page += 1;
if(Input.GetMouseButtonDown(1) && Once == false)
Page -= 1;
}
	
	if(Page < 1){
	Page = 1;
	}
	
	if(Page == 1){
	Page15.SetActive (false);
	Page1.SetActive (true);
	Page2.SetActive (false);
	}
	if(Page == 2){
	Page1.SetActive (false);
	Page2.SetActive (true);
	Page3.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint0;
	}
	if(Page == 3){
	Page2.SetActive (false);
	Page3.SetActive (true);
	Page4.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint1;
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
	Page7.SetActive (false);
	}
	if(Page == 7){
	Page6.SetActive (false);
	Page7.SetActive (true);
	Page8.SetActive (false);
	}
	if(Page == 8){
	Page7.SetActive (false);
	Page8.SetActive (true);
	Page9.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint1;
	}
	if(Page == 9){
	Page8.SetActive (false);
	Page9.SetActive (true);
	Page10.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint0;
	}
	if(Page == 10){
	Page9.SetActive (false);
	Page10.SetActive (true);
	Page11.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint2;
	}
	if(Page == 11){
	Page10.SetActive (false);
	Page11.SetActive (true);
	Page12.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint2;
	}
	if(Page == 12){
	Page11.SetActive (false);
	Page12.SetActive (true);
	Page13.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint3;
	}
	if(Page == 13){
	Page12.SetActive (false);
	Page13.SetActive (true);
	Page14.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint4;
	}
	if(Page == 14){
	Page13.SetActive (false);
	Page14.SetActive (true);
	Page15.SetActive (false);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint5;
	}
	if(Page == 15){
	Page14.SetActive (false);
	Page15.SetActive (true);
	Arrow.GetComponent("Doppelganger2").target = ArrowPoint0;
	}
	
	if(Page == 16 && Once == false){
	Once = true;
	animation.Play(HideAnimationName + "");
	}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}