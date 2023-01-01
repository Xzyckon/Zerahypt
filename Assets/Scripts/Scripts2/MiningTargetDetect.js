var Aimer : GameObject;
var AimerPoint : GameObject;
var AimerResetPoint : GameObject;

var MiningTarget : GameObject;
var IdleTarget : GameObject;
       
       var BeepLockon : AudioClip;
       var BeepNolock : AudioClip;
       var BeepReset : AudioClip;
       var BeepLost : AudioClip;
       
       
function Start () {
  MinerOnOff.switched = false;
  MiningTarget = IdleTarget;
  AimerPoint = GameObject.Find("AimPointTarget").gameObject;
}

function OnTriggerStay (other : Collider)
{
 if(WorldInformation.playerCar.Contains(transform.parent.name) && other.tag == "Mineral" && Input.GetKeyDown("3"))
  {
  audio.Stop();
  audio.PlayOneShot(BeepLockon);
  MiningTarget = other.gameObject;
  }
}

function OnTriggerExit (other : Collider)
{
 if(other.tag == "Mineral" && MiningTarget == !IdleTarget)
  {
  audio.PlayOneShot(BeepLost);
  MinerOnOff.switched = false;
  MiningTarget = IdleTarget;
  }
}

function Update () {
 if(WorldInformation.playerCar.Contains(transform.parent.name) && Input.GetKeyDown("2"))
  {
  Aimer.GetComponent("TurretAim").AimForward = AimerResetPoint;
  audio.PlayOneShot(BeepReset);
  MinerOnOff.switched = false;
  MiningTarget = IdleTarget;
}

if(WorldInformation.playerCar.Contains(transform.parent.name) && Input.GetKeyDown("3") && MiningTarget == IdleTarget)
  {
  Aimer.GetComponent("TurretAim").AimForward = AimerPoint;
  audio.PlayOneShot(BeepNolock);
  }
}