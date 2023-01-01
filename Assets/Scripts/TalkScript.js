#pragma strict

static var isTyping : boolean;

var yourText : String;

var textObject : TextMesh;

var snyfsies : ParticleSystem;

function Start () {

}

function Update() {
if(isTyping){

CameraScript.InInterface = true;

if(Input.anyKeyDown)
KeyInput();

if(snyfsies.startColor.a < 0.25)
snyfsies.startColor.a += 0.01;

}else{
if(snyfsies.startColor.a > 0)
snyfsies.startColor.a -= 0.01;
}
}

function KeyInput() {

if(Input.GetKeyDown(KeyCode.Return)){

var Load = Resources.Load("Prefabs/TalkBubble", GameObject) as GameObject;

var TGO = Instantiate(Load, PlayerInformation.instance.PiriTarget.position, Load.transform.rotation);
if(WorldInformation.playerLevel == 0){
TGO.name = "a1";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = NotiScript.thisTransform;
}
if(WorldInformation.playerLevel == 1){
TGO.name = "b1";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = NotiScript.thisTransform;
}
if(WorldInformation.playerLevel == 2){
TGO.name = "b1";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = NotiScript.thisTransform;
}
if(WorldInformation.playerLevel == 3){
TGO.name = "c1";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = NotiScript.thisTransform;
}
if(WorldInformation.playerLevel == 4){
TGO.name = "d1";
TGO.GetComponent(TalkBubbleScript).myText = yourText;
TGO.GetComponent(TalkBubbleScript).source = NotiScript.thisTransform;
}

yourText = null;
snyfsies.transform.localScale.x = 1;
snyfsies.emissionRate = 32;
isTyping = false;
CameraScript.InInterface = false;
PlayerMotionAnimator.PiriStill = false;
Screen.lockCursor = true;
Screen.showCursor = false;

textObject.text = yourText;
return;
}

if(Input.GetKeyDown(KeyCode.Backspace))
if(yourText)
if(yourText.length > 0)
yourText = yourText.Remove(yourText.length - 1);

if(Input.GetKeyDown("a"))
yourText = yourText + "a";

if(Input.GetKeyDown("b"))
yourText = yourText + "b";

if(Input.GetKeyDown("c"))
yourText = yourText + "c";

if(Input.GetKeyDown("d"))
yourText = yourText + "d";

if(Input.GetKeyDown("e"))
yourText = yourText + "e";

if(Input.GetKeyDown("f"))
yourText = yourText + "f";

if(Input.GetKeyDown("g"))
yourText = yourText + "g";

if(Input.GetKeyDown("h"))
yourText = yourText + "h";

if(Input.GetKeyDown("i"))
yourText = yourText + "i";

if(Input.GetKeyDown("j"))
yourText = yourText + "j";

if(Input.GetKeyDown("k"))
yourText = yourText + "k";

if(Input.GetKeyDown("l"))
yourText = yourText + "l";

if(Input.GetKeyDown("m"))
yourText = yourText + "m";

if(Input.GetKeyDown("n"))
yourText = yourText + "n";

if(Input.GetKeyDown("o"))
yourText = yourText + "o";

if(Input.GetKeyDown("p"))
yourText = yourText + "p";

if(Input.GetKeyDown("q"))
yourText = yourText + "q";

if(Input.GetKeyDown("r"))
yourText = yourText + "r";

if(Input.GetKeyDown("s"))
yourText = yourText + "s";

if(Input.GetKeyDown("t"))
yourText = yourText + "t";

if(Input.GetKeyDown("u"))
yourText = yourText + "u";

if(Input.GetKeyDown("v"))
yourText = yourText + "v";

if(Input.GetKeyDown("w"))
yourText = yourText + "w";

if(Input.GetKeyDown("x"))
yourText = yourText + "x";

if(Input.GetKeyDown("y"))
yourText = yourText + "y";

if(Input.GetKeyDown("z"))
yourText = yourText + "z";

if(Input.GetKeyDown("1"))
yourText = yourText + "1";

if(Input.GetKeyDown("2"))
yourText = yourText + "2";

if(Input.GetKeyDown("3"))
yourText = yourText + "3";

if(Input.GetKeyDown("4"))
yourText = yourText + "4";

if(Input.GetKeyDown("5"))
yourText = yourText + "5";

if(Input.GetKeyDown("6"))
yourText = yourText + "6";

if(Input.GetKeyDown("7"))
yourText = yourText + "7";

if(Input.GetKeyDown("8"))
yourText = yourText + "8";

if(Input.GetKeyDown("9"))
yourText = yourText + "9";

if(Input.GetKeyDown("0"))
yourText = yourText + "0";

if(Input.GetKeyDown("!"))
yourText = yourText + "!";

if(Input.GetKeyDown("?"))
yourText = yourText + "?";


if(Input.GetKeyDown(KeyCode.Space))
yourText = yourText + " ";

if(yourText)
if(yourText.length > 34)
yourText = yourText.Remove(yourText.length - 1);

snyfsies.emissionRate = textObject.renderer.bounds.size.magnitude * 96;
snyfsies.transform.localScale.x = textObject.renderer.bounds.size.magnitude * 5;
textObject.text = yourText;

}