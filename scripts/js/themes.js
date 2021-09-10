"use strict";

var theme = fetchCookie("murdo_maclachlan_theme");

if (theme != null) {
    document.getElementById("theme").href = parse('../static/css/themes/theme_%s.css', theme);
} else {  // when theme not set, default to dark
    ;
}

// Swap the theme (dark/light) based on the value currently held in "theme" variable
function changeTheme() {
    if (theme == "dark" || theme == null) {  // null indicates no cookie, thus the default dark theme will be in place
        document.getElementById("theme").href = "../static/css/themes/theme_light.css";
        theme = "light";
    } else {
        document.getElementById("theme").href = "../static/css/themes/theme_dark.css";
        theme = "dark";
    }
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 86400000);  // expires in 1 day
    setCookie("murdo_maclachlan_theme", theme, expiryDate);
}

// COOKIE HANDLING

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

// Fetch a cookie and parse information
function fetchCookie(name) {
    let cookie = document.cookie.split(";");  // get array of all cookies associated with the website
    for (var i = 0; i < cookie.length; i++) {
        let cookieElements = cookie[i].split("=");  // parse elements of each cookie into an array
        if (cookieElements[0] === encodeURIComponent(name)) {
            return decodeURIComponent(cookieElements[1]);  // if the cookie name matches the one being searched for, decode its value
        }
    }
    return null;  // if no matching cookie is found, return null
}


// MISCELLANEOUS

function parse(str) {
    var args = [].slice.call(arguments, 1), i = 0;
    return str.replace(/%s/g, () => args[i++]);
}
