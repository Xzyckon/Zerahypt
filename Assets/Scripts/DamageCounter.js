static var instance : DamageCounter;

var thisTransform : Transform;

var Title : Transform;
var Up : boolean;

var TC0 : Transform;
var TC0r : Renderer;
var TC0f : boolean;
static var TC0Amount : float;
var TC0Text : TextMesh;
var TC0Up : boolean;

var TC2 : Transform;
var TC2r : Renderer;
var TC2f : boolean;
static var TC2Amount : float;
var TC2Text : TextMesh;
var TC2Up : boolean;

var TC3 : Transform;
var TC3r : Renderer;
var TC3f : boolean;
static var TC3Amount : float;
var TC3Text : TextMesh;
var TC3Up : boolean;

var TC4 : Transform;
var TC4r : Renderer;
var TC4f : boolean;
static var TC4Amount : float;
var TC4Text : TextMesh;
var TC4Up : boolean;

var TC5 : Transform;
var TC5r : Renderer;
var TC5f : boolean;
static var TC5Amount : float;
var TC5Text : TextMesh;
var TC5Up : boolean;

var TC6 : Transform;
var TC6r : Renderer;
var TC6f : boolean;
static var TC6Amount : float;
var TC6Text : TextMesh;
var TC6Up : boolean;

var TC7 : Transform;
var TC7r : Renderer;
var TC7f : boolean;
static var TC7Amount : float;
var TC7Text : TextMesh;
var TC7Up : boolean;

var TC8 : Transform;
var TC8r : Renderer;
var TC8f : boolean;
static var TC8Amount : float;
var TC8Text : TextMesh;
var TC8Up : boolean;

var TC9 : Transform;
var TC9r : Renderer;
var TC9f : boolean;
static var TC9Amount : float;
var TC9Text : TextMesh;
var TC9Up : boolean;

function Awake() {
	instance = this;
}

function Start() {

thisTransform = transform;

if(!WorldInformation.DamageCounterOff){

if(TC0Amount > 0)
   UpdateDamage(0);
   
if(TC2Amount > 0)
   UpdateDamage(2);
   
if(TC3Amount > 0)
   UpdateDamage(3);
   
if(TC4Amount > 0)
   UpdateDamage(4);
   
if(TC5Amount > 0)
   UpdateDamage(5);
   
if(TC6Amount > 0)
   UpdateDamage(6);
   
if(TC7Amount > 0)
   UpdateDamage(7);
   
if(TC8Amount > 0)
   UpdateDamage(8);
   
if(TC9Amount > 0)
   UpdateDamage(9);
   
}else{
    thisTransform.localPosition.x -= 2;
}
}

function Update () {
if(TC0f){
if(TC0r.material.color.a > 0)
TC0r.material.color.a -= 0.01;
else
TC0f = false;
}

if(TC2f){
if(TC2r.material.color.a > 0)
TC2r.material.color.a -= 0.01;
else
TC2f = false;
}

if(TC3f){
if(TC3r.material.color.a > 0)
TC3r.material.color.a -= 0.01;
else
TC3f = false;
}

if(TC4f){
if(TC4r.material.color.a > 0)
TC4r.material.color.a -= 0.01;
else
TC4f = false;
}

if(TC5f){
if(TC5r.material.color.a > 0)
TC5r.material.color.a -= 0.01;
else
TC5f = false;
}

if(TC6f){
if(TC6r.material.color.a > 0)
TC6r.material.color.a -= 0.01;
else
TC6f = false;
}

if(TC7f){
if(TC7r.material.color.a > 0)
TC7r.material.color.a -= 0.01;
else
TC7f = false;
}

if(TC8f){
if(TC8r.material.color.a > 0)
TC8r.material.color.a -= 0.01;
else
TC8f = false;
}

if(TC9f){
if(TC9r.material.color.a > 0)
TC9r.material.color.a -= 0.01;
else
TC9f = false;
}

}

