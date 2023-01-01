var Health = 200;

var ThisDamage = 0;
var SendDamage = 0;

private var once: boolean;

var Rotator : GameObject;

function OnCollisionEnter(col : Collision){

if(col.gameObject.name.Contains ("TFC1")){
if(col.gameObject.name.Contains("#1"))
AgrianNetwork.instance.TC1CriminalLevel += 50;
if(col.gameObject.name.Contains("#2"))
AgrianNetwork.instance.TC1CriminalLevel += 100;
if(col.gameObject.name.Contains("#3"))
AgrianNetwork.instance.TC1CriminalLevel += 200;
if(col.gameObject.name.Contains("#4"))
AgrianNetwork.instance.TC1CriminalLevel = 300;
if(col.gameObject.name.Contains("#5"))
AgrianNetwork.instance.TC1CriminalLevel = 300;
if(col.gameObject.name.Contains("#6"))
AgrianNetwork.instance.TC1CriminalLevel = 300;
if(col.gameObject.name.Contains("#7"))
AgrianNetwork.instance.TC1CriminalLevel = 300;
}

if(col.gameObject.name.Contains ("TFC6")){
if(col.gameObject.name.Contains("#1"))
AgrianNetwork.instance.TC6CriminalLevel += 50;
if(col.gameObject.name.Contains("#2"))
AgrianNetwork.instance.TC6CriminalLevel += 100;
if(col.gameObject.name.Contains("#3"))
AgrianNetwork.instance.TC6CriminalLevel += 200;
if(col.gameObject.name.Contains("#4"))
AgrianNetwork.instance.TC6CriminalLevel = 300;
if(col.gameObject.name.Contains("#5"))
AgrianNetwork.instance.TC6CriminalLevel = 300;
if(col.gameObject.name.Contains("#6"))
AgrianNetwork.instance.TC6CriminalLevel = 300;
if(col.gameObject.name.Contains("#7"))
AgrianNetwork.instance.TC6CriminalLevel = 300;
}

if(col.gameObject.name.Contains ("TFC7")){
if(col.gameObject.name.Contains("#1"))
AgrianNetwork.instance.TC7CriminalLevel += 50;
if(col.gameObject.name.Contains("#2"))
AgrianNetwork.instance.TC7CriminalLevel += 100;
if(col.gameObject.name.Contains("#3"))
AgrianNetwork.instance.TC7CriminalLevel += 200;
if(col.gameObject.name.Contains("#4"))
AgrianNetwork.instance.TC7CriminalLevel = 300;
if(col.gameObject.name.Contains("#5"))
AgrianNetwork.instance.TC7CriminalLevel = 300;
if(col.gameObject.name.Contains("#6"))
AgrianNetwork.instance.TC7CriminalLevel = 300;
if(col.gameObject.name.Contains("#7"))
AgrianNetwork.instance.TC7CriminalLevel = 300;
}

if(col.gameObject.name.Contains("X#1")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 2;
SendDamage = 2;

if(Health < 3){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 2;
}

if(col.gameObject.name.Contains("X#2")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 3;
SendDamage = 3;

if(Health < 4){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 3;
}

if(col.gameObject.name.Contains("X#3")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 6;
SendDamage = 6;

if(Health < 7){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 6;
}

if(col.gameObject.name.Contains("X#4")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 10;
SendDamage = 10;

if(Health < 11){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 10;
}

if(col.gameObject.name.Contains("X#5")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 32;
SendDamage = 32;

if(Health < 33){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 32;
}

if(col.gameObject.name.Contains("X#6")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 64;
SendDamage = 64;

if(Health < 65){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 64;
}

if(col.gameObject.name.Contains("X#7")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 128;
SendDamage = 128;

if(Health < 129){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 128;
}
		
if(col.gameObject.name.Contains("Z#1")){

if(col.gameObject.name.Contains("TFC1") && Health > 0)
DamageCounter.instance.ShowDamage(1, 2);

Health -= 1;
}

if(col.gameObject.name.Contains("Z#2")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 2;
SendDamage = 2;

if(Health < 3){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 2;
}

if(col.gameObject.name.Contains("Z#3")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 4;
SendDamage = 4;

if(Health < 5){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 4;
}

if(col.gameObject.name.Contains("Z#4")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 16;
SendDamage = 16;

if(Health < 17){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 16;
}

if(col.gameObject.name.Contains("Z#5")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 32;
SendDamage = 32;

if(Health < 33){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 2);
}

Health -= 32;
}

if(Health < 1 && once == false){

    Rotator.GetComponent("HelirotorDamage").Damaged();
    once = true;
}
}