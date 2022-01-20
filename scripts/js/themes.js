"use strict";

try {
    var prefix = document.getElementById('prefix').content;
} catch (TypeError) {
    var prefix = "";
}

const DAY_SECONDS = 86400000

var font = fetchCookie("font");
var fontSheet = document.getElementById("font");
var theme = fetchCookie("theme");
var themeSheet = document.getElementById("theme");
var pronounsImg = document.getElementById("pronouns-img");

for (var i of [["font", font, fontSheet], ["theme", theme, themeSheet]]) {
    if (i[1] != null) {
        i[2].href = parse(prefix + "../static/css/themes/%v_%v.css", [i[0], i[1]]);
    }
}

// Swap the theme (dark/light) based on the value currently held in "theme" variable
// The default theme is dark, so a null value is treated the same as dark.
function changeTheme() {
    // Toggle theme and update stylesheet link on the page
    if (["dark", null].includes(theme)) {
        theme = "light";
    } else {
        theme = "dark";
    }
    themeSheet.href = parse(prefix + "../static/css/themes/theme_%v.css", [theme]);
    if (pronounsImg != null) {
        pronounsImg.src = parse(prefix + "../static/img/banners/pronouns_%v_theme.png", [theme]);
    }

    createCookie("theme", theme);
}

// Swap the theme (serif/sans) based on the value currently held in "font" variable
// The default font is serif, so a null value is treated the same as serif.
function changeFont() {
    // Toggle font and update stylesheet link on the page
    if (["serif", null].includes(font)) {
        font = "sans";
    } else {
        font = "serif";
    }
    fontSheet.href = parse(prefix + "../static/css/themes/font_%v.css", [font]);

    createCookie("font", font);
}

// COOKIE HANDLING

function createCookie(name, value) {
    // Set the cookie to expire in one day
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + DAY_SECONDS);
    setCookie(name, value, expiryDate);
}

// Fetch a cookie and parse information
function fetchCookie(name) {
    let cookie = document.cookie.split("; ");
    for (var i = cookie.length-1; i >= 0; i--) {
        let cookieElements = cookie[i].split("=");
        if (name === decodeURIComponent(cookieElements[0])) {
            return decodeURIComponent(cookieElements[1]);
        }
    }
    return null;
}

// Set a cookie with a value and expiry date
function setCookie(name, value, expiryDate) {
    document.cookie = encodeURIComponent(name) +   // Cookie name
                      "=" +
                      encodeURIComponent(value) +  // Value of cookie
                      ";expires=" +
                      expiryDate.toUTCString() +   // Expiry date of cookie
                      ";path=/;" +
                      "SameSite=Strict;";          // Disallow cookie request from third party sites
}

// MISCELLANEOUS

// Parse an array of variables into a string
function parse(str, targets) {
    var i = 0;
    return str.replace(/%v/g, () => targets[i++]);
}
