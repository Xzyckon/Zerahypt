#pragma strict

var Translator: GameObject;
var Hook: GameObject;
var Lock: GameObject;

var Locked : boolean;

var TranslatorMovingOut : boolean;
var TranslatorMovingIn : boolean;

var HookMovingOut : boolean;
var HookMovingIn : boolean;

var HookOut : boolean;
var TranslatorOut : boolean;

var TranslatorEnd : float = 5;
var HookEnd : float = 120;

function Update () {
if(WorldInformation.playerCar == transform.name){

if(TranslatorOut && !TranslatorMovingIn && !TranslatorMovingOut){
if(Input.GetKeyDown("3")){
if(HookOut){
Hook.hingeJoint.spring.targetPosition += 0.2;
HookMovingOut = false;
HookMovingIn = true;
}
}

if(Input.GetKeyDown("4")){
if(!HookOut){
Hook.hingeJoint.spring.targetPosition -= 0.2;
HookMovingOut = true;
HookMovingIn = false;
}
}
}

if(!HookOut && !HookMovingOut && !HookMovingIn){
if(Input.GetKeyDown("1")){
if(TranslatorOut){
Translator.GetComponent(ConfigurableJoint).targetPosition += Vector3(0,0.02,0);
TranslatorMovingOut = false;
TranslatorMovingIn = true;
Locked = true;
if(Lock != null)
Lock.transform.localPosition = Vector3(0, 0, 0.715);
}
}

if(Input.GetKeyDown("2")){
if(!TranslatorOut){
Translator.GetComponent(ConfigurableJoint).targetPosition -= Vector3(0,0.02,0);
TranslatorMovingOut = true;
TranslatorMovingIn = false;
}
}
}


}
}

function FixedUpdate () {

if(Locked)
Hook.transform.localRotation = Quaternion.Euler(0, 0, 0);

Translator.transform.localPosition.z = -0.27;
Translator.transform.localPosition.x = 0;
Translator.transform.localRotation = Quaternion.Euler(0, 0, 0);

Hook.transform.localPosition = Vector3(0, 0, 0);

if(TranslatorMovingIn || TranslatorMovingOut){
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.y < TranslatorEnd){
        TranslatorOut = true;
        TranslatorMovingOut = false;
        Locked = false;
        if(Lock != null)
        Lock.transform.localPosition = Vector3(0, 0, 0);
        }
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.y > 0){
        TranslatorOut = false;
        TranslatorMovingIn = false;
        }
}
if(HookMovingIn || HookMovingOut){
        if(Hook.hingeJoint.spring.targetPosition < HookEnd){
        HookOut = true;
        HookMovingOut = false;
        }
        if(Hook.hingeJoint.spring.targetPosition > 0){
        HookOut = false;
        HookMovingIn = false;
        }
}

        if(TranslatorMovingOut)
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.y > TranslatorEnd)
            Translator.GetComponent(ConfigurableJoint).targetPosition -= Vector3(0,0.02,0);
            
        if(TranslatorMovingIn)
        if(Translator.GetComponent(ConfigurableJoint).targetPosition.y < 0)
            Translator.GetComponent(ConfigurableJoint).targetPosition += Vector3(0,0.02,0);
            
        if(HookMovingOut)
        if(Hook.hingeJoint.spring.targetPosition > HookEnd)
            Hook.hingeJoint.spring.targetPosition -= 0.2;
            
        if(HookMovingIn)
        if(Hook.hingeJoint.spring.targetPosition < 0)
            Hook.hingeJoint.spring.targetPosition += 0.2;
}