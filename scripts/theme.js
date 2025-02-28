/*
 * This file is part of Molly Maclachlan's website
 * Copyright (C) 2021-2025 Molly Maclachlan
 * Authors: Molly Maclachlan, et al.
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Fetch the page's prefix for compatibility between pages in the top-level folder & those in subfolders
var prefix;
try {
    prefix = document.getElementsByName("prefix")[0].content;
} catch (TypeError) {
    prefix = "";
}

const BODY = document.getElementById("body-container");
const COOKIE_HTML =
    `<div id='cookie-banner' style='display: none;'>
        <div class='block'>
            This website may store cookies for the purposes of changing the theme, and for disabling this banner. Cookies are stored for 90 days, and no other data is collected. <a href="` + prefix + `legal.html">See more</a>.
        </div>
        <div id="cookie-button-container">
            <button id="cookie-accept" class="button cookie-button" type="button" onclick="accept_cookie()">ACCEPT</button>
            <button id="cookie-decline" class="button cookie-button" type="button" onclick="decline_cookie()">DECLINE</button>
        </div>
    </div>`;
const DAY_SECONDS = 86400;
const HTML = document.getElementsByTagName("html")[0];
const THEME_ICONS = {"dark": "🔆", "light": "🌘"}

BODY.insertAdjacentHTML("afterbegin", COOKIE_HTML);

var acceptance_cookie;
var cookie_popup;
var theme_button;
var theme_button_icon;
var theme_cookie;
var theme;

acceptance_cookie = fetch_cookie_value("acceptance");
theme_cookie = fetch_cookie_value("theme");
update_element_references();

if (acceptance_cookie == null) {
    cookie_popup.style.display = "block";
}

if (theme_cookie == null) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
} else {
    theme = theme_cookie
}

try {
    update_theme();
} catch (Exception) {
    window.setTimeout(
        function() {
            update_element_references();
            update_theme();
        },
        200
    )
}


//-----------//
//   THEME   //
//-----------//

/**
 * Toggles the theme between light or dark.
 */
function change_theme() {
    theme = theme == "light" ? "dark" : "light";
    update_theme();
    create_cookie("theme", theme);
}

/**
 * Updates the theme in the HTML page with whatever the 'theme' variable contains.
 */
function update_theme() {
    HTML.setAttribute('data-theme', theme);
    theme_button.setAttribute('data-desc', "Switch to " + (theme == "dark" ? "light" : "dark") + " mode.");
    theme_button_icon.innerHTML = THEME_ICONS[theme];
}


//------------//
//   COOKIE   //
//------------//

/**
 * Creates a cookie to register that cookies have been accepted and fades out the cookie banner.
 */
function accept_cookie() {
    acceptance_cookie = "true";
    create_cookie("acceptance", acceptance_cookie);
    fade(cookie_popup);
}

/**
 * Creates a cookie with a given name and value. Does nothing if cookies have not been accepted.
 * 
 * @param {*} name the name of the cookie
 * @param {*} value the value associated with the cookie
 */
function create_cookie(name, value) {
    // only create cookies if the user has accepted them
    if (acceptance_cookie != null) {
        set_cookie(name, value, DAY_SECONDS * 90);
    }
}

/**
 * Fades out the cookie banner.
 */
function decline_cookie() {
    fade(cookie_popup);
}

/**
 * Deletes a single cookie with a given name.
 * 
 * @param {*} name the name of the cookie
 */
function delete_cookie(name) {
    set_cookie(name, "", "Thu, 01 Jan 1970 00:00:00 GMT");
}

/**
 * Fetches a cookie with a given name and returns its value if it exists.
 * 
 * @param {*} name the name of the cookie
 * @returns the value associated with the cookie
 */
function fetch_cookie_value(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; ++i) {
        let cookie_components = cookies[i].split("=");
        if (name === decodeURIComponent(cookie_components[0])) {
            return decodeURIComponent(cookie_components[1]);
        }
    }
    return null;
}

/**
 * Sets the value and expiry date of a given cookie.
 * 
 * @param {*} name the name of the cookie
 * @param {*} value the value of the cookie
 * @param {*} max_age the date on which the cookie will expire
 */
function set_cookie(name, value, max_age) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +
        ";expires=" + max_age +
        ";path=/;" +
        "SameSite=Strict;";  // disallow cookie requests from third party sites
}


//-------------//
//   HELPERS   //
//-------------//

/**
 * Fades a given element out until it is invisible.
 * 
 * Taken from the following StackOverflow answer:
 * https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
 * 
 * @param {*} element the element to fade out
 */
function fade(element) {
    var opacity = 1;
    var timer = setInterval(function () {
        if (opacity <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 10);
}

/**
 * Update global references to HTML elements in the document.
 */
function update_element_references() {
    cookie_popup = document.getElementById("cookie-banner");
    theme_button = document.getElementById("theme-button");
    theme_button_icon = document.getElementById("theme-button-icon");
}