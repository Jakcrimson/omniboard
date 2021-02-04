var info_panel, infos, handle;
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var inspector;
var globalHeight = window.innerHeight - 20;
var screenWidth;
var itemId = 1;
var listElement = [];
var rule;

/**
 * This fuction wis used to initate
 */
function init() {
    d2 = document.getElementById('d2');
    d1 = document.getElementById('d1');
    d3 = document.getElementById('d3');
    d2x = d2.getBoundingClientRect().left;
    d2y = d2.getBoundingClientRect().top;
    info_panel = document.getElementById('infoDraggable');
    rule_panel = document.getElementById('rule');
    container = d2;
    screenWidth = document.body.clientWidth;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    d3.appendChild(info_panel);
    d3.appendChild(rule_panel);
    image = document.getElementById('image');
    image.height = globalHeight;
    d1.style = "height:" + globalHeight + "px;";
    d2.style = "height:" + globalHeight + "px;";
    d3.style = "height:" + globalHeight + "px;";

    resize();
}

function displayRule() {
    itemId++;
    deleteRule();
    rule = document.createElement('div2');
    rule.innerHTML += '<form><label for="name"> Choose Element :</label><br>';
    rule.innerHTML += '<label for="type"> type :</label><br>';
    rule.innerHTML += '<input type="text" name="search" placeholder="Enter the type of the rule"/><br>';
    rule.innerHTML += '<label for="name"> name :</label><br>';
    rule.innerHTML += '<input type="text" name="search" placeholder="Enter the name of the rule"/><br>';
    rule.innerHTML += '<label for="name"> Choose Type for the loop :</label><br>';
    rule.innerHTML += '<select id="loop" name="loop">' +
                        '<option value=conditions>conditions</option>' +
                        '<option value=actions>actions</option></select><br>';
    rule.innerHTML += '<label for="name"> name :</label><br>';
    rule.innerHTML += '<select id="name" name="name">' + element() + '</select><br>';
    rule.innerHTML += '<label for="name"> input :</label><br>';
    rule.innerHTML += '<input type="text" name="search"/><br>';
    rule.innerHTML += '<label for="name"> operation :</label><br>';
    rule.innerHTML += '<select id="loop" name="loop">' +
                        '<option value=less_than>less_than</option>' +
                        '<option value=equals >equals </option>' +
                        '<option value=not_equals >not_equals </option>' +
                        '<option value=greater_than>greater_than</option></select><br>';
    rule.innerHTML += '<label for="name"> value :</label><br>';
    rule.innerHTML += '<input type="text" name="search"/><br>';
    rule.innerHTML += '<button for="name"> new conditions </label>';
    rule.innerHTML += '<button for="name"> new actions </label><br>';
    rule.style = "background-color: red;cursor: move;text-align: left;font: bold 12px sans-serif;";
    rule_panel.appendChild(rule);
}
function deleteRule() {
    let children = document.getElementById('rule').childNodes;

    for (let i = 1; i < children.length; i++) {
        children[i].parentNode.removeChild(children[i]);
    }
}

function element() {
    var string = "";
    for(let i = 0; i < listElement.length; i++) {
        string += '<option value=' + listElement[i] + '>' + listElement[i] + '</option>';
    }
    return string;
}
/**
 * This fuction is used to resize the two div d2 and d3 according to the picture
 * @param {*} img the picture
 */
function resize() {
    image = document.getElementById('image');

    d2.style = "width:" + image.width + "px;height:" + globalHeight + "px;";
    var d3Width = screenWidth - image.width - 260;
    if (d3Width < 400) d3Width = 400;
    var d3Left = image.width + 240;
    d3.style = "width:" + d3Width + "px;left:" + d3Left + "px;height:" + globalHeight + "px;";

}

/**
 * This fuction was called to add an item
 * @param {*} name item's name
 */
