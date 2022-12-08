var tabs_widget = document.getElementById("tabset");
var tabs_links = tabs_widget.children[0].children;
var tabset = tabs_widget.dataset["tabset"].split(" ");

/**
 * Switches the active tab in the page's tabset.
 * 
 * @param trigger The element that triggered the switch
 */
function switch_tab(trigger) {
    switch_active(trigger);
    switch_shown(trigger);
}

/**
 * Switches the active tab title to the one that triggered the switch.
 * 
 * @param trigger The element that triggered the switch
 */
function switch_active(trigger) {
    for (element of tabs_links) {
        class_toggler(
            "is-active",
            (element == trigger),
            element
        );
    }
}

/**
 * Switches the shown tab to the one targeted by the one that triggered the
 * switch.
 * 
 * @param trigger The element that triggered the switch
 */
function switch_shown(trigger) {
    for (element of tabset) {
        let current_section = document.getElementById(element);
        class_toggler(
            "hidden",
            (element != trigger.dataset["target"]),
            current_section
        );
    }
}

/**
 * Toggles the presence of a class in a given target element, based on the given
 * truth value of a boolean condition.
 * 
 * @param class_name The name of the class to toggle
 * @param condition  The boolean truth value of the condition
 * @param target     The target element
 */
function class_toggler(class_name, condition, target) {
    let has_class = target.classList.contains(class_name);
    if (condition) {
        if (!has_class) {
            target.classList.add(class_name);
        }
    } else if (has_class) {
        target.classList.remove(class_name);
    }
}
