// src/utils/scrollAnimations.ts
export const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Opcional: parar de observar após animar
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 10% do elemento visível
      rootMargin: '0px 0px -100px 0px' // Começa a animar um pouco antes
    }
  );

  // Observa todos os elementos que devem animar
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach((el) => observer.observe(el));

  return observer;
};