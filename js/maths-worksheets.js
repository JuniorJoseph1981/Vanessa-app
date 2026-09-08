/* Spark Station — Maths Practice.
   Original worksheets inspired by the Concrete-Pictorial-Abstract (CPA)
   approach used across UK primary maths teaching (part-whole models, bar
   models, ten frames, number lines, arrays) — a well-known methodology,
   not the copyrighted worksheets or branding of any particular scheme. */

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const COUNT_EMOJI = ['🍎', '⭐', '🐝', '🚗', '🎈', '🐟', '🍓', '🦋', '🌸', '🧸'];

/* ---------------- Diagram builders (plain HTML/CSS/SVG) ---------------- */

function tenFrameHtml(filled) {
  let cells = '';
  for (let i = 0; i < 10; i++) {
    cells += `<span class="mw-tf-cell ${i < filled ? 'filled' : ''}"></span>`;
  }
  return `<div class="mw-ten-frame">${cells}</div>`;
}

function partWholeSvg(whole, partA, partB) {
  const w = whole === null ? '?' : whole;
  const a = partA === null ? '?' : partA;
  const b = partB === null ? '?' : partB;
  return `
    <svg viewBox="0 0 200 150" class="mw-part-whole-svg" role="img" aria-label="Part-whole model">
      <line x1="100" y1="42" x2="55" y2="112" stroke="#8FA6A3" stroke-width="3"/>
      <line x1="100" y1="42" x2="145" y2="112" stroke="#8FA6A3" stroke-width="3"/>
      <circle cx="100" cy="32" r="28" fill="#fff" stroke="#3E7C82" stroke-width="3"/>
      <text x="100" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="#2B2A28">${w}</text>
      <circle cx="50" cy="122" r="26" fill="#fff" stroke="#C97B4A" stroke-width="3"/>
      <text x="50" y="130" text-anchor="middle" font-size="20" font-weight="700" fill="#2B2A28">${a}</text>
      <circle cx="150" cy="122" r="26" fill="#fff" stroke="#C97B4A" stroke-width="3"/>
      <text x="150" y="130" text-anchor="middle" font-size="20" font-weight="700" fill="#2B2A28">${b}</text>
    </svg>
  `;
}

function barModelHtml(total, partA, partB) {
  const totalText = total === null ? '?' : total;
  const aText = partA === null ? '?' : partA;
  const bText = partB === null ? '?' : partB;
  let pctA = 50;
  if (typeof partA === 'number' && typeof partB === 'number' && (partA + partB) > 0) {
    pctA = Math.max(18, Math.min(82, Math.round((partA / (partA + partB)) * 100)));
  }
  const pctB = 100 - pctA;
  return `
    <div class="mw-bar-model">
      <div class="mw-bar mw-bar-total">${totalText}</div>
      <div class="mw-bar-row">
        <div class="mw-bar mw-bar-part" style="flex-basis:${pctA}%">${aText}</div>
        <div class="mw-bar mw-bar-part mw-bar-part-b" style="flex-basis:${pctB}%">${bText}</div>
      </div>
    </div>
  `;
}

function numberLineHtml(max) {
  let ticks = '';
  for (let i = 0; i <= max; i++) {
    ticks += `<div class="mw-nl-tick"><span class="mw-nl-num">${i}</span></div>`;
  }
  return `<div class="mw-number-line">${ticks}</div>`;
}

function arrayHtml(rows, cols) {
  let rowsHtml = '';
  for (let r = 0; r < rows; r++) {
    let cells = '';
    for (let c = 0; c < cols; c++) cells += `<span class="mw-array-dot"></span>`;
    rowsHtml += `<div class="mw-array-row">${cells}</div>`;
  }
  return `<div class="mw-array">${rowsHtml}</div>`;
}

function fractionShapeHtml(parts, shaded) {
  let cells = '';
  for (let i = 0; i < parts; i++) cells += `<span class="mw-frac-cell ${i < shaded ? 'shaded' : ''}"></span>`;
  return `<div class="mw-fraction-shape" style="grid-template-columns:repeat(${parts},1fr)">${cells}</div>`;
}

function countRowHtml(emoji, n) {
  const items = Array(n).fill(`<span class="mw-count-item">${emoji}</span>`).join('');
  return `<div class="mw-count-row">${items}</div>`;
}

function problemCard(label, bodyHtml) {
  return `<div class="maths-problem"><p class="maths-problem-label">${label}</p>${bodyHtml}</div>`;
}

/* ---------------- Per-band worksheet generators ---------------- */

function generateYoung() {
  const cards = [];

  // Count and write
  for (let i = 0; i < 2; i++) {
    const n = randInt(3, 10);
    const emoji = COUNT_EMOJI[randInt(0, COUNT_EMOJI.length - 1)];
    cards.push(problemCard(
      'Count and write how many.',
      `${countRowHtml(emoji, n)}<div class="mw-answer-box"></div>`
    ));
  }

  // Ten frame
  {
    const n = randInt(3, 9);
    cards.push(problemCard(
      'How many dots? How many more to make 10?',
      `${tenFrameHtml(n)}<div class="mw-stem">There are <span class="mw-answer-box mw-answer-box-inline"></span> dots. <span class="mw-answer-box mw-answer-box-inline"></span> more make 10.</div>`
    ));
  }

  // More or fewer
  {
    let a = randInt(2, 8), b = randInt(2, 8);
    while (b === a) b = randInt(2, 8);
    const emojiA = COUNT_EMOJI[randInt(0, COUNT_EMOJI.length - 1)];
    let emojiB = COUNT_EMOJI[randInt(0, COUNT_EMOJI.length - 1)];
    while (emojiB === emojiA) emojiB = COUNT_EMOJI[randInt(0, COUNT_EMOJI.length - 1)];
    cards.push(problemCard(
      'Circle the group with more.',
      `<div class="mw-compare-row">
        <div class="mw-compare-group">${countRowHtml(emojiA, a)}</div>
        <div class="mw-compare-group">${countRowHtml(emojiB, b)}</div>
      </div>`
    ));
  }

  return cards;
}

