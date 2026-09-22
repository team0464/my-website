/* =====================================================
   SURPRISE LOVE - ALWAYS ON MUSIC
===================================================== */

(function () {

    const MUSIC_FILE = "music/music.mp3";

    const TIME_KEY = "surpriseMusicTime";

    const ENABLE_KEY = "surpriseMusicEnabled";

    const VOLUME = 0.35;


    /* =================================================
       AUDIO
    ================================================= */

    const audio = new Audio(MUSIC_FILE);

    audio.loop = true;

    audio.preload = "auto";

    audio.volume = VOLUME;


    /* =================================================
       RESTORE MUSIC POSITION
    ================================================= */

    const savedTime =
        parseFloat(
            localStorage.getItem(TIME_KEY)
        );


    if (
        !isNaN(savedTime) &&
        savedTime > 0
    ) {

        audio.addEventListener(
            "loadedmetadata",
            function () {

                if (
                    savedTime <
                    audio.duration
                ) {

                    audio.currentTime =
                        savedTime;

                }

            },
            {
                once: true
            }
        );

    }


    /* =================================================
       MUSIC STATUS
    ================================================= */

    localStorage.setItem(
        ENABLE_KEY,
        "true"
    );


    /* =================================================
       PLAY MUSIC
    ================================================= */

    function playMusic() {

        audio.play()
            .then(function () {

                console.log(
                    "🎵 Music playing"
                );

            })
            .catch(function (error) {

                console.log(
                    "Waiting for user interaction...",
                    error
                );

            });

    }


    /* =================================================
       SAVE MUSIC POSITION
    ================================================= */

    setInterval(function () {

        if (
            !audio.paused &&
            !isNaN(audio.currentTime)
        ) {

            localStorage.setItem(
                TIME_KEY,
                audio.currentTime
            );

        }

    }, 500);


    /* =================================================
       SAVE BEFORE PAGE CHANGE
    ================================================= */

    window.addEventListener(
        "beforeunload",
        function () {

            if (
                !isNaN(audio.currentTime)
            ) {

                localStorage.setItem(
                    TIME_KEY,
                    audio.currentTime
                );

            }

        }
    );


    /* =================================================
       USER INTERACTION
    ================================================= */

    function startAfterInteraction() {

        playMusic();

        document.removeEventListener(
            "click",
            startAfterInteraction
        );

        document.removeEventListener(
            "touchstart",
            startAfterInteraction
        );

        document.removeEventListener(
            "keydown",
            startAfterInteraction
        );

    }


    document.addEventListener(
        "click",
        startAfterInteraction
    );

    document.addEventListener(
        "touchstart",
        startAfterInteraction
    );

    document.addEventListener(
        "keydown",
        startAfterInteraction
    );


    /* =================================================
       TRY AUTOPLAY
    ================================================= */

    playMusic();


    /* =================================================
       PUBLIC API
    ================================================= */

    window.SurpriseMusic = {

        play: playMusic,

        getTime: function () {

            return audio.currentTime;

        }

    };

})();