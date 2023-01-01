var Force : float = 100;
var DoingRecoil : boolean = false;

function Update () {
			if(DoingRecoil == true){
         rigidbody.AddForce(transform.up * Force);
         DoingRecoil = false;
}
}