function ShowDamage (Amount : float, Code : int) {

if(!Up){
Up = true;
Title.localPosition.y += 10;
}

if(Code == 0){

if(!TC0Up){
TC0Up = true;
TC0.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC0r.material.color.a = 0.5;
TC0f = true;

TC0Amount += Amount;
TC0Text.text = Mathf.RoundToInt(TC0Amount).ToString();
}

if(Code == 2){

if(!TC2Up){
TC2Up = true;
TC2.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC2r.material.color.a = 0.5;
TC2f = true;

TC2Amount += Amount;
TC2Text.text = Mathf.RoundToInt(TC2Amount).ToString();
}

if(Code == 3){

if(!TC3Up){
TC3Up = true;
TC3.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC3r.material.color.a = 0.5;
TC3f = true;

TC3Amount += Amount;
TC3Text.text = Mathf.RoundToInt(TC3Amount).ToString();
}

if(Code == 4){

if(!TC4Up){
TC4Up = true;
TC4.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC4r.material.color.a = 0.5;
TC4f = true;

TC4Amount += Amount;
TC4Text.text = Mathf.RoundToInt(TC4Amount).ToString();
}

if(Code == 5){

if(!TC5Up){
TC5Up = true;
TC5.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC5r.material.color.a = 0.5;
TC5f = true;

TC5Amount += Amount;
TC5Text.text = Mathf.RoundToInt(TC5Amount).ToString();
}

if(Code == 6){

if(!TC6Up){
TC6Up = true;
TC6.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC6r.material.color.a = 0.5;
TC6f = true;

TC6Amount += Amount;
TC6Text.text = Mathf.RoundToInt(TC6Amount).ToString();
}

if(Code == 7){

if(!TC7Up){
TC7Up = true;
TC7.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC7r.material.color.a = 0.5;
TC7f = true;

TC7Amount += Amount;
TC7Text.text = Mathf.RoundToInt(TC7Amount).ToString();
}

if(Code == 8){

if(!TC8Up){
TC8Up = true;
TC8.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC8r.material.color.a = 0.5;
TC8f = true;

TC8Amount += Amount;
TC8Text.text = Mathf.RoundToInt(TC8Amount).ToString();
}

if(Code == 9){

if(!TC9Up){
TC9Up = true;
TC9.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
}

TC9r.material.color.a = 0.5;
TC9f = true;

TC9Amount += Amount;
TC9Text.text = Mathf.RoundToInt(TC9Amount).ToString();
}
}

function UpdateDamage (Code : int) {

if(!Up){
Up = true;
Title.localPosition.y += 10;
}

if(Code == 0){

if(!TC0Up){
TC0Up = true;
TC0.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC0r.material.color.a = 0.5;
TC0f = true;

TC0Text.text = Mathf.RoundToInt(TC0Amount).ToString();
}

if(Code == 2){

if(!TC2Up){
TC2Up = true;
TC2.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC2r.material.color.a = 0.5;
TC2f = true;

TC2Text.text = Mathf.RoundToInt(TC2Amount).ToString();
}

if(Code == 3){

if(!TC3Up){
TC3Up = true;
TC3.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC3r.material.color.a = 0.5;
TC3f = true;

TC3Text.text = Mathf.RoundToInt(TC3Amount).ToString();
}

if(Code == 4){

if(!TC4Up){
TC4Up = true;
TC4.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC4r.material.color.a = 0.5;
TC4f = true;

TC4Text.text = Mathf.RoundToInt(TC4Amount).ToString();
}

if(Code == 5){

if(!TC5Up){
TC5Up = true;
TC5.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC5r.material.color.a = 0.5;
TC5f = true;

TC5Text.text = Mathf.RoundToInt(TC5Amount).ToString();
}

if(Code == 6){

if(!TC6Up){
TC6Up = true;
TC6.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC6r.material.color.a = 0.5;
TC6f = true;

TC6Text.text = Mathf.RoundToInt(TC6Amount).ToString();
}

if(Code == 7){

if(!TC7Up){
TC7Up = true;
TC7.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC7r.material.color.a = 0.5;
TC7f = true;

TC7Text.text = Mathf.RoundToInt(TC7Amount).ToString();
}

if(Code == 8){

if(!TC8Up){
TC8Up = true;
TC8.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC9Up)
TC9.localPosition.y += 1;
}

TC8r.material.color.a = 0.5;
TC8f = true;

TC8Text.text = Mathf.RoundToInt(TC8Amount).ToString();
}

if(Code == 9){

if(!TC9Up){
TC9Up = true;
TC9.localPosition.y += 10;

Title.localPosition.y += 1;

if(TC0Up)
TC0.localPosition.y += 1;
if(TC2Up)
TC2.localPosition.y += 1;
if(TC3Up)
TC3.localPosition.y += 1;
if(TC4Up)
TC4.localPosition.y += 1;
if(TC5Up)
TC5.localPosition.y += 1;
if(TC6Up)
TC6.localPosition.y += 1;
if(TC7Up)
TC7.localPosition.y += 1;
if(TC8Up)
TC8.localPosition.y += 1;
}

TC9r.material.color.a = 0.5;
TC9f = true;

TC9Text.text = Mathf.RoundToInt(TC9Amount).ToString();
}
}