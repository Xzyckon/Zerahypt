var Multiplier : float;

InvokeRepeating("AddShit", 2, 3);

function AddShit()
{
 rigidbody.AddForce(transform.up * Multiplier, ForceMode.Impulse);
}