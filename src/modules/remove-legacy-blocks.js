export function removeLegacyBlocks() {

  [...document.body.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().toLowerCase() === 'popup de pago') {
      node.remove();
    }
  });
}
