#pragma strict

public var Ani1 : String;
public var Ani2 : String;

var PlayAni1 : boolean = false;
var PlayAni2 : boolean = false;

var AniObject1 : GameObject;
var AniObject2 : GameObject;
var AniObject3 : GameObject;

function Update () {
if(PlayAni1)
AniAni1();
if(PlayAni2)
AniAni2();
}

function AniAni1 () {
AniObject1.animation.Play(Ani1);
AniObject2.animation.Play(Ani1);
AniObject3.animation.Play(Ani1);
PlayAni1 = false;
}

function AniAni2 () {
AniObject1.animation.Play(Ani2);
AniObject2.animation.Play(Ani2);
AniObject3.animation.Play(Ani2);
PlayAni2 = false;
}