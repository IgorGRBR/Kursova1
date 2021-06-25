//Author - Grabar Igor
//import THREE from './lib/three.js'

class SceneObject
{
    /*
    var x; var y; var z; //Positions
    var xrot; var yrot; var zrot; //Rotations (IN RADIANS)
    var xsc; var ysc; var zsc; //Scalses
    //Following is self-explanatory
    var geometry;
    var material;
    var mesh;
    */
    constructor()
    {
        this.x=this.y=this.z=this.xrot=this.yrot=this.zrot=0;
        this.xsc=this.ysc=this.zsc=1;
        this.r = 0;
        this.g = 255;
        this.b = 0;
        this.selected = false;
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.userData.owner = this;
        this.states = [];
        this.actions = [];
    }
    setDefaultActions()
    {
        this.actions.splice(0,this.actions.length);//Clear that thing
        var addPos = function(arr)
        {
            this.x += arr[0];
            this.y += arr[1];
            this.z += arr[2];
        }
        var setCol = function(arr)
        {
            this.r = arr[0];
            this.g = arr[1];
            this.b = arr[2];
        }
        var actionAddPos = new StateAction();
        actionAddPos.name = 'Add to position';
        actionAddPos.owner = this;
        actionAddPos.func = addPos;
        var actionSetCol = new StateAction();
        actionSetCol.name = 'Set color';
        actionSetCol.owner = this;
        actionSetCol.func = setCol;
        this.actions.push(actionAddPos);
        this.actions.push(actionSetCol);
    }
    setPos(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setRot(xr, yr, zr)
    {
        this.xrot = xr;
        this.yrot = yr;
        this.zrot = zr;
    }
    update()
    {
        //Update state
        for (var k = 0; k<this.states.length; k++)
        {
            this.states[k].update();
            //if (this.states[k].predicate != undefined)
            //{
            //    if (eval(this.states[k].predicate) && this.states[k].action != undefined)
            //    {
            //        this.states[k].action.execute();
            //    }
            //}
        }
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.rotation.set(this.xrot, this.yrot, this.zrot);
        this.mesh.scale.set(this.xsc, this.ysc, this.zsc);
        if (this.selected)
        {
            this.material.color.r = 255;
            this.material.color.g = 0;
            this.material.color.b = 0;
        }
        else
        {
            this.material.color.r = this.r;
            this.material.color.g = this.g;
            this.material.color.b = this.b;
        }
    }
    destroy()
    {
        this.material = null;
        this.geometry = null;
        scene.remove(this.mesh);
        this.mesh = null;
    }
}

function getSelected(list)
{
    var res = [];
    for (var i = 0; i<list.length; i++)
    {
        if (list[i].selected)
            res.push(list[i]);
    }
    return res;
}
//export { SceneObject }