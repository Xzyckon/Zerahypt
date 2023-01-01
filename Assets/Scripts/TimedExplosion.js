var explosion: GameObject; // drag your explosion prefab here


function Start(){
yield WaitForSeconds (3);
    var expl = Instantiate(explosion, transform.position, transform.rotation);
    Destroy(gameObject);
}