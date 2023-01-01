#pragma strict

var Sound : GameObject;

var Starttime = 1.0;

var Reptime = 2.0;

InvokeRepeating("PlayStuff", Starttime, Reptime);

function PlayStuff()
{
 Instantiate(Sound, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y, transform.eulerAngles.z));
}