// Fetch the page's prefix for compatibility between pages in the top-level folder & those in subfolders
try {
    var prefix = document.getElementsByName('prefix')[0].content;
} catch (TypeError) {
    var prefix = "";
}

var favicon = document.getElementById('favicon');
var logo;

var events = {
    "days": {
        "6/3": "../media/img/favicons/events/ace.webp",
        "31/9": "../media/img/favicons/events/halloween.webp"
    },
    "months": {
        "5": "../media/img/favicons/events/pride.webp"
    }
}

/**
 * Determine if any event is happening, and if so, trigger the changes to reflect that.
 */
function calculate_event() {
    logo = document.getElementById('logo'); // logo must be initialised here, see line 47 for rationale
    let date = new Date();
    let day = `${date.getDate()}/${date.getMonth()}`;
    let month = `${date.getMonth()}`;

    if (Object.keys(events["days"]).includes(day)) {
        update_icons(events["days"][day]);
    } else if (Object.keys(events["months"]).includes(month)) {
        update_icons(events["months"][month]);
    }
}

/**
 * Update the favicon and logo with a new, given image source.
 * 
 * @param {*} source The new image source.
 */
function update_icons(source) {
    favicon.href = `${prefix}${source}`;
    logo.src = `${prefix}${source}`;
}

// wait a moment before attempting this or 'logo' will be classed null because it's an inserted element itself;
// despite the fact it's inserted before this script executes and should be fine, apparently JavaScript is just
// absolutely god-awful
window.setTimeout(
    function() {
        calculate_event()
    }, 250
);
