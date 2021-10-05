var structures = {
    "header":
    `<header>

        <!-- Navigation buttons -->
        <nav>
            <div id="nav-container">
                <button id="home-button" class="nav-button" type="button" onclick="window.location.href='home.html'">Home</button><br>
                <button id="accounts-button" class="nav-button" type="button" onclick="window.location.href='accounts.html'">Accounts</button><br>
                <button id="endeavours-button" class="nav-button" type="button" onclick="window.location.href='endeavours.html'">Endeavours</button><br>
                <button id="blog-button" class="nav-button" type="button" onclick="window.location.href='blog.html'">Blog</button>
            </div>
        </nav>

        <!--Logo and theme button-->
        <img
            id="logo"
            class="light-image"
            src="../static/img/logo.png"
            onclick="window.location.href='home.html'"
            alt="Stylised italic text reading 'Murdo Maclachlan'."
        >
        <button id="theme-button" title="Toggle theme (uses cookies)" type="button" name="button" onclick="changeTheme()">
            <img
                id="theme-image"
                class="dark-image"
                src="../static/img/sun.png"
                alt="A sun icon."
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
                <b>murdomaclachlan.github.io</b>
                <br>
                © 2021 Murdo Maclachlan
            </p>
        </section>
        <section class="footer-links">
            <a href="mailto:murdo@maclachlans.org.uk">Contact Me</a> |
            <a href="https://stats.uptimerobot.com/6MYLZHPP1V">Status</a> |
            <a href="legal.html">Terms & Privacy</a> |
            <a href="https://github.com/MurdoMaclachlan/website">Website Source</a>
        </section>
    </footer>`
}
var secondaryScripts = [
    "../scripts/js/themes.js",
    "../scripts/js/events.js"
];

construct();

// Constructs the universal elements of the page
function construct() {
    // Insert header and footer
    for ([name, content] of Object.entries(structures)) {
        insertSnippet("beforeend", name + "-container", content)
    }

    // Style nav buttons as needed
    processSelectedButton();

    // Insert other universal scripts
    for (let i = 0; i < secondaryScripts.length; i++) {
        insertScript(secondaryScripts[i])
    }
}

// Inserts an HTML snippet at a given position relative to a unique element
function insertSnippet(position, id, snippet) {
    let element = document.getElementById(id);
    element.insertAdjacentHTML(position, snippet);
}

// Inserts a script tag at the given location
function insertScript(source) {
    let script = document.createElement('script');
    let location = document.getElementById('scripts');
    script.src = source;
    location.appendChild(script);
}

// Marks one of the nav buttons as selected if the page is a primary one
function processSelectedButton() {
    let title = document.title.split(" | ")[1].toLowerCase();
    if (["home", "accounts", "endeavours", "blog"].includes(title)) {
        document.getElementById(title + "-button").classList.add("selected");
    }
}
