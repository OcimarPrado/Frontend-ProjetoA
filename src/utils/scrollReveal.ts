// src/utils/scrollReveal.ts
// Observa as seções abaixo da dobra e adiciona "in-view" quando aparecem.
// Não mexe em nenhum outro comportamento do app.

const SECTION_SELECTORS = ['.servicos-section', '.sobre', '.planos', '.footer'];

export function initScrollReveal(): () => void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll<HTMLElement>(SECTION_SELECTORS.join(', '));

  if (prefersReduced) {
    sections.forEach((el) => el.classList.add('in-view'));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // anima uma única vez
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  sections.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}