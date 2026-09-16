/* ============================================================
   PARTICULAS.JS
   Un solo sistema de partículas que muta entre estaciones.
   Los copos no desaparecen para que aparezcan pétalos: se
   TRANSFORMAN, interpolando forma, color, peso y viento.
   ============================================================ */

const PERFILES = {
  portada: {
    cantidad: 55, forma: 'polvo',
    colores: ['#cdbde8', '#e9e4f5', '#9a8fc4'],
    tam: [0.8, 2.2], vel: [0.08, 0.28], deriva: 0.25,
    giro: 0.004, opacidad: [0.15, 0.5], sube: false, brillo: 0.5,
  },
  'invierno-frio': {
    cantidad: 130, forma: 'copo',
    colores: ['#ffffff', '#d8ecff', '#9fc6e8'],
    tam: [1.4, 4.4], vel: [0.25, 0.85], deriva: 0.55,
    giro: 0.008, opacidad: [0.25, 0.85], sube: false, brillo: 0.35,
  },
  umbral: {
    cantidad: 90, forma: 'petalo',
    colores: ['#f7c3d1', '#ffe9ef', '#e79bb2', '#f6d9a8'],
    tam: [3, 8], vel: [0.35, 1.0], deriva: 1.5,
    giro: 0.03, opacidad: [0.4, 0.95], sube: false, brillo: 0.6,
  },
  primavera: {
    cantidad: 110, forma: 'petalo',
    colores: ['#f4a6bd', '#fcdde6', '#e8849f', '#fff4f7', '#c9dfb4'],
    tam: [4, 11], vel: [0.3, 0.95], deriva: 2.1,
    giro: 0.035, opacidad: [0.45, 1], sube: false, brillo: 0.3,
  },
  verano: {
    cantidad: 85, forma: 'luz',
    colores: ['#ffd98a', '#ffeec2', '#f6a95b', '#bfe9df'],
    tam: [1.5, 4.5], vel: [0.12, 0.45], deriva: 1.1,
    giro: 0.01, opacidad: [0.2, 0.8], sube: true, brillo: 1,
  },
  otono: {
    cantidad: 75, forma: 'hoja',
    colores: ['#d98a3c', '#c05f28', '#e8b464', '#8e4a22', '#f0d39b'],
    tam: [6, 15], vel: [0.5, 1.5], deriva: 2.6,
    giro: 0.05, opacidad: [0.5, 1], sube: false, brillo: 0.15,
  },
  'invierno-calido': {
    cantidad: 120, forma: 'copo',
    colores: ['#ffffff', '#dceeff', '#f4d9ae', '#ffcf94'],
    tam: [1.4, 4.6], vel: [0.22, 0.8], deriva: 0.6,
    giro: 0.008, opacidad: [0.28, 0.9], sube: false, brillo: 0.55,
  },
  estrellas: {
    cantidad: 0, forma: 'polvo',
    colores: ['#ffffff'],
    tam: [0.5, 1], vel: [0.02, 0.06], deriva: 0.1,
    giro: 0.001, opacidad: [0, 0], sube: false, brillo: 0,
  },
  regalo: {
    cantidad: 60, forma: 'luz',
    colores: ['#bfe6f5', '#ffffff', '#8fc9e0'],
    tam: [1, 3.5], vel: [0.1, 0.35], deriva: 0.8,
    giro: 0.006, opacidad: [0.2, 0.7], sube: true, brillo: 1,
  },
  final: {
    cantidad: 95, forma: 'luz',
    colores: ['#f0c98a', '#fff0d4', '#e0a7c0', '#cdb6e8'],
    tam: [1.5, 5], vel: [0.1, 0.4], deriva: 0.9,
    giro: 0.008, opacidad: [0.25, 0.9], sube: true, brillo: 1,
  },
};

const FORMAS = ['polvo', 'copo', 'petalo', 'luz', 'hoja'];
const azar = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;

/* interpola dos colores hex */
function mezclar(c1, c2, t) {
  const h = (c) => [1, 3, 5].map((i) => parseInt(c.substr(i, 2), 16));
  const [r1, g1, b1] = h(c1), [r2, g2, b2] = h(c2);
  return [Math.round(lerp(r1, r2, t)), Math.round(lerp(g1, g2, t)), Math.round(lerp(b1, b2, t))];
}

