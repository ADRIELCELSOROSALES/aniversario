/* ============================================================
   HISTORIA.JS  —  ✏️ ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE EDITAR
   ------------------------------------------------------------
   Todo el texto, las fotos y la música del sitio salen de acá.
   Cambiá los textos entre comillas y listo.

   FOTOS:  poné los archivos en la carpeta img/ con el mismo
           nombre que figura en "media". Mientras no existan,
           se dibuja solo un placeholder. No rompe nada.
   VIDEOS: si en vez de .jpg ponés .mp4, se reproduce como video
           (en silencio y en loop). Funciona igual.
   MÚSICA: poné los .mp3 en audio/ con el nombre de "cancion".
   ============================================================ */

const PAREJA = {
  ella: 'Eri',
  el: 'Adriel',
  inicio: '2025-09-20',
  aniversario: '2026-09-20',
};

/* ============================================================
   ✏️ LA MÚSICA
   Poné tus .mp3 en la carpeta audio/ y listalos acá abajo.
   Suenan una tras otra y, cuando termina la última, vuelve a
   empezar por la primera. Nada de esto depende del scroll.

   Si dejás listada una canción que todavía no subiste, se saltea
   sola y sigue con la que viene: no rompe nada.

   El orden de esta lista es el orden en que suenan.
   ============================================================ */
const MUSICA = [
  'audio/1.mp3',
  'audio/2.mp3',
  'audio/3.mp3',
  'audio/4.mp3',
  'audio/5.mp3',
  'audio/6.mp3',
];

