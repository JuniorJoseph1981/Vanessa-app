/* Spark Station — Alphabet Worksheets. Builds printable A-Z letter-formation
   worksheets (find-the-letter grid, sound pictures, trace-the-letter,
   trace-the-words, and an editable trace-your-name line) using the same
   single-story literacy font as the tracing tool, rendered as a dashed
   "trace me" outline instead of a solid fill. */

const NAME_STORAGE_KEY = 'sparkstation.childName.v1';
const WORKSHEET_FONT = 'Andika, system-ui, sans-serif';

const wsState = {
  index: 0,
  childName: '',
};

/* ---------------- Deterministic helpers ---------------- */

function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleSeeded(arr, seed) {
  const rnd = mulberry32(seed);
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildDecoyGrid(lower) {
  const seed = lower.charCodeAt(0);
  const group = CONFUSABLE_GROUPS.find(g => g.includes(lower)) || [lower];
  const sameGroupDecoys = shuffleSeeded(group.filter(c => c !== lower), seed);
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    .filter(c => c !== lower && !sameGroupDecoys.includes(c));
  const randomDecoy = shuffleSeeded(allLetters, seed + 7)[0];

  const decoys = sameGroupDecoys.slice(0, 2);
  decoys.push(randomDecoy);

  const cells = [];
  for (let i = 0; i < 4; i++) cells.push(i < 2 ? lower.toUpperCase() : lower);
  for (let i = 0; i < 8; i++) {
    const d = decoys[i % decoys.length];
    cells.push(i % 2 === 0 ? d.toUpperCase() : d);
  }
  return shuffleSeeded(cells, seed * 13 + 3);
}

/* ---------------- Canvas rendering ---------------- */

function drawRuledLines(ctx, width, topY, midY, baseY) {
  ctx.setLineDash([]);
  ctx.strokeStyle = '#C7D6D3';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(8, topY); ctx.lineTo(width - 8, topY); ctx.stroke();

  ctx.setLineDash([6, 6]);
  ctx.beginPath(); ctx.moveTo(8, midY); ctx.lineTo(width - 8, midY); ctx.stroke();

  ctx.setLineDash([]);
  ctx.strokeStyle = '#8FA6A3';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(8, baseY); ctx.lineTo(width - 8, baseY); ctx.stroke();
}

function makeTraceCanvas(text, { width, height, fontSize }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const baseY = height * 0.72;
  const topY = height * 0.18;
  const midY = (topY + baseY) / 2;
  drawRuledLines(ctx, width, topY, midY, baseY);

  let fs = fontSize;
  const maxWidth = width - 40;
  ctx.font = `bold ${fs}px ${WORKSHEET_FONT}`;
  while (ctx.measureText(text).width > maxWidth && fs > 14) {
    fs -= 4;
    ctx.font = `bold ${fs}px ${WORKSHEET_FONT}`;
  }
  const textWidth = ctx.measureText(text).width;
  const x = (width - textWidth) / 2;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.setLineDash([Math.max(3, fs * 0.06), Math.max(3, fs * 0.05)]);
  ctx.lineWidth = Math.max(1.5, fs * 0.022);
  ctx.strokeStyle = '#B7AE9A';
  ctx.strokeText(text, x, baseY);

  return canvas;
}

/* ---------------- Worksheet HTML ---------------- */

function buildWorksheetHtml(entry, childName) {
  const { letter, lower, words, note } = entry;

  const gridHtml = buildDecoyGrid(lower)
    .map(ch => `<span class="ws-grid-cell">${ch}</span>`)
    .join('');

  const picturesHtml = words.map(([word, emoji]) => `
    <div class="ws-picture">
      <span class="ws-picture-emoji">${emoji}</span>
      <span class="ws-picture-label">${word}</span>
    </div>
  `).join('');

  const letterImg = makeTraceCanvas(`${letter}${lower}`, { width: 480, height: 340, fontSize: 220 }).toDataURL('image/png');
  const wordImgs = words.map(([word]) => makeTraceCanvas(word, { width: 720, height: 150, fontSize: 84 }).toDataURL('image/png'));
  const nameText = childName ? `${childName}   ${childName}   ${childName}` : '';
  const nameImg = makeTraceCanvas(nameText || '_______________', { width: 720, height: 150, fontSize: 78 }).toDataURL('image/png');

  return `
    <section class="worksheet-page">
      <h2 class="worksheet-title">Learn the Letter ${letter}${lower}</h2>

      <div class="worksheet-row">
        <div class="worksheet-box">
          <p class="worksheet-label">Find and color the letter ${letter}${lower}.</p>
          <div class="ws-grid">${gridHtml}</div>
        </div>
        <div class="worksheet-box">
          <p class="worksheet-label">Pictures that start with the /${lower}/ sound.</p>
          <div class="ws-pictures">${picturesHtml}</div>
          ${note ? `<p class="worksheet-note">${note}</p>` : ''}
        </div>
      </div>

      <div class="worksheet-box">
        <p class="worksheet-label">Trace the letter:</p>
        <img class="ws-trace-img ws-trace-letter" src="${letterImg}" alt="Trace the letter ${letter}${lower}" />
      </div>

      <div class="worksheet-box">
        <p class="worksheet-label">Trace the words:</p>
        ${wordImgs.map((src, i) => `<img class="ws-trace-img ws-trace-word" src="${src}" alt="Trace ${words[i][0]}" />`).join('')}
      </div>

      <div class="worksheet-box">
        <p class="worksheet-label">Trace your name:</p>
        <img class="ws-trace-img ws-trace-name" src="${nameImg}" alt="Trace your name" />
      </div>
    </section>
  `;
}

/* ---------------- Page controller ---------------- */

function renderCurrentWorksheet() {
  const entry = ALPHABET[wsState.index];
  document.getElementById('worksheet-preview').innerHTML = buildWorksheetHtml(entry, wsState.childName);
  document.querySelectorAll('.letter-nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === wsState.index);
  });
  document.getElementById('ws-current-label').textContent = `Letter ${wsState.index + 1} of ${ALPHABET.length}: ${entry.letter}${entry.lower}`;
}

