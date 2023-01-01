#pragma strict

var AmbulanceLocation : Transform;

var Ambulance : GameObject;//prefab

function Start () {
 if(PlayerPrefs.HasKey("Injured")){
  WorldInformation.playerCar = "null";
  PlayerPrefs.DeleteKey("Injured");
  var Ambu = Instantiate(Ambulance, AmbulanceLocation.position, AmbulanceLocation.rotation);
  Ambu.animation.Play("animationName");
  PlayerPrefs.Save();
 }
 Destroy(this);
}