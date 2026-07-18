export function initMarquee() {
  document.querySelectorAll('.mvms-track').forEach((track) => {
    // El script heredado ya crea cuatro copias antes de cargar este módulo.
    if (track.dataset.ready === '1' || track.dataset.cloned) return;
    [...track.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    });
    track.dataset.cloned = 'true';
  });
  const showcase = document.querySelector('.mv-mentors-showcase');
  if (!showcase) return;
  showcase.querySelector('.mfy-showcase-intro')?.remove();
  const facilitators = document.querySelector('#mfyFacilitadoresV5');
  if (facilitators) {
    // Ambos bloques deben conservar su propio contexto de ancho y estilos.
    // La marquesina sigue visualmente al botón, pero no se anida dentro
    // del contenedor de facilitadores, que limitaría el bloque Apple.
    facilitators.after(showcase);
    const experience = document.querySelector('#mf-apple-exp');
    if (experience) showcase.after(experience);
  }
  showcase.querySelectorAll('img').forEach((img) => { img.loading = 'lazy'; img.decoding = 'async'; if (!img.alt) img.alt = 'Autor disponible en Mentorify'; });
}