function addItem(name) {
    img = document.createElement("img");
    d2y += 3;
    d2x += 3;
    img.src = '/images/' + name + '.jpg';
    img.style = "width:40px;height:40px;position:absolute;top:" + d2y + "px;left:" + d2x + "px;cursor:move;";
    d2.appendChild(img);
    displayInfo(name);
    dragItem = img;
    listElement.push(name);
    displayRule();
    img.onmousedown = currentDragged;
    img.onmouseout = toggleBorder;
    img.onmouseleave = toggleBorder;
    
}

/**
 * This fuction is used to display informations
 * @param {*} name the item's name
 */
function displayInfo(name) {

    itemId++;
    deleteInfo();
    infos = document.createElement('div');
    infos.innerHTML += '<form><label for="name"> Element Name :</label><br>';
    infos.innerHTML += '<input type="text" id="name" name="name" value="' + name + '_' + itemId + '"><br>';
    infos.innerHTML += '<label for="coordinates"> Coordinates :</label><br>';
    infos.innerHTML += '<input type="text" id="coord" name="coord" value="' + d2x + '; ' + d2y + '" readonly><br>';
    infos.style = "background-color: lightblue;cursor: move;text-align: left;font: bold 12px sans-serif;";
    info_panel.appendChild(infos);
}

/**
 * This fuction is used to delete an element
 */
function deleteItem() {
    if (dragItem != null) {
        dragItem.parentNode.removeChild(dragItem);
        for(let i = 0; i < listElement.length; i++) {
            if(dragItem == listElement[i]) {
                listElement.splice(i, 1);
            }
        }
        deleteInfo();
    }
}

/**
 * This fuction is used to delete an information
 */
function deleteInfo() {
    let children = document.getElementById('infoDraggable').childNodes;

    for (let i = 1; i < children.length; i++) {
        children[i].parentNode.removeChild(children[i]);
    }
}

/**
 * This fuction was called to drag the current picture
 * @param {*} rect the picture currently selected
 */
function currentDragged(rect) {
    d2x = xOffset = rect.layerX - 10;
    d2y = yOffset = rect.layerY - 10;
    dragItem = rect.target;
    dragItem.style.border = "2px solid black";
    displayInfo(rect);
}

/**
 * This function allow to start the drag of an item in the current view
 * @param {*} e The item in the view
 */
function dragStart(e) {
    if (e.type === "touchstart") {
        d2x = initialX = e.touches[0].clientX - xOffset;
        d2y =initialY = e.touches[0].clientY - yOffset;
    } else {
        d2x = initialX = e.clientX - xOffset;
        d2y = initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

/**
 * This method en the drag of the item in the current view
 * @param {*} e the item in the view
 */
function dragEnd(e) {
    d2x = initialX = currentX;
    d2y = initialY = currentY;

    active = false;
}

/**
 * This fuction was called to drag the item in the view
 * @param {*} e the item in the view
 */
function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            d2x = currentX = e.touches[0].clientX - initialX;
            d2y = currentY = e.touches[0].clientY - initialY;
        } else {
            d2x = currentX = e.clientX - initialX;
            d2y = currentY = e.clientY - initialY;
        }
        d2x = xOffset = currentX;
        d2y = yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

/**
 * This method update the display
 * @param {*} xPos the new x position of the item
 * @param {*} yPos the new y position of the item
 * @param {*} el the item in the view
 */
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


/**
 * This function load and save the upload image when the button was selected
 */
function submitImg() {
    document.getElementById("image").style.display = "block";
    var fichierSelectionne = document.getElementById('img').files[0];

    if (document.getElementById('img').files && document.getElementById('img').files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log("ok");
            document.getElementById('image').src = e.target.result;
            fichierSelectionne.onload = resize;
        }

        reader.readAsDataURL(document.getElementById('img').files[0]);

    }
}

/**
 * This function is use to update the name of the image when the file is uploaded
 */
function previewImage() {
    var fichierSelectionne = document.getElementById('img').files[0];
    if (fichierSelectionne != null) {
        var preview = document.getElementById('preview');
        preview.textContent = fichierSelectionne.name;
    }
}

/**
 * This function is use to hide the infobox when the menu was selected
 */
function hideInfo() {
    var x = document.getElementById("infoDraggable");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    } else {
        x.style.display = "none";
    }
}