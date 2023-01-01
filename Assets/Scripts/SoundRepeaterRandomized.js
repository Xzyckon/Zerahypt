var Sound1: AudioClip;
var MinReptime = 3.0;
var MaxReptime = 6.0;

InvokeRepeating("PlayStuff", 1, Random.Range(MinReptime, MaxReptime));

function PlayStuff()
{
 audio.PlayOneShot(Sound1);
}