#pragma strict

var target : Transform;

var Obj1 : GameObject;
var Obj2 : GameObject;
var Obj3 : GameObject;
var Obj4 : GameObject;

var Obj5 : GameObject;
var Obj6 : GameObject;
var Obj7 : GameObject;
var Obj8 : GameObject;
var Obj9 : GameObject;
var Obj10 : GameObject;
var Obj11 : GameObject;
var Obj12 : GameObject;
var Obj13 : GameObject;
var Obj14 : GameObject;
var Obj15 : GameObject;

var LPObj1 : GameObject;

var Dist = 2000;

InvokeRepeating("Counter", 0, 0.4);

function Start () {
target = PlayerInformation.instance.Pirizuka;
}

function Counter () {

if(Vector3.Distance(transform.position, target.position) < Dist){

if(LPObj1)
if(LPObj1.activeSelf == true)
LPObj1.gameObject.SetActive (false);

if(Obj1)
if(Obj1.activeSelf == false)
Obj1.gameObject.SetActive (true);

if(Obj2)
if(Obj2.activeSelf == false)
Obj2.gameObject.SetActive (true);

if(Obj3)
if(Obj3.activeSelf == false)
Obj3.gameObject.SetActive (true);

if(Obj4)
if(Obj4.activeSelf == false)
Obj4.gameObject.SetActive (true);

if(Obj5)
if(Obj5.activeSelf == false)
Obj5.gameObject.SetActive (true);

if(Obj6)
if(Obj6.activeSelf == false)
Obj6.gameObject.SetActive (true);

if(Obj7)
if(Obj7.activeSelf == false)
Obj7.gameObject.SetActive (true);

if(Obj8)
if(Obj8.activeSelf == false)
Obj8.gameObject.SetActive (true);

if(Obj9)
if(Obj9.activeSelf == false)
Obj9.gameObject.SetActive (true);

if(Obj10)
if(Obj10.activeSelf == false)
Obj10.gameObject.SetActive (true);

if(Obj11)
if(Obj11.activeSelf == false)
Obj11.gameObject.SetActive (true);

if(Obj12)
if(Obj12.activeSelf == false)
Obj12.gameObject.SetActive (true);

if(Obj13)
if(Obj13.activeSelf == false)
Obj13.gameObject.SetActive (true);

if(Obj14)
if(Obj14.activeSelf == false)
Obj14.gameObject.SetActive (true);

if(Obj15)
if(Obj15.activeSelf == false)
Obj15.gameObject.SetActive (true);

}else{

if(LPObj1)
if(LPObj1.activeSelf == false)
LPObj1.gameObject.SetActive (true);

if(Obj1)
if(Obj1.activeSelf == true)
Obj1.gameObject.SetActive (false);

if(Obj2)
if(Obj2.activeSelf == true)
Obj2.gameObject.SetActive (false);

if(Obj3)
if(Obj3.activeSelf == true)
Obj3.gameObject.SetActive (false);

if(Obj4)
if(Obj4.activeSelf == true)
Obj4.gameObject.SetActive (false);

if(Obj5)
if(Obj5.activeSelf == true)
Obj5.gameObject.SetActive (false);

if(Obj6)
if(Obj6.activeSelf == true)
Obj6.gameObject.SetActive (false);

if(Obj7)
if(Obj7.activeSelf == true)
Obj7.gameObject.SetActive (false);

if(Obj8)
if(Obj8.activeSelf == true)
Obj8.gameObject.SetActive (false);

if(Obj9)
if(Obj9.activeSelf == true)
Obj9.gameObject.SetActive (false);

if(Obj10)
if(Obj10.activeSelf == true)
Obj10.gameObject.SetActive (false);

if(Obj11)
if(Obj11.activeSelf == true)
Obj11.gameObject.SetActive (false);

if(Obj12)
if(Obj12.activeSelf == true)
Obj12.gameObject.SetActive (false);

if(Obj13)
if(Obj13.activeSelf == true)
Obj13.gameObject.SetActive (false);

if(Obj14)
if(Obj14.activeSelf == true)
Obj14.gameObject.SetActive (false);

if(Obj15)
if(Obj15.activeSelf == true)
Obj15.gameObject.SetActive (false);

}
}