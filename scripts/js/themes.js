"use strict";

const DAY_SECONDS = 86400000
var theme = fetchCookie("murdo_maclachlan_theme");
var themeSheet = document.getElementById("theme");

if (theme != null) {
    themeSheet.href = parse("../static/css/themes/theme_%v.css", [theme]);
} else {  // when theme not set, default to dark
    ;
}

// Swap the theme (dark/light) based on the value currently held in "theme" variable
// The default theme is dark, so a null value is treated the same as dark.
function changeTheme() {

    // Toggle theme and update stylesheet link on the page
    if (theme == "dark" || theme == null) {
        theme = "light";
    } else {
        theme = "dark";
    }
    themeSheet.href = parse("../static/css/themes/theme_%v.css", [theme]);

    // Set the cookie to expire in one day
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + DAY_SECONDS);
    setCookie("murdo_maclachlan_theme", theme, expiryDate);
}

// COOKIE HANDLING

// Fetch a cookie and parse information
function fetchCookie(name) {
    let cookie = document.cookie.split(";");
    for (var i = 0; i < cookie.length; i++) {
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
