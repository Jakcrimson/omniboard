var numberC = []; //number of condition block
var numberA = []; //number of action block
var numberR = 0; //number of rule
var listCond = [
        []
    ] //list the number of condition in the condition block with the index is the
    //num of the condition block
var listAct = [
        []
    ] //list the number of action in the action block with the index is the
    //num of the action block
var blockList = JSON.parse(window.localStorage.getItem("blockList"))
var conditionNames = [];
var actionNames = [];

if (blockList == undefined) {
    blockList = {
        rules: [{
            'type': 'logical_block',
            'name': '2nd_bonus',
            'conditions': [
                [
                    {
                        'name': 'condName1',
                        'input': 'conditional_block',
                        'operation': 'not_equals',
                        'value': 'condition1'
                    }, 
                    {
                        "name": "lane a is down",
                        "input": "variable",
                        "operation": "value_changed",
                        "value": "51"
                    }
                ],
                [
                    {
                        "name": "lane b is down",
                        "input": "input",
                        "operation": "equals",
                        "value": "down"
                    },
                    {
                        "name": "lane c is down",
                        "input": "formula",
                        "operation": "less_than",
                        "value": "down"
                    }
                ]
            ],
            'actions': [
                [
                    {
                        "name": "play bonus sound",
                        "action": "play",
                        "output": null,
                        "value": "bonus.mp3",
                        "param": "test"
                    },
                    {
                        "name": "flash_lamp_1",
                        "action": "flash",
                        "output": null,
                        "value": "on",
                        "param": "test"
                    }
                ],
                [
                    {
                        "name": "play video",
                        "action": "play",
                        "output": null,
                        "value": "bonus.mp4",
                        "param" : "test"
                    },
                    {
                        "name": "flash",
                        "action": "flash",
                        "output": null,
                        "value": "off",
                        "param" : "test"
                    }
                ]
            ]
        }],
        image: '/images/pinball_top_view.jpg'
    };
    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function initJson() {
    if (blockList.image != null) document.getElementById('image').src = blockList.image

    console.log('initiation des rules . . . ')
    for (var i = 0; i < blockList.rules.length; i++) {
        addRule()
        document.getElementById('type' + i).setAttribute('value', blockList.rules[i].type)
        document.getElementById('name' + i).setAttribute('value', blockList.rules[i].name)
        document.getElementById('accordionR' + i).innerHTML = document.getElementById('name' + i).value
        if(blockList.rules[i].conditions != undefined) {
            for (let j = 0; j < blockList.rules[i].conditions.length; j++) {
                addCondition(i)
                var condition = blockList.rules[i].conditions[j][0]
                if (condition != undefined) {
                    document.getElementById(i + 'name' + j).setAttribute('value', condition.name)
                    document.getElementById(i + 'inputLoop' + j).options[condition.input].setAttribute('selected', true)
                    document.getElementById(i + 'operationLoop' + j).options[condition.operation].setAttribute('selected', true)
                    document.getElementById(i + 'value' + j).setAttribute('value', condition.value)

                    document.getElementById('accordionC' + i + numberC[i]).innerHTML = document.getElementById(i + 'name' + j).value

                    for (let k = 1; k < blockList.rules[i].conditions[j].length; k++) {
                        addConditionElement(i, j)
                        condition = blockList.rules[i].conditions[j][k]
                        if (condition != undefined) {
                            document.getElementById(i + 'name' + j + k).setAttribute('value', condition.name)
                            document.getElementById(i + 'inputLoop' + j + k).options[condition.input].setAttribute('selected', true)
                            document.getElementById(i + 'operationLoop' + j + k).options[condition.operation].setAttribute('selected', true)
                            document.getElementById(i + 'value' + j + k).setAttribute('value', condition.value)
                        }
                    }
                }

            }
        }
        if(blockList.rules[i].actions != undefined) {
            for (let j = 0; j < blockList.rules[i].actions.length; j++) {
                addAction(i)
                var action = blockList.rules[i].actions[j][0]
                if (action != undefined) {
                    document.getElementById(i + 'nameText' + j).setAttribute('value', action.name)
                    document.getElementById(i + 'selectAction' + j).options[action.action].setAttribute('selected', true)
                    document.getElementById(i + 'outputText' + j).setAttribute('value', action.output)
                    if (document.getElementById(i + 'selectValue' + j).options[action.value] == undefined) {
                        document.getElementById(i + 'inputValue' + j).setAttribute('value', action.value)
                    } else {
                        document.getElementById(i + 'selectValue' + j).options[action.value].setAttribute('selected', true)
                    }
                    document.getElementById(i + 'paramText' + j).setAttribute('value', action.param)

                    document.getElementById('accordionA' + i + numberA[i]).innerHTML = document.getElementById(i + 'nameText' + j).value

                    for (let k = 1; k < blockList.rules[i].actions[j].length; k++) {
                        addActionElement(i, j)
                        action = blockList.rules[i].actions[j][k]
                        if (action != undefined) {
                            document.getElementById(i + 'nameText' + j + k).setAttribute('value', action.name)
                            document.getElementById(i + 'selectAction' + j + k).options[action.action].setAttribute('selected', true)
                            document.getElementById(i + 'outputText' + j + k).setAttribute('value', action.output)
                            if (document.getElementById(i + 'selectValue' + j + k).options[action.value] == undefined) {
                                document.getElementById(i + 'inputValue' + j + k).setAttribute('value', action.value)
                            } else {
                                document.getElementById(i + 'selectValue' + j + k).options[action.value].setAttribute('selected', true)
                            }
                            document.getElementById(i + 'paramText' + j + k).setAttribute('value', action.param)
                        }
                    }
                }
            }
        }
    }
}

function getInput(x) {
    var type = document.getElementById('type' + x).value
    var name = document.getElementById('name' + x).value

    if (blockList.rules[x] == undefined) {
        blockList.rules.push({ 'name': name, 'type': type, 'conditions': [] })
    } else {
        blockList.rules[x].name = name
        blockList.rules[x].type = type
    }

    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function updateNameRule(rule) {
    document.getElementById('accordionR' + rule).innerHTML = document.getElementById('name' + rule).value
}

function addRule() {
    d = document.getElementById('rule');
    var l = document.createElement("rules" + numberR);
    d.innerHTML += "<button class='accordionR' id='accordionR" + numberR + "' onclick='getInput(" + numberR + ")'>" + 'Rule' + (numberR + 1) + "</button>" +
        "<div class='panel1' id='Rule" + numberR + "'>" +
        "<button for='Delete' onClick='deleteRule(" + numberR + ")'> delete Rule</button><br>" +
        "<label for='type'> type :<br />" +
        "<input id='type" + numberR + "' type='text' name='search' placeholder='Enter the type of the rule' /><br />" +
        "<label for='name'> name :</label><br />" +
        "<input id='name" + numberR + "' type='text' name='search' placeholder='Enter the name of the rule' onchange='updateNameRule(" + numberR + ")'/><br />" +
        "<label for='name'> Choose Type for the loop :</label><br />" +
        "<input class='elem' type='button' value='new conditions' onclick='addCondition(" + numberR + ")' />" +
        "<input class='elem' type='button' value='new actions' onclick='addAction(" + numberR + ")' />" +
        "</label>";
    d.appendChild(l)
    addRuleListener('accordionR');
    numberR += 1;
}

function getActionName() {
    var cmpt = 0;
    for (let i = 0; i < blockList.rules.length; i++) {
        for (let j = 0; j < blockList.rules[i].actions.length; j++) {
            for (let k = 0; k < blockList.rules[i].actions[j].length; k++) {
                actionNames[cmpt] = blockList.rules[i].actions[j][k].name;
                cmpt++;
            }
        }
    }
    var ret = "";
    for (let i = 0; i < conditionNames.length; i++) {
        ret += "<option value=" + actionNames[i] + " name=" + actionNames[i] + ">" + actionNames[i] + "</option>";
    }
    console.log(conditionNames);
    return ret;
}

function getConditionNames() {
    var cmpt = 0;
    for (let i = 0; i < blockList.rules.length; i++) {
        for (let j = 0; j < blockList.rules[i].conditions.length; j++) {
            for (let k = 0; k < blockList.rules[i].conditions[j].length; k++) {
                conditionNames[cmpt] = blockList.rules[i].conditions[j][k].name;
                cmpt++;
            }
        }
    }
    var ret = "";
    for (let i = 0; i < conditionNames.length; i++) {
        ret += "<option value=" + conditionNames[i] + " name=" + conditionNames[i] + ">" + conditionNames[i] + "</option>";
    }
    console.log(conditionNames);
    return ret;

}

function updateConditionNames(x, nbRule, y) {
    getConditionNames()
    if (y == undefined) {
        var select = document.getElementById(nbRule + 'conditionBlock' + x);
        var length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
    } else {
        var select = document.getElementById(nbRule + 'conditionBlock' + x + y);
        var length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
    }
    for (let i = 0; i < conditionNames.length; i++) {

        if (y == undefined) {
            var loop = document.getElementById(nbRule + 'conditionBlock' + x);
            var option = document.createElement("option");
            option.text = conditionNames[i];
            loop.add(option);

        } else {
            var loop = document.getElementById(nbRule + 'conditionBlock' + x + y);
            var option = document.createElement("option");
            option.text = conditionNames[i];
            loop.add(option);
        }
    }
}

function updateActionNames() {
    getActionNames()
    if (y == undefined) {
        var select = document.getElementById(nbRule + 'actionBlock' + x);
        var length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
    } else {
        var select = document.getElementById(nbRule + 'actionBlock' + x + y);
        var length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
    }
    for (let i = 0; i < actionNames.length; i++) {

        if (y == undefined) {
            var loop = document.getElementById(nbRule + 'actionBlock' + x);
            var option = document.createElement("option");
            option.text = actionNames[i];
            loop.add(option);

        } else {
            var loop = document.getElementById(nbRule + 'actionBlock' + x + y);
            var option = document.createElement("option");
            option.text = actionNames[i];
            loop.add(option);
        }
    }

}




function deleteRule(x) {
    if (document.getElementsByClassName("accordionR" + x) != undefined) {
        if(blockList.rules[x].actions != undefined) {
            let size = blockList.rules[x].actions.length
            for(let i = 0; i < size; i++) {
                if(blockList.rules[x].actions[i] != undefined) {
                    del(i, x, 0)
                }
            }
        }
        if(blockList.rules[x].conditions != undefined) {
            size = blockList.rules[x].conditions.length
            for(let i = 0; i < size; i++) {
                if(blockList.rules[x].conditions[i] != undefined) {
                    del(i, x, 1)
                }
            }
        }
        document.getElementById("Rule" + x).remove();
        document.getElementById("accordionR" + x).remove();
        numberR -= 1;
    }
}

function getInputFromCond(cond, rule) {

    var name = document.getElementById(rule + 'name' + cond)
    var input = document.getElementById(rule + 'inputLoop' + cond)
    var operation = document.getElementById(rule + 'operationLoop' + cond)
    var value = document.getElementById(rule + 'value' + cond)

    if (input.value == "other") {
        input = document.getElementById(rule + 'inputText' + cond)
    }

    if (blockList.rules[rule].conditions == undefined) {
        blockList.rules[rule].conditions = []
    }
    if (blockList.rules[rule].conditions[cond] == undefined) {
        blockList.rules[rule].conditions[cond] = []
    }
    blockList.rules[rule].conditions[cond][0] = {
        'name': name.value,
        'input': input.value,
        'operation': operation.value,
        'value': value.value
    }

    for (i = 1; i < listCond[rule][cond]; i++) {
        name = document.getElementById(rule + 'name' + cond + i)
        input = document.getElementById(rule + 'inputLoop' + cond + i)
        operation = document.getElementById(rule + 'operationLoop' + cond + i)
        value = document.getElementById(rule + 'value' + cond + i)

        if (input.value == "other") {
            input = document.getElementById(rule + 'inputText' + cond + i)
        }

        blockList.rules[rule].conditions[cond][i] = {
            'name': name.value,
            'input': input.value,
            'operation': operation.value,
            'value': value.value
        }
    }
    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function updateChooseAction(x, nbRule, y) {
    if (y != undefined) {
        if (document.getElementById(nbRule + 'selectAction' + x + y).value == "action_block_name") {
            document.getElementById(nbRule + 'actionBlock' + x + y).disabled = false;
        } else {
            document.getElementById(nbRule + 'actionBlock' + x + y).disabled = true;
        }
    } else {
        if (document.getElementById(nbRule + 'selectAction' + x).value == "action_block_name") {
            document.getElementById(nbRule + 'actionBlock' + x).disabled = false;
        } else {
            document.getElementById(nbRule + 'actionBlock' + x).disabled = true;
        }
    }
}

function updateValueAction(x, nbRule, y) {
    if (y != undefined) {
        if (document.getElementById(nbRule + 'selectValue' + x + y).value == "file_name" ||
            document.getElementById(nbRule + 'selectValue' + x + y).value == "value" ||
            document.getElementById(nbRule + 'selectValue' + x + y).value == "variable" ||
            document.getElementById(nbRule + 'selectValue' + x + y).value == "formula") {

            document.getElementById(nbRule + 'inputValue' + x + y).disabled = false;
        } else {
            document.getElementById(nbRule + 'inputValue' + x + y).disabled = true;
        }
    } else {
        if (document.getElementById(nbRule + 'selectValue' + x).value == "file_name" ||
            document.getElementById(nbRule + 'selectValue' + x).value == "value" ||
            document.getElementById(nbRule + 'selectValue' + x).value == "variable" ||
            document.getElementById(nbRule + 'selectValue' + x).value == "formula") {

            document.getElementById(nbRule + 'inputValue' + x).disabled = false;
        } else {
            document.getElementById(nbRule + 'inputValue' + x).disabled = true;
        }
    }

}

function updateInputCondition(x, nbRule, y) {
    if (y != undefined) {
        if (document.getElementById(nbRule + 'inputLoop' + x + y).value == "conditional_block") {
            document.getElementById(nbRule + 'inputText' + x + y).disabled = true;
            document.getElementById(nbRule + 'conditionBlock' + x + y).disabled = false;
        } else {
            document.getElementById(nbRule + 'inputText' + x + y).disabled = false;
            document.getElementById(nbRule + 'conditionBlock' + x + y).disabled = true;
        }
    } else {
        if (document.getElementById(nbRule + 'inputLoop' + x).value == "conditional_block") {
            document.getElementById(nbRule + 'inputText' + x).disabled = true;
            document.getElementById(nbRule + 'conditionBlock' + x).disabled = false;
        } else {
            document.getElementById(nbRule + 'inputText' + x).disabled = false;
            document.getElementById(nbRule + 'conditionBlock' + x).disabled = true;
        }

    }
}

function updateNameAct(rule, act) {
    document.getElementById('accordionA' + rule + act).innerHTML = document.getElementById(rule + 'nameText' + act).value
}

function updateNameCond(rule, cond) {
    document.getElementById('accordionC' + rule + cond).innerHTML = document.getElementById(rule + 'name' + cond).value
}

function addCondition(x) {
    console.log("IN ADDCONDITION")
    listCond[x] = new Array()
    if (numberC[x] != undefined && numberC[x] >= 0) {
        numberC[x] += 1;
    } else {
        numberC[x] = 0;
    }
    if (listCond[x][numberC[x]] == undefined) {
        listCond[x][numberC[x]] = 1;
    }
    console.log("x : " + x, "numberC[x] : " + numberC[x], "listCond[x][numberC[x]] : " + listCond[x][numberC[x]])

    d = document.getElementById('Rule' + x);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<button class='accordion' id='accordionC" + x + "" + numberC[x] + "' onclick=getInputFromCond(" + numberC[x] + "," + x + ")>" + 'Condition' + x + "." + (numberC[x] + 1) + "</button>" +
        "<div class='panel' id='Condition" + x + numberC[x] + "'>" +
        "<button for='name' onClick='del(" + numberC[x] + ", " + x + "," + 1 + ")'> delete </button><br>" +
        "<div class='"+ x + "con" + numberC[x] + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input id='" + x + "name" + numberC[x] + "' type='text' name='search' placeholder='Enter the name of the condition' onchange='updateNameCond(" + x + "," + numberC[x] + ")'/><br />" +
        "<label for='action'> input :</label><br>" +
        "<select id='" + x + "inputLoop" + numberC[x] + "' name='loop1' onclick=updateInputCondition(" + numberC[x] + "," + x + ") > " +
        "<option name=input value=input>input</option>" +
        "<option name=conditional_block value=conditional_block>conditional_block</option>" +
        "<option name=variable value=variable>variable</option>" +
        "<option name=formula value=formula>formula</option></select><br>" +
        "<select id='" + x + "conditionBlock" + numberC[x] + "' onclick= updateConditionNames(" + x + "," + numberC[x] + ") name='loop1' disabled=true>" +
        getConditionNames() + "</select><br>" +
        "<input type='text' disabled=true id='" + x + "inputText" + numberC[x] + "' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='" + x + "operationLoop" + numberC[x] + "' name='loop2'>" +
        "<option name=less_than value=less_than>less_than</option>" +
        "<option name=equals value=equals>equals </option>" +
        "<option name=not_equals value=not_equals>not_equals </option>" +
        "<option name=greater_than value=greater_than>greater_than</option>" +
        "<option name=value_changed value=value_changed>value_changed</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' id='" + x + "value" + numberC[x] + "' name='search'/><br>" +
        "<button for='name' onClick='addConditionElement(" + x + "," + numberC[x] + ")'> addCondition </button>" +
        "<button for='name' onClick='delOneCond(" + numberC[x] + ", " + x + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    addListener('accordionC' + x + "" + numberC[x]);
}

function addConditionElement(x, cond) {
    d = document.getElementById("Condition" + x + cond);
    var l = document.createElement("conditions" + x);
    l.innerHTML += "<div id='"+ x + "con" + cond + listCond[x][cond] + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input id='" + x + "name" + cond + listCond[x][cond] + "' type='text' name='search' placeholder='Enter the name of the condition' /><br />" +
        "<label for='name'> input :</label><br>" +
        "<select id='" + x + "inputLoop" + cond + listCond[x][cond] + "' name='loop1' onclick=updateInputCondition(" + cond + "," + x + "," + listCond[x][cond] + ")>" +
        "<option name=input value=input>input</option>" +
        "<option name=conditional_block value=conditional_block>conditional_block</option>" +
        "<option name=variable value=variable>variable</option>" +
        "<option name=formula value=formula>formula</option></select><br>" +
        "<select id='" + x + "conditionBlock" + cond + listCond[x][cond] + "'onclick= updateConditionNames(" + cond + "," + x + "," + listCond[x][cond] + ") name='loop1' disabled=true>" +
        getConditionNames() + "</select><br>" +
        "<input type='text' disabled=true id='" + x + "inputText" + cond + listCond[x][cond] + "' name='search'/><br>" +
        "<label for='name'> operation :</label><br>" +
        "<select id='" + x + "operationLoop" + cond + listCond[x][cond] + "' name='loop2'>" +
        "<option name=less_than value=less_than>less_than</option>" +
        "<option name=equals value=equals>equals </option>" +
        "<option name=not_equals value=not_equals>not_equals </option>" +
        "<option name=greater_than value=greater_than>greater_than</option>" +
        "<option name=value_changed value=value_changed>value_changed</option></select><br>" +
        "<label for='name'> value :</label><br>" +
        "<input type='text' id='" + x + "value" + cond + listCond[x][cond] + "' name='search'/><br>" +
        "<button for='name' onClick='addConditionElement(" + x + "," + cond + ")'> add Condition </button>" +
        "<button for='name' onClick='delOneCond(" + cond + "," + x + ", " + listCond[x][cond] + ")'> delete Condition </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    listCond[x][cond] += 1;
}

function delOneCond(x, nbRule, y) {
    if(y != undefined) {
        document.getElementById(nbRule + 'con' + x + y).remove();
        if(blockList.rules[nbRule].conditions[x][y] != undefined) {
            blockList.rules[nbRule].conditions[x].splice(y, y);
            listCond[nbRule][x] -= 1;
            numberC[nbRule] -= 1;
        }
    } else {
        document.getElementById("Condition" + nbRule + x).remove();
        document.getElementById("accordionC" + nbRule + "" + x).remove();
        if(blockList.rules[nbRule].conditions[x] != undefined) {
            blockList.rules[nbRule].conditions.splice(x, 1);
            if(blockList.rules[nbRule].conditions.length == 0) {
                delete blockList.rules[nbRule].conditions
            }
            listCond[nbRule][x] -= 1;
            numberC[nbRule] -= 1;
        }
    }
}

function getInputFromAct(cond, rule) {

    var name = document.getElementById(rule + 'nameText' + cond)
    var action = document.getElementById(rule + 'selectAction' + cond)
    var output = document.getElementById(rule + 'outputText' + cond)
    var value = document.getElementById(rule + 'selectValue' + cond)
    var param = document.getElementById(rule + 'paramText' + cond)

    if (action.value == "action_block_name") {
        action = document.getElementById(rule + 'actionBlock' + cond)
    }
    if (value.value == "value" ||
        value.value == "file_name" ||
        value.value == "variable" ||
        value.value == "formula") {
        if(document.getElementById(rule + 'inputText' + cond) != null) {
            value = document.getElementById(rule + 'inputText' + cond)
        }
        
    }

    if (blockList.rules[rule].actions == undefined) {
        blockList.rules[rule].actions = []
    }
    if (blockList.rules[rule].actions[cond] == undefined) {
        blockList.rules[rule].actions[cond] = []
    }
    blockList.rules[rule].actions[cond][0] = {
        'name': name.value,
        'action': action.value,
        'output': output.value,
        'value': value.value,
        'param': param.value
    }

    for (let i = 1; i < listAct[rule][cond]; i++) {
        name = document.getElementById(rule + 'nameText' + cond + i)
        action = document.getElementById(rule + 'selectAction' + cond + i)
        output = document.getElementById(rule + 'outputText' + cond + i)
        value = document.getElementById(rule + 'selectValue' + cond + i)
        param = document.getElementById(rule + 'paramText' + cond + i)

        if (action.value == "action_block_name") {
            action = document.getElementById(rule + 'actionBlock' + cond + i)
        }
        if (value.value == "value" ||
            value.value == "file_name" ||
            value.value == "variable" ||
            value.value == "formula") {
            value = document.getElementById(rule + 'inputValue' + cond + i)
        }

        blockList.rules[rule].actions[cond][i] = {
            'name': name.value,
            'action': action.value,
            'output': output.value,
            'value': value.value,
            'param': param.value
        }
    }
    window.localStorage.setItem("blockList", JSON.stringify(blockList));
}

function addAction(x) {
    console.log("IN ADDACTION")
    listAct[x] = new Array();
    if (numberA[x] != undefined && numberA[x] >= 0) {
        numberA[x] += 1;
    } else {
        numberA[x] = 0;
    }
    if (listAct[x][numberA[x]] == undefined) {
        listAct[x][numberA[x]] = 1;
    }
    d = document.getElementById('Rule' + x);
    var l = document.createElement("actions" + x);
    l.innerHTML += "<button class='accordion' id='accordionA" + x + "" + numberA[x] + "' onclick=getInputFromAct(" + numberA[x] + "," + x + ")>" + 'Action' + x + "." + (numberA[x] + 1) + "</button>" +
        "<div class='panel' id='Action" + x + numberA[x] +"'>" +
        "<button for='name' onClick='del(" + numberA[x] + ", " + x + "," + 0 + ")'> delete </button><br>" +
        "<div class='" + x +"act" + numberA[x] + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input type='text' id='" + x + "nameText" + numberA[x] + "' name='search' onchange='updateNameAct(" + x + "," + numberA[x] + ")'/><br>" +
        "<label for='action'> action :</label><br>" +
        "<select id='" + x + "selectAction" + numberA[x] + "' name='loop1' onclick=updateChooseAction(" + numberA[x] + "," + x + ")>" +
        "<option name=action_block_name value=action_block_name >action_block_name </option>" +
        "<option name=play value=play >play </option>" +
        "<option name=flash value=flash >flash </option>" +
        "<option name=increase value=increase >increase </option>" +
        "<option name=decrease value=decrease >decrease</option>" +
        "<option name=multiply value=multiply >multiply </option>" +
        "<option name=divide value=divide >divide </option>" +
        "<option name=set value=set >set </option>" +
        "<option name=up value=up >up </option>" +
        "<option name=down value=down >down </option>" +
        "<option name=reset value=reset >reset </option></select><br>" +
        "<select id='" + x + "actionBlock" + numberA[x] + "' onclick= updateActionNames(" + x + "," + numberA[x] + ") name='loop1'>" +
        "<option value=choose>choose action block </option></select><br>" +
        "<label for='output'> output :</label><br>" +
        "<input type='text' id='" + x + "outputText" + numberA[x] + "' name='search'/><br>" +
        "<label for='value'> value :</label><br>" +
        "<select id='" + x + "selectValue" + numberA[x] + "' name='loop2' onclick=updateValueAction(" + numberA[x] + "," + x + ")>" +
        "<option name=value value='value'> value </option>" +
        "<option name=file_name value=file_name >file_name </option>" +
        "<option name=true value=true >true </option>" +
        "<option name=false value=false >false </option>" +
        "<option name=up value=up >up </option>" +
        "<option name=down value=down >down </option>" +
        "<option name=on value=on >on </option>" +
        "<option name=off value=off >off </option>" +
        "<option name=variable value=variable> variable </option>" +
        "<option name=formula value=formula> formula </option></select><br>" +
        "<input type='text' id='" + x + "inputValue" + numberA[x] + "' name='search'/><br>" +
        "<label for='param'> param :</label><br>" +
        "<input type='text' id='" + x + "paramText" + numberA[x] + "' name='search'/><br>" +
        "<button for='name' onClick='addActionElement(" + x + "," + numberA[x] + ")'> addAction </button>" +
        "<button for='name' onClick='delOneAct(" + numberA[x] + ", " + x + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    addListener('accordionA' + x + "" + numberA[x]);
}

function addActionElement(x, act) {
    d = document.getElementById("Action" + x + act);
    var l = document.createElement("actions" + x);
    l.innerHTML += "<div id='"+ x + "act" + act + listAct[x][act] + "'>" +
        "<label for='name'> name :</label><br>" +
        "<input type='text' id='" + x + "nameText" + act + "" + listAct[x][act] + "' name='search'/><br>" +
        "<label for='action'> action :</label><br>" +
        "<select id='" + x + "selectAction" + act + "" + listAct[x][act] + "' name='loop1' onclick=updateChooseAction(" + act + "," + x + "," + listAct[x][act] + ")>" +
        "<option name=action_block_name value=action_block_name >action_block_name </option>" +
        "<option name=play value=play >play </option>" +
        "<option name=flash value=flash >flash </option>" +
        "<option name=increase value=increase >increase </option>" +
        "<option name=decrease value=decrease >decrease</option>" +
        "<option name=multiply value=multiply >multiply </option>" +
        "<option name=divide value=divide >divide </option>" +
        "<option name=set value=set >set </option>" +
        "<option name=up value=up >up </option>" +
        "<option name=down value=down >down </option>" +
        "<option name=reset value=reset >reset </option></select><br>" +
        "<select disabled=true id='" + x + "actionBlock" + act + "" + listAct[x][act] + "' onclick= updateConditionNames(" + act + "," + x + "," + listAct[x][act] + ") name='loop1'>" +
        "<option value=choose>choose action block </option></select><br>" +
        "<label for='output'> output :</label><br>" +
        "<input type='text' id='" + x + "outputText" + act + "" + listAct[x][act] + "' name='search'/><br>" +
        "<label for='value'> value :</label><br>" +
        "<select id='" + x + "selectValue" + act + "" + listAct[x][act] + "' name='loop2' onclick=updateValueAction(" + act + "," + x + "," + listAct[x][act] + ")>" +
        "<option name=value value='value'> value </option>" +
        "<option name=file_name value=file_name >file_name </option>" +
        "<option name=true value=true >true </option>" +
        "<option name=false value=false >false </option>" +
        "<option name=up value=up >up </option>" +
        "<option name=down value=down >down </option>" +
        "<option name=on value=on >on </option>" +
        "<option name=off value=off >off </option>" +
        "<option name=variable value=variable> variable </option>" +
        "<option name=formula value=formula> formula </option></select><br>" +
        "<input type='text' id='" + x + "inputValue" + act + "" + listAct[x][act] + "' name='search'/><br>" +
        "<label for='param'> param :</label><br>" +
        "<input type='text' id='" + x + "paramText" + act + "" + listAct[x][act] + "' name='search'/><br>" +
        "<button for='name' onClick='addActionElement(" + x + "," + act + ")'> add Action </button>" +
        "<button for='name' onClick='delOneAct(" + act + "," + x + ", " + listAct[x][act] + ")'> delete Action </button><br>" +
        "<label for='name'>-------------------------------------------------------</label><br>";
    d.appendChild(l);
    listAct[x][act] += 1;
}

function delOneAct(x, nbRule, y) {
    if(y != undefined) {
        document.getElementById(nbRule + 'act' + x + y).remove();
        if(blockList.rules[nbRule].actions[x][y] != undefined) {
            blockList.rules[nbRule].actions[x].splice(y, y);
            listAct[nbRule][x] -= 1;
            numberA[nbRule] -= 1;
        }
    } else {
        document.getElementById("Action" + nbRule + x).remove();
        document.getElementById("accordionA" + nbRule + "" + x).remove();
        if(blockList.rules[nbRule].actions[x] != undefined) {
            blockList.rules[nbRule].actions.splice(x, 1);
            if(blockList.rules[nbRule].actions.length == 0) {
                delete blockList.rules[nbRule].actions
            }
            listAct[nbRule][x] -= 1;
            numberA[nbRule] -= 1;
        }
    }
}

function del(x, nbRule, type) {
    if(type == 0) {
        if (document.getElementById('Action' + nbRule + x) != null) {
            document.getElementById("Action" + nbRule + x).remove();
            document.getElementById("accordionA" + nbRule + "" + x).remove();
            if(blockList.rules[nbRule].actions[x] != undefined) {
                for(let i = 1; i < blockList.rules[nbRule].actions.length; i++) {
                    // document.getElementById(nbRule + 'act' + x + i).remove();
                    if(blockList.rules[nbRule].actions[x][i] != undefined) {
                        blockList.rules[nbRule].actions[x].splice(i, 1);
                        if(listAct[nbRule][x] > 0) {
                            listAct[nbRule][x] -= 1;
                        }
                        if(numberA[nbRule] > 0) {
                            numberA[nbRule] -= 1;
                        }
                    }
                }
                delete blockList.rules[nbRule].actions[x]
                let del = true;
                for(let j = 0; j < blockList.rules[nbRule].actions.length; j++) {
                    if(blockList.rules[nbRule].actions[j] != undefined || blockList.rules[nbRule].actions[j] != null) {
                        del = false;
                    }
                }
                if(del) {
                    delete blockList.rules[nbRule].actions
                }
                if(listAct[nbRule][x] > 0) {
                    listAct[nbRule][x] -= 1;
                }
                if(numberA[nbRule] > 0) {
                    numberA[nbRule] -= 1;
                }
            }
        }
    } else {
        if (document.getElementById('Condition' + nbRule + x) != null) {
            document.getElementById("Condition" + nbRule + x).remove();
            document.getElementById("accordionC" + nbRule + "" + x).remove();
            if(blockList.rules[nbRule].conditions[x] != undefined) {
                for(let i = 1; i < blockList.rules[nbRule].conditions.length; i++) {
                    if(blockList.rules[nbRule].conditions[x][i] != undefined) {
                        blockList.rules[nbRule].conditions[x].splice(i, 1);
                        if(listCond[nbRule][x] > 0) {
                            listCond[nbRule][x] -= 1;
                        }
                        if(numberC[nbRule] > 0) {
                            numberC[nbRule] -= 1;
                        }
                    }
                }
                delete blockList.rules[nbRule].conditions[x]
                let del = true;
                for(let j = 0; j < blockList.rules[nbRule].conditions.length; j++) {
                    if(blockList.rules[nbRule].conditions[j] != undefined || blockList.rules[nbRule].conditions[j] != null) {
                        del = false;
                    }
                }
                if(del) {
                    delete blockList.rules[nbRule].conditions
                }
                if(listCond[nbRule][x] > 0) {
                    listCond[nbRule][x] -= 1;
                }
                numberC[nbRule] -= 1;
            }
        }
    }
    
}

/**
 * Add EventListener in the list of rule for hide and show the rule element
 */
function addListener(id) {
    document.getElementById(id).addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = 100 + "%"
        }
    });

}

function addRuleListener(id) {
    for (let i = 0; i <= numberR; i++) {
        document.getElementById(id + i).addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = 100 + "%"
            }
        });
    }

}

function importRules() {

}