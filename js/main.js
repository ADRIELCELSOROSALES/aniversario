/* ============================================================
   MAIN.JS — scroll suave, transiciones de estación, revelados
   ============================================================ */

import { HISTORIA } from './historia.js';
import { construir } from './escenas.js';
import { SistemaParticulas } from './particulas.js';
import { Musica } from './audio.js';

const { gsap, ScrollTrigger, MotionPathPlugin, Lenis } = window;
const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);
if (MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);

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
  primavera: 1, verano: 2, estrellas: 2, otono: 3,
  'invierno-calido': 0, final: 0, regalo: 0, portada: -1,
};
const NOMBRE = {
  'invierno-frio': 'inv', umbral: '20·9', primavera: 'pri', verano: 'ver',
  estrellas: '✦', otono: 'oto', 'invierno-calido': 'inv',
  final: '1 año', regalo: '✦', portada: '',
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
   9 · el regalo: se desenvuelve al tocarlo y sale el avión
   --------------------------------------------------------- */
const regalo = document.querySelector('main')._regalo;
if (regalo) {
  const { boton, cerrado, abierto, avion, caja } = regalo;
  const tapa   = caja.querySelector('.caja__tapa');
  const lazos  = caja.querySelector('.caja__lazos');
  const cuerpo = caja.querySelector('.caja__cuerpo');
  const nave   = avion.querySelector('.vuelo__avion');
  const estela = avion.querySelector('.vuelo__estela');
  const ruta   = avion.querySelector('#ruta-avion');
  let abierta = false;

  const partes = [...abierto.children];

  function abrir() {
    if (abierta) return;
    abierta = true;
    boton.disabled = true;
    boton.setAttribute('aria-expanded', 'true');

    // sin animaciones: se muestra y listo
    if (reducirMovimiento) {
      cerrado.hidden = true;
      abierto.hidden = false;
      ScrollTrigger.refresh();
      return;
    }

    const largoEstela = estela.getTotalLength();
    gsap.set(estela, { strokeDasharray: largoEstela, strokeDashoffset: largoEstela, opacity: 0 });
    gsap.set(partes, { opacity: 0, y: 26 });
    gsap.set(nave, { scale: 0, opacity: 0 });

    const t = gsap.timeline();

    // 1 · se desata el moño
    t.to(lazos, { scale: 1.12, opacity: 0, duration: 0.5, ease: 'power2.in', transformOrigin: '50% 30%' });

    // 2 · la tapa salta y se va
    t.to(tapa, {
      y: -120, rotation: -16, opacity: 0,
      duration: 0.75, ease: 'power2.out', transformOrigin: '50% 50%',
    }, '-=0.18');

    // 3 · destello desde adentro de la caja
    t.fromTo(cuerpo,
      { filter: 'brightness(1)' },
      { filter: 'brightness(2.6)', duration: 0.28, yoyo: true, repeat: 1, ease: 'sine.inOut' },
      '-=0.5');

    // 4 · sale el avión de papel y hace su vuelo
    t.set(avion, { opacity: 1 }, '-=0.35');
    t.to(nave, { scale: 1.5, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.3');
    t.to(estela, { opacity: 0.5, duration: 0.3 }, '<');

    if (MotionPathPlugin) {
      t.to(nave, {
        duration: 2.5,
        ease: 'power1.inOut',
        motionPath: { path: ruta, align: ruta, alignOrigin: [0.5, 0.5], autoRotate: true },
      }, '<');
    } else {
      // por si el plugin no cargó: vuelo simple, igual se ve lindo
      t.to(nave, { x: 780, y: -180, rotation: -18, duration: 2.5, ease: 'power1.inOut' }, '<');
    }
    t.to(estela, { strokeDashoffset: 0, duration: 2.5, ease: 'power1.inOut' }, '<');

    // 5 · la caja vacía se desvanece
    t.to(cerrado, { opacity: 0, scale: 0.9, duration: 0.7, ease: 'power2.inOut' }, '-=2.1');
    t.add(() => { cerrado.hidden = true; abierto.hidden = false; }, '-=1.5');

    // 6 · aparece lo que había adentro
    t.to(partes, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.16,
      onComplete: () => ScrollTrigger.refresh(),
    }, '-=1.4');

    // 7 · el avión se va del cuadro y se lleva la estela
    t.to(nave, { opacity: 0, duration: 0.5 }, '-=1.4');
    t.to(estela, { opacity: 0, duration: 1.2 }, '<');
  }

  boton.addEventListener('click', abrir);
  boton.setAttribute('aria-expanded', 'false');
}

/* ---------------------------------------------------------
   10 · detalles finales
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
