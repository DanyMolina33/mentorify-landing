export function initPeruModal() {
  const modal = document.querySelector('#mfyPeruModal');
  if (!modal) return;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
}
