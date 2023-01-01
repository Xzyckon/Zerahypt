#pragma strict

static var InsideRefinery : boolean = false;
var RefineryIcon : GameObject;

function OnTriggerEnter (other : Collider)
{
 if(other.collider.gameObject.name.Contains("Pirizuka"))
  {
    RefineryIcon.SetActive(true);
    InsideRefinery = true;
  }
}

function OnTriggerExit (other : Collider)
{
 if(other.collider.gameObject.name.Contains("Pirizuka"))
  {
    RefineryIcon.SetActive(false);
    InsideRefinery = false;
  }
}