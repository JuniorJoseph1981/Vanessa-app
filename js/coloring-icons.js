/* Spark Station — simple outline "coloring book" icons for the alphabet
   worksheet's sound-picture section. Deliberately plain line art (not
   colored clip-art) so a child can color them in by hand; recognizability
   leans on the printed word label alongside each icon. */

function ic(inner) {
  return `<svg viewBox="0 0 100 100" class="ws-icon-svg" aria-hidden="true">${inner}</svg>`;
}

function iconKey(word) {
  return word.toLowerCase().replace(/[^a-z]/g, '');
}

const WORD_ICONS = {
  apple: ic('<circle cx="50" cy="58" r="30"/><line x1="50" y1="28" x2="53" y2="15"/><path d="M53 18 q15 -5 12 10"/>'),
  ant: ic('<circle cx="30" cy="55" r="10"/><circle cx="50" cy="55" r="12"/><circle cx="72" cy="55" r="15"/><line x1="20" y1="45" x2="12" y2="35"/><line x1="20" y1="65" x2="12" y2="75"/><line x1="50" y1="43" x2="50" y2="30"/><line x1="50" y1="67" x2="50" y2="80"/><line x1="80" y1="45" x2="90" y2="35"/><line x1="80" y1="65" x2="90" y2="75"/>'),
  astronaut: ic('<circle cx="50" cy="35" r="20"/><circle cx="50" cy="35" r="12"/><path d="M30 55 q20 -8 40 0 l5 35 q-25 10 -50 0 z"/><line x1="30" y1="60" x2="15" y2="75"/><line x1="70" y1="60" x2="85" y2="75"/>'),

  ball: ic('<circle cx="50" cy="50" r="32"/><path d="M20 50 q30 -20 60 0"/><path d="M20 50 q30 20 60 0"/><line x1="50" y1="18" x2="50" y2="82"/>'),
  banana: ic('<path d="M25 70 q0 -45 45 -50"/><path d="M30 72 q5 -35 40 -42"/><path d="M25 70 q5 8 15 6"/>'),
  butterfly: ic('<line x1="50" y1="25" x2="50" y2="75"/><ellipse cx="30" cy="40" rx="18" ry="14"/><ellipse cx="70" cy="40" rx="18" ry="14"/><ellipse cx="32" cy="62" rx="14" ry="11"/><ellipse cx="68" cy="62" rx="14" ry="11"/><line x1="50" y1="25" x2="40" y2="12"/><line x1="50" y1="25" x2="60" y2="12"/>'),

  cat: ic('<circle cx="50" cy="55" r="28"/><path d="M28 35 l6 -18 l14 14"/><path d="M72 35 l-6 -18 l-14 14"/><circle class="dot" cx="40" cy="52" r="3"/><circle class="dot" cx="60" cy="52" r="3"/><path d="M46 62 q4 4 8 0"/><line x1="20" y1="58" x2="35" y2="60"/><line x1="20" y1="66" x2="35" y2="65"/><line x1="80" y1="58" x2="65" y2="60"/><line x1="80" y1="66" x2="65" y2="65"/>'),
  cup: ic('<path d="M30 30 h40 l-6 45 h-28 z"/><path d="M70 40 q18 0 15 18 q-3 12 -16 10"/>'),
  car: ic('<path d="M15 65 q0 -20 20 -20 h10 l10 -12 h20 l8 12 h7 q10 0 10 20 z"/><circle cx="32" cy="70" r="9"/><circle cx="72" cy="70" r="9"/><line x1="45" y1="45" x2="45" y2="33"/>'),

  dog: ic('<ellipse cx="50" cy="55" rx="26" ry="24"/><ellipse cx="22" cy="45" rx="10" ry="18"/><ellipse cx="78" cy="45" rx="10" ry="18"/><ellipse cx="50" cy="65" rx="12" ry="9"/><circle class="dot" cx="46" cy="65" r="2.5"/><circle class="dot" cx="38" cy="48" r="3"/><circle class="dot" cx="62" cy="48" r="3"/>'),
  duck: ic('<ellipse cx="45" cy="62" rx="28" ry="18"/><circle cx="65" cy="38" r="16"/><path d="M78 38 l16 4 l-16 6 z"/><circle class="dot" cx="68" cy="34" r="2.5"/><path d="M25 60 q15 -10 20 5"/>'),
  drum: ic('<ellipse cx="50" cy="35" rx="28" ry="10"/><path d="M22 35 v30 q28 12 56 0 v-30"/><ellipse cx="50" cy="65" rx="28" ry="10"/><line x1="30" y1="20" x2="45" y2="35"/><line x1="70" y1="20" x2="55" y2="35"/>'),

  elephant: ic('<ellipse cx="45" cy="60" rx="30" ry="20"/><circle cx="75" cy="45" r="18"/><ellipse cx="82" cy="38" rx="12" ry="14"/><path d="M85 55 q10 15 -2 28"/><circle class="dot" cx="80" cy="40" r="2.5"/><line x1="30" y1="78" x2="28" y2="90"/><line x1="55" y1="78" x2="53" y2="90"/>'),
  egg: ic('<path d="M50 15 q28 15 28 45 a28 28 0 1 1 -56 0 q0 -30 28 -45 z"/>'),
  envelope: ic('<rect x="15" y="30" width="70" height="45" rx="4"/><path d="M15 32 l35 28 l35 -28"/>'),

  fish: ic('<ellipse cx="45" cy="50" rx="28" ry="18"/><path d="M73 50 l18 -14 v28 z"/><circle class="dot" cx="30" cy="46" r="3"/><path d="M40 40 q8 -8 16 0"/>'),
  frog: ic('<ellipse cx="50" cy="58" rx="26" ry="20"/><circle cx="36" cy="35" r="9"/><circle cx="64" cy="35" r="9"/><circle class="dot" cx="36" cy="35" r="2.5"/><circle class="dot" cx="64" cy="35" r="2.5"/><ellipse cx="20" cy="70" rx="10" ry="6"/><ellipse cx="80" cy="70" rx="10" ry="6"/>'),
  flower: ic('<circle cx="50" cy="42" r="10"/><ellipse cx="50" cy="20" rx="9" ry="14"/><ellipse cx="50" cy="64" rx="9" ry="14"/><ellipse cx="28" cy="42" rx="14" ry="9"/><ellipse cx="72" cy="42" rx="14" ry="9"/><line x1="50" y1="64" x2="50" y2="90"/>'),

  goat: ic('<ellipse cx="45" cy="62" rx="26" ry="18"/><circle cx="72" cy="45" r="16"/><path d="M66 32 q-4 -14 6 -16"/><path d="M78 32 q4 -14 -6 -16"/><circle class="dot" cx="76" cy="42" r="2.5"/><path d="M70 55 l-4 12"/><line x1="30" y1="80" x2="28" y2="90"/><line x1="55" y1="80" x2="53" y2="90"/>'),
  grapes: ic('<circle cx="40" cy="45" r="10"/><circle cx="55" cy="45" r="10"/><circle cx="33" cy="60" r="10"/><circle cx="48" cy="62" r="10"/><circle cx="62" cy="58" r="10"/><line x1="47" y1="30" x2="47" y2="20"/><path d="M47 22 q12 -6 10 8"/>'),
  guitar: ic('<path d="M40 55 a14 14 0 1 1 0.1 0 z M60 55 a18 18 0 1 1 0.1 0 z"/><rect x="46" y="10" width="8" height="40"/><line x1="50" y1="45" x2="50" y2="85"/>'),

  hat: ic('<ellipse cx="50" cy="75" rx="35" ry="8"/><path d="M35 75 l10 -55 l10 10 l10 -10 l10 55"/>'),
  horse: ic('<ellipse cx="42" cy="60" rx="26" ry="16"/><path d="M60 50 q20 -25 10 -40 l10 8 q6 20 -8 38"/><circle class="dot" cx="68" cy="22" r="2.5"/><line x1="25" y1="74" x2="23" y2="90"/><line x1="55" y1="74" x2="53" y2="90"/><path d="M18 55 q-10 10 -2 18"/>'),
  house: ic('<rect x="25" y="50" width="50" height="35"/><path d="M18 52 l32 -30 l32 30"/><rect x="45" y="65" width="14" height="20"/>'),

  icecream: ic('<path d="M40 55 l10 35 l10 -35 z"/><circle cx="50" cy="45" r="20"/>'),
  insect: ic('<ellipse cx="50" cy="55" rx="20" ry="14"/><circle cx="50" cy="35" r="10"/><line x1="35" y1="50" x2="20" y2="45"/><line x1="35" y1="60" x2="20" y2="65"/><line x1="65" y1="50" x2="80" y2="45"/><line x1="65" y1="60" x2="80" y2="65"/><line x1="45" y1="27" x2="38" y2="15"/><line x1="55" y1="27" x2="62" y2="15"/>'),
  igloo: ic('<path d="M15 75 a35 35 0 0 1 70 0 z"/><path d="M40 75 v-18 a10 10 0 0 1 20 0 v18"/><line x1="15" y1="75" x2="85" y2="75"/>'),

  jacket: ic('<path d="M35 25 l-20 15 v25 h12 v-15 l8 -8 v43 h30 v-43 l8 8 v15 h12 v-25 l-20 -15 l-15 12 z"/>'),
  juice: ic('<path d="M32 25 h36 l-6 55 h-24 z"/><line x1="50" y1="15" x2="58" y2="30"/><line x1="30" y1="45" x2="66" y2="45"/>'),
  jellyfish: ic('<path d="M25 45 a25 25 0 0 1 50 0 z"/><path d="M32 45 q0 20 -4 35"/><path d="M45 45 q0 25 3 35"/><path d="M55 45 q0 25 -3 35"/><path d="M68 45 q0 20 4 35"/>'),

  kite: ic('<path d="M50 12 l30 38 l-30 38 l-30 -38 z"/><line x1="20" y1="50" x2="80" y2="50"/><line x1="50" y1="12" x2="50" y2="88"/><path d="M50 88 q5 8 -3 14 q8 6 0 14"/>'),
  kangaroo: ic('<ellipse cx="48" cy="55" rx="22" ry="26"/><circle cx="55" cy="25" r="14"/><path d="M28 70 q-15 15 5 25"/><ellipse cx="35" cy="85" rx="18" ry="9"/><circle class="dot" cx="60" cy="22" r="2.5"/>'),
  key: ic('<circle cx="30" cy="30" r="15"/><line x1="42" y1="42" x2="85" y2="85"/><line x1="68" y1="68" x2="76" y2="60"/><line x1="76" y1="76" x2="84" y2="68"/>'),

  lion: ic('<circle cx="50" cy="52" r="20"/><circle cx="26" cy="30" r="10"/><circle cx="40" cy="20" r="10"/><circle cx="60" cy="20" r="10"/><circle cx="74" cy="30" r="10"/><circle cx="22" cy="52" r="10"/><circle cx="78" cy="52" r="10"/><circle cx="26" cy="74" r="10"/><circle cx="74" cy="74" r="10"/><circle class="dot" cx="42" cy="48" r="2.5"/><circle class="dot" cx="58" cy="48" r="2.5"/><path d="M46 60 q4 4 8 0"/>'),
  leaf: ic('<path d="M50 15 q35 15 25 55 q-30 15 -45 -20 q-5 -20 20 -35 z"/><line x1="50" y1="20" x2="55" y2="70"/><line x1="55" y1="70" x2="60" y2="88"/>'),
  lamp: ic('<path d="M35 15 h30 l10 25 h-50 z"/><line x1="50" y1="40" x2="50" y2="75"/><line x1="35" y1="85" x2="65" y2="85"/>'),

  monkey: ic('<circle cx="30" cy="45" r="14"/><circle cx="70" cy="45" r="14"/><circle cx="50" cy="50" r="26"/><ellipse cx="50" cy="58" rx="14" ry="10"/><circle class="dot" cx="42" cy="45" r="2.5"/><circle class="dot" cx="58" cy="45" r="2.5"/>'),
  moon: ic('<path d="M60 15 a35 35 0 1 0 0 70 a28 28 0 0 1 0 -70 z"/>'),
  mouse: ic('<circle cx="45" cy="55" r="20"/><circle cx="28" cy="35" r="10"/><circle cx="60" cy="32" r="10"/><circle class="dot" cx="38" cy="55" r="2.5"/><circle class="dot" cx="52" cy="52" r="2.5"/><path d="M64 62 q25 10 20 28"/>'),

  nest: ic('<path d="M15 60 q35 25 70 0"/><path d="M15 60 q0 15 35 18 q35 -3 35 -18"/><ellipse cx="38" cy="52" rx="8" ry="10"/><ellipse cx="52" cy="48" rx="8" ry="10"/><ellipse cx="65" cy="53" rx="8" ry="10"/>'),
  nut: ic('<path d="M50 20 q28 5 25 35 q-3 30 -25 30 q-22 0 -25 -30 q-3 -30 25 -35 z"/><line x1="50" y1="20" x2="50" y2="10"/>'),
  notebook: ic('<rect x="25" y="18" width="55" height="65" rx="3"/><line x1="35" y1="35" x2="70" y2="35"/><line x1="35" y1="48" x2="70" y2="48"/><line x1="35" y1="61" x2="70" y2="61"/><circle cx="25" cy="30" r="3"/><circle cx="25" cy="50" r="3"/><circle cx="25" cy="70" r="3"/>'),

  orange: ic('<circle cx="50" cy="55" r="30"/><line x1="50" y1="25" x2="50" y2="15"/><path d="M50 18 q12 -6 10 8"/>'),
  octopus: ic('<path d="M25 45 a25 25 0 0 1 50 0 v10 z"/><circle class="dot" cx="40" cy="38" r="3"/><circle class="dot" cx="60" cy="38" r="3"/><path d="M30 55 q-8 20 -15 28"/><path d="M42 58 q-3 22 -8 30"/><path d="M58 58 q3 22 8 30"/><path d="M70 55 q8 20 15 28"/>'),
  owl: ic('<ellipse cx="50" cy="58" rx="28" ry="26"/><circle cx="38" cy="48" r="12"/><circle cx="62" cy="48" r="12"/><circle class="dot" cx="38" cy="48" r="4"/><circle class="dot" cx="62" cy="48" r="4"/><path d="M50 55 l-5 8 h10 z"/><path d="M30 30 l6 12"/><path d="M70 30 l-6 12"/>'),

  pig: ic('<ellipse cx="50" cy="55" rx="28" ry="22"/><circle cx="50" cy="65" r="12"/><circle class="dot" cx="45" cy="65" r="2"/><circle class="dot" cx="55" cy="65" r="2"/><path d="M78 45 q10 -8 4 -16"/><path d="M25 35 l8 12"/><path d="M40 30 l4 14"/>'),
  pumpkin: ic('<circle cx="50" cy="58" r="30"/><line x1="50" y1="28" x2="50" y2="88"/><line x1="28" y1="35" x2="28" y2="80"/><line x1="72" y1="35" x2="72" y2="80"/><path d="M50 28 q5 -12 -2 -18"/>'),
  pencil: ic('<path d="M20 60 l45 -45 l15 15 l-45 45 z"/><path d="M20 60 l-8 20 l20 -8 z"/><line x1="55" y1="25" x2="65" y2="35"/>'),

  queen: ic('<path d="M20 70 l0 -30 l15 15 l15 -25 l15 25 l15 -15 l0 30 z"/><circle cx="50" cy="30" r="4"/>'),
  question: ic('<path d="M35 30 q0 -15 15 -15 q18 0 18 15 q0 12 -15 15 q-3 1 -3 12"/><circle class="dot" cx="50" cy="75" r="4"/>'),
  quill: ic('<path d="M25 85 q10 -40 50 -65 q5 20 -15 40 q-20 20 -35 25 z"/><line x1="25" y1="85" x2="18" y2="92"/>'),

  rabbit: ic('<ellipse cx="50" cy="68" rx="22" ry="18"/><circle cx="50" cy="45" r="16"/><ellipse cx="40" cy="18" rx="7" ry="20"/><ellipse cx="60" cy="18" rx="7" ry="20"/><circle class="dot" cx="44" cy="42" r="2.5"/><circle class="dot" cx="56" cy="42" r="2.5"/>'),
  rainbow: ic('<path d="M10 80 a40 40 0 0 1 80 0"/><path d="M22 80 a28 28 0 0 1 56 0"/><path d="M34 80 a16 16 0 0 1 32 0"/>'),
  rocket: ic('<path d="M50 10 l15 35 h-30 z"/><rect x="35" y="45" width="30" height="30"/><path d="M35 65 l-12 15 v-15 z"/><path d="M65 65 l12 15 v-15 z"/><circle cx="50" cy="58" r="6"/>'),

  sun: ic('<circle cx="50" cy="50" r="18"/><line x1="50" y1="15" x2="50" y2="25"/><line x1="50" y1="75" x2="50" y2="85"/><line x1="15" y1="50" x2="25" y2="50"/><line x1="75" y1="50" x2="85" y2="50"/><line x1="26" y1="26" x2="33" y2="33"/><line x1="67" y1="67" x2="74" y2="74"/><line x1="74" y1="26" x2="67" y2="33"/><line x1="33" y1="67" x2="26" y2="74"/>'),
  snake: ic('<path d="M15 30 q20 -15 20 5 t20 5 t20 5 t15 20"/><circle class="dot" cx="82" cy="63" r="2.5"/><path d="M88 63 l8 -4 M88 63 l8 4"/>'),
  star: ic('<path d="M50 12 l11 28 l30 2 l-23 20 l8 30 l-26 -16 l-26 16 l8 -30 l-23 -20 l30 -2 z"/>'),

  tiger: ic('<circle cx="50" cy="55" r="28"/><path d="M28 35 l6 -18 l14 14"/><path d="M72 35 l-6 -18 l-14 14"/><circle class="dot" cx="40" cy="52" r="3"/><circle class="dot" cx="60" cy="52" r="3"/><path d="M46 62 q4 4 8 0"/><line x1="30" y1="42" x2="24" y2="38"/><line x1="32" y1="70" x2="25" y2="72"/><line x1="70" y1="42" x2="76" y2="38"/><line x1="68" y1="70" x2="75" y2="72"/>'),
  tree: ic('<circle cx="38" cy="35" r="18"/><circle cx="62" cy="35" r="18"/><circle cx="50" cy="22" r="18"/><rect x="44" y="50" width="12" height="35"/>'),
  turtle: ic('<path d="M20 55 a30 25 0 0 1 60 0 z"/><line x1="30" y1="50" x2="70" y2="50"/><line x1="50" y1="32" x2="50" y2="55"/><circle cx="50" cy="25" r="10"/><ellipse cx="18" cy="60" rx="8" ry="6"/><ellipse cx="82" cy="60" rx="8" ry="6"/><ellipse cx="28" cy="75" rx="8" ry="6"/><ellipse cx="72" cy="75" rx="8" ry="6"/>'),

  umbrella: ic('<path d="M15 50 a35 35 0 0 1 70 0 z"/><path d="M15 50 q9 8 18 0 q9 8 18 0 q9 8 18 0 q9 8 16 0"/><line x1="50" y1="50" x2="50" y2="82"/><path d="M50 82 q-10 8 0 12"/>'),
  unicorn: ic('<ellipse cx="42" cy="60" rx="26" ry="16"/><path d="M60 50 q20 -25 10 -40 l10 8 q6 20 -8 38"/><path d="M68 15 l6 -14 l4 12"/><circle class="dot" cx="68" cy="22" r="2.5"/><line x1="25" y1="74" x2="23" y2="90"/><line x1="55" y1="74" x2="53" y2="90"/>'),
  up: ic('<line x1="50" y1="85" x2="50" y2="20"/><path d="M30 40 l20 -20 l20 20"/>'),

  van: ic('<rect x="18" y="35" width="64" height="35" rx="6"/><rect x="55" y="42" width="18" height="14"/><circle cx="35" cy="72" r="9"/><circle cx="70" cy="72" r="9"/>'),
  violin: ic('<path d="M42 60 a10 10 0 1 1 0.1 0 z M58 60 a13 13 0 1 1 0.1 0 z"/><rect x="47" y="15" width="6" height="35"/><path d="M47 15 q-6 -6 0 -10"/><line x1="50" y1="50" x2="50" y2="85"/>'),
  volcano: ic('<path d="M20 85 l30 -60 l30 60 z"/><path d="M42 25 q4 -8 0 -14"/><path d="M52 25 q4 -8 0 -14"/>'),

  watermelon: ic('<path d="M15 55 a35 35 0 0 0 70 0 z"/><path d="M15 55 a35 8 0 0 0 70 0"/><circle class="dot" cx="35" cy="65" r="2"/><circle class="dot" cx="50" cy="72" r="2"/><circle class="dot" cx="65" cy="65" r="2"/>'),
  whale: ic('<path d="M15 55 q0 -25 35 -25 q35 0 35 25 q0 15 -20 18 l10 15 l-15 -8 q-25 0 -45 -25 z"/><path d="M50 20 l0 -10 M50 20 l8 -8"/><circle class="dot" cx="30" cy="42" r="2.5"/>'),
  watch: ic('<rect x="40" y="5" width="20" height="18" rx="3"/><rect x="40" y="77" width="20" height="18" rx="3"/><circle cx="50" cy="50" r="26"/><line x1="50" y1="50" x2="50" y2="32"/><line x1="50" y1="50" x2="64" y2="55"/>'),

  fox: ic('<path d="M50 30 l-25 30 q0 25 25 25 q25 0 25 -25 z"/><path d="M25 60 l-8 -22 l20 8 z"/><path d="M75 60 l8 -22 l-20 8 z"/><circle class="dot" cx="42" cy="55" r="2.5"/><circle class="dot" cx="58" cy="55" r="2.5"/><path d="M50 62 l-5 8 h10 z"/>'),
  box: ic('<rect x="20" y="40" width="45" height="40"/><path d="M20 40 l15 -15 h45 l-15 15"/><path d="M65 40 l15 -15 v40 l-15 15"/>'),
  six: ic('<path d="M62 22 q-30 5 -30 40 q0 22 18 22 q18 0 18 -18 q0 -16 -18 -16 q-10 0 -14 8"/>'),

  yoyo: ic('<circle cx="35" cy="35" r="18"/><circle cx="35" cy="80" r="18"/><line x1="35" y1="53" x2="35" y2="62"/>'),
  yarn: ic('<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="18"/><path d="M50 20 q30 5 20 35"/>'),
  yacht: ic('<line x1="45" y1="15" x2="45" y2="65"/><path d="M45 20 l30 45 h-30 z"/><path d="M20 65 h55 l-8 15 h-40 z"/>'),

  zebra: ic('<ellipse cx="42" cy="60" rx="26" ry="16"/><path d="M60 50 q20 -25 10 -40 l10 8 q6 20 -8 38"/><circle class="dot" cx="68" cy="22" r="2.5"/><line x1="25" y1="74" x2="23" y2="90"/><line x1="55" y1="74" x2="53" y2="90"/><line x1="35" y1="48" x2="30" y2="42"/><line x1="45" y1="70" x2="40" y2="75"/>'),
  zipper: ic('<line x1="35" y1="10" x2="35" y2="90"/><line x1="65" y1="10" x2="65" y2="90"/><path d="M35 20 l30 10 l-30 10 l30 10 l-30 10 l30 10 l-30 10 l30 10"/><rect x="45" y="85" width="10" height="10"/>'),
  zero: ic('<ellipse cx="50" cy="50" rx="24" ry="34"/>'),
};

WORD_ICONS.default = ic('<circle cx="50" cy="50" r="30"/><circle class="dot" cx="50" cy="50" r="4"/>');
