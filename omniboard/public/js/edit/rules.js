var numberC = 0; //number of condition block
var numberA = 0; //number of action block
var numberR = 0; //number of rule
var listCond = []; //list the number of condition in the condition block with the index is the
//num of the condition block
var listAct = []; //list the number of action in the action block with the index is the
//num of the action block

function addRule() {
    var type;
    var name;

    function addCondition() {
        d = document.getElementById('rule');
        d.innerHTML += "<button class='accordionR' id='accordionR" + numberR + "'>" + 'Rule' + numberR + "</button>" +
            "<div class='panel' id='Rule" + numberR + "'>" +
            "<label for='type'> type :<br />" +
            "<input type='text' name='search' placeholder='Enter the type of the rule' /><br />" +
            "<label for='name'> name :</label><br />" +
            "<input type='text' name='search' placeholder='Enter the name of the rule' /><br />" +
            "<label for='name'> Choose Type for the loop :</label><br />" +
            "<input class='elem' type='button' value='new conditions' onclick='addCondition(" + numberR + "); addListener()' />" +
            "<input class='elem' type='button' value='new actions' onclick='addAction(); addListener()' />" +
            "</label>";
        numberR += 1;
    }

    function addCondition(x) {
        d = document.getElementById('Rule' + x);
        console.log(d);
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
            "<button for='name' onClick='delOne(" + numberC + ", " + listCond[numberC] + ")'> delete Condition </button><br>" +
            "<label for='name'>-------------------------------------------------------</label><br>";
        listCond[numberC] = 1;
        numberC += 1;
    }

    function addConditionElement(x) {
        listCond[x] += 1;
        console.log(listCond);
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
            console.log(acc[i]);
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
            console.log(acc[i]);
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

    $(document).ready(function() {
        $("#button").click(function() {
            $("#div1").load("demo_test.txt");
        });
    })
};