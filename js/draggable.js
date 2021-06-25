//Author - Grabar Igor
function dragElement(elmnt) 
{
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) 
    {
        e = e || window.event;
        proper_top = parseInt(elmnt.style.top);
        proper_left = parseInt(elmnt.style.left);
        pos3 = proper_left + (e.clientX - elmnt.offsetLeft);
        pos4 = proper_top + (e.clientY - elmnt.offsetTop);
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) 
    {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        //console.log('1('+pos1+'), 2('+pos2+'), 3('+pos3+'), 4('+pos4+')');
        //console.log('offsetTop: ' + elmnt.offsetTop);
        //console.log('styleTop: ' + elmnt.style.top);
        proper_top = parseInt(elmnt.style.top);
        proper_left = parseInt(elmnt.style.left);
        
        elmnt.style.top = (proper_top - pos2) + "px";
        elmnt.style.left = (proper_left - pos1) + "px";
    }

    function closeDragElement() 
    {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}