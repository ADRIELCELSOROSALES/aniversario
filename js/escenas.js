/* ============================================================
   ESCENAS.JS — construye el DOM a partir de historia.js
   Así vos editás solo historia.js y acá no tocás nada.
   ============================================================ */

import { PAREJA, HISTORIA } from './historia.js';
import { Cielo } from './cielo.js';

/* una flor distinta por estación, generada en SVG */
const RAMAS = {
  primavera: `      <svg viewBox="-12 -18 444 86" aria-hidden="true">\n        <path class="t" d="M4 52 C70 52 96 40 140 34 C190 27 240 33 300 26 C348 20 388 16 416 14"/>
        <path class="t" d="M120 36 C112 26 116 16 126 12"/>
        <path class="t" d="M232 30 C226 20 230 10 240 7"/>
        <path class="t" d="M330 22 C326 13 332 5 342 3"/>
        <path class="t" d="M70 47 C66 42 64 38 66 50"/>
        <path class="t" d="M190 32 C186 27 184 24 188 30"/>\n        <g class="flores">\n          <g class="flor" transform="translate(126,12) scale(1.15)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(240,7) scale(1.0)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(342,3) scale(0.92)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(66,50) scale(0.72)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(188,30) scale(0.68)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(292,26) scale(0.78)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n          <g class="flor" transform="translate(392,15) scale(0.62)"><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.2" rx="3" ry="5.2" transform="rotate(288)"/><circle class="c" cx="0" cy="0" r="1.9"/></g>\n        </g>\n      </svg>`,
  verano: `      <svg viewBox="-12 -18 444 86" aria-hidden="true">\n        <path class="t" d="M4 52 C70 52 96 40 140 34 C190 27 240 33 300 26 C348 20 388 16 416 14"/>
        <path class="t" d="M120 36 C112 26 116 16 126 12"/>
        <path class="t" d="M232 30 C226 20 230 10 240 7"/>
        <path class="t" d="M330 22 C326 13 332 5 342 3"/>
        <path class="t" d="M70 47 C66 42 64 38 66 50"/>
        <path class="t" d="M190 32 C186 27 184 24 188 30"/>\n        <g class="flores">\n          <g class="flor" transform="translate(126,12) scale(1.15)"><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(30)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(60)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(90)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(120)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(150)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(210)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(240)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(270)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(300)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(330)"/><circle class="c" cx="0" cy="0" r="3.2"/></g>\n          <g class="flor" transform="translate(240,7) scale(1.0)"><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(36)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(108)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(252)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(288)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="2"/></g>\n          <g class="flor" transform="translate(342,3) scale(0.92)"><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(30)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(60)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(90)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(120)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(150)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(210)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(240)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(270)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(300)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(330)"/><circle class="c" cx="0" cy="0" r="3.2"/></g>\n          <g class="flor" transform="translate(66,50) scale(0.72)"><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(36)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(108)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(252)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(288)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="2"/></g>\n          <g class="flor" transform="translate(188,30) scale(0.68)"><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(30)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(60)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(90)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(120)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(150)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(210)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(240)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(270)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(300)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(330)"/><circle class="c" cx="0" cy="0" r="3.2"/></g>\n          <g class="flor" transform="translate(292,26) scale(0.78)"><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(36)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(108)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(252)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(288)"/><ellipse class="p" cx="0" cy="-7" rx="1.1" ry="5" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="2"/></g>\n          <g class="flor" transform="translate(392,15) scale(0.62)"><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(30)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(60)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(90)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(120)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(150)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(180)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(210)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(240)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(270)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(300)"/><ellipse class="p" cx="0" cy="-6.4" rx="1.6" ry="4.4" transform="rotate(330)"/><circle class="c" cx="0" cy="0" r="3.2"/></g>\n        </g>\n      </svg>`,
  otono: `      <svg viewBox="-12 -18 444 86" aria-hidden="true">\n        <path class="t" d="M4 52 C70 52 96 40 140 34 C190 27 240 33 300 26 C348 20 388 16 416 14"/>
        <path class="t" d="M120 36 C112 26 116 16 126 12"/>
        <path class="t" d="M232 30 C226 20 230 10 240 7"/>
        <path class="t" d="M330 22 C326 13 332 5 342 3"/>
        <path class="t" d="M70 47 C66 42 64 38 66 50"/>
        <path class="t" d="M190 32 C186 27 184 24 188 30"/>\n        <g class="flores">\n          <g class="flor" transform="translate(126,12) scale(1.15)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(240,7) scale(1.0)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(342,3) scale(0.92)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(66,50) scale(0.72)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(188,30) scale(0.68)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(292,26) scale(0.78)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n          <g class="flor" transform="translate(392,15) scale(0.62)"><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(0)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(60)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(120)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(180)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(240)"/><path class="p" d="M0 0 Q 2.9 -4.4 0 -9 Q -2.9 -4.4 0 0Z" transform="rotate(300)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(30)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(90)"/><path class="v" d="M0 -2.2 L0 -7.4" transform="rotate(150)"/><circle class="c" cx="0" cy="0" r="1.5"/></g>\n        </g>\n      </svg>`,
  invierno: `      <svg viewBox="-12 -18 444 86" aria-hidden="true">\n        <path class="t" d="M4 52 C70 52 96 40 140 34 C190 27 240 33 300 26 C348 20 388 16 416 14"/>
        <path class="t" d="M120 36 C112 26 116 16 126 12"/>
        <path class="t" d="M232 30 C226 20 230 10 240 7"/>
        <path class="t" d="M330 22 C326 13 332 5 342 3"/>
        <path class="t" d="M70 47 C66 42 64 38 66 50"/>
        <path class="t" d="M190 32 C186 27 184 24 188 30"/>\n        <g class="flores">\n          <g class="flor" transform="translate(126,12) scale(1.15)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(240,7) scale(1.0)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(342,3) scale(0.92)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(66,50) scale(0.72)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(188,30) scale(0.68)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(292,26) scale(0.78)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n          <g class="flor" transform="translate(392,15) scale(0.62)"><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(0)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(72)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(144)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(216)"/><ellipse class="p" cx="0" cy="-5.4" rx="3.4" ry="4.9" transform="rotate(288)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(36)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(108)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(180)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(252)"/><ellipse class="p p2" cx="0" cy="-3.1" rx="2.3" ry="3.3" transform="rotate(324)"/><circle class="c" cx="0" cy="0" r="1.6"/></g>\n        </g>\n      </svg>`,
};

