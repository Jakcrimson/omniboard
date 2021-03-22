var numberC = 0;
var numberA = 0;
function addCondition() {
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordion' id='accordionC"+numberC+"'>"+  'Condition' +numberC+"</button>" +
    "<div class='panel' id='Condition"+numberC+"'>"+
    "<label for='name'> name :</label><br>"+
    "<select id='name' name='name'>script:element()</select><br>"+
    "<label for='name'> input :</label><br>"+
    "<input type='text' name='search'/><br>"+
    "<label for='name'> operation :</label><br>"+
    "<select id='loop' name='loop'>"+
        "<option value=1>less_than</option>"+
        "<option value=2 >equals </option>"+
        "<option value=3 >not_equals </option>"+
        "<option value=4>greater_than</option></select><br>"+
    "<label for='name'> value :</label><br>" +
    "<input type='text' name='search'/><br>"+
    "<button for='name' onClick='del("+numberC+")'> delete </button><br>"+
    "<label for='name'>-------------------------------------------------------</label><br>";
    numberC += 1;
}

function addAction() {
    d = document.getElementById('rule');
    d.innerHTML += "<button class='accordion' onLoad='hide()'>"+  'Action' +numberC+"</button>" +
    "<div class='accordion' id='Action"+numberA+"'>"+
    "<label for='name'> name :</label><br>"+
    "<select id='name' name='name'>script:element()</select><br>"+
    "<label for='name'> input :</label><br>"+
    "<input type='text' name='search'/><br>"+
    "<label for='name'> operation :</label><br>"+
    "<select id='loop' name='loop'>"+
        "<option value=1>less_than</option>"+
        "<option value=2 >equals </option>"+
        "<option value=3 >not_equals </option>"+
        "<option value=4>greater_than</option></select><br>"+
    "<label for='name'> value :</label><br>" +
    "<input type='text' name='search'/><br>"+
    "<button for='name' onClick='del("+numberA+")'> delete </button><br>"+
    "<label for='name'>-------------------------------------------------------</label><br>";
    numberA += 1;

}
function del(x) {
    if(document.getElementById('Action'+x) != null) {
        document.getElementById('Action'+x).remove();
        document.getElementById('accordionA'+x).remove();
    } else if(document.getElementById('Condition'+x) != null) {
        document.getElementById('Condition'+x).remove();
        document.getElementById('accordionC'+x).remove();
    }
}

/**
 * Add EventListener in the list of rule for hide and show the rule element
 */
function addListener(){
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