function generateMiddle() {
  const cards = [];

  // Number bonds to 10 (part-whole model), a few variants
  for (let i = 0; i < 2; i++) {
    const whole = 10;
    const a = randInt(1, 9);
    const b = whole - a;
    const hideWhole = Math.random() < 0.2;
    cards.push(problemCard(
      'Complete the number bond.',
      `${partWholeSvg(hideWhole ? null : whole, a, i % 2 === 0 ? null : b)}
       <div class="mw-stem">${a} and <span class="mw-answer-box mw-answer-box-inline"></span> make ${whole}.</div>`
    ));
  }

  // Addition on a blank number line
  {
    const start = randInt(2, 12);
    const add = randInt(2, 7);
    cards.push(problemCard(
      `${start} + ${add} = ?  (draw jumps on the number line)`,
      numberLineHtml(20)
    ));
  }

  // Bar model addition
  {
    const a = randInt(3, 12);
    const b = randInt(3, 12);
    const total = a + b;
    const hideA = Math.random() < 0.5;
    cards.push(problemCard(
      'Complete the bar model.',
      barModelHtml(total, hideA ? null : a, hideA ? b : null)
    ));
  }

  return cards;
}

const WORD_PROBLEM_NAMES = ['Sam', 'Priya', 'Leo', 'Ade', 'Freya', 'Noah'];
const WORD_PROBLEM_ITEMS = ['apples', 'stickers', 'marbles', 'football cards', 'pencils', 'sweets'];

function generateOlder() {
  const cards = [];

  // Bar model word problem
  {
    const name = WORD_PROBLEM_NAMES[randInt(0, WORD_PROBLEM_NAMES.length - 1)];
    const item = WORD_PROBLEM_ITEMS[randInt(0, WORD_PROBLEM_ITEMS.length - 1)];
    const total = randInt(20, 60);
    const used = randInt(5, total - 5);
    cards.push(problemCard(
      `${name} has ${total} ${item}. ${name} gives away ${used}. How many are left?`,
      `${barModelHtml(total, used, null)}<div class="mw-stem">Number sentence: <span class="mw-answer-box mw-answer-box-inline mw-answer-box-wide"></span></div>`
    ));
  }

  // Arrays & multiplication
  {
    const rows = randInt(2, 5);
    const cols = randInt(2, 6);
    cards.push(problemCard(
      'Complete the multiplication sentence for this array.',
      `${arrayHtml(rows, cols)}<div class="mw-stem">${rows} × ${cols} = <span class="mw-answer-box mw-answer-box-inline"></span></div>`
    ));
  }

  // Fractions of shapes
  {
    const parts = [2, 4, 4, 8][randInt(0, 3)];
    const shaded = randInt(1, parts - 1);
    cards.push(problemCard(
      'What fraction is shaded?',
      `${fractionShapeHtml(parts, shaded)}<div class="mw-stem">Fraction shaded: <span class="mw-answer-box mw-answer-box-inline"></span> / <span class="mw-answer-box mw-answer-box-inline"></span></div>`
    ));
  }

  return cards;
}

const BAND_GENERATORS = {
  '3-5': { label: 'Counting, comparing & number sense (EYFS)', generate: generateYoung },
  '5-7': { label: 'Number bonds, addition & bar models (KS1, Y1–Y2)', generate: generateMiddle },
  '7-9': { label: 'Bar models, arrays & fractions (KS1, Y2–Y3)', generate: generateOlder },
};

/* ---------------- Page controller ---------------- */

const mathsState = { band: '3-5', cards: [] };

function renderMaths() {
  const info = BAND_GENERATORS[mathsState.band];
  document.getElementById('maths-band-label').textContent = info.label;
  document.getElementById('maths-preview').innerHTML = mathsState.cards.join('');
}

function generateNewSet() {
  mathsState.cards = BAND_GENERATORS[mathsState.band].generate();
  renderMaths();
}

function printMathsSet() {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const info = BAND_GENERATORS[mathsState.band];
  const sheet = document.getElementById('print-sheet');
  sheet.innerHTML = `
    <div class="print-sheet-inner">
      <div class="print-sheet-brand">✨ Spark Station — Maths Practice</div>
      <div class="print-meta"><span>${info.label}</span><span>Date: ${today}</span></div>
      <div class="maths-print-grid">${mathsState.cards.join('')}</div>
    </div>
  `;
  window.print();
}

function initMathsWorksheets() {
  document.querySelectorAll('#maths-age-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      mathsState.band = btn.dataset.age;
      document.querySelectorAll('#maths-age-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      generateNewSet();
    });
  });
  document.getElementById('maths-generate').addEventListener('click', generateNewSet);
  document.getElementById('maths-print').addEventListener('click', printMathsSet);

  generateNewSet();
}

document.addEventListener('DOMContentLoaded', initMathsWorksheets);
