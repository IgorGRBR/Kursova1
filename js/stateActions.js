//Author - Grabar Igor
var selected_action = -1;
var selected_state_object = null;
var selected_action_object = null;

class StateAction
{
    constructor()
    {
        this.name = '';
        this.owner = null;
        this.func = null;
        this.arguments = [];
    }
    execute()
    {
        this.func.call(this.owner, this.arguments);
    }
}

function updateActionList()
{
    var elems = document.getElementById('action_list')
    elems.innerHTML = ""; //Removes all elements
    for (var i = 0; i < selected_object.actions.length; i++)
    {
        var c_elem = '<div class="btn2" onclick="applyAction(' + i + ');">' + selected_object.actions[i].name + '</div>';
        elems.innerHTML += c_elem;
    }
    if (selected_state_object.action != undefined)
    {
        document.getElementById('arg0').value = selected_state_object.action.arguments[0];
        document.getElementById('arg1').value = selected_state_object.action.arguments[1];
        document.getElementById('arg2').value = selected_state_object.action.arguments[2];
    }
    else
    {
        document.getElementById('arg0').value = "";
        document.getElementById('arg1').value = "";
        document.getElementById('arg2').value = "";
    }
}

function updateAction()
{
    selected_state_object.action = selected_object.actions[selected_action];
    var temp_arr = []
    temp_arr.push(parseFloat(document.getElementById('arg0').value));
    temp_arr.push(parseFloat(document.getElementById('arg1').value));
    temp_arr.push(parseFloat(document.getElementById('arg2').value));
    selected_state_object.action.arguments = temp_arr;
    console.log(selected_state_object);
    console.log(selected_object.actions[selected_action]);
    console.log(selected_action);
    console.log(selected_object);
}

function applyAction(n)
{
    selected_action = n;
    selected_state_object.action = selected_object.actions[n];
    document.getElementById('state_action').innerHTML = selected_state_object.action.name;
    updateAction();
}