    document.addEventListener("DOMContentLoaded", function() {
        const video = document.querySelector("footer video");
        if (!video) return;

        let playTimer = null;
        let hasPlayed = false; // Merkt sich, ob das Video bereits abgespielt wurde

        const options = {
            root: null,
            threshold: 1.0 
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Wenn das Video bereits einmal lief, ignorieren wir weitere Sichtbarkeits-Änderungen
                if (hasPlayed) return;

                if (entry.isIntersecting) {
                    // Startet den Timer, wenn das Video komplett sichtbar ist
                    playTimer = setTimeout(() => {
                        video.play().then(() => {
                            hasPlayed = true; // Markieren als abgespielt
                            observer.unobserve(video); // Observer stoppen, da er nicht mehr benötigt wird
                        }).catch(error => {
                            console.log("Autoplay wurde blockiert oder abgebrochen:", error);
                        });
                    }, 500);
                } else {
                    // Stoppt den Timer, falls das Video den Viewport *vor* Ablauf der 900ms wieder verlässt
                    clearTimeout(playTimer);
                }
            });
        }, options);

        observer.observe(video);
    });