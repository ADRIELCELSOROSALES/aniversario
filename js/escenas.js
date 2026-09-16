/* ============================================================
   ESCENAS.JS — construye el DOM a partir de historia.js
   Así vos editás solo historia.js y acá no tocás nada.
   ============================================================ */

import { PAREJA, HISTORIA } from './historia.js';

/* ---- placeholder: se dibuja solo si la foto todavía no existe ---- */
const TINTES = {
  'invierno-frio':   ['#12263d', '#2c4a6e', '#8fc0e3'],
  umbral:            ['#3a2035', '#6b3350', '#f0a8b8'],
  primavera:         ['#f3e6ec', '#e7c3d2', '#dd7793'],
  verano:            ['#ffeacd', '#f8cd97', '#e0873a'],
  otono:             ['#3b2214', '#6b3c1c', '#dd8f43'],
  'invierno-calido': ['#152438', '#2c415e', '#f0c891'],
  final:             ['#2a1c2b', '#4a3348', '#e9c283'],
  portada:           ['#12101f', '#2a2540', '#b9a7d8'],
};

export function placeholder(el, estacion = 'portada') {
  const [a, b, ac] = TINTES[estacion] || TINTES.portada;
  const nombre = (el.dataset.archivo || '').split('/').pop();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#g)"/>
    <g fill="none" stroke="${ac}" stroke-opacity=".5" stroke-width="2">
      <circle cx="400" cy="455" r="58"/>
      <path d="M400 397v116M342 455h116" stroke-opacity=".28"/>
    </g>
    <text x="400" y="580" fill="${ac}" fill-opacity=".85" font-family="system-ui,sans-serif"
          font-size="23" letter-spacing="3" text-anchor="middle">TU FOTO ACÁ</text>
    <text x="400" y="616" fill="${ac}" fill-opacity=".45" font-family="ui-monospace,monospace"
          font-size="17" text-anchor="middle">${nombre}</text>
  </svg>`;
  el.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  el.dataset.placeholder = 'si';
}

/* ---- media: imagen o video según la extensión ---- */
function crearMedia(media, estacion, ancho = false) {
  const marco = document.createElement('div');
  marco.className = 'marco' + (ancho ? ' marco--ancho' : '');
  if (!media) return null;

  const esVideo = /\.(mp4|webm|mov)$/i.test(media.src);
  const el = document.createElement(esVideo ? 'video' : 'img');
  el.dataset.archivo = media.src;

  if (esVideo) {
    el.src = media.src;
    el.muted = true; el.loop = true; el.playsInline = true; el.autoplay = true;
    el.setAttribute('aria-label', media.alt || '');
  } else {
    el.alt = media.alt || '';
    el.loading = 'lazy';
    el.decoding = 'async';
    el.addEventListener('error', () => placeholder(el, estacion), { once: true });
    el.src = media.src;
  }
  marco.appendChild(el);
  return marco;
}

const el = (tag, clase, texto) => {
  const n = document.createElement(tag);
  if (clase) n.className = clase;
  if (texto != null) n.textContent = texto;
  return n;
};

/* ---- constructores de cada tipo de escena ---- */

function escenaPortada(d) {
  const s = el('section', 'escena portada');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  const cont = el('div');
  cont.appendChild(el('h1', 'portada__titulo revelar', d.titulo));
  cont.appendChild(el('p', 'portada__sub revelar', d.subtitulo));
  cont.appendChild(el('p', 'portada__entrada revelar', d.entrada));
  s.appendChild(cont);

  const hint = el('div', 'scroll-hint revelar');
  hint.appendChild(el('span', null, d.cta || 'deslizá'));
  hint.appendChild(el('div', 'scroll-hint__linea'));
  s.appendChild(hint);
  return s;
}

function escenaEstacion(d) {
  const s = el('section', 'escena');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  const cab = el('div', 'escena__cabecera');
  if (d.etiqueta) {
    const et = el('span', 'escena__etiqueta revelar', d.etiqueta);
    cab.appendChild(et);
  }
  cab.appendChild(el('h2', 'escena__titulo revelar', d.titulo));
  if (d.subtitulo) cab.appendChild(el('p', 'escena__subtitulo revelar', d.subtitulo));
  if (d.fecha) cab.appendChild(el('span', 'escena__fecha revelar', d.fecha));
  s.appendChild(cab);
  if (d.estacion === 'primavera') {
    const rama = document.createElement('div');
    rama.className = 'rama revelar';
    rama.innerHTML = `
      <svg viewBox="-10 -14 440 80" aria-hidden="true">
        <path class="t" d="M4 52 C70 52 96 40 140 34 C190 27 240 33 300 26 C348 20 388 16 416 14"/>
        <path class="t" d="M120 36 C112 26 116 16 126 12"/>
        <path class="t" d="M232 30 C226 20 230 10 240 7"/>
        <path class="t" d="M330 22 C326 13 332 5 342 3"/>
        <path class="t" d="M70 47 C66 42 64 38 66 50"/>
        <path class="t" d="M190 32 C186 27 184 24 188 30"/>
        <g class="flores">
          <g class="flor" transform="translate(126,12) scale(1.15)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(240,7) scale(1.0)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(342,3) scale(0.92)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(66,50) scale(0.72)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(188,30) scale(0.68)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(292,26) scale(0.78)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
          <g class="flor" transform="translate(392,15) scale(0.62)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>
        </g>
      </svg>`;
    s.appendChild(rama);
  }

  const lista = el('div', 'momentos');
  (d.momentos || []).forEach((m) => {
    const art = el('article', 'momento' + (m.media ? '' : ' momento--solo'));
    const txt = el('p', 'momento__texto revelar', m.texto);
    const marco = crearMedia(m.media, d.estacion);
    if (marco) {
      marco.classList.add('momento__media', 'revelar');
      art.appendChild(txt);
      art.appendChild(marco);
    } else {
      art.appendChild(txt);
    }
    lista.appendChild(art);
  });
  s.appendChild(lista);

  if (d.cita) s.appendChild(el('p', 'cita revelar', d.cita));
  return s;
}

function escenaUmbral(d) {
  const s = el('section', 'escena umbral');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  const cont = el('div');
  cont.innerHTML = `
    <svg class="brote revelar" viewBox="0 0 100 120" aria-hidden="true">
      <path class="tallo" d="M50 118 C50 90 50 72 50 54"/>
      <path class="hoja-i" d="M50 86 C34 82 26 70 28 58 C42 60 50 70 50 86Z"/>
      <path class="hoja-d" d="M50 74 C66 70 74 58 72 46 C58 48 50 58 50 74Z"/>
      <circle cx="50" cy="40" r="13"/>
      <circle cx="50" cy="40" r="5"/>
    </svg>`;
  cont.appendChild(el('span', 'umbral__fecha revelar', d.fecha));
  cont.appendChild(el('h2', 'umbral__titulo revelar', d.titulo));
  if (d.subtitulo) cont.appendChild(el('p', 'umbral__texto revelar', d.subtitulo));
  if (d.entrada) cont.appendChild(el('p', 'umbral__texto revelar', d.entrada));

  const m = (d.media || [])[0];
  const marco = crearMedia(m, d.estacion, true);
  if (marco) { marco.classList.add('revelar'); cont.appendChild(marco); }

  s.appendChild(cont);
  return s;
}

function escenaFinal(d) {
  const s = el('section', 'escena final');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  const cont = el('div');
  cont.appendChild(el('span', 'escena__fecha revelar', d.fecha));
  cont.appendChild(el('h2', 'final__titulo revelar', d.titulo));
  if (d.subtitulo) cont.appendChild(el('p', 'escena__subtitulo revelar', d.subtitulo));

  const m = (d.media || [])[0];
  const marco = crearMedia(m, d.estacion, true);
  if (marco) {
    marco.classList.add('revelar');
    marco.style.maxWidth = '38rem';
    marco.style.margin = 'clamp(3rem,8vh,4.5rem) auto 0';
    cont.appendChild(marco);
  }

  const carta = el('div', 'carta');
  (d.carta || []).forEach((p) => carta.appendChild(el('p', 'revelar', p)));
  cont.appendChild(carta);
  if (d.firma) cont.appendChild(el('p', 'firma revelar', d.firma));

  // contador de días juntos
  const cont2 = el('div', 'contador revelar');
  const dias = Math.round((Date.now() - new Date(PAREJA.inicio)) / 86400000);
  [
    [dias, 'días'],
    [Math.round(dias / 7), 'semanas'],
    [4, 'estaciones'],
    [1, 'año'],
  ].forEach(([n, l]) => {
    const it = el('div', 'contador__item');
    it.appendChild(el('span', 'contador__n', String(n)));
    it.appendChild(el('span', 'contador__l', l));
    cont2.appendChild(it);
  });
  cont.appendChild(cont2);

  s.appendChild(cont);
  return s;
}

/* ---- arma todo el documento ---- */
export function construir(contenedor) {
  const frag = document.createDocumentFragment();
  HISTORIA.forEach((d) => {
    let s;
    if (d.estacion === 'portada') s = escenaPortada(d);
    else if (d.estacion === 'umbral') s = escenaUmbral(d);
    else if (d.estacion === 'final') s = escenaFinal(d);
    else s = escenaEstacion(d);
    frag.appendChild(s);
  });
  contenedor.appendChild(frag);
  return [...contenedor.querySelectorAll('.escena')];
}
