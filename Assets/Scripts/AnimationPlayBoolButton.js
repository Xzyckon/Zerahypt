
var AniObject : GameObject;
public var AniName : String;
public var AniName2 : String;
private var entered : boolean;
var OtherAni : boolean;

function OnMouseDown () {
	if(entered){
	
	if(OtherAni == false){
		AniObject.animation.Play(AniName);
		OtherAni = true;
		} else if(OtherAni == true){
		AniObject.animation.Play(AniName2);
		OtherAni = false;
		}
}
}

function OnMouseEnter () {
	entered = true;
}

function OnMouseExit () {
	entered = false;
}

function Close () {
	AniObject.animation.Play(AniName2);
	OtherAni = false;
}