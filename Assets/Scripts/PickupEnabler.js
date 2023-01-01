function OnTriggerEnter (other : Collider) {
if(other.tag == "ElementMaterials" && !other.name.Contains ("SM")){
    other.gameObject.name = "CM8";
}
}