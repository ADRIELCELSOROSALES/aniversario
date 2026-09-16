/* ============================================================
   AUDIO.JS — una canción por estación, con crossfade
   Arranca en silencio: los navegadores bloquean el autoplay,
   así que hay un botón. Si un .mp3 no existe, se ignora
   sin romper nada.
   ============================================================ */

const VOLUMEN = 0.42;   // ✏️ subilo o bajalo (0 a 1)
const FUNDIDO = 1600;   // ms de crossfade entre estaciones

export class Musica {
  constructor(boton) {
    this.boton = boton;
    this.pistas = new Map();   // src -> HTMLAudioElement
    this.actual = null;
    this.pendiente = null;
    this.encendida = false;

    boton.addEventListener('click', () => this.alternar());
  }

  cargar(src) {
    if (!src) return null;
    if (this.pistas.has(src)) return this.pistas.get(src);
    const a = new Audio();
    a.src = src;
    a.loop = true;
    a.volume = 0;
    a.preload = 'auto';
    a.addEventListener('error', () => this.pistas.set(src, null), { once: true });
    this.pistas.set(src, a);
    return a;
  }

  alternar() {
    this.encendida = !this.encendida;
    this.boton.classList.toggle('sonando', this.encendida);
    this.boton.setAttribute('aria-pressed', String(this.encendida));
    const label = this.boton.querySelector('.musica__label');
    if (label) label.textContent = this.encendida ? 'música' : 'sin música';

    if (this.encendida) {
      if (this.pendiente) this.poner(this.pendiente, true);
    } else if (this.actual) {
      this.fundir(this.actual, 0, 500, () => this.actual && this.actual.pause());
    }
  }

  /* lo llama main.js al entrar en cada estación */
  poner(src, forzar = false) {
    this.pendiente = src;
    if (!this.encendida) return;
    if (!src) {
      if (this.actual) this.fundir(this.actual, 0, FUNDIDO, (a) => a.pause());
      this.actual = null;
      return;
    }
    const nueva = this.cargar(src);
    if (!nueva || (nueva === this.actual && !forzar)) return;

    if (this.actual && this.actual !== nueva) {
      const vieja = this.actual;
      this.fundir(vieja, 0, FUNDIDO, (a) => a.pause());
    }
    this.actual = nueva;
    nueva.play().then(() => this.fundir(nueva, VOLUMEN, FUNDIDO)).catch(() => {
      /* bloqueado por el navegador: el botón lo resuelve */
    });
  }

  fundir(audio, destino, ms, alTerminar) {
    if (!audio) return;
    if (audio._fade) cancelAnimationFrame(audio._fade);
    const desde = audio.volume;
    const t0 = performance.now();
    const paso = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      audio.volume = Math.max(0, Math.min(1, desde + (destino - desde) * k));
      if (k < 1) audio._fade = requestAnimationFrame(paso);
      else if (alTerminar) alTerminar(audio);
    };
    audio._fade = requestAnimationFrame(paso);
  }
}
