import { META_PIXEL_PRIMARY, META_PIXEL_LEGACY } from '../config.js';
export function initTracking() {
  window.mentorifyConfig = Object.freeze({ primaryPixel: META_PIXEL_PRIMARY, legacyPixel: META_PIXEL_LEGACY });
}
