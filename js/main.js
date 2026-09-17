/* ============================================================
   MAIN.JS — scroll suave, transiciones de estación, revelados
   ============================================================ */

import { HISTORIA, MUSICA } from './historia.js';
import { construir } from './escenas.js';
import { SistemaParticulas } from './particulas.js';
import { Musica, poff } from './audio.js';

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

const musica = new Musica(document.querySelector('.musica'), MUSICA);

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
   4b · el color va cambiando de a poco, no de golpe
   Las estaciones se funden una en otra a medida que scrolleás.
   Los colores se leen del propio CSS, así las paletas viven en
   un solo lugar (css/estilos.css) y esto nunca queda desfasado.
   --------------------------------------------------------- */
const VARS = ['--bg', '--bg-2', '--texto', '--tenue', '--acento'];

function aRgb(hex) {
  hex = hex.trim();
  if (hex.startsWith('rgb')) return hex.match(/\d+/g).slice(0, 3).map(Number);
  if (hex.length === 4) hex = '#' + [1, 2, 3].map((i) => hex[i] + hex[i]).join('');
  return [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16));
}

function leerPaletas() {
  const sonda = document.createElement('div');
  sonda.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none';
  document.body.appendChild(sonda);
  const paletas = {};
  new Set(HISTORIA.map((d) => d.estacion)).forEach((est) => {
    sonda.dataset.estacion = est;
    const cs = getComputedStyle(sonda);
    paletas[est] = VARS.map((v) => aRgb(cs.getPropertyValue(v)));
  });
  sonda.remove();
  return paletas;
}

