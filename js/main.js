//Author - Grabar Igor
//import SceneObject from './sceneObject.js'

//Pie
var PI = 3.14159265359;

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc ); //Set back to white

//Setup the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 8;
camera.position.x = 8;
camera.position.y = 4;

//The container we will draw into
var container = document.getElementById( 'canvas' );

//Setup the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

container.appendChild( renderer.domElement );

/*
//Setup the controls
var controls = new THREE.OrbitControls( camera,container );

controls.keys = 
{
    LEFT: 65, //left arrow
    UP: 87, // up arrow
    RIGHT: 68, // right arrow
    BOTTOM: 83 // down arrow
}*/
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.mouseButtons = 
{
	ORBIT: THREE.MOUSE.RIGHT,
	ZOOM: THREE.MOUSE.WHEEL,
	PAN: THREE.MOUSE.MIDDLE
}
mouse_focus = false;//Mouse is not focused on anything, thus selection events will not be ignored
keys = []; //Hash containing currently pressed keys
document.addEventListener("keydown",function(event)
{
    keys[event.key] = true;
    console.log('key' + event.key + ' is pressed' );
}, false);
document.addEventListener("keyup",function(event)
{
    keys[event.key] = false;
}, false);

//Also, lets add grid
var grid_size = 40;
var grid_divisions = 40;

var gridHelper = new THREE.GridHelper( grid_size, grid_divisions );
scene.add(gridHelper);

//And add file listener
document.getElementById('file-input').addEventListener('change', myLoadFIle, false);
var file_input_type = 0; //0 = JSON projects, 1 = OBJ models, 2 = MTL materials

//Scene object list
var scene_object_list = [];

//Scene model
var sc_geometry = new THREE.PlaneGeometry( 20, 20, 0 );
var sc_material = new THREE.MeshBasicMaterial( {color: 0x8888ff, side: THREE.DoubleSide} );
var scene_model = new THREE.Mesh(sc_geometry, sc_material);
scene_model.rotation.set(PI/2, 0, 0);
scene.add(scene_model);
var ambientLight = new THREE.AmbientLight( 0x00ff00, 0.4 );
scene.add( ambientLight );
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add(pointLight);

//Insertion box
var insertion_box_geometry = new THREE.BoxGeometry( 1, 1, 1 );
var insertion_box_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
insertion_box_material.transparent = true;
insertion_box_material.opacity = 0.5;
var insertion_box = new THREE.Mesh(insertion_box_geometry, insertion_box_material);
insertion_box.visible = false;
scene.add(insertion_box);

var mtl_materials = new THREE.MTLLoader.MaterialCreator();

//Setup global variables
var ignore_global_click = false;
var edit_mode = 0;
// 0 = select;
// 1 = insert;
// 2 = delete;
// 3 = move;
// 4 = rotate;
// 5 = scale;

