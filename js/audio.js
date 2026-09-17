/* ============================================================
   AUDIO.JS
   · La música es una lista que suena en bucle: una canción tras
     otra y, al terminar la última, vuelve a la primera. No
     depende del scroll ni de en qué estación estés.
   · El "poff" del regalo se genera acá mismo con Web Audio,
     así que no hace falta subir ningún archivo de sonido.
   ============================================================ */

const VOLUMEN = 0.42;   // ✏️ subilo o bajalo (0 a 1)
const ENTRADA = 1200;   // ms que tarda en aparecer el sonido
const SALIDA  = 2200;   // ms de fundido antes de que termine cada tema

export class Musica {
  constructor(boton, lista) {
    this.boton = boton;
    this.lista = (lista || []).slice();
    this.indice = 0;
    this.encendida = false;
    this.rotas = new Set();       // canciones que no se pudieron cargar
    this.fundiendo = false;

    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.volume = 0;

    // al terminar una, sigue la que viene
    this.audio.addEventListener('ended', () => this.avanzar(1));

    // si un archivo no existe, se saltea sola
    this.audio.addEventListener('error', () => {
      this.rotas.add(this.indice);
      if (this.rotas.size >= this.lista.length) { this.apagar(); return; }
      this.avanzar(1);
    });

    // fundido de salida sobre el final del tema
    this.audio.addEventListener('timeupdate', () => {
      if (!this.encendida || this.fundiendo) return;
      const queda = this.audio.duration - this.audio.currentTime;
      if (Number.isFinite(queda) && queda > 0 && queda * 1000 < SALIDA) {
        this.fundiendo = true;
        this.fundir(0, queda * 1000);
      }
    });

    boton.addEventListener('click', () => this.alternar());
    this.pintarBoton();
  }

  pintarBoton() {
    this.boton.classList.toggle('sonando', this.encendida);
    this.boton.setAttribute('aria-pressed', String(this.encendida));
    const label = this.boton.querySelector('.musica__label');
    if (label) label.textContent = this.encendida ? 'música' : 'sin música';
  }

  alternar() {
    if (this.encendida) this.apagar();
    else this.encender();
  }

  encender() {
    if (!this.lista.length) return;
    this.encendida = true;
    this.pintarBoton();
    this.reproducir();
  }

  apagar() {
    this.encendida = false;
    this.pintarBoton();
    this.fundir(0, 450, () => this.audio.pause());
  }

  avanzar(paso) {
    this.indice = (this.indice + paso + this.lista.length) % this.lista.length;
    if (this.encendida) this.reproducir();
  }

  reproducir() {
    const pista = this.lista[this.indice];
    if (!pista) return;
    this.fundiendo = false;
    if (!this.audio.src.endsWith(pista)) this.audio.src = pista;
    this.audio.currentTime = 0;
    this.audio.volume = 0;
    this.audio.play()
      .then(() => this.fundir(VOLUMEN, ENTRADA))
      .catch(() => { /* el navegador lo bloqueó: el botón lo resuelve */ });
  }

  fundir(destino, ms, alTerminar) {
    if (this.cuadro) cancelAnimationFrame(this.cuadro);
    const desde = this.audio.volume;
    const t0 = performance.now();
    const paso = (t) => {
      const k = ms <= 0 ? 1 : Math.min(1, (t - t0) / ms);
      this.audio.volume = Math.max(0, Math.min(1, desde + (destino - desde) * k));
      if (k < 1) this.cuadro = requestAnimationFrame(paso);
      else if (alTerminar) alTerminar();
    };
    this.cuadro = requestAnimationFrame(paso);
  }
}

/* ------------------------------------------------------------
   El "poff" del regalo.
   Dos capas: un golpe grave que cae de tono (el corcho) y un
   soplido de ruido filtrado que se apaga (el papel).
   ------------------------------------------------------------ */
let contexto = null;

export function poff(fuerza = 1) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  try {
    if (!contexto) contexto = new Ctx();
    if (contexto.state === 'suspended') contexto.resume();
  } catch { return; }

  const ctx = contexto;
  const t = ctx.currentTime;

  // 1 · el golpe: de agudo a grave en un suspiro
  const golpe = ctx.createOscillator();
  const volGolpe = ctx.createGain();
  golpe.type = 'sine';
  golpe.frequency.setValueAtTime(440, t);
  golpe.frequency.exponentialRampToValueAtTime(62, t + 0.14);
  volGolpe.gain.setValueAtTime(0.0001, t);
  volGolpe.gain.exponentialRampToValueAtTime(0.55 * fuerza, t + 0.008);
  volGolpe.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
  golpe.connect(volGolpe).connect(ctx.destination);
  golpe.start(t);
  golpe.stop(t + 0.3);

  // 2 · el soplido de papel
  const dur = 0.4;
  const muestras = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < muestras; i++) {
    datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / muestras, 2.6);
  }
  const soplido = ctx.createBufferSource();
  soplido.buffer = buffer;

  const filtro = ctx.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.setValueAtTime(1600, t);
  filtro.frequency.exponentialRampToValueAtTime(420, t + 0.34);
  filtro.Q.value = 0.7;

  const volSoplido = ctx.createGain();
  volSoplido.gain.setValueAtTime(0.4 * fuerza, t);
  volSoplido.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);

  soplido.connect(filtro).connect(volSoplido).connect(ctx.destination);
  soplido.start(t);
}
