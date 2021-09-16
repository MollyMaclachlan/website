var snippets = {
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
                This website uses cookies to remember the selected theme.
                <br>
                Cookies last 24 hours and are only set after changing the theme.
            </p>
            <p id="footer-right">
                Murdo Maclachlan, © 2021-present
                <br>
                Detailed licensing available at source.
            </p>
        </section>
        <section class="footer-links">
            <a href="mailto:murdo@maclachlans.org.uk">Contact Me</a> |
            <a href="https://github.com/MurdoMaclachlan/website">Website Source</a>
        </section>
    </footer>`
}

construct();

// Constructs the universal elements of the page, inserting HTML snippets
// and processing various other necessary functions
function construct() {
    for ([name, content] of Object.entries(snippets)) {
        insertSnippet('afterbegin', name + "-container", content)
    }
    processSelectedButton();
}

// Inserts an HTML snippet at a given position relative to a unique element
function insertSnippet(position, id, snippet) {
    let element = document.getElementById(id);
    element.insertAdjacentHTML(position, snippet);
}

// Marks one of the nav buttons as selected if the page is a primary one
function processSelectedButton() {
    let title = document.title.split(" | ")[1].toLowerCase();
    if (["home", "accounts", "endeavours", "blog"].includes(title)) {
        document.getElementById(title + "-button").classList.add("selected");
    }
}
