var currentDate = new Date();
var favicon = document.getElementById("favicon");
var footerText = document.getElementById("footer-left");
var footerSnippets = {
    ace:
    `Today is the 6th of April! That means it's <a href="https://en.wikipedia.org/wiki/Asexuality#International_Asexuality_Day">International
    <br>
    Asexuality Day</a>. As an ace myself, today is close to my heart.`,
    halloween:
    `Today is <a href="https://en.wikipedia.org/wiki/Halloween">Hallowe'en</a>! Please enjoy the spooks and be
    <br>
    prolific in your dooting! Happy Hallowe'en!`,
    pride:
    `Welcome to the month of June! This is <a href="https://en.wikipedia.org/wiki/Gay_pride#LGBT_Pride_Month">LGBT+ Pride
    <br>
    Month.</a> Don't forget to love each other!`,
}

if (currentDate.getMonth() == 3 && currentDate.getDate() == 6 ) {
    favicon.href = "../static/img/favicons/events/ace.png";
    footerText.insertAdjacentHTML('beforeend', footerSnippets.ace);
} else if (currentDate.getMonth() == 5 ) {
    favicon.href = "../static/img/favicons/events/lgbt.png";
    footerText.insertAdjacentHTML('beforeend', footerSnippets.pride);
} else if (currentDate.getMonth() == 9 && currentDate.getDate() == 31 ) {
    favicon.href = "../static/img/favicons/events/halloween.png";
    footerText.insertAdjacentHTML('beforeend', footerSnippets.halloween);
}
