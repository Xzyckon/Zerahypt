var AberrantAI : GameObject;
var BrokenSound : GameObject;
var JointScript : ConfigurableJoint;
var WhatToDestroy : GameObject[];

private var once: boolean;

var Health = 32;

var ThisDamage = 0;
var SendDamage = 0;

InvokeRepeating("InduceDamage", 5, 1);

function OnCollisionEnter(col : Collision){

if(col.gameObject.name.Contains("X#1")){

if(col.gameObject.name.Contains("TFC1") && Health > 0){

ThisDamage = 2;
SendDamage = 2;

if(Health < 3){
ThisDamage -= Health;
SendDamage -= ThisDamage;
}

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
}

Health -= 128;
}
		
if(col.gameObject.name.Contains("Z#1")){

if(col.gameObject.name.Contains("TFC1") && Health > 0)
DamageCounter.instance.ShowDamage(1, 4);

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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
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

DamageCounter.instance.ShowDamage(SendDamage, 4);
}

Health -= 32;
}

if(Health < 1 && once == false){

once = true;

    var TheThing = Instantiate(BrokenSound, transform.position, transform.rotation);
    TheThing.transform.parent = gameObject.transform;
    
    Destroy(JointScript);
    
    AberrantAI.GetComponent("AberrantCruiserAI").Damaged = true;
    AberrantAI.GetComponent("AberrantCruiserAI").Broken();
    
    var i : int;
		for (i = 0; i < WhatToDestroy.Length; i++) { 
			Destroy(WhatToDestroy[i].gameObject); 
		}
}
}

function InduceDamage () {
Damager();
}

function Damager () {

if(Health < 1 && once == false){

once = true;

yield WaitForSeconds (2);

    var TheThing = Instantiate(BrokenSound, transform.position, transform.rotation);
    TheThing.transform.parent = gameObject.transform;
    
    Destroy(JointScript);
    
    AberrantAI.GetComponent("AberrantCruiserAI").Damaged = true;
    AberrantAI.GetComponent("AberrantCruiserAI").Broken();
    
    var i : int;
		for (i = 0; i < WhatToDestroy.Length; i++) { 
			Destroy(WhatToDestroy[i].gameObject); 
		}
}
}