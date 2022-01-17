"use strict";

const DAY_SECONDS = 86400000
var font = fetchCookie("murdo_maclachlan_font");
var theme = fetchCookie("murdo_maclachlan_theme");
var fontSheet = document.getElementById("font");
var themeSheet = document.getElementById("theme");
var pronounsImg = document.getElementById("pronouns-img");

// Optimise this later
if (font != null) {
    fontSheet.href = parse("../static/css/themes/font_%v.css", font);
}
if (theme != null) {
    themeSheet.href = parse("../static/css/themes/theme_%v.css", theme);
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
    themeSheet.href = parse("../static/css/themes/theme_%v.css", [theme]);
    if (pronounsImg != null) {
        pronounsImg.src = parse("../static/img/banners/pronouns_%v_theme.png", [theme]);
    }

    createCookie("murdo_maclachlan_theme", theme);
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
    fontSheet.href = parse("../static/css/themes/font_%v.css", [font]);

    createCookie("murdo_maclachlan_font", font);
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
    let cookie = document.cookie.split(";");
    for (var i = cookie.length-1; i >= 0; i--) {
        let cookieElements = cookie[i].split("=");
        if (cookieElements[0] === encodeURIComponent(name)) {
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
