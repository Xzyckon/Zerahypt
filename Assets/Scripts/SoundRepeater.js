var Sound1: AudioClip;
var Reptime = 2.0;

InvokeRepeating("PlayStuff", 2, Reptime);

function PlayStuff()
{
 audio.PlayOneShot(Sound1);
}