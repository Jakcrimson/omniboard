var numberC = 0; //number of condition block
var numberA = 0; //number of action block
var numberR = 0; //number of rule
var listCond = []; //list the number of condition in the condition block with the index is the
//num of the condition block
var listAct = []; //list the number of action in the action block with the index is the
//num of the action block
var blockList = {

    '0': {
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

};
window.localStorage.setItem("blockList", JSON.stringify(blockList));


function getInput(x) {
    var type = document.getElementById('type' + x)
    var name = document.getElementById('name' + x)

    var blockList = JSON.parse(window.localStorage.getItem("blockList"))
    blockList[x] = {
        'name': name.value,
        'type': type.value,
        'conditions': []
    }
    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function addRule() {
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordionR' id='accordionR" + numberR + "' onclick='addRuleListener()'>" + 'Rule' + numberR + "</button>" +
        "<div class='panel1' id='Rule" + numberR + "'>" +
        "<label for='type'> type :<br />" +
        "<input id='type" + numberR + "' type='text' name='search' placeholder='Enter the type of the rule' /><br />" +
        "<label for='name'> name :</label><br />" +
        "<input id='name" + numberR + "' type='text' name='search' placeholder='Enter the name of the rule' /><br />" +
        "<label for='name'> Choose Type for the loop :</label><br />" +
        "<input class='elem' type='button' value='new conditions' onclick='addCondition(" + numberR + ")' />" +
        "<input class='elem' type='button' value='new actions' onclick='addAction(" + numberR + ")' />" +
        "</label>";
    numberR += 1;
    addRuleListener();
}

function getInputFromCond(x, nbRule) {
    var name = document.getElementById(nbRule + 'name' + x)
    var input = document.getElementById(nbRule + 'inputLoop' + x)
    var operation = document.getElementById(nbRule + 'operationLoop' + x)
    var value = document.getElementById(nbRule + 'value' + x)

    if (input.value == "other") {
        input = document.getElementById(nbRule + 'inputText' + x)
    }

    var blockList = JSON.parse(window.localStorage.getItem("blockList"))
    console.log(blockList[nbRule])

    blockList[nbRule].conditions[x] = {
        'name': name.value,
        'input': input.value,
        'operation': operation.value,
        'value': value.value
    }
    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function updateInput(x, nbRule) {
    if (document.getElementById(nbRule + 'inputLoop' + x).value == "other") {
        document.getElementById(nbRule + 'inputText' + x).disabled = false
    } else {
        document.getElementById(nbRule + 'inputText' + x).disabled = true
    }
}


function addCondition(x) {
    if (listCond[x] != undefined) {
        listCond[x] += 1;
    } else {
        listCond[x] = 1;
    }
    d = document.getElementById('Rule' + x);
    d.innerHTML += "<button class='accordion' id='accordionC" + numberC + "' onclick=getInputFromCond(" + numberC + "," + x + ");addListener()>" + 'Condition' + numberC + "</button>" +
        "<div class='panel' id='Condition" + numberC + "'>" +
        "<button for='name' onClick='del(" + numberC + ")'> delete </button><br>" +
        "<div class='con" + numberC + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input id='" + x + "name" + numberC + "' type='text' name='search' placeholder='Enter the name of the condition' /><br />" +
        "<label for='name'> input :</label><br>" +
        "<select id='" + x + "inputLoop" + numberC + "' name='loop1' onclick=updateInput(" + numberC + "," + x + ")>" +
        "<option value=input>input</option>" +
        "<option value=conditional_block>conditional_block</option>" +
        "<option value=variable>variable</option>" +
        "<option value=formula>formula</option>" +
        "<option value=other>other (enter below)</option></select><br>" +
        "<input type='text' disabled=true id='" + x + "inputText" + numberC + "' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='" + x + "operationLoop" + numberC + "' name='loop2'>" +
        "<option value=less_than>less_than</option>" +
        "<option value=equals>equals </option>" +
        "<option value=not_equals>not_equals </option>" +
        "<option value=greater_than>greater_than</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' id='" + x + "value" + numberC + "' name='search'/><br>" +
        "<button for='name' onClick='addConditionElement(" + numberC + ")'> addCondition </button>" +
        "<button for='name' onClick='delOne(" + numberC + ", " + listCond[x] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    numberC += 1;
    addListener();
}

function test() {
    console.log("test");
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
    if (listAct[x] != undefined) {
        listAct[x] += 1;
    } else {
        listAct[x] = 1;
    }
    d = document.getElementById('Rule' + x);
    d.innerHTML += "<button class='accordion' id='accordionA" + x + "" + listAct[x] + "' onclick='addListener()'>" + 'Action' + x + "." + listAct[x] + "</button>" +
        "<div class='panel' id='Action" + x + "'>" +
        "<button for='name' onClick='del(" + x + ")'> delete </button><br>" +
        "<div class='act" + x + "'>" +
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
        "<button for='name' onClick='addActionElement(" + x + ")'> addAction </button>" +
        "<button for='name' onClick='delOne(" + x + ", " + listAct[x] + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    numberA += 1;
    addListener();
}

function addActionElement(x) {
    listAct[x] += 1;
    d = document.getElementById("Action" + x);
    d.innerHTML += "<div class='act" + x + "'>" +
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
        "<button for='name' onClick='addActElement(" + x + ")'> addAct </button>" +
        "<button for='name' onClick='delOne(" + x + ", " + listAct[x] + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
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
            this.classList.toggle("view");
            this.removeEventListener('click', arguments.callee, false);
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                console.log("enter");
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

function addRuleListener() {
    console.log("call");
    var acc = document.getElementsByClassName("accordionR");
    var i;

    for (i = 0; i < acc.length; i++) {
        var number;
        if (listCond[i] != undefined && listAct[i] != undefined) {
            number = listCond[i] + listAct[i]
        } else if (listCond[i] != undefined) {
            number = listCond[i];
        } else if (listAct[i] != undefined) {
            number = listAct[i];
        } else {
            number = 1;
        }
        console.log(acc[0]);
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = 100 + "%";
            }
            this.removeEventListener('click', arguments.callee, false); //becaus the listener is create when the rule is create and when
            //the rule is shown
        });
    }
}