const yaFlorecio = new Set();
const FLOR_DE = { primavera: 'primavera', verano: 'verano', otono: 'otono', 'invierno-calido': 'invierno' };


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
  if (media.forma === 'corazon') marco.classList.add('marco--corazon');

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
    // el marco se adapta a la foto: una apaisada en un marco vertical
    // perdería casi la mitad de la imagen recortada a los costados
    const ajustarMarco = () => {
      if (el.dataset.placeholder || !el.naturalWidth) return;
      if (marco.classList.contains('marco--corazon')) return;   // el corazón manda su propia forma
      const proporcion = el.naturalWidth / el.naturalHeight;
      // una foto que se muestra entera lleva la proporción exacta, sin topes
      if (marco.classList.contains('marco--completa')) {
        marco.style.aspectRatio = proporcion.toFixed(4);
        return;
      }
      if (proporcion > 1.05) {
        marco.classList.add('marco--apaisado');
        marco.style.aspectRatio = Math.min(proporcion, 1.62).toFixed(3);
      } else if (proporcion < 0.72) {
        marco.style.aspectRatio = Math.max(proporcion, 0.66).toFixed(3);
      }
    };
    el.addEventListener('load', ajustarMarco, { once: true });
    el.src = media.src;
    // si venía en caché ya está completa y el evento de arriba no dispara
    if (el.complete && el.naturalWidth) ajustarMarco();
  }
  marco.appendChild(el);

  // una foto puede pedir realce: va envuelta, con un halo detrás
  if (media.completa || media.realce) marco.classList.add('marco--completa');
  if (media.realce) {
    marco.classList.add('marco--realce');
    const halo = document.createElement('div');
    halo.className = 'realce';
    halo.appendChild(marco);
    return halo;
  }
  return marco;
}