const HISTORIA = [

  /* ---------------------------------------------------------
     0 · PORTADA
     --------------------------------------------------------- */
  {
    id: 'portada',
    estacion: 'portada',
    titulo: 'Un año',
    subtitulo: 'Una vuelta entera del mundo, con vos.',
    entrada: 'Pero esto no empieza el 20 de septiembre. Empieza un invierno antes, cuando todavía no sabíamos nada.',
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
    fecha: 'Mayo — Septiembre 2025',
    titulo: 'Antes de ser nosotros',
    subtitulo: 'Cuatro meses de conocernos despacio, sin apuro y sin saber a dónde iba.',
    momentos: [
      {
        texto: 'Empezamos a hablar por chat a principios de mayo. Ninguno de los dos sabía que estaba empezando algo: era solo una conversación que no se terminaba nunca.',
        media: null,
      },
      {
        texto: 'A fines de junio te conocí en persona. Te recibí con una mesa dulce y salada bastante elaborada. Te sorprendiste de que hubiera preparado todo eso. Nunca aclaré, pero con la comida te atrapé.',
        media: { src: 'img/01-mesa-dulce.jpg', alt: 'Nuestra primera cita' },
      },
      {
        texto: 'Nos quedamos hablando un montón de horas en mi antiguo departamento. Fue una conexión muy profunda, de esas que no se fuerzan. No pasó nada más esa tarde, y me quedé con muchísimas ganas de conocerte más.',
        media: null,
      },
      {
        texto: 'En julio volviste para una pijamada. Estuve días buscando unos pijamas a cuadros que combinaran, para darte el tuyo y usar el mío esa noche.',
        media: { src: 'img/02-pijamada.jpg', alt: 'Los pijamas a cuadros' },
      },
      {
        texto: 'Vimos Barbie, tomamos unas copas de vino, nos reímos muchísimo. Una cosa llevó a la otra y te besé. Esa noche dormimos juntos por primera vez, abrazados, y a la mañana te fuiste con toda tu cabeza dando vueltas, igual que como había quedado el departamento.',
        media: null,
      },
      {
        texto: 'Desde ahí nos empezamos a ver seguido. Te iba a buscar a la facultad y comíamos mandarinas al sol en tus recreos. Salía del trabajo y cruzaba la ciudad aunque fuera solo para acompañarte a la parada del colectivo.',
        media: { src: 'img/03-mandarinas.jpg', alt: 'Nuestras primeras salidas a comer' },
      },
      {
        texto: 'Entre mi laburo de desarrollador y tu ingeniería aeroespacial, aprendimos a exprimir cada minuto libre que teníamos. Todavía lo hacemos.',
        media: null,
      },
    ],
    cita: 'Todo lo que vino después empezó acá, en invierno, sin que nos diéramos cuenta.',
  },

  /* ---------------------------------------------------------
     2 · EL DÍA — 20 de septiembre de 2025
     --------------------------------------------------------- */
  {
    id: 'el-dia',
    estacion: 'umbral',
    fecha: 'Sábado 20 de septiembre de 2025',
    titulo: 'El día',
    subtitulo: 'Tres meses después de conocerte en persona, me animé.',
    entrada: 'Llené todo de velas, cociné unas pastas a la bolognesa, puse decoración por todos lados y te regalé unas flores. Te pregunté si querías ser mi novia y me dijiste que sí. Un día antes de la primavera, como si el mundo hubiese estado esperando que lo dijéramos para empezar a florecer.',
    media: [{ src: 'img/04-20-septiembre.jpg', alt: 'El 20 de septiembre de 2025', forma: 'corazon' }],
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
        texto: 'Desde ese día nos empezamos a ver casi todos los fines de semana. Y ahí, sin apuro, nos fuimos conociendo de verdad.',
        media: { src: 'img/05-primavera.jpg', alt: 'Primavera juntos' },
      },
      {
        texto: 'Construimos algo sano. Una relación que nos hace bien a los dos, donde se puede hablar de todo y nadie tiene que hacerse el que no le pasa nada. No sabés lo valioso que es eso.',
        media: null,
      },
      {
        texto: 'Una noche de noviembre nos fuimos a la Noche de los Museos. Caminamos la ciudad hasta cualquier hora, metiéndonos en lugares que ninguno de los dos conocía, sin mirar el reloj ni una vez.',
        media: { src: 'img/06-noche-museos.jpg', alt: 'La Noche de los Museos' },
      },
    ],
    cita: 'Nunca una primavera se pareció tanto a su nombre.',
  },

  /* ---------------------------------------------------------
     4 · VERANO — las vacaciones a Traslasierras
     --------------------------------------------------------- */
  {
    id: 'verano-2026',
    estacion: 'verano',
    etiqueta: 'Verano',
    fecha: 'Diciembre 2025 — Marzo 2026',
    titulo: 'Traslasierras',
    subtitulo: 'El verano en que nos fuimos lejos y volvimos distintos.',
    momentos: [
      {
        texto: 'En enero nos fuimos a Villa Dolores, a Traslasierras, para que conocieras a mi familia. Pasaron un par de cosas bastante chistosas en el camino que todavía nos hacen reír.',
        media: { src: 'img/07-traslasierras.jpg', alt: 'Villa Dolores, Traslasierras' },
      },
    ],
  },

  /* ---------------------------------------------------------
     4b · LAS ESTRELLAS — la noche de Traslasierras
     El cielo de esta escena se dibuja solo, no es una foto.
     Si tenés una foto de esa noche, va en "media".
     --------------------------------------------------------- */
  {
    id: 'estrellas',
    estacion: 'estrellas',
    fecha: 'Traslasierras, enero de 2026',
    titulo: 'La noche que vimos las estrellas',
    entrada: 'Lejos de la ciudad, sin una sola luz alrededor, el cielo se abrió entero. Nos quedamos mirándolo en silencio, sintiéndonos más cerca del cielo y más cerca el uno del otro. Vos que estudiás para mandar cosas allá arriba, y yo mirándote a vos en vez de mirar las estrellas.',
    media: [{ src: 'img/08-estrellas.jpg', alt: 'La noche de las estrellas' }],
  },

  /* ---------------------------------------------------------
     4c · VERANO (continuación)
     --------------------------------------------------------- */
  {
    id: 'verano-2026-b',
    estacion: 'verano',
    fecha: 'De vuelta en casa',
    titulo: 'Y volvimos más unidos',
    momentos: [
      {
        texto: 'Volvimos de ese viaje distintos. Más unidos, más tranquilos, más seguros de lo que estábamos construyendo.',
        media: null,
      },
      {
        texto: 'Nos hicimos de ir al parque a tomar mate y jugar al ajedrez o a las cartas. Horas enteras, sin hacer nada importante, que son las que mejor me acuerdo.',
        media: { src: 'img/09-parque.jpg', alt: 'Mates y ajedrez en el parque' },
      },
      {
        texto: 'Conocimos parques acuáticos, ríos y lagos. Nos queda pendiente el mar. Ese lo vamos a tachar juntos.',
        media: null,
      },
    ],
    cita: 'Si tuviera que elegir un verano para vivir siempre, elijo este.',
    citaMedia: { src: 'img/10-verano-cierre.jpg', alt: 'El parque acuático' },
  },

  /* ---------------------------------------------------------
     5 · OTOÑO 2026
     --------------------------------------------------------- */
  {
    id: 'otono-2026',
    estacion: 'otono',
    etiqueta: 'Otoño',
    fecha: 'Marzo — Junio 2026',
    titulo: 'El otoño de los cumpleaños',
    subtitulo: 'Nos tocó festejarnos, cada uno a su manera.',
    momentos: [
      {
        texto: 'Para tu cumpleaños te escribí una carta y te regalé unas flores. Me costó más escribir esa carta que cualquier cosa que haya programado en mi vida, porque no hay papel que alcance para transmitirte todo el amor que te tengo.',
        media: { src: 'img/11-cumple-eri.jpg', alt: 'Tu cumpleaños', realce: true },
      },
      {
        texto: 'El 30 de mayo, para el mío, me llevaste al cine y me armaste una noche hermosa. No me esperaba nada y me diste todo.',
        media: { src: 'img/12-cumple-adriel.jpg', alt: 'Mi cumpleaños, 30 de mayo', completa: true },
      },
    ],
    cita: 'Ese otoño aprendimos a cuidarnos también en los detalles chiquitos.',
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
        texto: 'Este invierno pasamos un montón de días juntitos. Restaurantes, meriendas, cines, cumpleaños en tu casa, y muchas tardes de quedarnos adentro a jugar o ver películas sin hacer nada más.',
        media: { src: 'img/13-invierno.jpg', alt: 'Salidas de este invierno' },
      },
      {
        texto: 'Hace un año, este mismo mes, yo todavía te estaba conociendo y me moría de ganas de verte. Hoy ya no me acuerdo cómo era el mundo antes de vos.',
        media: { src: 'img/14-nosotros.jpg', alt: 'Nosotros ahora' },
      },
    ],
    cita: 'Dimos la vuelta entera al año y volvimos al mismo frío, pero juntos.',
  },

  /* ---------------------------------------------------------
     7 · FINAL — el aniversario
     --------------------------------------------------------- */
  {
    id: 'final',
    estacion: 'final',
    fecha: '20 de septiembre de 2026',
    titulo: 'Un año, Eri',
    subtitulo: 'Y esto recién arranca.',
    carta: [
      'Gracias por este año. Por el invierno en que te conocí sin imaginarme nada de esto, por la primavera en que me animé, por el verano en que vimos las estrellas lejos de todo, por el otoño en que nos cuidamos en lo chiquito, y por este invierno en el que ya sos mi lugar.',
      'Gracias por construir conmigo algo sano, de esos que no duelen. Gracias por las mandarinas al sol, por los mates en el parque, por bancarte mis horarios y por elegirme todos los días.',
      'Di la vuelta entera al año mirándote, y mañana volvería a empezar.',
      'Te amo.',
    ],
    firma: 'Adriel',
    media: [{ src: 'img/15-final.jpg', alt: 'Nosotros hoy', completa: true }],
  },

  /* ---------------------------------------------------------
     8 · EL REGALO — se abre al tocarlo
     La foto va en img/16-regalo.jpg (si todavía no está,
     se muestra el placeholder y no rompe nada).
     Para apagar esta escena, agregá   oculta: true,
     --------------------------------------------------------- */
  {
    id: 'regalo',
    estacion: 'regalo',
    fecha: 'Todavía falta una cosa',
    titulo: 'Mirá para arriba',
    // ✏️ lo que dice la etiqueta del regalo, antes de abrirlo
    etiquetaRegalo: 'Para vos',
    abrir: 'tocá para abrir',
    entrada: 'Aquella noche en Traslasierras nos quedamos mirando el cielo desde abajo, los dos. Estudiás para llegar hasta ahí arriba, así que se me ocurrió que ya es hora de que lo veas desde el otro lado.',
    // ✏️ el remate, aparece al final y más grande
    remate: 'Vas a volar una avioneta. Vos a los mandos, y yo abajo mirándote, como aquella noche.',
    media: [{ src: 'img/16-regalo.jpg', alt: 'El regalo' }],
  },
];

/* ⚠️ No borres esta línea: es lo que conecta este archivo con el resto. */
export { PAREJA, HISTORIA, MUSICA };
