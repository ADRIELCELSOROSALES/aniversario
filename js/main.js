/* ============================================================
   MAIN.JS — scroll suave, transiciones de estación, revelados
   ============================================================ */

import { HISTORIA } from './historia.js';
import { construir } from './escenas.js';
import { SistemaParticulas } from './particulas.js';
import { Musica } from './audio.js';

const { gsap, ScrollTrigger, Lenis } = window;
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   1 · construir el documento desde historia.js
   --------------------------------------------------------- */
const escenas = construir(document.querySelector('main'));

/* ---------------------------------------------------------
   2 · scroll suave (Lenis) sincronizado con ScrollTrigger
   --------------------------------------------------------- */
let lenis = null;
if (!reducirMovimiento) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,   // en el celu se siente mejor el scroll nativo
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------------------------------------------------------
   3 · partículas + música
   --------------------------------------------------------- */
const particulas = reducirMovimiento
  ? null
  : new SistemaParticulas(document.getElementById('particulas'));

const musica = new Musica(document.querySelector('.musica'));

/* ---------------------------------------------------------
   4 · cada escena cambia la paleta, las partículas y la canción
   --------------------------------------------------------- */
const porId = Object.fromEntries(HISTORIA.map((d) => [d.id, d]));
const cuerpo = document.body;

function entrarEn(seccion) {
  const d = porId[seccion.id];
  if (!d) return;
  cuerpo.dataset.estacion = d.estacion;
  if (particulas) particulas.cambiar(d.estacion);
  musica.poner(d.cancion || null);
}

escenas.forEach((seccion) => {
  ScrollTrigger.create({
    trigger: seccion,
    start: 'top 55%',
    end: 'bottom 45%',
    onEnter: () => entrarEn(seccion),
    onEnterBack: () => entrarEn(seccion),
  });
});
cuerpo.dataset.estacion = HISTORIA[0].estacion;

/* ---------------------------------------------------------
   5 · revelados: todo lo que tenga .revelar entra al aparecer
   --------------------------------------------------------- */
escenas.forEach((seccion) => {
  const items = seccion.querySelectorAll('.revelar');
  if (!items.length) return;
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.09,
    scrollTrigger: { trigger: seccion, start: 'top 72%', once: true },
  });
});

/* ---------------------------------------------------------
   6 · parallax suave en las fotos
   --------------------------------------------------------- */
if (!reducirMovimiento) {
  document.querySelectorAll('.marco').forEach((marco) => {
    const medio = marco.querySelector('img, video');
    if (!medio) return;
    gsap.fromTo(
      medio,
      { scale: 1.16, yPercent: -5 },
      {
        yPercent: 5,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: 1 },
      }
    );
  });
}

/* ---------------------------------------------------------
   7 · el brote que se dibuja solo en el 20 de septiembre
   --------------------------------------------------------- */
document.querySelectorAll('.brote, .rama svg').forEach((dibujo) => {
  if (reducirMovimiento) return;

  // 1. los tallos se dibujan como con una birome
  const trazos = dibujo.querySelectorAll('path, circle:not(.c)');
  trazos.forEach((t) => {
    const largo = t.getTotalLength ? t.getTotalLength() : 200;
    gsap.set(t, { strokeDasharray: largo, strokeDashoffset: largo });
  });

  const linea = gsap.timeline({
    scrollTrigger: { trigger: dibujo, start: 'top 85%', once: true },
  });
  linea.to(trazos, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.inOut',
    stagger: 0.12,
  });

  // 2. y después brotan las flores
  const flores = dibujo.querySelectorAll('.flor');
  if (flores.length) {
    gsap.set(flores, { transformOrigin: '50% 50%', scale: 0, opacity: 0 });
    linea.to(flores, {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: 'back.out(2.2)',
      stagger: { each: 0.11, from: 'random' },
    }, '-=0.5');
  }
});

/* ---------------------------------------------------------
   8 · la rueda del año (indicador de progreso)
   --------------------------------------------------------- */
const rueda = document.querySelector('.rueda');
const arco = rueda.querySelector('.rueda__arco');
const marcas = [...rueda.querySelectorAll('.rueda__marca')];
const etiquetaRueda = rueda.querySelector('.rueda__txt');
const LARGO = 2 * Math.PI * 26;
gsap.set(arco, { strokeDasharray: LARGO, strokeDashoffset: LARGO });

// a qué cuarto de la rueda pertenece cada escena
const CUARTO = {
  'invierno-frio': 0, umbral: 0,
  primavera: 1, verano: 2, otono: 3,
  'invierno-calido': 0, final: 0, portada: -1,
};
const NOMBRE = {
  'invierno-frio': 'inv', umbral: '20·9', primavera: 'pri',
  verano: 'ver', otono: 'oto', 'invierno-calido': 'inv', final: '1 año', portada: '',
};

ScrollTrigger.create({
  trigger: document.body,
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    gsap.to(arco, { strokeDashoffset: LARGO * (1 - self.progress), duration: 0.4, overwrite: true });
  },
});

// mostrar la rueda y el botón de música recién después de la portada
ScrollTrigger.create({
  trigger: escenas[1] || escenas[0],
  start: 'top 80%',
  onEnter: () => {
    rueda.classList.add('visible');
    document.querySelector('.musica').classList.add('visible');
  },
  onLeaveBack: () => {
    rueda.classList.remove('visible');
    document.querySelector('.musica').classList.remove('visible');
  },
});

const observadorEstacion = new MutationObserver(() => {
  const est = cuerpo.dataset.estacion;
  const c = CUARTO[est];
  marcas.forEach((m, i) => m.classList.toggle('activa', i === c));
  if (etiquetaRueda) etiquetaRueda.textContent = NOMBRE[est] || '';
});
observadorEstacion.observe(cuerpo, { attributes: true, attributeFilter: ['data-estacion'] });

/* ---------------------------------------------------------
   9 · detalles finales
   --------------------------------------------------------- */
// arrancar siempre arriba, aunque el navegador recuerde la posición
history.scrollRestoration = 'manual';
addEventListener('load', () => {
  ScrollTrigger.refresh();
  if (lenis) lenis.scrollTo(0, { immediate: true });
});

// las fotos cambian de tamaño el layout: recalcular cuando cargan
document.querySelectorAll('.marco img').forEach((img) => {
  img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
});
