//Author - Grabar Igor
console.log('cameraExtra.js loaded');

function updateCamera(cam, cen, key_list, multiplier)
{
    var delta = THREE.Vector3();
    var cen_copy = THREE.Vector3();
    var cam_copy = THREE.Vector3();
    cen_copy = cen.clone();
    cam_copy = cam.clone();
    delta = cen_copy.add(cam_copy.negate());
    delta.normalize();
    delta.multiplyScalar(multiplier);
    
    if (key_list['w'])
    {
        console.log('kek');
        cam.add(delta);
        cen.add(delta);
    } 
    if (key_list['s'])
    {
        delta.negate();
        console.log('kek');
        cam.add(delta);
        cen.add(delta);
    }
    
}