// Fetch the page's prefix for compatibility between pages in the top-level folder & those in subfolders
try {
    var prefix = document.getElementsByName("prefix")[0].content;
} catch (TypeError) {
    var prefix = "";
}

/**
 * Inserts the universal elements of the website into the page.
 */
function build_page() {
    insert_structure("header");
    insert_structure("footer");
    insert_script(`${prefix}../scripts/events.js`, "events")
}

/**
 * Inserts a script element into the page's list of scripts.
 *
 * @param source The path to the script
 * @param id     The id for the HTML element
 */
function insert_script(source, id) {
    let script = document.createElement("script");
    script.id = id;
    script.src = source;
    document.getElementById("scripts").appendChild(script);
}

/**
 * Fetches and inserts an HTML structure before the end of a unique element
 *
 * @param structure The name of the structure
 */
function insert_structure(structure) {
    console.log(`${prefix}../scripts/structures/${structure}.html`);
    let parser = new DOMParser();
    fetch(`${prefix}../scripts/structures/${structure}.html`)
    .then(response=> response.text())
    .then(text=> document.getElementById(`container-${structure}`).insertAdjacentHTML(
        "beforeend",
        modify_structure(parser.parseFromString(text, "text/html"), structure)
    ));
}

/**
 * Modifies a given footer structure to ensure all links are compatible with the page's
 * position within the file structure.
 *
 * @param structure The structure to modify
 *
 * @return The modified structure
 */
function modify_footer(structure) {
    return modify_links(structure);
}

/**
 * Modifies a given header structure to ensure all links are compatible with the page's
 * position within the file structure.
 *
 * @param structure The structure to modify
 *
 * @return The modified structure
 */
function modify_header(structure) {
    structure = modify_links(structure);
    let logo = structure.getElementById("logo");
    logo.src = `${prefix}${logo.dataset["src"]}`;
    return structure;
}

/**
 * Modifies all 'a' elements in a given structure.
 * 
 * @param structure The structure to modify the "a" elements of
 * 
 * @return The modified structure
 */
function modify_links(structure) {
    for (element of structure.getElementsByTagName("a")) {
        let target = element.dataset["target"];
        if (target != null) {
            element.href = `${prefix}${target}`;
        }
    }
    return structure;
}

/**
 * Modifies a given HTML structure to ensure all links are compatible with the page's
 * position within the file structure.
 *
 * @param structure The HTML structure to modify
 * @param name      The name of the structure; either "header" or "footer"
 *
 * @return The header or footer element from within the modified structure
 */
function modify_structure(structure, name) {
    switch (name) {
        case "footer":
            structure = modify_footer(structure);
            break;
        case "header":
            structure = modify_header(structure);
            break;
        default:
    }
    return structure.getElementsByTagName("body")[0].innerHTML;
}

build_page();
