var UseUpdate : boolean;

var OnlyY : boolean;

function Start () {
if(!OnlyY)
transform.Rotate( Random.Range(0, 360), Random.Range(0, 360), Random.Range(0, 360));
else
transform.Rotate( 0, Random.Range(0, 360), 0);
}

 function FixedUpdate() {
 if(UseUpdate)
  transform.Rotate( Random.Range(0, 360), Random.Range(0, 360), Random.Range(0, 360));
}