if (!reducirMovimiento) {
  const paletas = leerPaletas();
  let marcas = [];

  const medir = () => {
    marcas = escenas.map((sec) => ({
      centro: sec.offsetTop + sec.offsetHeight / 2,
      pal: paletas[porId[sec.id].estacion],
    }));
  };

  // contraste WCAG, para no dejar nunca el texto ilegible
  const canal = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lumin = (c) => 0.2126 * canal(c[0]) + 0.7152 * canal(c[1]) + 0.0722 * canal(c[2]);
  const contraste = (c1, c2) => {
    const l1 = lumin(c1), l2 = lumin(c2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const mezclar = (ca, cb, t) => [
    Math.round(ca[0] + (cb[0] - ca[0]) * t),
    Math.round(ca[1] + (cb[1] - ca[1]) * t),
    Math.round(ca[2] + (cb[2] - ca[2]) * t),
  ];
  const poner = (v, c) => cuerpo.style.setProperty(v, `rgb(${c[0]},${c[1]},${c[2]})`);

  const pintar = (a, b, t) => {
    // los fondos sí se funden de a poco, que es lo que se ve
    const bg = mezclar(a[0], b[0], t);
    poner('--bg', bg);
    poner('--bg-2', mezclar(a[1], b[1], t));

    // el texto NO se funde: mezclar un texto claro con uno oscuro da gris
    // sobre un fondo gris, y queda ilegible justo en el cruce. Se usa el de
    // la estación que mejor se lea sobre el fondo que hay en ese momento;
    // el cambio lo suaviza una transición corta de CSS.
    const cual = contraste(b[2], bg) > contraste(a[2], bg) ? b : a;

    // en el cruce, si al color le falta contraste, se lo empuja hacia el
    // blanco o el negro lo mínimo necesario para que siga siendo legible
    const asegurar = (color, minimo) => {
      if (contraste(color, bg) >= minimo) return color;
      const destino = lumin(color) > lumin(bg) ? [255, 255, 255] : [0, 0, 0];
      for (let k = 0.15; k < 1; k += 0.15) {
        const probado = mezclar(color, destino, k);
        if (contraste(probado, bg) >= minimo) return probado;
      }
      return destino;
    };

    poner('--texto', asegurar(cual[2], 4.5));
    poner('--tenue', asegurar(cual[3], 4.5));
    poner('--acento', asegurar(cual[4], 3));
  };

  let ultimo = -1;
  const actualizar = () => {
    if (!marcas.length) return;
    const y = scrollY + innerHeight / 2;
    if (Math.abs(y - ultimo) < 0.5) return;
    ultimo = y;

    if (y <= marcas[0].centro) return pintar(marcas[0].pal, marcas[0].pal, 0);
    const fin = marcas[marcas.length - 1];
    if (y >= fin.centro) return pintar(fin.pal, fin.pal, 0);

    for (let i = 0; i < marcas.length - 1; i++) {
      const a = marcas[i], b = marcas[i + 1];
      if (y >= a.centro && y < b.centro) {
        // reparto parejo a lo largo de todo el tramo entre secciones:
        // el cambio se percibe continuo en vez de concentrarse en el cruce
        const t = (y - a.centro) / (b.centro - a.centro);
        return pintar(a.pal, b.pal, t);
      }
    }
  };

  medir();
  actualizar();
  gsap.ticker.add(actualizar);
  ScrollTrigger.addEventListener('refresh', () => { medir(); ultimo = -1; actualizar(); });
  addEventListener('resize', () => { medir(); ultimo = -1; actualizar(); }, { passive: true });
}

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
   5b · las frases sin foto se revelan palabra por palabra
   --------------------------------------------------------- */
document.querySelectorAll('.momento__frase').forEach((frase) => {
  const palabras = frase.querySelectorAll('.palabra');
  if (!palabras.length) return;

  if (reducirMovimiento) {
    gsap.set(palabras, { opacity: 1, y: 0 });
    return;
  }

  gsap.to(palabras, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.028,
    scrollTrigger: { trigger: frase, start: 'top 82%', once: true },
  });
});

/* ---------------------------------------------------------
   6 · parallax suave en las fotos
   --------------------------------------------------------- */
if (!reducirMovimiento) {
  document.querySelectorAll('.marco').forEach((marco) => {
    // una foto marcada como completa no se escala: el parallax
    // recorta un 16% de los bordes y ahí se perdería parte de la imagen
    if (marco.classList.contains('marco--completa')) return;
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
  const trazos = dibujo.querySelectorAll(':scope > path, :scope > circle');
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
    gsap.set(flores, { transformOrigin: '50% 50%' });
    linea.fromTo(flores,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'back.out(2.2)',
        stagger: { each: 0.11, from: 'random' },
        immediateRender: false,   // clave: no las esconde hasta que le toca
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
  const { seccion, boton, cerrado, abierto, vuelo, caja, luz, svg, estela, nave } = regalo;
  const tapa   = caja.querySelector('.caja__tapa');
  const lazos  = caja.querySelector('.caja__lazos');
  const cuerpo = caja.querySelector('.caja__cuerpo');
  const partes = [...abierto.children];
  let abierta = false;

  /* La ruta se calcula con el tamaño real de la escena, así el avión
     sale de donde está la caja y cruza toda la pantalla de verdad.
     Con viewBox igual al tamaño en píxeles no hay deformación. */
  function trazarRuta() {
    const w = Math.round(vuelo.clientWidth);
    const h = Math.round(vuelo.clientHeight);
    if (!w || !h) return;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const d =
      `M ${w * 0.5} ${h * 0.44}` +
      ` C ${w * 0.6} ${h * 0.38} ${w * 0.63} ${h * 0.6} ${w * 0.74} ${h * 0.53}` +
      ` C ${w * 0.86} ${h * 0.46} ${w * 0.9} ${h * 0.2} ${w * 1.1} ${h * 0.06}`;
    estela.setAttribute('d', d);
  }
  trazarRuta();
  addEventListener('resize', () => { if (!abierta) trazarRuta(); }, { passive: true });

  /* la caja respira mientras espera */
  let latido = null;
  if (!reducirMovimiento) {
    latido = gsap.to(caja, {
      y: -9, scale: 1.022,
      duration: 1.8, ease: 'sine.inOut',
      yoyo: true, repeat: -1, transformOrigin: '50% 100%',
    });
    boton.addEventListener('mouseenter', () => latido && latido.pause());
    boton.addEventListener('mouseleave', () => !abierta && latido && latido.resume());
  }

  function encuadrar() {
    const y = seccion.offsetTop;
    if (lenis) lenis.scrollTo(y, { duration: 1.3 });
    else scrollTo({ top: y, behavior: 'smooth' });
  }

  function abrir() {
    if (abierta) return;
    abierta = true;
    boton.disabled = true;
    boton.setAttribute('aria-expanded', 'true');
    if (latido) latido.kill();

    if (reducirMovimiento) {
      poff();
      cerrado.hidden = true;
      abierto.hidden = false;
      ScrollTrigger.refresh();
      return;
    }

    trazarRuta();
    const largo = estela.getTotalLength();
    gsap.set(estela, { strokeDasharray: largo, strokeDashoffset: largo, opacity: 0 });
    gsap.set(nave, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(luz, { scale: 0.2, opacity: 0 });
    gsap.set(partes, { opacity: 0, y: 30 });

    const t = gsap.timeline();

    // 1 · se desata el moño
    t.to(lazos, { scale: 1.15, opacity: 0, duration: 0.45, ease: 'power2.in', transformOrigin: '50% 40%' });

    // 2 · la tapa salta y se va, con su poff
    t.add(() => poff());
    t.to(tapa, { y: -130, rotation: -14, opacity: 0, duration: 0.7, ease: 'power2.out', transformOrigin: '50% 50%' }, '-=0.15');

    // 3 · sale la luz de adentro
    t.to(luz, { scale: 4.5, opacity: 0.9, duration: 0.45, ease: 'power2.out' }, '-=0.5');
    t.to(luz, { scale: 7, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.12');

    // 4 · el avión sale de la caja y hace su vuelo
    t.set(vuelo, { opacity: 1 }, '-=0.9');
    t.to(nave, { scale: 1.5, opacity: 1, duration: 0.3, ease: 'back.out(2)' }, '-=0.85');
    t.to(estela, { opacity: 0.5, duration: 0.3 }, '<');

    const vueloOpts = MotionPathPlugin
      ? { motionPath: { path: estela, align: estela, alignOrigin: [0.5, 0.5], autoRotate: true } }
      : { x: vuelo.clientWidth * 0.5, y: -vuelo.clientHeight * 0.35, rotation: -20 };
    t.to(nave, { duration: 2.3, ease: 'power1.inOut', ...vueloOpts }, '<');
    t.to(estela, { strokeDashoffset: 0, duration: 2.3, ease: 'power1.inOut' }, '<');

    // 5 · la caja vacía se apaga
    t.to(cerrado, { opacity: 0, scale: 0.92, duration: 0.6, ease: 'power2.inOut' }, '-=1.9');

    // 6 · aparece lo que había adentro, en el mismo lugar donde estaba la caja
    t.add(() => {
      cerrado.hidden = true;
      abierto.hidden = false;
      ScrollTrigger.refresh();
      encuadrar();
    }, '-=1.25');
    t.to(partes, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.14 }, '-=1.15');

    // 7 · el avión se va de cuadro
    t.to(nave, { opacity: 0, duration: 0.5 }, '-=1.2');
    t.to(estela, { opacity: 0, duration: 1.1 }, '<');
    t.add(() => ScrollTrigger.refresh());
  }

  boton.addEventListener('click', abrir);
}

/* ---------------------------------------------------------
   10 · red de seguridad
   Si por un recálculo de posiciones (por ejemplo al cargar las
   fotos) algún disparador no llega a ejecutarse, esto se asegura
   de que nada quede invisible en pantalla.
   --------------------------------------------------------- */
const rescate = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    setTimeout(() => {
      if (!el.isConnected) return;
      if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
      }
      const flores = el.querySelectorAll?.('.flor') || [];
      flores.forEach((f) => {
        if (parseFloat(getComputedStyle(f).opacity) < 0.05) {
          gsap.to(f, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' });
        }
      });
      const palabras = el.classList.contains('momento__frase')
        ? el.querySelectorAll('.palabra') : [];
      if (palabras.length && parseFloat(getComputedStyle(palabras[0]).opacity) < 0.05) {
        gsap.to(palabras, { opacity: 1, y: 0, duration: 0.5, stagger: 0.02 });
      }
    }, 1600);
    rescate.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.revelar, .rama, .momento__frase').forEach((el) => rescate.observe(el));

/* ---------------------------------------------------------
   11 · en el celu, los controles se apartan mientras se scrollea
   --------------------------------------------------------- */
if (matchMedia('(max-width: 700px)').matches) {
  const flotantes = [rueda, document.querySelector('.musica')];
  let quieto;
  addEventListener('scroll', () => {
    flotantes.forEach((f) => f.classList.add('apartado'));
    clearTimeout(quieto);
    quieto = setTimeout(() => flotantes.forEach((f) => f.classList.remove('apartado')), 600);
  }, { passive: true });
}

/* ---------------------------------------------------------
   12 · detalles finales
   --------------------------------------------------------- */
// arrancar siempre arriba, aunque el navegador recuerde la posición
history.scrollRestoration = 'manual';
addEventListener('load', () => {
  ScrollTrigger.refresh();
  if (lenis) lenis.scrollTo(0, { immediate: true });
});

// las fotos cambian el alto de la página: recalcular a medida que cargan,
// y una vez más cuando ya no queda ninguna pendiente
const fotos = [...document.querySelectorAll('.marco img')];
let pendientes = fotos.filter((i) => !i.complete).length;
fotos.forEach((img) => {
  if (img.complete) return;
  const listo = () => {
    ScrollTrigger.refresh();
    if (--pendientes <= 0) setTimeout(() => ScrollTrigger.refresh(), 200);
  };
  img.addEventListener('load', listo, { once: true });
  img.addEventListener('error', listo, { once: true });
});
