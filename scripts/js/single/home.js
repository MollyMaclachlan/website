calc_age();

function calc_age() {
    let element = document.getElementById("age");
    let date = new Date();
    if (date.getMonth() < 11 || (date.getMonth() == 11 && date.getDate() < 24)) {
        element.innerHTML = date.getFullYear() - 2003;
    } else {
        element.innerHTML = date.getFullYear() - 2002;
    }
}