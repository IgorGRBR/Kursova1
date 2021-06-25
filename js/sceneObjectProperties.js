//Author - Grabar igor
var prop_w = document.getElementById('properties_window');
var scene_object_prop_w = document.getElementById('prop_w_scene_object');
console.log('sceneObjectProperties.js loaded');

function updateWindowVisibility(type)
{
    if (type > 0)
    {
        prop_w.style.visibility = "visible";
        switch(type)
        {
            case 1:
            {
                scene_object_prop_w.style.visibility = "visible";
                break;
            }
            case 2:
            {
                break;
            }
            default:
            {
                break;
            }
        }
    }
    else
    {
        prop_w.style.visibility = "hidden";
        scene_object_prop_w.style.visibility = "hidden";
    }
}

function updateSceneObjectPropertiesWindow(objects)
{
    if (objects.length > 0)
    {
        if (objects.length > 1)
        {
            //TODO
        }
        else
        {
            document.getElementById('i_pos_x').value = objects[0].x;
            document.getElementById('i_pos_y').value = objects[0].y;
            document.getElementById('i_pos_z').value = objects[0].z;
            
            document.getElementById('i_rot_x').value = objects[0].xrot;
            document.getElementById('i_rot_y').value = objects[0].yrot;
            document.getElementById('i_rot_z').value = objects[0].zrot;
            
            document.getElementById('i_sca_x').value = objects[0].xsc;
            document.getElementById('i_sca_y').value = objects[0].ysc;
            document.getElementById('i_sca_z').value = objects[0].zsc;
        }
    }
    else
    {
        updateWindowVisibility(0);
    }
}

function updateSceneObjects(objects)
{
    if (objects.length > 0)
    {
        for (var i = 0; i < objects.length; i++)
        {
            objects[i].x = document.getElementById('i_pos_x').value;
            objects[i].y = document.getElementById('i_pos_y').value;
            objects[i].z = document.getElementById('i_pos_z').value;
            
            objects[i].xrot = document.getElementById('i_rot_x').value;
            objects[i].yrot = document.getElementById('i_rot_y').value;
            objects[i].zrot = document.getElementById('i_rot_z').value;
            
            objects[i].xsc = document.getElementById('i_sca_x').value;
            objects[i].ysc = document.getElementById('i_sca_y').value;
            objects[i].zsc = document.getElementById('i_sca_z').value;
        }
    }
    else
    {
        alert('nope');
    }
}