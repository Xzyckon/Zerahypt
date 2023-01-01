var audioC : AudioClip;
function Update () {
	if(WorldInformation.playerCar.Contains(transform.parent.name)){
	if(Input.GetKeyDown("x")){
	audio.PlayOneShot(audioC);
	}
}
}