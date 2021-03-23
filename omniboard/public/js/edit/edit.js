var info_panel, infos, handle; //the information panels on the right side of the editing page
var active = false; // boolean used to check if a drag action is active
var currentX; // the current x coordinate of the dragged item
var currentY; // the current y coordinate of the dragged item
var initialX; // the starting x coordinate of the dragged item
var initialY; // the starting y coordinate of the dragged item
var xOffset = 0; // x offset from the cursor whyen dragged and dropped
var yOffset = 0; // y offset from the cursor whyen dragged and dropped
var globalHeight = window.innerHeight - 20; // height of the different frames
var screenWidth; // screen width
var listElement = []; // list of the components present on the board
var rule; // block of rule
var dragItem; // currently dragged item
var nameImage; // name of the image fetched when called
var itemId; // id concatenated to the item's name to distinguish 2 items beonging to the same type

/**
 * This fuction is used to initate the board and the frames.
 * It adds the listeners to the components and sets up the parent nodes.
 */
function init() {
    //setting up the localStorage for the list containing the elements
    window.localStorage.setItem("listElement", JSON.stringify(listElement));
    d2 = document.getElementById('d2');
    d1 = document.getElementById('d1');
    d3 = document.getElementById('d3');
    d2x = 0;
    d2y = 0;
    info_panel = document.getElementById('infoDraggable');
    rule_panel = document.getElementById('rule');
    container = d2;
    screenWidth = document.body.clientWidth;
    itemId = 0;

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

/**
 * Funtion used to display the rules and update the data in the rules.
 * It displays HTML beacons sets up a global structure for the infoPanel.
 * It update the name of the dragged element.
 */
function displayRule() {
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

/**
 * Function used to delete the rules.
 * It deletes the childNode of the rule panel.
 */
function deleteRule() {
    let children = document.getElementById('rule').childNodes;

    for (let i = 1; i < children.length; i++) {
        children[i].parentNode.removeChild(children[i]);
    }
}

/**
 * Function used to display an element.
 * It fetches the listContaining all the elements.
 */
function element() {
    var string = "";
    for (let i = 0; i < listElement.length; i++) {
        string += '<option value=' + listElement[i] + '>' + listElement[i] + '</option>';
    }
    return string;
}

/**
 * This function is used to resize the two div d2 and d3 according to the picture
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
 * This function was called to add an item.
 * @param {*} name item's name (resource image name)
 */
function addItem(name) {
    nameImage = name;
    img = document.createElement("img");
    d2y += 3;
    d2x += 3;
    img.src = '/images/' + name + '.jpg';
    img.style = "width:40px;height:40px;position:absolute;top:" + d2y + "px;left:" + d2x + "px;cursor:move;border-radius: 20px;";
    d2.appendChild(img);
    displayInfo(name);
    itemId++;
    img.id = itemId;
    changeDragItem(img);
    console.log("Current item dragged is :" + name);
    var list = JSON.parse(window.localStorage.getItem("listElement"));
    list.push({ name, itemId });
    window.localStorage.setItem("listElement", JSON.stringify(list));
    displayRule();
    img.onmousedown = currentDragged;
    console.log(img.src)
}

/**
 * This function is call when the button 'Save' is clicked
 * Download the rules file 
 */
function downloadJson() {
    if (confirm('You will download a save on your computer')) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(window.localStorage.getItem("listElement"));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "rules.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}

/**
 * This function is used to display informations.
 * As the displayRule method it adds inner HTML to the div and updates the content of the fields.
 * @param {*} name the item's name
 */
function displayInfo(name) {
    deleteInfo();
    console.log(name)
    infos = document.createElement('div');
    infos.innerHTML += '<form><label for="name"> Element Name :</label><br>';
    infos.innerHTML += '<input type="text" id="name" name="name" value="' + name + '"><br>';
    infos.innerHTML += '<label for="coordinates"> Coordinates :</label><br>';
    infos.innerHTML += '<input type="text" id="coord" name="coord" value="' + currentX + '; ' + currentY + '" readonly><br>';
    infos.style = "background-color: lightblue;cursor: move;text-align: left;font: bold 12px sans-serif;";
    info_panel.appendChild(infos);
}

/**
 * This function is used to delete an element.
 * It goes through the childNodes of the main div and deletes the one currently selected.
 */
function deleteItem() {
    var list = JSON.parse(window.localStorage.getItem("listElement"));
    if (dragItem != null) {
        dragItem.parentNode.removeChild(dragItem);
        console.log(dragItem.id);
        for (let i = 0; i < list.length; i++) {
            console.log(list[i]);

            if (dragItem.id == list[i].itemId) {
                list.splice(i, 1);
                console.log(list);
                window.localStorage.setItem("listElement", JSON.stringify(list));
            }
        }
        deleteInfo();
    }
}

/**
 * This function is used to delete an information.
 * It goes through the nodes and deletes the information in the infoPanel
 */
function deleteInfo() {
    let children = document.getElementById('infoDraggable').childNodes;

    for (let i = 1; i < children.length; i++) {
        children[i].parentNode.removeChild(children[i]);
    }
}

/**
 * This function was called to drag the current picture (pinball item)
 * @param {*} rect the picture currently selected
 */
function currentDragged(rect) {
    console.log("Current item dragged is " + rect);
    xOffset = rect.layerX - 10;
    yOffset = rect.layerY - 10;
    changeDragItem(rect.target);
    displayInfo(rect.target.src.split(".")[0].split("/")[4]);
}

/**
 * This function change the dragItem and manage its border.
 * A black border is toggled when the item is selected and dragged.
 * @param {*} nextItem the new dragItem
 */
function changeDragItem(nextItem) {
    if (dragItem != null) dragItem.style.border = "0px solid black";
    dragItem = nextItem;
    dragItem.style.border = "2px solid black";
}

/**
 * This function allow to start the drag of an item in the current view.
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
 * This method ends the drag of the item in the current view
 * @param {*} e the item in the view
 */
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

/**
 * This fuction is called to drag the item in the view
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
 * This method updates the display (position) of the dragged item
 * @param {*} xPos the new x position of the item
 * @param {*} yPos the new y position of the item
 * @param {*} el the item in the view
 */
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


/**
 * This function loads and saves the uploaded image when the button is selected.
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
 * This function is use to update the name of the image when the file is uploaded.
 */
function previewImage() {
    var fichierSelectionne = document.getElementById('img').files[0];
    if (fichierSelectionne != null) {
        var preview = document.getElementById('preview');
        preview.textContent = fichierSelectionne.name;
    }
}

/**
 * This function is use to hide the infobox when the menu is selected
 */
function hidePanels() {
    var x = document.getElementById("infoDraggable");
    var y = document.getElementById("rule");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
        y.style.display = "inline-block";
    } else {
        x.style.display = "none";
        y.style.display = "none";
    }
}