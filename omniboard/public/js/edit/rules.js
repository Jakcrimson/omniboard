var numberC = 0; //number of condition block
var numberA = 0; //number of action block
var numberR = 0; //number of rule
var listCond = new Array(new Array()); //list the number of condition in the condition block with the index is the
//num of the condition block
var listAct = [[]]; //list the number of action in the action block with the index is the
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
    console.log(listCond);
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordionR' id='accordionR" + numberR + "' onclick='addRuleListener("+numberR+")'>" + 'Rule' + numberR + "</button>" +
        "<div class='panel1' id='Rule" + numberR + "'>" +
        "<button for='Delete' onClick='deleteRule(" + numberR +")'> delete Rule</button><br>" +
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

function deleteRule(x) {
    if(document.getElementsByClassName("accordionR" + x) != undefined) {
        document.getElementById("Rule" + x).remove();
        document.getElementById("accordionR" + x).remove();
    }
}

function getInputFromCond(x, nbRule) {
    var name = document.getElementById(nbRule + 'name' + x)
    var input = document.getElementById(nbRule + 'inputLoop' + x)
    var operation = document.getElementById(nbRule + 'operationLoop' + x)
    var value = document.getElementById(nbRule + 'value' + x)

    if (input.value == "other") {
        input = document.getElementById(nbRule + 'inputText' + x)
    }

    // var blockList = JSON.parse(window.localStorage.getItem("blockList"))
    // console.log(blockList)

    // blockList[nbRule].conditions[x] = {
    //     'name': name.value,
    //     'input': input.value,
    //     'operation': operation.value,
    //     'value': value.value
    // }
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
    listCond[x] = new Array()
    if (listCond[x][numberC] != undefined) {
        listCond[x][numberC] += 1;
    } else {
        listCond[x][numberC] = 1;
    }
    d = document.getElementById('Rule' + x);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<button class='accordion' id='accordionC" + x + "" + 1 + "' onclick=getInputFromCond(" + numberC + "," + x + ");addListener()>" + 'Condition' + x + "." + (numberC+1) + "</button>" +
        "<div class='panel' id='Condition" + x + "'>" +
        "<button for='name' onClick='del(" + x + ", " + 1+")'> delete </button><br>" +
        "<div class='con" + x + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input id='" + x + "name" + numberC + "' type='text' name='search' placeholder='Enter the name of the condition' /><br />" +
        "<label for='action'> input :</label><br>" +
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
        "<button for='name' onClick='addConditionElement(" + x + ")'> addCondition </button>" +
        "<button for='name' onClick='delOneCond(" + x + ", " + listCond[x][numberC] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    numberC += 1;
    addListener();
}

function addConditionElement(x) {
    listCond[x][numberC-1] += 1;
    d = document.getElementById("Condition" + x);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<div class='con" + x + "'>" +
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
        "<button for='name' onClick='addConditionElement(" + x + ")'> add Condition </button>" +
        "<button for='name' onClick='delOneCond(" + x + ", " + listCond[x][numberC-1] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
}

function delOneCond(x, y) {
    size = document.getElementsByClassName('con' + x).length;
    console.log(size);
    if (size == 1) {
        if (document.getElementById('Condition' + x) != null) {
            document.getElementById('Condition' + x).remove();
            document.getElementById('accordionC' + x + "" + 1).remove();
        }
    } else {
        if (document.getElementsByClassName('con' + x)[y-1] != null) {
            document.getElementsByClassName('con' + x)[y - 1].remove();
        }
    }
}

function addAction(x) {
    listAct[x] = new Array();
    if (listAct[x][numberA] != undefined) {
        listAct[x][numberA] += 1;
    } else {
        listAct[x][numberA] = 1;
    }
    console.log(listAct[x][numberA]);
    d = document.getElementById('Rule' + x);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<button class='accordion' id='accordionA" + x + "" + 1 + "' onclick='addListener()'>" + 'Action' + x + "." + (numberA+1) + "</button>" +
        "<div class='panel' id='Action" + x + "'>" +
        "<button for='name' onClick='del(" + x + ", " + listAct[x][numberA]+")'> delete </button><br>" +
        "<div class='act" + x + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input type='text' id='" + x + "nameText" + numberA + "' name='search'/><br>" +
        "<label for='action'> action :</label><br>" +
        "<select id='" + x + "inputLoop" + numberA + "' name='loop1' onclick=updateInput(" + numberA + "," + x + ")>" +
        "<option value=action_block_name >action_block_name </option>" +
        "<option value=play >play </option>" +
        "<option value=flash >flash </option>" +
        "<option value=increase >increase </option>" +
        "<option value=decrease >decrease</option>" +
        "<option value=multiply >multiply </option>" +
        "<option value=divide >divide </option>" +
        "<option value=set >set </option>" +
        "<option value=up >up </option>" +
        "<option value=down >down </option>" +
        "<option value=reset >reset </option></select><br>" +
        "<select disabled=true id='" + x + "inputLoop" + x + "' name='loop1' onclick=updateInput(" + numberA + "," + x + ")>" +
        "<option value=choose>choose action block </option></select><br>" +
        "<input type='text' disabled=true id='" + x + "actionText" + numberA + "' name='search'/><br>" +
        "<label for='output'> output :</label><br>" +
        "<input type='text' id='" + x + "outputText" + numberA + "' name='search'/><br>" +
        "<label for='value'> value :</label><br>" +
        "<select id='" + x + "operationLoop" + numberA + "' name='loop2'>" +
        "<option value='value'> value </option>" +
        "<option value=file_name >file_name </option>" +
        "<option value=true >true </option>" +
        "<option value=false >false </option>" +
        "<option value=up >up </option>" +
        "<option value=down >down </option>" +
        "<option value=on >on </option>" +
        "<option value=off >off </option>" +
        "<option value=variable> variable </option>" +
        "<option value=formula> formula </option></select><br>" +
        "<input type='text' id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<label for='param'> param :</label><br>" +
        "<input type='text' id='" + x + "paramText" + numberA + "' name='search'/><br>" +
        "<button for='name' onClick='addActionElement(" + x + ")'> addAction </button>" +
        "<button for='name' onClick='delOneAct(" + x + ", " + listAct[x][numberA] + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    numberA += 1;
    addListener();
}

