/* =====================================================
   SURPRISE LOVE - MUSIC SYSTEM
===================================================== */

const music = new Audio("music/music.mp3");

music.loop = true;
music.volume = 0.35;


/* =====================================================
   MUSIC STATE
===================================================== */

let musicEnabled =
    localStorage.getItem("musicEnabled") !== "false";


/* =====================================================
   CREATE MUSIC BUTTON
===================================================== */

const musicButton = document.createElement("button");

musicButton.id = "musicControl";

musicButton.innerHTML =
    musicEnabled ? "🎵" : "🔇";


/* =====================================================
   MUSIC BUTTON STYLE
===================================================== */

const style = document.createElement("style");

style.innerHTML = `

#musicControl {

    position: fixed;

    top: 20px;
    right: 20px;

    width: 48px;
    height: 48px;

    border: none;

    border-radius: 50%;

    background:
        rgba(255,255,255,0.78);

    backdrop-filter:
        blur(12px);

    -webkit-backdrop-filter:
        blur(12px);

    box-shadow:
        0 8px 25px
        rgba(100,80,120,0.18);

    font-size: 21px;

    cursor: pointer;

    z-index: 99999;

    transition:
        transform .3s ease,
        box-shadow .3s ease;

}


#musicControl:hover {

    transform:
        scale(1.1);

    box-shadow:
        0 10px 30px
        rgba(180,120,180,0.28);

}


#musicControl.playing {

    animation:
        musicPulse 2s ease-in-out infinite;

}


@keyframes musicPulse {

    0%,
    100% {

        transform:
            scale(1);

    }

    50% {

        transform:
            scale(1.08);

    }

}

`;

document.head.appendChild(style);

document.body.appendChild(musicButton);


/* =====================================================
   UPDATE BUTTON
===================================================== */

function updateMusicButton() {

    if (!music.paused) {

        musicButton.innerHTML = "🎵";

        musicButton.classList.add(
            "playing"
        );

    } else {

        musicButton.innerHTML = "🔇";

        musicButton.classList.remove(
            "playing"
        );

    }

}


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic() {

    if (!musicEnabled) {

        return;

    }

    music.play()
        .then(() => {

            updateMusicButton();

        })
        .catch(() => {

            updateMusicButton();

        });

}


/* =====================================================
   PAUSE MUSIC
===================================================== */

function pauseMusic() {

    music.pause();

    updateMusicButton();

}


/* =====================================================
   MUSIC BUTTON CLICK
===================================================== */

musicButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        if (music.paused) {

            musicEnabled = true;

            localStorage.setItem(
                "musicEnabled",
                "true"
            );

            playMusic();

        } else {

            musicEnabled = false;

            localStorage.setItem(
                "musicEnabled",
                "false"
            );

            pauseMusic();

        }

    }
);


/* =====================================================
   AUTO START AFTER USER INTERACTION
===================================================== */

document.addEventListener(
    "click",
    function() {

        if (
            musicEnabled &&
            music.paused
        ) {

            playMusic();

        }

    },
    {
        once: true
    }
);


/* =====================================================
   INITIAL STATE
===================================================== */

updateMusicButton();