
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openButton");
  const envelope = document.getElementById("envelope");
  const intro = document.getElementById("intro");
  const surprise = document.getElementById("surprise");
  const replayButton = document.getElementById("replayButton");

  const musicButton = document.getElementById("musicButton");
  const musicIcon = document.getElementById("musicIcon");
  const musicLabel = document.getElementById("musicLabel");
  const backgroundMusic = document.getElementById("backgroundMusic");

  const letterDate = document.getElementById("letterDate");
  const stars = document.getElementById("stars");

  // Tanggal pada surat
  if (letterDate) {
    letterDate.textContent = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Membuat bintang di langit
  if (stars) {
    stars.innerHTML = "";

    for (let i = 0; i < 90; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = 1.5 + Math.random() * 3 + "s";
      stars.appendChild(star);
    }
  }

  // Membuka amplop dan menampilkan hadiah
  if (openButton && surprise && intro) {
    openButton.addEventListener("click", () => {
      openButton.disabled = true;

      openButton.classList.add("is-open");

      if (envelope) {
        envelope.classList.add("is-open");
      }

      // Tampilkan buket, foto polaroid, dan surat
      window.setTimeout(() => {
        surprise.hidden = false;
        intro.classList.add("intro-hidden");

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        openButton.disabled = false;
      }, 700);
    });
  }

  // Kembali ke halaman amplop
  if (replayButton) {
    replayButton.addEventListener("click", () => {
      surprise.hidden = true;
      intro.classList.remove("intro-hidden");

      if (openButton) {
        openButton.classList.remove("is-open");
        openButton.disabled = false;
      }

      if (envelope) {
        envelope.classList.remove("is-open");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // Tombol musik bergaya iOS
  if (musicButton && backgroundMusic) {
    const musicProgress = document.getElementById("musicProgress");

    musicButton.addEventListener("click", async () => {
      if (backgroundMusic.paused) {
        try {
          await backgroundMusic.play();

          musicButton.setAttribute("aria-pressed", "true");
          musicButton.setAttribute("aria-label", "Pause music");

          if (musicIcon) musicIcon.textContent = "Ⅱ";
          if (musicLabel) musicLabel.textContent = "Pause music";
        } catch (error) {
          console.error("Musik gagal diputar:", error);

          if (musicLabel) {
            musicLabel.textContent = "Periksa file musik";
          }
        }
      } else {
        backgroundMusic.pause();

        musicButton.setAttribute("aria-pressed", "false");
        musicButton.setAttribute("aria-label", "Play music");

        if (musicIcon) musicIcon.textContent = "▶";
        if (musicLabel) musicLabel.textContent = "Play music";
      }
    });

    backgroundMusic.addEventListener("timeupdate", () => {
      if (
        musicProgress &&
        Number.isFinite(backgroundMusic.duration) &&
        backgroundMusic.duration > 0
      ) {
        const progress =
          (backgroundMusic.currentTime / backgroundMusic.duration) * 100;

        musicProgress.style.width = `${progress}%`;
      }
    });

    backgroundMusic.addEventListener("ended", () => {
      musicButton.setAttribute("aria-pressed", "false");
      musicButton.setAttribute("aria-label", "Play music");

      if (musicIcon) musicIcon.textContent = "▶";
      if (musicLabel) musicLabel.textContent = "Play music";
    });
  }
});
