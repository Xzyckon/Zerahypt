#pragma strict

var Npc : GameObject;

var Deactivated : boolean;

var Numberism = 0;

function Start () {

if(Deactivated)
return;

 var randomValue: int = Random.Range(1, 5);
 
 switch (randomValue) {
  case 1:
   Numberism = 1;
   Spawn10m();
   break;
  case 2:
   Numberism = 2;
   Spawn7m();
   break;
  case 3:
   Numberism = 3;
   Spawn5m();
   break;
  case 4:
   Numberism = 4;
   Spawn3m();
   break;
  case 5:
   Numberism = 5;
   Spawn();
   break;
 }
}

function Spawn10m () {
yield WaitForSeconds (600);
Npc.gameObject.SetActive (true);
}

function Spawn7m () {
yield WaitForSeconds (240);
Npc.gameObject.SetActive (true);
}

function Spawn5m () {
yield WaitForSeconds (300);
Npc.gameObject.SetActive (true);
}

function Spawn3m () {
yield WaitForSeconds (180);
Npc.gameObject.SetActive (true);
}

function Spawn () {
Npc.gameObject.SetActive (true);
}