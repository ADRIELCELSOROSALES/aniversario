# Un año 🌸

Un recorrido por nuestro primer año, estación por estación: el invierno en que nos
conocimos, el 20 de septiembre, la primavera de novios, el verano de vacaciones,
el otoño y el invierno en que volvimos al principio.

---

## Lo único que tenés que editar: `js/historia.js`

Todos los textos, las fotos y la música salen de ese archivo. Abrilo, buscá los
comentarios con ✏️ y cambiá lo que está entre comillas. No hace falta tocar nada más.

## Poner las fotos

Copiá tus fotos en la carpeta `img/` con **exactamente** estos nombres:

| Archivo | Dónde aparece | Estado |
|---|---|---|
| `01-mesa-dulce.jpg` | La primera cita, fines de junio | ✅ |
| `02-pijamada.jpg` | Los pijamas a cuadros, julio | ✅ |
| `03-mandarinas.jpg` | Empezamos a vernos seguido | ✅ |
| `04-20-septiembre.jpg` | El 20 de septiembre *(recortada en corazón)* | ✅ |
| `05-primavera.jpg` | La primavera de novios | ✅ |
| `06-noche-museos.jpg` | La Noche de los Museos, noviembre | ✅ |
| `07-traslasierras.jpg` | Villa Dolores, Traslasierras | ✅ |
| `08-estrellas.jpg` | La noche de las estrellas | ✅ |
| `09-parque.jpg` | Mates y ajedrez en el parque | ✅ |
| `10-verano-cierre.jpg` | Cierre del verano, el parque acuático | ✅ |
| `11-cumple-eri.jpg` | El cumpleaños de Eri *(con realce)* | ✅ |
| `12-cumple-adriel.jpg` | Tu cumpleaños, 30 de mayo *(completa)* | ✅ |
| `13-invierno.jpg` | Este invierno | ✅ |
| `14-nosotros.jpg` | Nosotros ahora | ✅ |
| `15-final.jpg` | El cierre, debajo de "Y esto recién arranca" | ✅ |
| `16-regalo.jpg` | Adentro del regalo de la avioneta | falta |

Mientras un archivo no exista se dibuja solo un cartel que dice qué foto va ahí.
No rompe nada, así podés ir completando de a poco.

**Videos:** si en `historia.js` cambiás la extensión a `.mp4`, se reproduce como video
(mudo y en loop). Funciona igual.

**Tamaño:** achicá las fotos a ~1600px de lado largo antes de subirlas, o la página va a
tardar en cargar en el celu. Desde la Terminal, con todas las fotos ya en `img/`:

```bash
sips -Z 1600 img/*.jpg
```

## El regalo de la avioneta

La última escena es una **caja de regalo que se abre al tocarla**. Al hacer clic se
desata el moño, salta la tapa, sale un **avión de papel** que cruza la pantalla dejando
estela, y recién ahí aparece el texto, la foto y el remate:
*"Nos vamos a subir a una avioneta. Y la vas a manejar vos."*

Funciona con teclado (Tab + Enter) y con lector de pantalla.

**Para sumar la foto el día del aniversario:** copiá el archivo como `img/14-regalo.jpg`
y hacé `git add -A && git commit -m "foto" && git push`. Eso es todo — el sitio la toma
sola, no hay que tocar código. Si llegás justo y no la subís, la escena funciona igual
con el placeholder.

Si preferís darle la noticia en persona y que la web no la revele, agregá
`oculta: true,` a esa escena en `js/historia.js`.

## La noche de las estrellas

El cielo de esa escena **no es una foto**: son estrellas calculadas una por una, con la
Vía Láctea cruzando en diagonal y estrellas fugaces cada tanto. Si tenés una foto real
de esa noche en Traslasierras, ponela como `img/08-estrellas.jpg` y va a aparecer encima
del cielo dibujado.

## Poner la música

Copiá tus `.mp3` en la carpeta `audio/` y listalos en `js/historia.js`, arriba de todo,
en la lista `MUSICA`:

```js
const MUSICA = [
  'audio/1.mp3',
  'audio/2.mp3',
  ...
];
```

Suenan **una tras otra, en bucle**: cuando termina la última vuelve a empezar por la
primera. No dependen del scroll ni de la estación. El orden de la lista es el orden en
que suenan, y podés poner las que quieras (dos, seis, quince).

Si dejás listada una canción que todavía no subiste, **se saltea sola** y sigue con la
que viene. Así podés ir completando de a poco sin que nada se rompa.

Arranca en silencio —los navegadores bloquean el audio automático— y se activa con el
botón de abajo a la izquierda. Entre tema y tema hay un fundido suave. El volumen se
ajusta en `js/audio.js`, primera línea.

### El "poff" del regalo

Cuando se abre la caja suena un *poff*. **No es un archivo**: se genera en el momento con
Web Audio, mezclando un golpe grave que cae de tono con un soplido de papel. No tenés que
subir nada y suena aunque la música esté apagada.

## Verlo en tu compu antes de subirlo

```bash
cd ~/Desktop/eri/aniversario
python3 -m http.server 8777
```

Y abrí http://localhost:8777

> No sirve abrir el `index.html` haciendo doble clic: el sitio usa módulos de JavaScript
> y los navegadores los bloquean si no hay un servidor. Con el comando de arriba anda.

## Subirlo a GitHub Pages

```bash
git add -A
git commit -m "Un año"
git push
```

Después, en GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
En un par de minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Si el repo es privado, GitHub Pages necesita cuenta Pro. Con el repo público el link
funciona para cualquiera que lo tenga, pero no aparece en Google (`noindex` ya está puesto).

---

## Cómo está hecho

- **Sin build ni dependencias que instalar.** HTML, CSS y JavaScript puro.
- [GSAP + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — dispara cada escena al scrollear.
- [Lenis](https://github.com/darkroomengineering/lenis) — el scroll suave.
- Sistema de partículas propio (`js/particulas.js`): una sola clase que **muta** entre
  copos, pétalos, luz y hojas según la estación, en vez de cambiar de golpe.

| Archivo | Qué hace |
|---|---|
| `js/historia.js` | ✏️ **Tu contenido.** Textos, fotos, música |
| `js/escenas.js` | Arma el HTML a partir de historia.js |
| `js/particulas.js` | Copos, pétalos, hojas y luciérnagas |
| `js/audio.js` | Música por estación con fundido |
| `js/main.js` | Scroll, transiciones y la rueda del año |
| `css/estilos.css` | Diseño y paleta de cada estación |

Respeta `prefers-reduced-motion`: si alguien tiene las animaciones desactivadas en su
sistema, se apagan las partículas y el scroll suave.
