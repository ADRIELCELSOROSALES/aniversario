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

| Archivo | Dónde aparece |
|---|---|
| `01-mesa-dulce.jpg` | La mesa dulce y salada de fines de junio |
| `02-pijamada.jpg` | Los pijamas a cuadros, julio |
| `03-mandarinas.jpg` | Mandarinas al sol en la facultad |
| `04-20-septiembre.jpg` | El 20 de septiembre de 2025 |
| `05-primavera.jpg` | La primavera de novios |
| `06-navidad.jpg` | Navidad en la casa de ella |
| `07-traslasierras.jpg` | Villa Dolores / Traslasierras |
| `08-estrellas.jpg` | La noche de las estrellas *(opcional: el cielo ya se dibuja solo)* |
| `09-parque.jpg` | Mates y ajedrez en el parque |
| `10-cumple-eri.jpg` | El cumpleaños de Eri |
| `11-cumple-adriel.jpg` | Tu cumpleaños, 30 de mayo |
| `12-invierno.jpg` | Este invierno |
| `13-nosotros.jpg` | Nosotros ahora |
| `final.jpg` | El cierre |

Mientras un archivo no exista se dibuja solo un cartel que dice qué foto va ahí.
No rompe nada, así podés ir completando de a poco.

**Videos:** si en `historia.js` cambiás la extensión a `.mp4`, se reproduce como video
(mudo y en loop). Funciona igual.

**Tamaño:** achicá las fotos a ~1600px de lado largo antes de subirlas, o la página va a
tardar en cargar en el celu. Desde la Terminal, con todas las fotos ya en `img/`:

```bash
sips -Z 1600 img/*.jpg
```

## La escena del regalo está apagada

Al final de `js/historia.js` hay una escena llamada **"Mirá para arriba"** que le revela
el regalo de la avioneta. Está **desactivada**. Si querés que la web se lo cuente,
borrá la línea `oculta: true,` de esa escena. Si preferís decírselo vos en persona,
dejala como está.

## La noche de las estrellas

El cielo de esa escena **no es una foto**: son estrellas calculadas una por una, con la
Vía Láctea cruzando en diagonal y estrellas fugaces cada tanto. Si tenés una foto real
de esa noche en Traslasierras, ponela como `img/08-estrellas.jpg` y va a aparecer encima
del cielo dibujado.

## Poner la música

Un `.mp3` por estación, en la carpeta `audio/`:
`invierno.mp3`, `primavera.mp3`, `verano.mp3`, `otono.mp3`, `invierno-calido.mp3`, `final.mp3`

Arranca en silencio (los navegadores bloquean el audio automático) y se activa con el
botón de abajo a la izquierda. Al cambiar de estación la canción hace un fundido cruzado.
El volumen se ajusta en `js/audio.js`, primera línea.

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
