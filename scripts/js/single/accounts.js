var accs = {};
var child_groups = {
    "hardlimit": false,
    "youtube": false,
}

parse_json();

async function parse_json() {
    const json = await retrieve_json("../scripts/data/accounts.json");
    for (i in json) {
        let entry = json[i]
        let content = "<h2>" + entry["header"] + "</h2>\n";
        for (j in entry["elements"]) {
            let element = entry["elements"][j];
            switch (element["type"]) {
                case "button":
                    content += "<button id=\"account-button\" class=\"nav-button\" type=\"button\" onclick=\"window.open('";
                    content += element["content"] + "', '_blank')\">Go to account</button>\n";
                    break;
                case "iframe":
                    content += "<iframe width=\"60%\" height=\"355px\" src=\"" + element["link"] + "\" title=\"" + element["title"];
                    content += "\" frameborder=\"0\" allow=\"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"";
                    content += " allowfullscreen></iframe>";
                    break;
                case "list":
                    content += "<ul>";
                    for (k in element["items"]) {
                        content += "<li>" + element["items"][k] + "</li>\n";
                    }
                    content += "</ul>\n";
                    break;
                case "paragraph":
                    content += "<p>" + element["content"] + "</p>\n";
                    break;
            }
        }
        accs[i] = content;
    }
    console.log(accs);
}

async function retrieve_json(file, data = {}) {
    const response = await fetch(file, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    });
    const object = await response.json();
    return object;
}

function toggle_account(trigger) {
    let account = trigger.id;
    let display = document.getElementById("account-description");
    display.innerHTML = accs[account];
}

function toggle_children(trigger) {
    let children = document.getElementsByClassName("entry-" + trigger.id);
    if (!child_groups[trigger.id]) {
        toggle_display(children, trigger.id, true);
    } else {
        toggle_display(children, trigger.id, false);
    }
}

function toggle_display(list, trigger_id, state) {
    let display = (state ? "block;" : "none;");
    for (let i = list.length-1; i >= 0; i--) {
        let element = list.item(i);
        element.style = "display:" + display;
    }
    child_groups[trigger_id] = state;
}