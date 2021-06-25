//Author - Grabar Igor
var h = new Object();

function ddOnClick(source, child)
{
    ignore_global_click = true;
    var container = document.getElementById(source);
    var child_container = document.getElementById(child);
    var c_rect = container.getBoundingClientRect();
    var posy = c_rect.bottom;
    var posx = c_rect.left;
    
    child_container.style.left = posx;
    child_container.style.top = posy;
    
    //if (h[child] == 1)
    if (child_container.style.visibility == "visible")
    {
        child_container.style.visibility = "hidden";
        h[child] = 0;
    }
    else
    {
        child_container.style.visibility = "visible";
        h[child] = 1;
    }
    console.log('Invoked ddOnHover(' + source + ', ' + child + ')');
}

function ddClear(source)
{
    var container = document.getElementById(source);
    container.style.visibility = "hidden";
    h[source] = 0;
    console.log('Invoked ddClear(' + source + ')');
}