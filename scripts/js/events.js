try {
    var prefix = document.getElementById('prefix').content;
} catch (TypeError) {
    var prefix = "";
}

var date = new Date();
var favicon = document.getElementById("favicon");
var footer = document.getElementById("footer-left");
var snippets = {
    ace:
    `Today is the 6th of April! That means it's <a href="https://en.wikipedia.org/wiki/Asexuality#International_Asexuality_Day">International
    Asexuality Day</a>. I'm ace (aegosexual, specifically!), so today is close to my heart.`,
    birthday:
    `Today is the 24th of November. That means it's my birthday. I don't like that.`,
    halloween:
    `Today is <a href="https://en.wikipedia.org/wiki/Halloween">Hallowe'en</a>! Please enjoy the spooks and be
    prolific in your dooting! Happy Hallowe'en!`,
    pride:
    `Welcome to the month of June! This is <a href="https://en.wikipedia.org/wiki/Gay_pride#LGBT_Pride_Month">LGBT+ Pride
    Month.</a> Don't forget to love each other!`,
}

if (date.getMonth() == 3 && date.getDate() == 6 ) {
    favicon.href = prefix + "../static/img/favicons/events/ace.webp";
    footer.insertAdjacentHTML('beforeend', snippets.ace);
} else if (date.getMonth() == 5 ) {
    favicon.href = prefix + "../static/img/favicons/events/pride.webp";
    footer.insertAdjacentHTML('beforeend', snippets.pride);
} else if (date.getMonth() == 9 && date.getDate() == 31 ) {
    favicon.href = prefix + "../static/img/favicons/events/halloween.webp";
    footer.insertAdjacentHTML('beforeend', snippets.halloween);
} else if (date.getMonth() == 10 && date.getDate() == 24 ) {
    footer.insertAdjacentHTML('beforeend', snippets.birthday);
}
