var Paused : boolean;

function Update () {

if(Input.GetKeyDown("p")){
transform.localScale.x = 3;
transform.localScale.z = 3;
audio.Play();
}

if(Input.GetKeyDown("u") && !Paused){
Time.timeScale = 0;
Debug.Break();
Paused = true;
}
else if(Input.GetKeyDown("u") && Paused){
Time.timeScale = 1;
Paused = false;
}
}