function addActionElement(x) {
    listAct[x][numberA] += 1;
    d = document.getElementById("Action" + x);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<div class='act" + x + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input type='text' id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<label for='action'> action :</label><br>" +
        "<select id='" + x + "inputLoop" + x + "' name='loop1' onclick=updateInput(" + numberA + "," + x + ")>" +
        "<option value=action_block_name >action_block_name </option>" +
        "<option value=play >play </option>" +
        "<option value=flash >flash </option>" +
        "<option value=increase >increase </option>" +
        "<option value=decrease >decrease</option>" +
        "<option value=multiply >multiply </option>" +
        "<option value=divide >divide </option>" +
        "<option value=set >set </option>" +
        "<option value=up >up </option>" +
        "<option value=down >down </option>" +
        "<option value=reset >reset </option></select><br>" +
        "<select disabled=true id='" + x + "inputLoop" + x + "' name='loop1' onclick=updateInput(" + numberA + "," + x + ")>" +
        "<option value=choose>choose action block </option></select><br>" +
        "<input type='text' disabled=true id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<label for='output'> output :</label><br>" +
        "<input type='text' id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<label for='value'> value :</label><br>" +
        "<select id='" + x + "operationLoop" + numberA + "' name='loop2'>" +
        "<option value='value'> value </option>" +
        "<option value=file_name >file_name </option>" +
        "<option value=true >true </option>" +
        "<option value=false >false </option>" +
        "<option value=up >up </option>" +
        "<option value=down >down </option>" +
        "<option value=on >on </option>" +
        "<option value=off >off </option>" +
        "<option value=variable> variable </option>" +
        "<option value=formula> formula </option></select><br>" +
        "<input type='text' id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<label for='param'> param :</label><br>" +
        "<input type='text' id='" + x + "inputText" + numberA + "' name='search'/><br>" +
        "<button for='name' onClick='addActionElement(" + x + ")'> add Action </button>" +
        "<button for='name' onClick='delOneAct(" + x + ", " + listAct[x][numberA-1] + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
}

function delOneAct(x, y) {
    size = document.getElementsByClassName('act' + x).length;
    if (size == 1) {
        if (document.getElementById('Action' + x) != null) {
            document.getElementById('Action' + x).remove();
            document.getElementById('accordionA' + x + "" + 1).remove();
        }
    } else {
        console.log(document.getElementsByClassName('act' + x)[y-1]);
        if (document.getElementsByClassName('act' + x)[y-1] != null) {
            document.getElementsByClassName('act' + x)[y - 1].remove();
        }
    }
}

function del(x, y) {
    if (document.getElementById('Action' + x) != null) {
        document.getElementById('Action' + x).remove();
        document.getElementById('accordionA' + x +"" + y).remove();
    } else if (document.getElementById('Condition' + x) != null) {
        document.getElementById('Condition' + x).remove();
        document.getElementById('accordionC' + x +"" +y).remove();
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
                panel.style.maxHeight = 100 + "%"
            }
        });
    }
}

function addRuleListener(x) {
    var acc = document.getElementsByClassName("accordionR");
    var i;

    for (i = 0; i < acc.length; i++) {
        // if(i != x && acc[i] != undefined) {
        //     if(acc[i].classList.contains("active")) {
        //         console.log("enter");
        //         acc[i].classList.toggle("active");
        //         var panel = acc[i].nextElementSibling;
        //         panel.style.maxHeight = null;
        //     }
        // }
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = 100 + "%"
            }
            this.removeEventListener('click', arguments.callee, false); //because the listener is create when the rule is create and when
            //the rule is shown
        });
    }
}

function importRules() {

}