function buildLetterNav() {
  const nav = document.getElementById('letter-nav');
  ALPHABET.forEach((entry, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'letter-nav-btn';
    btn.textContent = entry.letter;
    btn.addEventListener('click', () => {
      wsState.index = i;
      renderCurrentWorksheet();
    });
    nav.appendChild(btn);
  });
}

function printDateMeta() {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return `<div class="print-meta"><span>Teacher: ________________________</span><span>Date: ${today}</span></div>`;
}

function printCurrentWorksheet() {
  const entry = ALPHABET[wsState.index];
  const sheet = document.getElementById('print-sheet');
  sheet.innerHTML = `
    <div class="print-sheet-inner">
      <div class="print-sheet-brand">✨ Spark Station — Alphabet Worksheets</div>
      ${printDateMeta()}
      ${buildWorksheetHtml(entry, wsState.childName)}
    </div>
  `;
  window.print();
}

function printFullAlphabet() {
  const pages = ALPHABET.map(entry => buildWorksheetHtml(entry, wsState.childName)).join('');
  const sheet = document.getElementById('print-sheet');
  sheet.innerHTML = `
    <div class="print-sheet-inner">
      <div class="print-sheet-brand">✨ Spark Station — Alphabet Worksheets (A–Z)</div>
      ${printDateMeta()}
      ${pages}
    </div>
  `;
  window.print();
}

function initAlphabetWorksheets() {
  buildLetterNav();

  const nameInput = document.getElementById('child-name-input');
  const savedName = localStorage.getItem(NAME_STORAGE_KEY);
  if (savedName) {
    nameInput.value = savedName;
    wsState.childName = savedName;
  }
  nameInput.addEventListener('input', () => {
    wsState.childName = nameInput.value.trim();
    try { localStorage.setItem(NAME_STORAGE_KEY, wsState.childName); } catch (e) { /* storage unavailable */ }
    renderCurrentWorksheet();
  });

  document.getElementById('ws-prev').addEventListener('click', () => {
    wsState.index = (wsState.index - 1 + ALPHABET.length) % ALPHABET.length;
    renderCurrentWorksheet();
  });
  document.getElementById('ws-next').addEventListener('click', () => {
    wsState.index = (wsState.index + 1) % ALPHABET.length;
    renderCurrentWorksheet();
  });
  document.getElementById('ws-print-current').addEventListener('click', printCurrentWorksheet);
  document.getElementById('ws-print-all').addEventListener('click', printFullAlphabet);

  const ready = (document.fonts && document.fonts.load)
    ? document.fonts.load(`bold 220px ${WORKSHEET_FONT}`).finally(() => document.fonts.ready)
    : Promise.resolve();
  Promise.resolve(ready).then(renderCurrentWorksheet);
}

document.addEventListener('DOMContentLoaded', initAlphabetWorksheets);
