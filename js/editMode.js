//Author - Grabar Igor
container.addEventListener('mousedown', editModeFunction, false);

function editModeFunction(event)
{
    //console.log('edit_mode: ' + edit_mode);
    if (event.button===0 && !mouse_focus)
    {
        switch(edit_mode)
        {
            case 0://Select
            {
                selectMode(event);
                break;
            }
            case 1:
            {
                insertMode(event);
                break;
            }
            case 2:
            {
                deleteMode(event);
                break;
            }
            case 3:
            {
                break;
            }
            case 4:
            {
                break;
            }
            case 5:
            {
                break;
            }
            default:
            {
                alert('Unknown edit mode!');
                break;
            }
        }
    }
    
}

function selectMode(event)
{
    var multiselect = keys["Shift"];
    //Then, lets clear all selected objects
    if (!multiselect)
    {
        for (var i = 0; i<scene_object_list.length; i++)
        {
            //console.log('testing object ' + i);
            if (scene_object_list[i].selected == true)
            {
                scene_object_list[i].selected = false;
            }
        }
    }
    else{}
    var bounds = container.getBoundingClientRect()
    var mouse = new Object();
    mouse.x = ( (event.clientX - bounds.left) / container.clientWidth ) * 2 - 1;
    mouse.y = - ( (event.clientY - bounds.top) / container.clientHeight ) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0)
    {
        var closest = null;
        var min_length = 0;
        for (var i = 0; i<intersects.length; i++)
        {
            if (intersects[i].object.geometry.type == 'BoxGeometry')
            {
                var current_owner = intersects[i].object.userData.owner;
                var c_length = new THREE.Vector3(
                    intersects[i].object.userData.owner.x - camera.position.x, 
                    intersects[i].object.userData.owner.y - camera.position.y, 
                    intersects[i].object.userData.owner.z - camera.position.z).lengthSq();
                console.log(c_length);
                if (min_length == 0 || min_length>c_length)
                {
                    min_length = c_length;
                    closest = intersects[i].object.userData.owner;
                }
            }
        }
        if (closest !== null)
        {
            //controls.enableRotate = false;
            console.log("found selected");
            closest.selected = true;
        }
    }
    var selected_list = getSelected(scene_object_list);
    if (selected_list.length > 0)
    {
        updateWindowVisibility(1);
        updateSceneObjectPropertiesWindow(selected_list);
        selected_object = selected_list[0];
    }
    else
    {
        selected_object = null;
        updateWindowVisibility(0);
    }
    setStateListVisible(0);
}

function insertMode(event)
{
    var new_object = new SceneObject();
    new_object.x = controls.target.x;
    new_object.y = controls.target.y;
    new_object.z = controls.target.z;
    new_object.setDefaultActions();
    scene_object_list.push(new_object);
    scene.add(new_object.mesh);
}

function deleteMode(event)
{
    for (var i = 0; i<scene_object_list.length; i++)
    {
        //console.log('testing object ' + i);
        if (scene_object_list[i].selected == true)
        {
            scene_object_list[i].selected = false;
        }
    }
    
    var bounds = container.getBoundingClientRect()
    var mouse = new Object();
    mouse.x = ( (event.clientX - bounds.left) / container.clientWidth ) * 2 - 1;
    mouse.y = - ( (event.clientY - bounds.top) / container.clientHeight ) * 2 + 1;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0)
    {
        var closest = null;
        var min_length = 0;
        for (var i = 0; i<intersects.length; i++)
        {
            if (intersects[i].object.geometry.type == 'BoxGeometry')
            {
                var current_owner = intersects[i].object.userData.owner;
                var c_length = new THREE.Vector3(
                    intersects[i].object.userData.owner.x - camera.position.x, 
                    intersects[i].object.userData.owner.y - camera.position.y, 
                    intersects[i].object.userData.owner.z - camera.position.z).lengthSq();
                console.log(c_length);
                if (min_length == 0 || min_length>c_length)
                {
                    min_length = c_length;
                    closest = intersects[i].object.userData.owner;
                }
            }
        }
        if (closest !== null)
        {
            //controls.enableRotate = false;
            var ind = scene_object_list.indexOf(closest);
            scene_object_list.splice(ind, 1);
            closest.destroy();
            console.log(scene);
        }
    }
    var selected_list = getSelected(scene_object_list);
    if (selected_list.length > 0)
    {
        updateWindowVisibility(1);
        updateSceneObjectPropertiesWindow(selected_list);
        selected_object = selected_list[0];
    }
    else
    {
        selected_object = null;
    }
    setStateListVisible(0);
}