class Particula {
  constructor(sistema, dentro = false) {
    this.s = sistema;
    this.reiniciar(dentro);
  }

  reiniciar(dentro = false) {
    const p = this.s.perfil;
    const { w, h } = this.s;
    this.x = Math.random() * w;
    this.y = dentro ? Math.random() * h : (p.sube ? h + 20 : -20 - Math.random() * h * 0.3);
    this.tam = azar(p.tam[0], p.tam[1]);
    this.vel = azar(p.vel[0], p.vel[1]);
    this.op = azar(p.opacidad[0], p.opacidad[1]);
    this.ang = Math.random() * Math.PI * 2;
    this.vGiro = azar(-p.giro, p.giro) * 60;
    this.fase = Math.random() * Math.PI * 2;
    this.vFase = azar(0.006, 0.02);
    this.amp = azar(0.4, 1) * p.deriva;
    // color: guarda hex de origen y destino para poder morphear al cambiar estación
    this.colorA = p.colores[(Math.random() * p.colores.length) | 0];
    this.colorB = this.colorA;
    this.tColor = 1;
    this.formaA = p.forma;
    this.formaB = p.forma;
    this.tForma = 1;
  }

  /* al cambiar de estación no se borran: mutan */
  mutar(nuevo) {
    this.colorA = this.colorActual();
    this.colorB = nuevo.colores[(Math.random() * nuevo.colores.length) | 0];
    this.tColor = 0;
    this.formaA = this.tForma >= 1 ? this.formaB : this.formaA;
    this.formaB = nuevo.forma;
    this.tForma = 0;
    this.tamDestino = azar(nuevo.tam[0], nuevo.tam[1]);
    this.velDestino = azar(nuevo.vel[0], nuevo.vel[1]);
    this.ampDestino = azar(0.4, 1) * nuevo.deriva;
    this.vGiroDestino = azar(-nuevo.giro, nuevo.giro) * 60;
    this.opDestino = azar(nuevo.opacidad[0], nuevo.opacidad[1]);
  }

  colorActual() {
    if (this.tColor >= 1) return this.colorB;
    const [r, g, b] = mezclar(this.colorA, this.colorB, this.tColor);
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  }

  actualizar(dt) {
    const p = this.s.perfil;
    const { w, h } = this.s;

    // avance de las transiciones
    if (this.tColor < 1) this.tColor = Math.min(1, this.tColor + dt * 0.5);
    if (this.tForma < 1) {
      this.tForma = Math.min(1, this.tForma + dt * 0.5);
      const t = dt * 1.2;
      this.tam = lerp(this.tam, this.tamDestino, t);
      this.vel = lerp(this.vel, this.velDestino, t);
      this.amp = lerp(this.amp, this.ampDestino, t);
      this.vGiro = lerp(this.vGiro, this.vGiroDestino, t);
      this.op = lerp(this.op, this.opDestino, t);
    }

    this.fase += this.vFase * dt * 60;
    this.ang += this.vGiro * dt;

    // viento global suave + vaivén propio
    this.x += (Math.sin(this.fase) * this.amp + this.s.viento) * dt * 60;
    this.y += (p.sube ? -this.vel : this.vel) * dt * 60;

    // reciclado por los bordes
    if (this.x < -40) this.x = w + 40;
    else if (this.x > w + 40) this.x = -40;
    if (p.sube ? this.y < -40 : this.y > h + 40) {
      this.y = p.sube ? h + 30 : -30;
      this.x = Math.random() * w;
    }
  }

  dibujar(ctx) {
    const p = this.s.perfil;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.ang);
    ctx.globalAlpha = this.op * this.s.opacidadGlobal;
    const color = this.colorActual();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    if (p.brillo > 0.5) {
      ctx.shadowColor = color;
      ctx.shadowBlur = this.tam * 3.5 * p.brillo;
    }

