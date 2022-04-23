var child_groups = {
    "hardlimit": false,
    "twitter": false,
    "youtube": false,
}

function toggle_children(trigger) {
    let children = document.getElementsByClassName("entry-" + trigger.id);
    if (!child_groups[trigger.id]) {
        toggle_display(children, trigger.id, true);
    } else {
        toggle_display(children, trigger.id, false);
    }
}

function toggle_display(list, trigger_id, state) {
    let display = (state ? "block;" : "none;");
    for (let i = list.length-1; i >= 0; i--) {
        let element = list.item(i);
        element.style = "display:" + display;
    }
    child_groups[trigger_id] = state;
}

var accounts = {
    "info":
    `<div class="text-column">
        <h2>Accounts</h2>

        <p>Here you can find an alphabetical list of navigation links to my various internet accounts, accompanied by short explanations of what I generally do with them.

            Click on an item on the list to the right to view information about that account. 'Info' displays this page.

            On each account's information page you will find a single-letter code representing its level of activity. They are as follows:
        </p>
        <ul>
            <li>(A): active.</li>
            <li>(P): periodically active (can be sporadic or for specific regular time periods).</li>
            <li>(D): dormant; inactive but with the intent of becoming active in the future.</li>
            <li>(I): inactive for the forseeable future.</li>
        </ul><p>If an account does not appear in this list, that does not <i>necessarily</i> mean it is not mine, but you should check before assuming so.
        </p>
    </div>`,
    "allpoetry":
    `<h2>AllPoetry (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://allpoetry.com/Murdo_Maclachlan', '_blank')">Go to account</button>
    <p>AllPoetry is a large poetry-sharing website and one of my favourite places on the internet. I joined the site on the 1st of October 2018 and have been active intermittently ever since.

    At the moment, activity on this account is rather sporadic. Although I love poetry and this site with all my heart, I'm currently focusing much more on prose than poetry. I still come back and write a poem or two every now and then, and hopefully I can be more active again here in the future.

    For examples of my poetry, either click the 'Go to account' button above, or see <a href="writing/poetry.html">here</a> for some selected pieces.
    </p>`,
    "belletristica":
    `<h2>Belletristica (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://belletristica.com/en/users/14865-murdo-maclachlan#profile', '_blank')">Go to account</button>
    <p>The search for a good Wattpad alternative is a long one, but Belletristica looks like a good candidate. Currently dormant, I hope to get writing prose on this site as soon as I have the time. Watch this space!
    </p>`,
    "codeberg":
    `<h2>Codeberg (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://codeberg.org/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>Since moving from GitHub, my primary repository hosting website, and the <a href="https://codeberg.org/MurdoMaclachlan/pages">main host for this site</a>, has been Codeberg. Feel free to pop over, have a look at the source for this site, and browse my other repositories or even contribute if you want.

    Most of my activity on Codeberg involves the development of some Python projects related to the <a href="https://www.reddit.com/r/TranscribersOfReddit">Transcribers of Reddit</a>, as well as the maintenance of a collection of transcriptions templates for common memes and reposts.
    </p>`,
    "deviantart":
    `<h2>DeviantArt (I)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.deviantart.com/mbmaclachlan', '_blank')">Go to account</button>
    <p>I joined DeviantArt  in 2018 and only ever uploaded a few sketches, none of which are very good. My favourite is my <a href="https://www.deviantart.com/mbmaclachlan/art/Bastard-Sword-Sketch-841019527">bastard sword sketch</a>.

    All of the sketches are licensed under Creative Commons Attribution Share-Alike Version 3, so feel free to use them as long as you credit me and use the same license. I'm not that bothered about the drawings but I am bothered about people respecting copyleft license terms.
    </p>`,
    "discord":
    `<h2>Discord (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://discord.com/users/234960566278553600', '_blank')">Go to account</button>
    <p>I use Discord for a lot of my communication purposes. My account is Murdo#0949, but be warned that I don't generally accept friend requests from people I haven't already got to know.

    Discord is not the place to message me if you are looking to contact me about something. For that, use the contact link in the footer of this website, or alternatively message me on the relevant account, if there is one.
    </p>`,
    "github":
    `<h2>GitHub (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://github.com/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>This whole website is available <a href="https://github.com/MurdoMaclachlan/website">open-source on GitHub</a> as a push mirror for the Codeberg host.

    As with Codeberg, most of my activity on GitHub involves the development of some Python projects related to the <a href="https://www.reddit.com/r/TranscribersOfReddit">Transcribers of Reddit</a>, as well as the maintenance of a collection of transcriptions templates for common memes and reposts.

    I also occasionally bug hunt on programs I personally make use of, but that's rare.

    I no longer use GitHub as much as I used to, but most of my repositories on Codeberg do have GitHub push mirrors -- just don't open issues on GitHub if there's a codeberg alternative, as I prefer to have things managed over here, farther from corporate hands.
    </p>`,
    "hardlimit-archive":
    `<h2>Hardlimit: Stream Archive (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://video.hardlimit.com/c/mmaclachlanarchive', '_blank')">Go to account</button>
    <p>This Hardlimit channel is an archive for all of my past <a href="https://www.twitch.tv/murdomaclachlan">Twitch streams</a>.

    My Hardlimit channels are mirrors of my YouTube channels; I created them to provide access to my videos via the decentralised Peertube network and do discourage dependency on Google.

    I'm yet to export any archived streams, as exporting videos takes a while, but I will begin doing so soon.
    </p>
    <!--<iframe
        width="60%"
        height="350px"
        src=""
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>-->`,
    "hardlimit-main":
    `<h2>Hardlimit: Primary (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://video.hardlimit.com/c/murdomaclachlan/', '_blank')">Go to account</button>
    <p>he content on my primary YouTube account is fairly varied. So far I've uploaded mainly clips and highlights from my Twitch streams, but there is also a small amount of music, a mod comparison, and really anything that pops into my head.

    My Hardlimit channels are mirrors of my YouTube channels; I created them to provide access to my videos via the decentralised Peertube network and do discourage dependency on Google.

    Below is an example of one of my highlights videos:
    </p>
    <iframe
        width="60%"
        height="350px"
        src="https://video.hardlimit.com/videos/embed/926671e7-0c3c-42db-81b4-909c1c813732"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>`,
    "kofi":
    `<h2>Ko-Fi (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://ko-fi.com/murdomaclachlan', '_blank')">Go to account</button>
    <p>I feel a little bad putting this account on here since it feels like begging for money when I'm not actively streaming, uploading videos, modding or publishing writing, but this is supposed to be a link of all my accounts, so here it is. Don't donate at the moment.
    </p>`,
    "linuxquestions":
    `<h2>LinuxQuestions (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.linuxquestions.org/questions/user/murdo-1234055/', '_blank')">Go to account</button>
    <p>LinuxQuestions.org is a forum hub for Linux, unsurprisingly. You won't find that much in the way of activity from me; I mainly just lurk conversations in order to stay in the loop. When I do post, it's often about Pipewire or Wayland, and it's always Slackware-related, as that's the only distrobution, and indeed the only operating system, I've ever used.
    </p>`,
    "movellas":
    `<h2>Movellas (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://movellas.com/movellian/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>The search for a good Wattpad alternative is a long one, but Movellas looks like a good candidate. Currently dormant, I hope to get writing prose on this site as soon as I have the time. Watch this space!
    </p>`,
    "mozilla":
    `<h2>Mozilla Addons (I)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://addons.mozilla.org/en-GB/firefox/user/16624319/', '_blank')">Go to account</button>
    <p>I've made a grand total of one (1) addon for Mozilla Firefox; a theme called <a href="https://addons.mozilla.org/en-GB/firefox/addon/soft-topaz-highlights/">Soft Topaz Highlights</a>, which I still personally use. I don't know if I'll ever make any more themes or any proper addons. Possibly, but probably not any time soon, so I consider this account inactive.
    </p>`,
    "musescore":
    `<h2>MuseScore (I)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://musescore.com/murdomaclachlan', '_blank')">Go to account</button>
    <p>You won't find any of my compisitions on here. I made my MuseScore account so that I could use their forums, posted twice, favourited 'The Swan', and never looked back. I might post something at some point, I might not. For the forseeable future, consider it inactive.
    </p>`,
    "nanowrimo":
    `<h2>NaNoWriMo (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://nanowrimo.org/participants/murdomaclachlan', '_blank')">Go to account</button>
    <p>NaNoWriMo - National Novel Writing Month. Also known as November. The challenge is to write 50,000 words of a new novel or novella. Or write 50,000 words of one you've already written part of; it's flexible. In 2021, I attempted it for the first time and completed it! Since, I've written almost nothing in that novel, but I liked what I wrote and I'll probably continue it in 2022.

    Every November, this account should become active. I loved NaNoWriMo in 2021 and will no doubt love it again in 2022. It's a great way to make sure I write, especially since that's during university, which is when I have the most trouble making myself write.
    </p>`,
    "nexusmods":
    `<h2>NexusMods (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.nexusmods.com/users/79190763', '_blank')">Go to account</button>
    <p>Periodically-active in terms of support and dormant in terms of new mods, I occasionally hop on here to see if there are any questions needing answered about the few mods I've published. I would love to get back to modding at some point, although I've encountered confusing obstacles with one mod I was trying to make.

    My most popular mod on Nexus is for the Witcher 3: <a href="https://www.nexusmods.com/witcher3/mods/4232">No Dismemberments or Finishers</a>, which disables some of the more gratuitously violent aspects of the game. However, I'm personally far more invested in my <a href="https://www.nexusmods.com/legendofgrimrock2/mods/136">Grimrock</a> <a href="https://www.nexusmods.com/legendofgrimrock2/mods/140">imports</a>, bringing enemies from the first game into the second one for use in custom dungeons.
    </p>`,
    "reddit":
    `<h2>Reddit (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://old.reddit.com/user/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>Probably my most active account besides Discord, I mainly use my Reddit account for <a href="endeavours#transcribing">transcribing</a>.

    In my early days on Reddit, I would mainly post to <a href="https://www.reddit.com/r/worldbuilding">r/worldbuilding</a>, but since joining the Transcribers I've done little else. I don't post to r/worldbuilding these days, as I'm trying to focus fully on writing stories rather than getting carried away in world after world.
    </p>`,
    "steam":
    `<h2>Steam (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://steamcommunity.com/id/murdomaclachlan', '_blank')">Go to account</button>
    <p>I used to use Steam all the time, but I've since become more engaged with other things and don't have as much time for video games any more. I'd love to get back to playing them, though, especially since I'm a bit of a completionist and there are many achievements I never got and games I never finished!

    On the topic of achievements, I have a couple of Steam achievement hunting accounts:
    <ul>
        <li><a href="https://completionist.me/steam/profile/76561198249827228">Completionist.me</a></li>
        <li><a href="https://steamhunters.com/id/mmaclachlan/games">Steam Hunters</a></li>
    </ul>
    </p>`,
    "telegram":
    `<h2>Telegram (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://t.me/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>I haven't used my Telegram account for much yet, as it's very new, but this is another avenue through which you can contact me if you need to. Just bear in mind I will probably be slower to respond than with many other accounts.
    </p>`,
    "tumblr":
    `<h2>Tumblr (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://murdomaclachlan.tumblr.com/', '_blank')">Go to account</button>
    <p>I have an on-off relationship with Tumblr, one which is far more off than on. I like many aspects of the site, and am less than enthusiastic about others, while finding some hard to understand.

    Occasionally I post here, usually I don't. When I do, I'm not really sure what I'm doing or what's going on, but that might be the essence of Tumblr.
    </p>`,
    "twitch":
    `<h2>Twitch (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.twitch.tv/murdomaclachlan', '_blank')">Go to account</button>
    <p>Sometimes I stream on Twitch! Primarily, I stream <a href="https://www.youtube.com/playlist?list=PLDxJw61Wisx9-C_wu2JT3GaVCZhcbrn93">Hollow Knight</a>, but in the past I've also streamed <a href="https://www.youtube.com/playlist?list=PLDxJw61Wisx8ViAzv0xsu_En00cFrMvuU">Dark Souls</a>, <a href="https://www.youtube.com/playlist?list=PLDxJw61Wisx-_MZRvboEjJ8D2jzhbLi6t">Pharaoh: A New Era</a>, and even <a href="https://www.youtube.com/playlist?list=PLDxJw61Wisx_IBG7VGw4FN9rLuxQrUSQ3">transcribing</a>!

    I intend to return to streaming and finish Hollow Knight, as with many things, once time permits. I also have a bucket list of games to play following that, with Dark Souls III up near the top. Streaming is genuinely one of my favourite things to do.

    Feel free to browse my past streams at my <a href="https://www.youtube.com/channel/UCvYC7NBRj77MRORgFVsD5nA/featured">archive</a>.
    </p>`,
    "twitter-main":
    `<h2>Twitter: Primary (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://twitter.com/murdomaclachlan', '_blank')">Go to account</button>
    <p>My primary Twitter account, @murdomaclachlan, doesn't have a specific use, but is quite politically active. I'm politically left-wing - green and socialist - so if you disagree with those positions this account might not be worth your time.

    If you're not bothered with that, I'll very occasionally post other things here as well.
    </p>`,
    "twitter-sullivan":
    `<h2>Twitter: The Records of Dr Sullivan (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://twitter.com/drsullivanscp', '_blank')">Go to account</button>
    <p>Currently dormant, this Twitter account, @drsullivanscp, was created for a YouTube channel I created called 'The Records of Dr Sullivan'. It was a pretty basic SCP-narration account and is currently dormant.
    </p>`,
    "wattpad":
    `<h2>Wattpad (I)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.wattpad.com/user/MurdoMaclachlan', '_blank')">Go to account</button>
    <p>My Wattpad account dates back to the 23rd of February 2022, but I've never published anything on it and never use it these days. I'm not a fan fo the website in general and intend to move to sites like <a href="https://belletristica.com/en/users/14865-murdo-maclachlan#profile">Belletristica</a> and <a href="https://movellas.com/movellian/MurdoMaclachlan">Movellas</a>, so this account will most likely be deactivated.
    </p>`,
    "wikipedia":
    `<h2>Wikipedia (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('', '_blank')">Go to account</button>
    <p>I don't do much editing on Wikipedia at the moment; I've tended to have a history of short burts of a few edits here and there, then nothing for ages. When I do edit, generally I do copyedits and cleanups, just to make pages look neater and better convey their information.
    </p>`,
    "wordsmith":
    `<h2>Wordsmith (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://wordsmith.social/murdomaclachlan/', '_blank')">Go to account</button>
    <p>My Wordsmith account was intended to be my blog, but since my very first post I've found little time to write anything there. I would like to get back to it though; as such, I consider it dormant and not inactive.
    </p>`,
    "youtube-archive":
    `<h2>YouTube: Stream Archive (A)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.youtube.com/channel/UCvYC7NBRj77MRORgFVsD5nA/', '_blank')">Go to account</button>
    <p>This YouTube account is an archive for all of my past <a href=""></a> Twitch streams. As an example, below is one of those streams:
    </p>
    <iframe
        width="60%"
        height="350px"
        src="https://www.youtube.com/embed/a7d0AV-5uGw"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>`,
    "youtube-main":
    `<h2>YouTube: Primary (P)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.youtube.com/channel/UCFC6WprQlC7q2pwJEhaCPfA/', '_blank')">Go to account</button>
    <p>The content on my primary YouTube account is fairly varied. So far I've uploaded mainly clips and highlights from my Twitch streams, but there is also a small amount of music, a mod comparison, and really anything that pops into my head. Below is an example of one of the highlights videos:
    </p>
    <iframe
        width="60%"
        height="350px"
        src="https://www.youtube.com/embed/OT0Kh_FxtGs"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>`,
    "youtube-sullivan":
    `<h2>YouTube: The Records of Dr Sullivan (D)</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('https://www.youtube.com/channel/UCBJynIOEjCk7kVoycR1uyJQ/', '_blank')">Go to account</button>
    <p>The Records of Dr Sullivan is a small voice acting project I started on a whim. The jist of it is a fairly basic SCP-narration account, and it only has 4 videos at the moment and has been dormant for quite some time. However, I'd love to get back to it at some point. I did start making a 5th video, but I was unsatisfied with the quality of both my narration and the editing, and choosing the next article is always hard when there are so many good ones. Regardless, here's an example:
    </p>
    <iframe
        width="60%"
        height="350px"
        src="https://www.youtube.com/embed/V2zPryMrZ-8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>`
}

function toggle_account(trigger) {
    let account = trigger.id;
    let display = document.getElementById("account-description");
    display.innerHTML = accounts[account];
}

/**
    "template":
    `<h2>()</h2>
    <button id="account-button" class="nav-button" type="button" onclick="window.open('', '_blank')">Go to account</button>
    <p>
    </p>`,
**/