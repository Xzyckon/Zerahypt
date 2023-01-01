
var FXNorm : boolean;
var FXPale : boolean;
var FXDark : boolean;

function Start () {



if(FXNorm == true){
if(WorldInformation.instance.AreaBeige)
return;
Destroy(gameObject);
}

if(FXPale == true){
if(WorldInformation.instance.AreaGray)
return;
Destroy(gameObject);
}

if(FXDark == true){
if(WorldInformation.instance.AreaDark)
return;
Destroy(gameObject);
}



if(renderer){
renderer.material.SetColor("_ReflectiveTint", WorldInformation.instance.reflColors);
}else{
if(!WorldInformation.instance.AreaDark){
Destroy(light);
if(gameObject.name.Contains ("ight"))
Destroy(gameObject);
}else{

for( var i = 0; i < transform.childCount; ++i ){
transform.GetChild(i).gameObject.active = true;
}

}
}

}