"use strict";

try {
    var prefix = document.getElementById('prefix').content;
} catch (TypeError) {
    var prefix = "";
}

const DAY_SECONDS = 86400000

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

// COOKIE HANDLING

function create_cookie(name, value) {
    // Set the cookie to expire in one day
    let expiry_date = new Date();
    expiry_date.setTime(expiry_date.getTime() + DAY_SECONDS);
    set_cookie(name, value, expiry_date);
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
