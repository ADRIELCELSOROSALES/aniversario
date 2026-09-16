/* ============================================================
   HISTORIA.JS  —  ✏️ ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE EDITAR
   ------------------------------------------------------------
   Todo el texto, las fotos y la música del sitio salen de acá.
   Cambiá los textos entre comillas y listo.

   FOTOS:  poné los archivos en la carpeta img/ con el mismo
           nombre que figura en "media". Mientras no existan,
           se dibuja solo un placeholder lindo. No rompe nada.
   VIDEOS: si en vez de .jpg ponés .mp4, se reproduce como video
           (en silencio y en loop). Funciona igual.
   MÚSICA: poné los .mp3 en audio/ con el nombre de "cancion".
   ============================================================ */

const PAREJA = {
  ella: 'Eri',                    // ✏️
  el: 'Adriel',                   // ✏️
  inicio: '2025-09-20',           // el día que empezaron (no tocar salvo error)
  aniversario: '2026-09-20',
};

const HISTORIA = [

  /* ---------------------------------------------------------
     0 · PORTADA
     --------------------------------------------------------- */
  {
    id: 'portada',
    estacion: 'portada',
    etiqueta: '',
    fecha: '',
    titulo: 'Un año',
    subtitulo: 'Una vuelta entera del mundo, con vos.',
    // ✏️ La frase que abre todo. Corta, que pegue.
    entrada: 'Esto empieza antes del principio. Empieza un invierno, cuando todavía no sabíamos nada.',
    media: [],
    cta: 'deslizá para empezar',
  },

  /* ---------------------------------------------------------
     1 · INVIERNO 2025 — conociéndonos
     --------------------------------------------------------- */
  {
    id: 'invierno-2025',
    estacion: 'invierno-frio',
    etiqueta: 'Invierno',
    fecha: 'Junio — Septiembre 2025',
    titulo: 'Antes de ser nosotros',
    subtitulo: 'El invierno en que nos estábamos conociendo.',
    momentos: [
      {
        // ✏️ Cómo se conocieron
        texto: 'Había frío afuera y conversaciones que no se terminaban nunca. Yo ya me estaba enamorando y todavía no me daba cuenta.',
        media: { src: 'img/invierno-01.jpg', alt: 'Nuestras primeras salidas' },
      },
      {
        // ✏️ Un recuerdo puntual de esos meses
        texto: 'Me acuerdo de la primera vez que te hice reír en serio. Ahí supe que quería quedarme un rato largo.',
        media: { src: 'img/invierno-02.jpg', alt: 'Una tarde juntos' },
      },
      {
        // ✏️ El momento antes del 20 de septiembre
        texto: 'Los últimos días de ese invierno fueron una cuenta regresiva que solo entendíamos nosotros dos.',
        media: null,
      },
    ],
    cita: 'Todo lo que vino después empezó acá, en silencio.',
    cancion: 'audio/invierno.mp3',   // ✏️
  },

  /* ---------------------------------------------------------
     2 · EL DÍA — 20 de septiembre de 2025
     --------------------------------------------------------- */
  {
    id: 'el-dia',
    estacion: 'umbral',
    etiqueta: '',
    fecha: 'Sábado 20 de septiembre de 2025',
    titulo: 'El día',
    subtitulo: 'El invierno se terminó exactamente acá.',
    // ✏️ Lo que pasó ese día. Este es EL texto del sitio, tomate tu tiempo.
    entrada: 'Un día antes de la primavera. Como si el mundo hubiese esperado a que dijéramos que sí para empezar a florecer.',
    media: [{ src: 'img/el-dia.jpg', alt: 'El 20 de septiembre' }],
    cancion: null,
  },

  /* ---------------------------------------------------------
     3 · PRIMAVERA 2025 — de novios
     --------------------------------------------------------- */
  {
    id: 'primavera-2025',
    estacion: 'primavera',
    etiqueta: 'Primavera',
    fecha: 'Septiembre — Diciembre 2025',
    titulo: 'La primavera de novios',
    subtitulo: 'Todo era nuevo y todo era con vos.',
    momentos: [
      {
        // ✏️
        texto: 'Descubrimos que nos gustaba hacer cosas comunes juntos. Comprar cosas, caminar sin rumbo, no hacer nada.',
        media: { src: 'img/primavera-01.jpg', alt: 'Primavera' },
      },
      {
        // ✏️
        texto: 'Se llenó todo de flores y de planes. Empezamos a decir "el año que viene" como si fuera lo más normal del mundo.',
        media: { src: 'img/primavera-02.jpg', alt: 'Flores y planes' },
      },
      {
        // ✏️
        texto: 'Y en algún momento de esos meses dejaste de ser algo que estaba pasándome y pasaste a ser mi lugar.',
        media: { src: 'img/primavera-03.jpg', alt: 'Nosotros' },
      },
    ],
    cita: 'Nunca una primavera se pareció tanto a su nombre.',
    cancion: 'audio/primavera.mp3',   // ✏️
  },

  /* ---------------------------------------------------------
     4 · VERANO 2025/26 — las vacaciones
     --------------------------------------------------------- */
  {
    id: 'verano-2026',
    estacion: 'verano',
    etiqueta: 'Verano',
    fecha: 'Diciembre 2025 — Marzo 2026',
    titulo: 'Nuestras vacaciones',
    subtitulo: 'El verano en que nos fuimos lejos.',
    momentos: [
      {
        // ✏️ ¿A dónde viajaron?
        texto: 'Nos fuimos. Armamos el bolso mal, salimos tarde, y fue perfecto igual.',
        media: { src: 'img/verano-01.jpg', alt: 'El viaje' },
      },
      {
        // ✏️ El mejor día del viaje
        texto: 'Ese día que no queríamos que se terminara. El agua, el sol bajando, vos.',
        media: { src: 'img/verano-02.jpg', alt: 'El mejor día' },
      },
      {
        // ✏️ Algo que aprendieron viajando juntos
        texto: 'Aprendimos que viajar con vos es fácil. Que nos bancamos el cansancio, el calor y el apuro sin dejar de reírnos.',
        media: { src: 'img/verano-03.jpg', alt: 'Vacaciones' },
      },
    ],
    cita: 'Si tuviera que elegir un verano para vivir siempre, elijo este.',
    cancion: 'audio/verano.mp3',   // ✏️
  },

  /* ---------------------------------------------------------
     5 · OTOÑO 2026
     --------------------------------------------------------- */
  {
    id: 'otono-2026',
    estacion: 'otono',
    etiqueta: 'Otoño',
    fecha: 'Marzo — Junio 2026',
    titulo: 'Cuando se puso todo dorado',
    subtitulo: 'El otoño en que nos volvimos costumbre, de la buena.',
    momentos: [
      {
        // ✏️
        texto: 'Se acomodó todo. Los mates, los horarios, las mañanas. Ya no había que explicar nada.',
        media: { src: 'img/otono-01.jpg', alt: 'Otoño' },
      },
      {
        // ✏️ Algo difícil que pasaron juntos, si querés contarlo
        texto: 'También hubo días difíciles. Y te elegí igual, todos. Eso también es parte de este año.',
        media: { src: 'img/otono-02.jpg', alt: 'Juntos' },
      },
    ],
    cita: 'Querer es sostener también en los días grises.',
    cancion: 'audio/otono.mp3',   // ✏️
  },

  /* ---------------------------------------------------------
     6 · INVIERNO 2026 — el mismo frío, otra cosa
     --------------------------------------------------------- */
  {
    id: 'invierno-2026',
    estacion: 'invierno-calido',
    etiqueta: 'Invierno',
    fecha: 'Junio — Septiembre 2026',
    titulo: 'El mismo invierno, otra historia',
    subtitulo: 'Volvió el frío y esta vez ya éramos nosotros.',
    momentos: [
      {
        // ✏️
        texto: 'Volvió el frío, el mismo de hace un año. Pero ahora sé dónde va cada cosa, y vos sabés dónde voy yo.',
        media: { src: 'img/invierno-2026-01.jpg', alt: 'Este invierno' },
      },
      {
        // ✏️
        texto: 'Hace un año, este mes, todavía te estaba conociendo. Hoy no me acuerdo cómo era el mundo antes.',
        media: { src: 'img/invierno-2026-02.jpg', alt: 'Nosotros ahora' },
      },
    ],
    cita: 'Dimos la vuelta entera y volvimos al mismo lugar, pero juntos.',
    cancion: 'audio/invierno-calido.mp3',   // ✏️
  },

  /* ---------------------------------------------------------
     7 · FINAL — el aniversario
     --------------------------------------------------------- */
  {
    id: 'final',
    estacion: 'final',
    etiqueta: '',
    fecha: '20 de septiembre de 2026',
    titulo: 'Un año, Eri',              // ✏️
    subtitulo: 'Y esto recién arranca.',
    // ✏️ LA CARTA. Lo más importante del sitio. Escribila vos.
    carta: [
      'Gracias por este año.',
      'Por el invierno en que nos conocimos sin saber lo que venía, por la primavera en que nos animamos, por el verano que nos llevamos puesto, por el otoño en que nos hicimos costumbre y por este invierno en que ya sos mi casa.',
      'Di la vuelta entera al año mirándote y volvería a empezar mañana.',
      'Te amo.',
    ],
    firma: 'Adriel',                     // ✏️
    media: [{ src: 'img/final.jpg', alt: 'Nosotros hoy' }],
    cancion: 'audio/final.mp3',          // ✏️
  },
];

/* ⚠️ No borres esta línea: es lo que conecta este archivo con el resto. */
export { PAREJA, HISTORIA };
