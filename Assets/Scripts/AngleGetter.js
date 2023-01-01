
var AI : PiripodAI;

var targetLayers : LayerMask;

var Point1u : Vector3;
var Point1d : Vector3;

InvokeRepeating("Reader", 1, 0.15);

function Reader () {

transform.LookAt(AI.target);

var hit1 : RaycastHit;
var hit2 : RaycastHit;

Debug.DrawRay (transform.position + transform.up * 0.5, transform.forward * 50f, Color.white);
if (Physics.Raycast (transform.position + transform.up * 0.5, transform.forward, hit1, 50, targetLayers))
Point1u = hit1.point;

Debug.DrawRay (transform.position + -transform.up * 0.5, transform.forward * 50f, Color.white);
if (Physics.Raycast (transform.position + -transform.up * 0.5, transform.forward, hit2, 50, targetLayers))
Point1d = hit2.point;

Debug.DrawRay (transform.position, Vector3.down * 48, Color.white);
if (!Physics.Raycast (transform.position, Vector3.down, 48, targetLayers))
AI.OverPit = 1;

if(Vector3.Distance(Point1u, Point1d) > 2)
AI.JustNoticed = 1;
}