    // dibuja mezclando la forma vieja y la nueva mientras dura la transición
    if (this.tForma < 1 && this.formaA !== this.formaB) {
      ctx.globalAlpha = this.op * this.s.opacidadGlobal * (1 - this.tForma);
      this[this.formaA](ctx, this.tam);
      ctx.globalAlpha = this.op * this.s.opacidadGlobal * this.tForma;
      this[this.formaB](ctx, this.tam);
    } else {
      this[this.formaB](ctx, this.tam);
    }
    ctx.restore();
  }

  /* --- formas --- */
  polvo(ctx, r) {
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  luz(ctx, r) {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2);
    g.addColorStop(0, ctx.fillStyle);
    g.addColorStop(0.35, ctx.fillStyle);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, r * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  copo(ctx, r) {
    ctx.lineWidth = Math.max(0.6, r * 0.22);
    ctx.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      const a = (Math.PI / 3) * i;
      ctx.beginPath();
      ctx.moveTo(-Math.cos(a) * r, -Math.sin(a) * r);
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      ctx.stroke();
      // ramitas del cristal
      const bx = Math.cos(a) * r * 0.55, by = Math.sin(a) * r * 0.55;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(a + 0.9) * r * 0.32, by + Math.sin(a + 0.9) * r * 0.32);
      ctx.moveTo(-bx, -by);
      ctx.lineTo(-bx - Math.cos(a + 0.9) * r * 0.32, -by - Math.sin(a + 0.9) * r * 0.32);
      ctx.stroke();
    }
  }

  petalo(ctx, r) {
    // el pétalo se "cierra" al girar: simula que cae dando vueltas en 3D
    const escala = Math.abs(Math.cos(this.fase * 0.7)) * 0.75 + 0.25;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.bezierCurveTo(r * 0.85 * escala, -r * 0.55, r * 0.7 * escala, r * 0.6, 0, r);
    ctx.bezierCurveTo(-r * 0.7 * escala, r * 0.6, -r * 0.85 * escala, -r * 0.55, 0, -r);
    ctx.fill();
  }

  hoja(ctx, r) {
    const escala = Math.abs(Math.cos(this.fase * 0.55)) * 0.8 + 0.2;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(r * 0.72 * escala, -r * 0.15, 0, r);
    ctx.quadraticCurveTo(-r * 0.72 * escala, -r * 0.15, 0, -r);
    ctx.fill();
    // nervadura
    ctx.globalAlpha *= 0.45;
    ctx.lineWidth = Math.max(0.5, r * 0.08);
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.85);
    ctx.lineTo(0, r * 0.85);
    ctx.stroke();
  }
}

export class SistemaParticulas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.particulas = [];
    this.perfil = PERFILES.portada;
    this.estacion = 'portada';
    this.viento = 0;
    this.vientoObjetivo = 0;
    this.opacidadGlobal = 1;
    this.activo = true;
    this.ultimo = performance.now();

    this.redimensionar();
    addEventListener('resize', () => this.redimensionar(), { passive: true });
    document.addEventListener('visibilitychange', () => {
      this.activo = !document.hidden;
      this.ultimo = performance.now();
    });

    this.poblar(this.perfil.cantidad, true);
    this.bucle = this.bucle.bind(this);
    requestAnimationFrame(this.bucle);
  }

  redimensionar() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = innerWidth;
    this.h = innerHeight;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // en pantallas chicas, menos partículas
    this.factor = this.w < 700 ? 0.45 : this.w < 1100 ? 0.75 : 1;
  }

  poblar(n, dentro = false) {
    const objetivo = Math.round(n * this.factor);
    while (this.particulas.length < objetivo) this.particulas.push(new Particula(this, dentro));
    if (this.particulas.length > objetivo) this.particulas.length = objetivo;
  }

  /* lo llama escenas.js cuando entrás a una sección nueva */
  cambiar(estacion) {
    const p = PERFILES[estacion];
    if (!p || estacion === this.estacion) return;
    this.estacion = estacion;
    this.perfil = p;
    this.particulas.forEach((part) => part.mutar(p));
    this.poblar(p.cantidad);
    // las nuevas entran ya mutadas y desde fuera de pantalla
    this.vientoObjetivo = azar(-0.35, 0.35) * (p.deriva || 1);
  }

  bucle(ahora) {
    requestAnimationFrame(this.bucle);
    if (!this.activo) { this.ultimo = ahora; return; }

    let dt = (ahora - this.ultimo) / 1000;
    this.ultimo = ahora;
    if (dt > 0.1) dt = 0.1;  // evita saltos al volver de otra pestaña

    this.viento += (this.vientoObjetivo - this.viento) * dt * 0.6;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (const p of this.particulas) {
      p.actualizar(dt);
      p.dibujar(ctx);
    }
  }
}

export { FORMAS, PERFILES };
