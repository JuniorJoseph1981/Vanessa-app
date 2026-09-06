/* Writing & Phonics data — letter/number tracing sets and phonics word lists.
   Sounds are approximate phonetic spellings fed to the browser's built-in
   text-to-speech (Web Speech API) so it says a sound ("mmm") instead of a
   letter name ("em"). Quality depends on the device's installed voices. */

const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch => ({
  char: ch, kind: 'letter', spokenName: ch,
}));

/* Formation rhymes describe the pencil's path in a simple, rhythmic phrase —
   the same teaching technique used by UK phonics handwriting schemes, so a
   child says the rhyme as they trace instead of just copying a shape. */
const LOWERCASE_FORMATION_RHYMES = {
  a: 'Curl around, then straight back down.',
  b: 'Down the tall stick, then bump out round.',
  c: 'Curl like a little moon.',
  d: 'Curl around, up high, then straight down.',
  e: 'Slide across, then curl right round.',
  f: 'Down the stick, then a little cross.',
  g: 'Curl around, straight down, curl your tail.',
  h: 'Down the tall stick, then jump and bump.',
  i: 'Down, then a dot on top.',
  j: 'Down and curl, then a dot on top.',
  k: 'Down the stick, kick in and out.',
  l: 'Down the tall, tall stick.',
  m: 'Down, up and bump, up and bump.',
  n: 'Down, up and over the bump.',
  o: 'All the way round.',
  p: 'Down, down, then bump around.',
  q: 'All the way round, then a little tail.',
  r: 'Down a bit, then a little flick.',
  s: 'Curl back, then curl forward.',
  t: 'Down the stick, then cross it.',
  u: 'Down, curl round, then back up.',
  v: 'Down and up, like a smile.',
  w: 'Down, up, down, up.',
  x: 'Cross one way, cross the other.',
  y: 'Down and curl, then a long tail down.',
  z: 'Zig, then zag, then zig again.',
};

const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('').map(ch => ({
  char: ch, kind: 'letter', spokenName: ch, rhyme: LOWERCASE_FORMATION_RHYMES[ch],
}));

const NUMBER_FORMATION_RHYMES = {
  0: 'All the way round.',
  1: 'Straight down.',
  2: 'Curl over, slide along.',
  3: 'Curl in, curl in again.',
  4: 'Down, across, then down.',
  5: 'Down, curl round, cap on top.',
  6: 'Curl down, then loop around.',
  7: 'Across, then slide down.',
  8: 'Round the top, round the bottom.',
  9: 'Round the top, then straight down.',
};

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const NUMBERS = NUMBER_WORDS.map((word, n) => ({
  char: String(n), kind: 'number', spokenName: word, rhyme: NUMBER_FORMATION_RHYMES[n],
}));

/* Approximate phonics sound for each letter, written phonetically so
   speechSynthesis reads it as a sound rather than a letter name. */
const LETTER_SOUNDS = {
  a: 'aa', b: 'buh', c: 'kuh', d: 'duh', e: 'eh', f: 'ffff', g: 'guh',
  h: 'huh', i: 'ih', j: 'juh', k: 'kuh', l: 'llll', m: 'mmmm', n: 'nnnn',
  o: 'ah', p: 'puh', q: 'kwuh', r: 'rrrr', s: 'sss', t: 'tuh', u: 'uh',
  v: 'vvvv', w: 'wuh', x: 'ks', y: 'yuh', z: 'zzzz',
};

/* Phonics & spelling word bank, grouped by age band. Kept to short,
   common, sound-it-out-able words appropriate for early readers. */
const PHONICS_WORDS = [
  // 3-5: simple 3-letter CVC words
  { word: 'cat', ageBand: '3-5' },
  { word: 'dog', ageBand: '3-5' },
  { word: 'sun', ageBand: '3-5' },
  { word: 'pig', ageBand: '3-5' },
  { word: 'hat', ageBand: '3-5' },
  { word: 'bed', ageBand: '3-5' },
  { word: 'cup', ageBand: '3-5' },
  { word: 'pen', ageBand: '3-5' },
  { word: 'red', ageBand: '3-5' },
  { word: 'bug', ageBand: '3-5' },

  // 5-7: CVC plus simple blends/digraphs
  { word: 'fish', ageBand: '5-7' },
  { word: 'frog', ageBand: '5-7' },
  { word: 'milk', ageBand: '5-7' },
  { word: 'star', ageBand: '5-7' },
  { word: 'duck', ageBand: '5-7' },
  { word: 'nest', ageBand: '5-7' },
  { word: 'lamp', ageBand: '5-7' },
  { word: 'ship', ageBand: '5-7' },
  { word: 'crab', ageBand: '5-7' },
  { word: 'swim', ageBand: '5-7' },

  // 7-9: longer, everyday words
  { word: 'jump', ageBand: '7-9' },
  { word: 'plant', ageBand: '7-9' },
  { word: 'snack', ageBand: '7-9' },
  { word: 'spoon', ageBand: '7-9' },
  { word: 'chair', ageBand: '7-9' },
  { word: 'brush', ageBand: '7-9' },
  { word: 'clock', ageBand: '7-9' },
  { word: 'dream', ageBand: '7-9' },
  { word: 'friend', ageBand: '7-9' },
  { word: 'school', ageBand: '7-9' },
];
