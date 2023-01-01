var audioC : AudioClip;

var WithCruise: boolean;

function Update () {
	if(WorldInformation.playerCar.Contains(transform.parent.name)){
	if(Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.S))
	audio.PlayOneShot(audioC);
	if(Input.GetKeyDown("q") && WithCruise)
	audio.PlayOneShot(audioC);
  }
}