var target : Transform;
var Recoiling : boolean;
var Hand : GameObject;
var HeadTF : Transform;
var thisTransform : Transform;
var HandGunHold : GameObject;
var HeldWeapon : GameObject;
var HeldToy : GameObject;
var Reticle : Transform;
var HeadInStuff : boolean;

var TargetAnimation5: GameObject;

private var NewRotation : Quaternion;

static var Weight = 0;

static var Resetting : boolean;
static var CanShoot : boolean;
static var IsAiming : boolean;
static var Once : boolean;

var CanHead : boolean;

var targetLayers : LayerMask;

function Start () {
    
    CanHead = false;
    
    Weight = 20;
    
    CanShoot = true;
    IsAiming = false;
	target = GameObject.Find("PiriAimFront").transform;
    Reticle = Symbols.instance.Reticle;
	yield WaitForSeconds (0.3);
	Hand.gameObject.SetActive (true);
	HandGunHold.gameObject.SetActive (false);
	yield WaitForSeconds (0.3);
	Hand.gameObject.SetActive (true);
	HandGunHold.gameObject.SetActive (false);
	yield WaitForSeconds (0.3);
	Hand.gameObject.SetActive (true);
	HandGunHold.gameObject.SetActive (false);
	
	CanHead = true;
}

function FixedUpdate () {
	if (IsAiming) {
		NewRotation = Quaternion.LookRotation(transform.position - target.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, NewRotation, Time.deltaTime * Weight);
	}
}

function Update () {

if(WorldInformation.FPMode || Input.GetMouseButton(1)){
if (!Physics.Linecast (thisTransform.position, HeadTF.position, targetLayers)){
if(HeadInStuff)
Once = true;
HeadInStuff = false;
}else{
if(!HeadInStuff)
Once = true;
HeadInStuff = true;
}
}else{
if(HeadInStuff)
Once = true;
HeadInStuff = false;
}

if(Once && CanHead){
Once = false;
if(HeadInStuff){
ScreenFadeScript.BlackOut = true;
FurtherActionScript.instance.HeadStuck = true;
FurtherActionScript.instance.ShowText();
}else{
ScreenFadeScript.BlackOut = false;
}
}

if(Resetting){
Resetting = false;
Reset();
}

	if(Hand.activeSelf && HandGunHold.activeSelf)
		HandGunHold.gameObject.SetActive (false);

	if (CameraScript.InInterface == false && PlayerMotionAnimator.instance.CanMove && !PlayerMotionAnimator.instance.Landing) {
		if (Input.GetMouseButtonDown(1)){
		if(!WorldInformation.IsNopass){
			IsAiming = true;
			Reticle.gameObject.SetActive (true);
			
			if (ItemContainer.PiriContainer.ContainerItems.Count > 0) {
			
			
				switch(ItemContainer.PiriContainer.ContainerItems[0].ID)
				{
				    case ItemEnum.TestGun:
						animation.Play("PiriPullGunSRifle");
						break;
				    case ItemEnum.Trumpgun:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Anoca_PT13:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Posmer_HC40:
						animation.Play("PiriPullGunCannon");
						break;
					case ItemEnum.Posmer_10c:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Shakar_17:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Tothler_Tygria_M2:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.AROT_Iter_1:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.BK:
						animation.Play("PiriPullGunSRifle");
						break;
				    case ItemEnum.TLF_PTSD_G1:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.MevNav_MRCHg:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Anoca_PT32:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Posmer_10cR:
						animation.Play("PiriPullGunSRifle");
						break;
					case ItemEnum.Metis_CAR_05:
						animation.Play("PiriPullGunRifle");
						break;
					case ItemEnum.DASMUN_SR2:
						animation.Play("PiriPullGunRifle");
						break;
					case ItemEnum.TRN_PTSD_Az:
						animation.Play("PiriPullGunSRifle");
						break;
				    case ItemEnum.Fawcett_Alton:
						animation.Play("PiriPullGunRifle");
						break;
					case ItemEnum.Katovari_MD:
						animation.Play("PiriPullGunRifle");
						break;
					case ItemEnum.Fidget_Spinner:
						animation.Play("PiriPullToy");
						break;
				}
			}
			Hand.gameObject.SetActive (false);
			HandGunHold.gameObject.SetActive (true);
		}
		}

		if (Input.GetMouseButtonUp(1)){
			animation.Stop();

			if(HeldWeapon.transform.childCount > 0)
			animation.Play("PiriPutAwayGun");
			
			if(HeldToy.transform.childCount > 0)
			animation.Play("PiriPutAwayToy");

			Hand.gameObject.SetActive (true);
			HandGunHold.gameObject.SetActive (false);
			Reticle.gameObject.SetActive (false);
			IsAiming = false;
		}
	}

if (Input.GetMouseButton(1) && Input.GetKeyDown(KeyCode.I) || Input.GetMouseButton(1) && Input.GetMouseButton(2)){
if(!CameraScript.CamNoFP){
animation.Stop();
animation.Play("PiriPutAwayGun");
Hand.gameObject.SetActive (true);
HandGunHold.gameObject.SetActive (false);
IsAiming = false;
}
Reticle.gameObject.SetActive (false);
}

if(IsAiming)
if (Input.GetMouseButtonUp(1))
IsAiming = false;

}

