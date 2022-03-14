var states = {
    "ripples": false,
    "tanglewood": false,
    "seaofnight": false,
    "gentlewinds": false,
    "icefog": false,
    "forest": false
};

function toggle_poem(link) {
    let name = link.id.split("-")[0];
    let text = document.getElementById(name + "-text");

    if (states[name] == false) {
        text.style = "display:block;";
        link.innerHTML = "Less...";
        states[name] = true;
    } else {
        text.style = "display:none;";
        link.innerHTML = "More...";
        states[name] = false;
    }
}
