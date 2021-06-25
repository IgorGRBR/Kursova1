//Author - Grabar Igor
var global_variable = [];
var selected_var = -1;

class GlobalVar
{
    constructor()
    {
        this.name = "";
        this.value = 0;
    }
}

function addVariable()
{
    var c_var = new GlobalVar();
    c_var.name = 'new_variable';
    
    global_variable.push(c_var);
    updateVariableList();
}

function updateVariableList()
{
    var elems = document.getElementById('var_list')
    elems.innerHTML = ""; //Removes all elements
    
    for (var i = 0; i < global_variable.length; i++)
    {
        var c_elem = '<div class="btn2" onclick="editVariable(' + i + ');">' + global_variable[i].name + '</div>';
        elems.innerHTML += c_elem;
    }
}

function editVariable(index)
{
    selected_var = index;
    document.getElementById('variable_window').style.visibility = "visible";
    
    document.getElementById('var_name').value = global_variable[selected_var].name;
    document.getElementById('var_value').value = global_variable[selected_var].value;
}

function setVisible(uuh)
{
    if (uuh == 1)
    {
        document.getElementById('variable_list_window').style.visibility = "visible";
    }
    else
    {
        document.getElementById('variable_list_window').style.visibility = "hidden";
    }
}

function updateVariable(id)
{
    global_variable[id].name = document.getElementById('var_name').value;
    global_variable[id].value = parseFloat(document.getElementById('var_value').value);
    updateVariableList();
}

function removeVariable()
{
    global_variable.splice(selected_var, 1);
    updateVariableList();
}

function gvar(name)
{
    for (var i = 0; i<global_variable.length; i++)
    {
        if (global_variable[i].name == name)
            return global_variable[i].value;
    }
    return NaN;
}