/* parte el texto en palabras, para poder revelarlas de a una */
function enPalabras(nodo, texto) {
  texto.split(/(\s+)/).forEach((trozo) => {
    if (!trozo) return;
    if (/^\s+$/.test(trozo)) { nodo.appendChild(document.createTextNode(trozo)); return; }
    const w = document.createElement('span');
    w.className = 'palabra';
    w.textContent = trozo;
    nodo.appendChild(w);
  });
  return nodo;
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

  // el aura de fondo va pasando por los colores de las cuatro estaciones
  const aura = el('div', 'portada__aura');
  aura.setAttribute('aria-hidden', 'true');
  s.appendChild(aura);

  const cont = el('div');
  const titulo = el('h1', 'portada__titulo');
  [...d.titulo].forEach((letra) => {
    if (letra === ' ') { titulo.appendChild(document.createTextNode(' ')); return; }
    const w = document.createElement('span');
    w.className = 'letra';
    w.textContent = letra;
    titulo.appendChild(w);
  });
  cont.appendChild(titulo);
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
  if (FLOR_DE[d.estacion] && !yaFlorecio.has(d.estacion)) {
    yaFlorecio.add(d.estacion);
    const rama = document.createElement('div');
    rama.className = 'rama revelar';
    rama.innerHTML = RAMAS[FLOR_DE[d.estacion]];
    s.appendChild(rama);
  }

  const lista = el('div', 'momentos');
  (d.momentos || []).forEach((m) => {
    if (m.media) {
      const art = el('article', 'momento');
      art.appendChild(el('p', 'momento__texto revelar', m.texto));
      const marco = crearMedia(m.media, d.estacion);
      marco.classList.add('momento__media', 'revelar');
      art.appendChild(marco);
      lista.appendChild(art);
      return;
    }
    // sin foto: el texto es el protagonista y se revela de a una palabra.
    // Los largos usan un cuerpo más contenido para no volverse un muro.
    const largo = m.texto.length > 150;
    const art = el('article', 'momento momento--solo' + (largo ? ' momento--largo' : ''));
    const txt = el('p', 'momento__texto momento__frase');
    enPalabras(txt, m.texto);
    art.appendChild(txt);
    lista.appendChild(art);
  });
  s.appendChild(lista);

  if (d.cita) {
    s.appendChild(el('p', 'cita revelar', d.cita));
    const marcoCita = crearMedia(d.citaMedia, d.estacion, true);
    if (marcoCita) { marcoCita.classList.add('cita__foto', 'revelar'); s.appendChild(marcoCita); }
  }
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
    marco.classList.add('revelar', 'final__foto');
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

/* ---- la noche de Traslasierras: el cielo se dibuja solo ---- */
function escenaEstrellas(d) {
  const s = el('section', 'escena estrellas');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  const lienzo = document.createElement('canvas');
  lienzo.className = 'estrellas__cielo';
  lienzo.setAttribute('aria-hidden', 'true');
  s.appendChild(lienzo);

  const cont = el('div', 'estrellas__texto');
  if (d.fecha) cont.appendChild(el('span', 'escena__fecha revelar', d.fecha));
  cont.appendChild(el('h2', 'estrellas__titulo revelar', d.titulo));
  if (d.entrada) cont.appendChild(el('p', 'estrellas__parrafo revelar', d.entrada));

  const m = (d.media || [])[0];
  const marco = crearMedia(m, d.estacion, true);
  if (marco) { marco.classList.add('revelar'); cont.appendChild(marco); }

  s.appendChild(cont);
  s._cielo = lienzo;
  return s;
}

/* ---- el regalo: una caja que se desenvuelve al tocarla ----
   La caja cerrada y el contenido viven en la MISMA celda de un grid,
   así comparten centro exacto y lo que aparece queda donde estaba
   la caja, en vez de irse abajo de la pantalla.                     */
function escenaRegalo(d) {
  const s = el('section', 'escena regalo');
  s.id = d.id;
  s.dataset.estacion = d.estacion;

  /* --- el vuelo, en una capa de alto fijo para que no se
         descoloque cuando la sección crece al abrirse --- */
  const vuelo = document.createElement('div');
  vuelo.className = 'regalo__vuelo';
  vuelo.setAttribute('aria-hidden', 'true');
  vuelo.innerHTML = `
    <svg class="vuelo__svg" preserveAspectRatio="none">
      <path class="vuelo__estela" fill="none"/>
      <g class="vuelo__avion">
        <path class="avion__ala" d="M-17 -13 L23 0 L-17 13 L-9 0 Z"/>
        <path class="avion__sombra" d="M-17 13 L-9 0 L23 0 Z"/>
      </g>
    </svg>`;
  s.appendChild(vuelo);

  /* --- capa 1: la caja --- */
  const cerrado = el('div', 'regalo__cerrado revelar');
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'regalo__boton';
  boton.setAttribute('aria-label', `${d.etiquetaRegalo || 'Regalo'} — abrir`);
  boton.setAttribute('aria-expanded', 'false');
  boton.innerHTML = `
    <span class="caja__envase">
      <svg class="caja" viewBox="0 0 220 210" aria-hidden="true">
        <g class="caja__lazos">
          <path d="M110 46 C86 26 62 20 56 34 C50 48 76 54 110 46Z"/>
          <path d="M110 46 C134 26 158 20 164 34 C170 48 144 54 110 46Z"/>
          <path d="M104 44 C96 60 92 74 96 86"/>
          <path d="M116 44 C124 60 128 74 124 86"/>
          <circle class="caja__nudo" cx="110" cy="47" r="7"/>
        </g>
        <g class="caja__tapa">
          <rect x="26" y="56" width="168" height="34" rx="4"/>
          <rect class="caja__cinta" x="100" y="56" width="20" height="34"/>
        </g>
        <g class="caja__cuerpo">
          <rect x="38" y="92" width="144" height="104" rx="4"/>
          <rect class="caja__cinta" x="100" y="92" width="20" height="104"/>
        </g>
      </svg>
      <span class="caja__luz" aria-hidden="true"></span>
    </span>
    <span class="regalo__etiqueta">${d.etiquetaRegalo || 'Para vos'}</span>
    <span class="regalo__abrir">${d.abrir || 'tocá para abrir'}</span>`;
  cerrado.appendChild(boton);
  s.appendChild(cerrado);

  /* --- capa 2: lo que había adentro, en la misma celda --- */
  const abierto = el('div', 'regalo__abierto');
  abierto.hidden = true;
  if (d.fecha) abierto.appendChild(el('span', 'umbral__fecha', d.fecha));
  abierto.appendChild(el('h2', 'umbral__titulo', d.titulo));
  if (d.entrada) abierto.appendChild(el('p', 'umbral__texto', d.entrada));

  const m = (d.media || [])[0];
  const marco = crearMedia(m, d.estacion, true);
  if (marco) { marco.classList.add('regalo__foto'); abierto.appendChild(marco); }

  if (d.remate) abierto.appendChild(el('p', 'regalo__remate', d.remate));
  s.appendChild(abierto);

  s._regalo = {
    seccion: s, boton, cerrado, abierto, vuelo,
    caja: boton.querySelector('.caja'),
    luz: boton.querySelector('.caja__luz'),
    svg: vuelo.querySelector('.vuelo__svg'),
    estela: vuelo.querySelector('.vuelo__estela'),
    nave: vuelo.querySelector('.vuelo__avion'),
  };
  return s;
}

/* ---- arma todo el documento ---- */
export function construir(contenedor) {
  const frag = document.createDocumentFragment();
  const cielos = [];
  yaFlorecio.clear();

  HISTORIA.forEach((d) => {
    if (d.oculta) return;   // escenas apagadas desde historia.js
    let s;
    if (d.estacion === 'portada') s = escenaPortada(d);
    else if (d.estacion === 'umbral') s = escenaUmbral(d);
    else if (d.estacion === 'estrellas') s = escenaEstrellas(d);
    else if (d.estacion === 'regalo') s = escenaRegalo(d);
    else if (d.estacion === 'final') s = escenaFinal(d);
    else s = escenaEstacion(d);
    if (s._cielo) cielos.push(s._cielo);
    if (s._regalo) contenedor._regalo = s._regalo;
    frag.appendChild(s);
  });
  contenedor.appendChild(frag);

  // el cielo necesita que la sección ya tenga tamaño
  requestAnimationFrame(() => cielos.forEach((c) => new Cielo(c)));

  return [...contenedor.querySelectorAll('.escena')];
}
