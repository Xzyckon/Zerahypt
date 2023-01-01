var WhatToBlink : GameObject;
var WhatToBlink2 : GameObject;
var WhatToBlink3 : GameObject;
var SubBlinker : Blinker;

var IsActive : boolean = true;

var DeActivated : boolean;

var OnTime : float = 2;
var OffTime : float = 2;

var PauseTime : float = 1;

var sequencedBlinks : boolean;

var Inverted : boolean;

var Tick : boolean;

function FixedUpdate () {

if(DeActivated){
if(!SubBlinker)
WhatToBlink.SetActive (false);
if(SubBlinker)
SubBlinker.DeActivated = true;
}

if(!DeActivated)
if(SubBlinker)
SubBlinker.DeActivated = false;

if(IsActive && !DeActivated)
Blink();
}

function Blink () {
if(Tick)
return;

Tick = true;
yield WaitForSeconds (OffTime);

if(!Inverted){

if(!SubBlinker)
WhatToBlink.SetActive (true);
if(SubBlinker)
SubBlinker.IsActive = true;

}else{

if(!SubBlinker)
WhatToBlink.SetActive (false);
if(SubBlinker)
SubBlinker.IsActive = false;

}

yield WaitForSeconds (OnTime);

if(!Inverted){

if(!SubBlinker)
WhatToBlink.SetActive (false);
if(SubBlinker)
SubBlinker.IsActive = false;

}else{

if(!SubBlinker)
WhatToBlink.SetActive (true);
if(SubBlinker)
SubBlinker.IsActive = true;

}

Tick = false;

if(sequencedBlinks){
Tick = true;

yield WaitForSeconds (OffTime);

if(!Inverted)
WhatToBlink2.SetActive (true);
else
WhatToBlink2.SetActive (false);

yield WaitForSeconds (OnTime);

if(!Inverted)
WhatToBlink2.SetActive (false);
else
WhatToBlink2.SetActive (true);

yield WaitForSeconds (OffTime);

if(!Inverted)
WhatToBlink3.SetActive (true);
else
WhatToBlink3.SetActive (false);

yield WaitForSeconds (OnTime);

if(!Inverted)
WhatToBlink3.SetActive (false);
else
WhatToBlink3.SetActive (true);

yield WaitForSeconds (PauseTime);

Tick = false;

}
}