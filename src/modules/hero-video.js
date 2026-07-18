export function initHeroVideo() {
  const video = document.querySelector('.mfy-hero-video');
  if (!video) return;

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    video.classList.add('is-ready');
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    requestAnimationFrame(reveal);
  } else {
    video.addEventListener('loadeddata', reveal, { once: true });
    video.addEventListener('canplay', reveal, { once: true });
  }

  video.play().catch(() => {});
}