function run()
{
    //Aaand we'll add test cube here
    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //var cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );
    
    var onWindowResize = function()
    {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener( 'resize', onWindowResize, false );
    
    var update = function()
    {
        for (var i = 0; i<scene_object_list.length; i++)
        {
            scene_object_list[i].update();
        }
        
        //Update insertion box
        insertion_box.position.x = controls.target.x;
        insertion_box.position.y = controls.target.y;
        insertion_box.position.z = controls.target.z;
        if (edit_mode == 1)
        {
            insertion_box.visible = true;
        }
        else
        {
            insertion_box.visible = false;
        }
        
        updateCamera(camera.position, controls.target, keys, 0.25);
        camera.updateProjectionMatrix();
        controls.update();
        
        requestAnimationFrame( update );
		renderer.render(scene, camera);
    };
    update();
}

function updateScObjProp()
{
    var selected_list = getSelected(scene_object_list);
    updateSceneObjects(selected_list);
}

function myLoadFIle(e)
{
    switch (file_input_type)
    {
        case 0:
        {
            loadScene(e);
            break;
        }
        case 1:
        {
            loadSceneModel(e);
            break;
        }
        case 2:
        {
            loadSceneMaterial(e);
            break;
        }
        default:
        {
            alert('Unknown file type!');
        }
    }
}

function loadScene(e)
{
    //First, clear the scene
    clearScene();
    //Pick .json file
    var file_content = "";
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {
        var files = e.target.files;
        var file = files[0];
        
        new Promise(function(resolve, reject)
        {
            var reader = new FileReader();
            reader.onload = function(event)
            {
                resolve(event.target.result);
            }
            reader.readAsText(file);
            reader.onerror = reject;
        })
        .then(parseData)
        .catch(function(err) 
        {
            console.log(err)
        });
    } 
    else 
    {
        alert('The File APIs are not fully supported in this browser.');
    }
   
}

function loadSceneModel(e)
{
    
    var file_content = "";
    //Pick OBJ scene]
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {
        var files = e.target.files;
        var file = files[0];
        
        // instantiate a loader
        var loader = new THREE.OBJLoader();

        // load a resource
        new Promise(function(resolve, reject)
        {
            var reader = new FileReader();
            reader.onload = function(event)
            {
                resolve(event.target.result);
            }
            reader.readAsText(file);
            reader.onerror = reject;
        })
        .then(function(f_content)
        {
            mtl_materials.preload();
            loader.setMaterials(mtl_materials);
            var new_scene_model = loader.parse(f_content);
            scene.remove(scene_model);
            scene_model = new_scene_model;
            scene.add(scene_model);
        })
        .catch(function(err) 
        {
            console.log(err)
        });
    } 
    else 
    {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function loadSceneMaterial(e)
{
    var file_content = "";
    //Pick MTL material
    if (window.File && window.FileReader && window.FileList && window.Blob) 
    {
        var files = e.target.files;
        var file = files[0];
        
        // instantiate a loader
        var mtl_loader = new THREE.MTLLoader();

        // load a resource
        new Promise(function(resolve, reject)
        {
            var reader = new FileReader();
            reader.onload = function(event)
            {
                resolve(event.target.result);
            }
            reader.readAsText(file);
            reader.onerror = reject;
        })
        .then(function(f_content)
        {
            
        console.log('Loading scene material');
            var new_materials = mtl_loader.parse(f_content);
            mtl_materials = new_materials;
            file_input_type = 1;
            document.getElementById('file-input').click()
        })
        .catch(function(err) 
        {
            console.log(err)
        });
    } 
    else 
    {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function parseData(file_content)
{
    //Parse it
    //console.log(file_content);
    //Add everything to scene
    var packed_scene = JSON.parse(file_content);
    //Add everything to scene
    for (var i = 0; i<packed_scene.boxes.length; i++)
    {
        console.log('Box XYZ: ' + packed_scene.boxes[i].x + ' ' + packed_scene.boxes[i].y + ' ' + packed_scene.boxes[i].z)
        scene_object_list.push(new SceneObject());
        scene_object_list[i].setPos(packed_scene.boxes[i].x, packed_scene.boxes[i].y, packed_scene.boxes[i].z);
        scene_object_list[i].setDefaultActions();
        scene.add(scene_object_list[i].mesh);
    }
}

function clearScene()
{
    while(scene.children.length > 0)
    { 
        scene.remove(scene.children[0]); 
        scene_object_list = [];
    }
    //camera  
    scene.add(gridHelper);
    scene.add(scene_model);
    scene.add(insertion_box);
}

function globalClick()
{
    //Close any dropdowns, where mouse is absent
    if (ignore_global_click)
    {
        ignore_global_click = false
    }
    else
    {
        //Do the thing
        //console.log('Invoked globalClick!');
        //First, we get all the elements
        var e = document.getElementsByClassName("dropdown");
        for (var i = 0; i<e.length; i++)
        {
            if (e[i].style.visibility == "visible")
            {
                e[i].style.visibility = "hidden";
            }
        }
    }
    
}

function alignAlongAxis(a)
{
    switch (a)
    {
        case 0: //X
        {
            camera.position.z = controls.target.z;
            camera.position.y = controls.target.y;
            camera.position.x = controls.target.x + (controls.target.x/Math.abs(controls.target.x))*(6);
            break;
        }
        case 1: //Y
        {
            camera.position.x = controls.target.x;
            camera.position.z = controls.target.z;
            camera.position.y = controls.target.y + (controls.target.y/Math.abs(controls.target.y))*(6);
            break;
        }
        case 2: //Z
        {
            camera.position.x = controls.target.x;
            camera.position.y = controls.target.y;
            camera.position.z = controls.target.z + (controls.target.z/Math.abs(controls.target.z))*(6);
            break;
        }
    }
}

