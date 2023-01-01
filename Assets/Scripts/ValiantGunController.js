var TurretTarget : Transform;
var ResetView : Transform;
var Muzzle : Transform;

var Spread : float = 0;

var Fire1 : GameObject;

var ValiantAI : ValiantAI;

var targetLayers : LayerMask;

var LineOfFire : boolean;

InvokeRepeating("Resetter", 1, 0.5);

private var NewRotation : Quaternion;

function LateUpdate () {
	if (TurretTarget && TurretTarget.name != "ResetViewAI") {
			NewRotation = Quaternion.LookRotation(TurretTarget.position - transform.position);
            transform.rotation = Quaternion.RotateTowards(transform.rotation, NewRotation, Time.deltaTime * 100);
		}

Muzzle.transform.localRotation = Quaternion.Euler(90, 0, 0);

Muzzle.transform.Rotate(Vector3.right * Random.Range (0, Spread));

Muzzle.transform.Rotate(Vector3.left * Random.Range (0, Spread));

Muzzle.transform.Rotate(Vector3.up * Random.Range (0, Spread));

Muzzle.transform.Rotate(Vector3.down * Random.Range (0, Spread));
		
}

function Update () {

var hit : RaycastHit;

if (Physics.Raycast (Muzzle.transform.position + Muzzle.transform.forward * 3, Muzzle.transform.forward, hit, 300, targetLayers)) {

if(!ValiantAI.PissedAtTC1 && hit.collider.name.Contains ("TC1")){
LineOfFire = false;
return;
}

 if(hit.collider.name.Contains ("TC1") || hit.collider.name.Contains ("TC4")
                                       || hit.collider.name.Contains ("TC5")
                                       || hit.collider.name.Contains ("TC6")
                                       || hit.collider.name.Contains ("TC7")
                                       || hit.collider.name.Contains ("TC8")
                                       || hit.collider.name.Contains ("TC9")){
                                       
     LineOfFire = true;
 }else{                       
     LineOfFire = false;
}
 
}
}

function Fire () {

if(LineOfFire){
Instantiate(Fire1, Muzzle.position, Muzzle.rotation);
}
}

function Resetter () {
LineOfFire = false;

TurretTarget = ValiantAI.target;

if (TurretTarget != null)
if (TurretTarget.name == "ResetViewAI")
TurretTarget = ResetView;

		rigidbody.freezeRotation = true;

}