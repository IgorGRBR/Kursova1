//Author - Grabar Igor
var selected_object = null;
var selected_state = -1;

class ObjectState
{
    constructor()
    {
        this.name = '';
        this.predicate = null; //Predicate's
        this.action = null; //Function to execute once predicate is true
        this.owner = null;
    }
    
    update()
    {
        if (this.predicate != undefined)
        {
            if (eval(this.predicate) && this.action != undefined)
            {
                this.action.execute();
            }
        }
    }
}

function updateStateList()
{
    var elems = document.getElementById('state_list')
    elems.innerHTML = ""; //Removes all elements
    
    console.log(selected_object);
    
    for (var i = 0; i < selected_object.states.length; i++)
    {
        var c_elem = '<div class="btn2" onclick="editState(' + i + ');">' + selected_object.states[i].name + '</div>';
        elems.innerHTML += c_elem;
    }
}

function addState()
{
    var c_state = new ObjectState();
    c_state.name = 'new_state';
    c_state.owner = selected_object;
    c_state.predicate = '';
    
    selected_object.states.push(c_state);
    updateStateList();
}

function editState(ind)
{
    selected_state = ind;
    selected_state_object = selected_object.states[selected_state]; //Used in action stuff...
    document.getElementById('state_configuration_window').style.visibility = "visible";
    
    document.getElementById('state_name').value = selected_object.states[selected_state].name;
    document.getElementById('state_value').value = selected_object.states[selected_state].predicate;
    
    if (selected_state_object.action == undefined)
    {
        document.getElementById('state_action').innerHTML = 'None';
    }
    else
    {
        document.getElementById('state_action').innerHTML = selected_state_object.action.name;
    }
}

function updateState(id)
{
    selected_object.states[id].name = document.getElementById('state_name').value;
    selected_object.states[id].predicate = document.getElementById('state_value').value;
    selected_object.states[id].action = selected_state_object.action;
    updateStateList();
}

function setStateListVisible(oke)
{
    if (oke == 1)
    {
        document.getElementById('state_list_window').style.visibility = "visible";
    }
    else
    {
        document.getElementById('state_list_window').style.visibility = "hidden";
    }
}

function removeState()
{
    selected_object.states.splice(selected_state, 1);
    updateStateList();
    document.getElementById('state_configuration_window').style.visibility = "hidden";
}