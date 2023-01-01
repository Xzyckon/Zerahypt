var audioC1  : AudioClip;
var audioC2  : AudioClip;
var audioC3  : AudioClip;


function Start () {

var randomValue : int = Random.Range(1, 4);

            switch (randomValue) {
    		case 1:
    		audio.PlayOneShot(audioC1);
    		break;
    		case 2:
    		audio.PlayOneShot(audioC2);
    		break;
    		case 3:
    		audio.PlayOneShot(audioC3);
    		break;
    		}
}