function Recoil () {
	Recoiling = true;
	PlayRecoilAnimation();
	yield WaitForSeconds (0.1);
	ResetRecoilAnimation();
	yield WaitForSeconds (0.1);
	Recoiling = false;
}

function Reset () {
        animation.Stop();
		Hand.gameObject.SetActive (true);
		HandGunHold.gameObject.SetActive (false);
		Reticle.gameObject.SetActive (false);
		IsAiming = false;
}

function PlayRecoilAnimation() {
			switch(ItemContainer.PiriContainer.ContainerItems[0].ID)
		{
		    case ItemEnum.TestGun:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
		    case ItemEnum.Trumpgun:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Anoca_PT13:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Posmer_HC40:
			    animation.Play("PiriCannonRecoil");
				break;
			case ItemEnum.Posmer_10c:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Shakar_17:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Tothler_Tygria_M2:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.AROT_Iter_1:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.BK:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.TLF_PTSD_G1:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.MevNav_MRCHg:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
		    case ItemEnum.Anoca_PT32:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Posmer_10cR:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
			case ItemEnum.Metis_CAR_05:
			    animation.Stop();
				animation.Play("PiriRifleRecoil");
				break;
			case ItemEnum.DASMUN_SR2:
			    animation.Stop();
				animation.Play("PiriRifleRecoil");
				break;
			case ItemEnum.TRN_PTSD_Az:
			    animation.Stop();
				animation.Play("PiriSRifleRecoil");
				break;
		    case ItemEnum.Fawcett_Alton:
			    animation.Stop();
				animation.Play("PiriRifleRecoil");
				break;
			case ItemEnum.Katovari_MD:
			    animation.Stop();
				animation.Play("PiriCannonRecoil");
				break;
			case ItemEnum.Fidget_Spinner:
			    animation.Stop();
				animation.Play("PiriToyFidget");
				break;
		}
		
		if(!IsAiming){
			animation.Stop();

			if(HeldWeapon.transform.childCount > 0)
			animation.Play("PiriPutAwayGun");
			
			if(HeldToy.transform.childCount > 0)
			animation.Play("PiriPutAwayToy");

			Hand.gameObject.SetActive (true);
			HandGunHold.gameObject.SetActive (false);
			Reticle.gameObject.SetActive (false);
			IsAiming = false;
		}
}
function ResetRecoilAnimation() {
			switch(ItemContainer.PiriContainer.ContainerItems[0].ID)
		{
		    case ItemEnum.TestGun:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
		    case ItemEnum.Trumpgun:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Anoca_PT13:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Posmer_HC40:
			    animation.CrossFade("PiriHoldGunCannon");
				break;
			case ItemEnum.Posmer_10c:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Shakar_17:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Tothler_Tygria_M2:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.AROT_Iter_1:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.BK:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.TLF_PTSD_G1:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.MevNav_MRCHg:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Anoca_PT32:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Posmer_10cR:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
			case ItemEnum.Metis_CAR_05:
				animation.CrossFade("PiriHoldGunRifle");
				break;
			case ItemEnum.DASMUN_SR2:
				animation.CrossFade("PiriHoldGunRifle");
				break;
			case ItemEnum.TRN_PTSD_Az:
				animation.CrossFade("PiriHoldGunSRifle");
				break;
		    case ItemEnum.Fawcett_Alton:
				animation.CrossFade("PiriHoldGunRifle");
				break;
			case ItemEnum.Katovari_MD:
				animation.CrossFade("PiriHoldGunRifle");
				break;
			case ItemEnum.Fidget_Spinner:
				animation.CrossFade("PiriHoldToy");
			    break;
		}
		
		if(!IsAiming){
			animation.Stop();

			if(HeldWeapon.transform.childCount > 0)
			animation.Play("PiriPutAwayGun");
			
			if(HeldToy.transform.childCount > 0)
			animation.Play("PiriPutAwayToy");

			Hand.gameObject.SetActive (true);
			HandGunHold.gameObject.SetActive (false);
			Reticle.gameObject.SetActive (false);
			IsAiming = false;
		}
}