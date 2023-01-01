
function FixedUpdate () {

if(transform.localPosition.x > 4 ||
   transform.localPosition.y > 4 ||
   transform.localPosition.z > 4 ||
   -transform.localPosition.x > 4 ||
   -transform.localPosition.y > 4 ||
   -transform.localPosition.z > 4)
Time.timeScale = 0;
}