import './styles/tokens.css';
import './styles/testimonials.css';
import './styles/share-testimonial.css';
import { initTestimonialForm, testimonialFormMarkup } from './testimonials/form.js';

const root = document.querySelector('#standaloneTestimonialForm');
root.innerHTML = testimonialFormMarkup({ standalone: true });
initTestimonialForm(root, { origin: 'enlace_directo' });
