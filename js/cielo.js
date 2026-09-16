/* ============================================================
   CIELO.JS — el cielo de Traslasierras, dibujado con código
   No es una foto: son estrellas de verdad calculadas una por
   una, con la Vía Láctea cruzando y alguna fugaz de vez en
   cuando. Solo se anima cuando la escena está en pantalla.
   ============================================================ */

const azar = (a, b) => a + Math.random() * (b - a);

export class Cielo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.estrellas = [];
    this.fugaces = [];
    this.visible = false;
    this.t = 0;

    this.redimensionar();
    addEventListener('resize', () => this.redimensionar(), { passive: true });

    // solo gasta CPU cuando la escena está a la vista
    new IntersectionObserver(
      ([e]) => {
        this.visible = e.isIntersecting;
        if (this.visible && !this.corriendo) {
          this.corriendo = true;
          this.ultimo = performance.now();
          requestAnimationFrame(this.bucle);
        }
      },
      { threshold: 0 }
    ).observe(canvas.parentElement || canvas);

    this.bucle = this.bucle.bind(this);
  }

  redimensionar() {
    const caja = (this.canvas.parentElement || this.canvas).getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = Math.max(320, caja.width);
    this.h = Math.max(320, caja.height);
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.sembrar();
  }

  sembrar() {
    const densidad = this.w < 700 ? 0.00055 : 0.0004;
    const total = Math.round(this.w * this.h * densidad);
    this.estrellas = [];

    // la banda de la Vía Láctea cruza en diagonal
    const bandaAng = -0.42;
    const bandaAncho = this.h * 0.3;

    for (let i = 0; i < total; i++) {
      // 45% de las estrellas se agrupan sobre la banda
      let x, y;
      if (Math.random() < 0.45) {
        const l = azar(-0.1, 1.1) * this.w;
        const d = (Math.random() + Math.random() + Math.random() - 1.5) * bandaAncho;
        x = l;
        y = this.h * 0.52 + Math.tan(bandaAng) * (l - this.w / 2) + d;
      } else {
        x = Math.random() * this.w;
        y = Math.random() * this.h;
      }

      const brillo = Math.pow(Math.random(), 2.4);  // pocas muy brillantes, muchas tenues
      this.estrellas.push({
        x, y,
        r: 0.35 + brillo * 1.9,
        base: 0.2 + brillo * 0.8,
        vel: azar(0.4, 1.9),
        fase: Math.random() * Math.PI * 2,
        // las estrellas grandes tiran a cálido o azulado, como las de verdad
        tono: brillo > 0.72 ? (Math.random() < 0.5 ? '255,232,200' : '200,220,255') : '255,255,255',
        cruz: brillo > 0.86,
      });
    }
  }

  fugaz() {
    this.fugaces.push({
      x: azar(this.w * 0.1, this.w * 0.9),
      y: azar(0, this.h * 0.45),
      vx: azar(-260, -150),
      vy: azar(90, 170),
      vida: 0,
      total: azar(0.6, 1.1),
      largo: azar(60, 140),
    });
  }

  bucle(ahora) {
    if (!this.visible) { this.corriendo = false; return; }
    requestAnimationFrame(this.bucle);

    let dt = (ahora - this.ultimo) / 1000;
    this.ultimo = ahora;
    if (dt > 0.1) dt = 0.1;
    this.t += dt;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    // resplandor tenue de la Vía Láctea
    const g = ctx.createLinearGradient(0, this.h * 0.75, this.w, this.h * 0.25);
    g.addColorStop(0.0, 'rgba(60,72,120,0)');
    g.addColorStop(0.35, 'rgba(86,96,150,0.16)');
    g.addColorStop(0.55, 'rgba(120,110,160,0.13)');
    g.addColorStop(1.0, 'rgba(60,72,120,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.w, this.h);

    // estrellas
    for (const e of this.estrellas) {
      const titileo = 0.72 + Math.sin(this.t * e.vel + e.fase) * 0.28;
      const a = e.base * titileo;
      ctx.fillStyle = `rgba(${e.tono},${a})`;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();

      // las más brillantes tienen el destello en cruz
      if (e.cruz) {
        ctx.strokeStyle = `rgba(${e.tono},${a * 0.32})`;
        ctx.lineWidth = 0.7;
        const l = e.r * 4.5;
        ctx.beginPath();
        ctx.moveTo(e.x - l, e.y); ctx.lineTo(e.x + l, e.y);
        ctx.moveTo(e.x, e.y - l); ctx.lineTo(e.x, e.y + l);
        ctx.stroke();
      }
    }

    // estrellas fugaces, cada tanto
    if (Math.random() < dt * 0.13) this.fugaz();
    for (let i = this.fugaces.length - 1; i >= 0; i--) {
      const f = this.fugaces[i];
      f.vida += dt;
      if (f.vida > f.total) { this.fugaces.splice(i, 1); continue; }
      const k = f.vida / f.total;
      const op = Math.sin(k * Math.PI);
      const x = f.x + f.vx * f.vida;
      const y = f.y + f.vy * f.vida;
      const norma = Math.hypot(f.vx, f.vy);
      const cola = ctx.createLinearGradient(
        x, y, x - (f.vx / norma) * f.largo, y - (f.vy / norma) * f.largo
      );
      cola.addColorStop(0, `rgba(255,255,255,${op * 0.9})`);
      cola.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = cola;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - (f.vx / norma) * f.largo, y - (f.vy / norma) * f.largo);
      ctx.stroke();
    }
  }
}
