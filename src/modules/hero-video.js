export function initHeroVideo() {
  const video = document.querySelector('.mfy-hero-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    video.classList.add('is-ready');
  };

  const keepPoster = () => video.classList.add('is-failed');

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    requestAnimationFrame(reveal);
  } else {
    video.addEventListener('loadeddata', reveal, { once: true });
    video.addEventListener('canplay', reveal, { once: true });
    video.addEventListener('canplaythrough', reveal, { once: true });
    video.addEventListener('error', keepPoster, { once: true });
  }

  video.play().catch(() => {});
}
