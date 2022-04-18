try {
    var prefix = document.getElementById('prefix').content;
} catch (TypeError) {
    var prefix = "";
}

var structures = {
    "header":
    `<header>

        <!-- Navigation buttons -->
        <nav>
            <div id="nav-container">
                <button id="home-button" class="nav-button" type="button" onclick="window.location.href='` + prefix + `home'">Home</button><br>
                <button id="writing-button" class="nav-button" type="button" onclick="window.location.href='` + prefix + `writing'">Writing</button>
                <button id="endeavours-button" class="nav-button" type="button" onclick="window.location.href='` + prefix + `endeavours'">Endeavours</button><br>
                <button id="accounts-button" class="nav-button" type="button" onclick="window.location.href='` + prefix + `accounts'">Accounts</button><br>
            </div>
        </nav>

        <!--Logo and theme button-->
        <img
            id="logo"
            class="light-image"
            src="` + prefix + `../static/img/logo.webp"
            onclick="window.location.href='home'"
            alt="Stylised italic text reading 'Murdo Maclachlan'."
        >
        <button id="theme-button" title="Toggle theme (uses cookies)" type="button" name="button" onclick="change_theme()">
            <img
                id="theme-image"
                class="dark-image"
                src="` + prefix + `../static/img/sun.webp"
                alt="A sun icon."
            >
        </button>
        <button id="font-button" title="Toggle font (uses cookies)" type="button" name="button" onclick="change_font()">
            <img
                id="font-image"
                class="dark-image"
                src="` + prefix + `../static/img/font.webp"
                alt="A capital and a lower case letter A, side by side."
            >
        </button>
    </header>`,

    "footer":
    `<footer>
        <section class="footer-contents">
            <p id="footer-left">
                <!-- There will be different text inserted here depending on the date -->
            </p>
            <p id="footer-right">
                <b>` + window.location.href.split("//")[1].split("/")[0] + `</b>
                © 2021-present, Murdo B. Maclachlan
            </p>
        </section>
        <section class="footer-links">
            <a href="mailto:murdomaclachlan@duck.com">Contact Me</a> |
            <a href="https://ko-fi.com/murdomaclachlan">Donate</a> |
            <a href="https://stats.uptimerobot.com/6MYLZHPP1V">Status</a> |
            <a href="` + prefix + `legal">Terms & Privacy</a> |
            <a href="https://codeberg.org/MurdoMaclachlan/pages">Website Source</a>
        </section>
    </footer>`
}
var secondary_scripts = [
    prefix + "../scripts/js/themes.js",
    prefix + "../scripts/js/events.js"
];

construct();

// Constructs the universal elements of the page
function construct() {
    // Insert header and footer
    for ([key, content] of Object.entries(structures)) {
        insert_snippet("beforeend", key + "-container", content);
    }

    // Style nav buttons as needed
    process_selected_button();

    // Insert other universal scripts
    for (let i = secondary_scripts.length-1; i >= 0; i--) {
        insert_script(secondary_scripts[i]);
    }

    // Add the scripts for specific pages
    let title = document.title.split(" | ")[1].toLowerCase()
    if (["accounts", "home","poetry"].includes(title)) {
        insert_script(prefix + "../scripts/js/single/" + title + ".js");
    }
}

// Inserts an HTML snippet at a given position relative to a unique element
function insert_snippet(position, id, snippet) {
    let element = document.getElementById(id);
    element.insertAdjacentHTML(position, snippet);
}

// Inserts a script tag at the given location
function insert_script(source) {
    let script = document.createElement('script');
    let location = document.getElementById('scripts');
    script.src = source;
    location.appendChild(script);
}

// Marks one of the nav buttons as selected if the page is a primary one
function process_selected_button() {
    let title = document.title.split(" | ")[1].toLowerCase();
    if (["accounts", "endeavours", "home", "writing"].includes(title)) {
        document.getElementById(title + "-button").classList.add("selected");
    }
}
