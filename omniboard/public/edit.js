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
    container = d2;
    screenWidth = document.body.clientWidth

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    d3.appendChild(info_panel);
    image = document.getElementById('image');
    image.height = globalHeight;
    d1.style = "height:" + globalHeight + "px;";
    d2.style = "height:" + globalHeight + "px;";
    d3.style = "height:" + globalHeight + "px;";

    resize();
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
    console.log("coucou");
    deleteInfo();
    infos = document.createElement('div');
    infos.innerHTML += '<form><label for="name"> Element Name :</label><br>';
    infos.innerHTML += '<input type="text" id="name" name="name" value="' + name + '_' + itemId + '"><br>';
    infos.innerHTML += '<label for="coordinates"> Coordinates :</label><br>';
    infos.innerHTML += '<input type="text" id="coord" name="coord" value="' + d2x + '; ' + d2y + '" readonly><br>';
    //infos.innerHTML += '<label for="input"> Element Input :</label><br>';
    //infos.innerHTML += '<input type="text" id="input" name="input" value="//What element the rule relies on" size="50"><br>';
    //infos.innerHTML += '<label for="operation"> Operation :</label><br>';
    //infos.innerHTML += '<input type="text" id="operation" name="operation" value="//what the action provoques" size="50"><br>';
    infos.style = "background-color: lightblue;cursor: move;text-align: left;font: bold 12px sans-serif;";
    info_panel.appendChild(infos);
}

/**
 * This fuction is used to delete an element
 */
function deleteItem() {
    if (dragItem != null) {
        dragItem.parentNode.removeChild(dragItem);
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
    xOffset = rect.layerX - 10;
    yOffset = rect.layerY - 10;
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
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
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
    initialX = currentX;
    initialY = currentY;

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
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;

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