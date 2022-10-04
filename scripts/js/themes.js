"use strict";

try {
    var prefix = document.getElementById('prefix').content;
} catch (TypeError) {
    var prefix = "";
}

const COOKIE_HTML =
    `<div id='cookie-popup' style='display:none;'>
        <p>
            This website may store cookies for the purposes of changing the font or theme, and for disabling this popup. Cookies are stored for 24 hours, and no other data is collected. <a href="legal">See more</a>.

            If you decline, this popup will, by necessity, continue to appear each time you load a page on this site.
            <div id="cookie-button-container">
                <button id="cookie-accept" class="cookie-button" type="button" onclick="accept_cookie()">ACCEPT</button><button id="cookie-decline" class="cookie-button" type="button" onclick="decline_cookie()">DECLINE</button>
            </div>
        </p>
    </div>`;
const DAY_SECONDS = 86400000

var body = document.getElementById('body-container');
body.insertAdjacentHTML("afterbegin", COOKIE_HTML);

var cookie = fetch_cookie("cookie");
var cookie_popup = document.getElementById("cookie-popup");
var font = fetch_cookie("font");
var font_sheet = document.getElementById("font");
var theme = fetch_cookie("theme");
var theme_sheet = document.getElementById("theme");
var pronouns_img = document.getElementById("pronouns-img");

for (var i of [["font", font, font_sheet], ["theme", theme, theme_sheet]]) {
    if (i[1] != null) {
        i[2].href = parse(prefix + "../static/css/themes/%v_%v.css", [i[0], i[1]]);
    }
}
if (cookie == null) {
    cookie_popup.style.display = "block";
}

// Swap the theme (dark/light) based on the value currently held in "theme" variable
// The default theme is dark, so a null value is treated the same as dark.
function change_theme() {
    // Toggle theme and update stylesheet link on the page
    if (["dark", null].includes(theme)) {
        theme = "light";
    } else {
        theme = "dark";
    }
    theme_sheet.href = parse(prefix + "../static/css/themes/theme_%v.css", [theme]);
    if (pronouns_img != null) {
        pronouns_img.src = parse(prefix + "../static/img/banners/pronouns_%v_theme.webp", [theme]);
    }
    create_cookie("theme", theme);
}

// Swap the theme (serif/sans) based on the value currently held in "font" variable
// The default font is serif, so a null value is treated the same as serif.
function change_font() {
    // Toggle font and update stylesheet link on the page
    if (["serif", null].includes(font)) {
        font = "sans";
    } else {
        font = "serif";
    }
    font_sheet.href = parse(prefix + "../static/css/themes/font_%v.css", [font]);
    create_cookie("font", font);
}

// Create a cookie to register cookies as accepted, then fade out popup
function accept_cookie() {
    cookie = "accepted";
    create_cookie("cookie", cookie);
    fade(cookie_popup);
}

// Fade out popup, do nothing else
function decline_cookie() {
    fade(cookie_popup);
}

// COOKIE HANDLING

function create_cookie(name, value) {
    // Only create cookies if they've been accepted
    if (cookie == "accepted") {
        // Set the cookie to expire in one day
        let expiry_date = new Date();
        expiry_date.setTime(expiry_date.getTime() + DAY_SECONDS);
        set_cookie(name, value, expiry_date);
        console.log("yeet");
    }
}

// Fetch a cookie and parse information
function fetch_cookie(name) {
    let cookie = document.cookie.split("; ");
    for (var i = cookie.length-1; i >= 0; i--) {
        let cookie_elements = cookie[i].split("=");
        if (name === decodeURIComponent(cookie_elements[0])) {
            return decodeURIComponent(cookie_elements[1]);
        }
    }
    return null;
}

// Set a cookie with a value and expiry date
function set_cookie(name, value, expiry_date) {
    document.cookie = encodeURIComponent(name) +   // Cookie name
                      "=" +
                      encodeURIComponent(value) +  // Value of cookie
                      ";expires=" +
                      expiry_date.toUTCString() +  // Expiry date of cookie
                      ";path=/;" +
                      "SameSite=Strict;";          // Disallow cookie request from third party sites
}

// MISCELLANEOUS

// Parse an array of variables into a string
// Taken from a StackOverflow answer, the link to which I've unfortunately lost.
function parse(str, targets) {
    var i = 0;
    return str.replace(/%v/g, () => targets[i++]);
}

// Taken from this StackOverflow answer:
// https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}