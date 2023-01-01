var ObjectNameTXT : String;
var ObjectTypeTXT : String;
var ObjectInfoTXT : String;
var ObjectStringCode : String;
var ObjectStringName : String;
var Page : String;

var RandomPage : boolean;

var NumberOfPages : int = 2;

function Start(){
if(RandomPage){
var randomValue : int = Random.Range(0, NumberOfPages);
Page = Page + randomValue;
}
}