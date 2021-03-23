var numberC = 0; //number of condition block
var numberA = 0; //number of action block
var numberR = 0; //number of rule
var listCond = []; //list the number of condition in the condition block with the index is the
//num of the condition block
var listAct = []; //list the number of action in the action block with the index is the
//num of the action block
var blockList = {

    '0': {
        'rule': {
            'type': 'logical_block',
            'name': '2nd_bonus',
            'conditions': [{
                    'name': 'condName',
                    'input': 'score',
                    'operation': 'greater',
                    'value': '2000'
                }, {
                    "name": "lane a is down",
                    "input": "lane_a",
                    "operation": "state",
                    "value": "down"
                },
                {
                    "name": "lane b is down",
                    "input": "lane_b",
                    "operation": "state",
                    "value": "down"
                },
                {
                    "name": "lane c is down",
                    "input": "lane_c",
                    "operation": "state",
                    "value": "down"
                }
            ],
            'actions': [{
                    "name": "play bonus sound",
                    "type": "sound",
                    "operation": null,
                    "value": "bonus.mp3"
                },
                {
                    "name": "increase score by 1000",
                    "type": "variable",
                    "operation": "increase",
                    "value": 1000
                },
                {
                    "name": "flash right lamps",
                    "type": "action_block",
                    "operation": null,
                    "value": "flash_lamps_right"
                },
                {
                    "name": "flash left lamps",
                    "type": "action_block",
                    "operation": null,
                    "value": "flash_lamps_left"
                }
            ]
        }
    }

};
window.localStorage.setItem("blockList", JSON.stringify(blockList));


function getInput(x) {
    var type = document.getElementById('type'+x)
    var name = document.getElementById('name'+x)

    if (d.value != undefined) {
        var blockList = JSON.parse(window.localStorage.getItem("blockList"))
        blockList[x] = {
            'rule': {
                'name': name.value,
                'type': type.value
            }
        }
    }
}

function addRule() {
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordionR' id='accordionR" + numberR + "' onclick=getInput(" + numberR + ")>" + 'Rule' + numberR + "</button>" +
        "<div class='panel1' id='Rule" + numberR + "'>" +
        "<label for='type'> type :<br />" +
        "<input id='type" + numberR + "' type='text' name='search' placeholder='Enter the type of the rule' /><br />" +
        "<label for='name'> name :</label><br />" +
        "<input id='name" + numberR + "' type='text' name='search' placeholder='Enter the name of the rule' /><br />" +
        "<label for='name'> Choose Type for the loop :</label><br />" +
        "<input class='elem' type='button' value='new conditions' onclick='addCondition(" + numberR + "); addListener()' />" +
        "<input class='elem' type='button' value='new actions' onclick='addAction(); addListener()' />" +
        "</label>";
    numberR += 1;
    addRuleListener();
}

function addCondition(x) {
    d = document.getElementById('Rule' + x);
    d.innerHTML += "<button class='accordion' id='accordionC" + numberC + "'>" + 'Condition' + numberC + "</button>" +
        "<div class='panel' id='Condition" + numberC + "'>" +
        "<button for='name' onClick='del(" + numberC + ")'> delete </button><br>" +
        "<div class='con" + numberC + "'>" +
        "<label for='name'> name :</label><br>" +
        "<select id='name' name='name'>script:element()</select><br>" +
        "<label for='name'> input :</label><br>" +
        "<select id='loop1' name='loop1'>" +
        "<option value=1>input</option>" +
        "<option value=2 >conditional_block</option>" +
        "<option value=3 >variable</option>" +
        "<option value=4>formula</option></select><br>" +
        "<input type='text' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='loop2' name='loop2'>" +
        "<option value=1>less_than</option>" +
        "<option value=2 >equals </option>" +
        "<option value=3 >not_equals </option>" +
        "<option value=4>greater_than</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' name='search'/><br>" +
        "<button for='name' onClick='addConditionElement(" + numberC + ")'> addCondition </button>" +
        "<button for='name' onClick='delOne(" + numberC + ", " + listCond[x] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    if (listCond[x] != undefined) {
        listCond[x] += 1;
    } else {
        listCond[x] = 1;
    }
    numberC += 1;
}

function addConditionElement(x) {
    listCond[x] += 1;
    d = document.getElementById("Condition" + x);
    d.innerHTML += "<div class='con" + x + "'>" +
        "<label for='name'> name :</label><br>" +
        "<select id='name' name='name'>script:element()</select><br>" +
        "<label for='name'> input :</label><br>" +
        "<select id='loop1' name='loop1'>" +
        "<option value=1>input</option>" +
        "<option value=2 >conditional_block</option>" +
        "<option value=3 >variable</option>" +
        "<option value=4>formula</option></select><br>" +
        "<input type='text' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='loop2' name='loop2'>" +
        "<option value=1>less_than</option>" +
        "<option value=2 >equals </option>" +
        "<option value=3 >not_equals </option>" +
        "<option value=4>greater_than</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' name='search'/><br>" +
        "<button for='name' onClick='addConditionElement(" + x + ")'> addCondition </button>" +
        "<button for='name' onClick='delOne(" + x + ", " + listCond[x] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
}

function addAction(x) {
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordion' id='accordionA" + numberA + "'>" + 'Action' + numberA + "</button>" +
        "<div class='panel' id='Action" + numberA + "'>" +
        "<label for='name'> name :</label><br>" +
        "<select id='name' name='name'>script:element()</select><br>" +
        "<label for='name'> input :</label><br>" +
        "<input type='text' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='loop' name='loop'>" +
        "<option value=1>less_than</option>" +
        "<option value=2 >equals </option>" +
        "<option value=3 >not_equals </option>" +
        "<option value=4>greater_than</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' name='search'/><br>" +
        "<button for='name' onClick='del(" + numberA + ")'> addAction </button>" +
        "<button for='name' onClick='del(" + numberA + ")'> delete </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    numberA += 1;

}

function del(x) {
    if (document.getElementById('Action' + x) != null) {
        document.getElementById('Action' + x).remove();
        document.getElementById('accordionA' + x).remove();
    } else if (document.getElementById('Condition' + x) != null) {
        document.getElementById('Condition' + x).remove();
        document.getElementById('accordionC' + x).remove();
    }
}

function delOne(x, y) {
    size = document.getElementsByClassName('con' + x).length;
    if (size == 1) {
        if (document.getElementById('Action' + x) != null) {
            document.getElementById('Action' + x).remove();
            document.getElementById('accordionA' + x).remove();
        } else if (document.getElementById('Condition' + x) != null) {
            document.getElementById('Condition' + x).remove();
            document.getElementById('accordionC' + x).remove();
        }
    } else {
        if (document.getElementById('Action' + x) != null) {
            document.getElementById('Action' + x).remove();
        } else if (document.getElementsByClassName('con' + x)[y] != null) {
            document.getElementsByClassName('con' + x)[y - 1].remove();
        }
    }

}

/**
 * Add EventListener in the list of rule for hide and show the rule element
 */
function addListener() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

function addRuleListener() {
    var acc = document.getElementsByClassName("accordionR");
    var i;


    for (i = 0; i < acc.length; i++) {
        console.log(i);
        var number;
        console.log(listCond);
        if (listCond[i] != undefined && listAct[i] != undefined) {
            number = listCond[i] + listAct[i]
        } else if (listCond[i] != undefined) {
            number = listCond[i];
        } else if (listAct[i] != undefined) {
            number = listAct[i];
        } else {
            number = 1;
        }

        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                console.log(number);
                panel.style.maxHeight = (panel.scrollHeight * 3) + "px";
            }
        });
    }
}