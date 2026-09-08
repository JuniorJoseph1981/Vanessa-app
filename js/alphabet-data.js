/* Alphabet worksheet data — one entry per letter with sound-picture
   vocabulary used for both the "pictures that start with this sound"
   recognition row and the "trace the words" section. */

const ALPHABET = [
  { letter: 'A', lower: 'a', words: [['Apple', '🍎'], ['Ant', '🐜'], ['Astronaut', '👨‍🚀']] },
  { letter: 'B', lower: 'b', words: [['Ball', '⚽'], ['Banana', '🍌'], ['Butterfly', '🦋']] },
  { letter: 'C', lower: 'c', words: [['Cat', '🐱'], ['Cup', '🥤'], ['Car', '🚗']] },
  { letter: 'D', lower: 'd', words: [['Dog', '🐶'], ['Duck', '🦆'], ['Drum', '🥁']] },
  { letter: 'E', lower: 'e', words: [['Elephant', '🐘'], ['Egg', '🥚'], ['Envelope', '✉️']] },
  { letter: 'F', lower: 'f', words: [['Fish', '🐟'], ['Frog', '🐸'], ['Flower', '🌸']] },
  { letter: 'G', lower: 'g', words: [['Goat', '🐐'], ['Grapes', '🍇'], ['Guitar', '🎸']] },
  { letter: 'H', lower: 'h', words: [['Hat', '🎩'], ['Horse', '🐴'], ['House', '🏠']] },
  { letter: 'I', lower: 'i', words: [['Ice Cream', '🍦'], ['Insect', '🐛'], ['Igloo', '🧊']] },
  { letter: 'J', lower: 'j', words: [['Jacket', '🧥'], ['Juice', '🧃'], ['Jellyfish', '🪼']] },
  { letter: 'K', lower: 'k', words: [['Kite', '🪁'], ['Kangaroo', '🦘'], ['Key', '🔑']] },
  { letter: 'L', lower: 'l', words: [['Lion', '🦁'], ['Leaf', '🍃'], ['Lamp', '💡']] },
  { letter: 'M', lower: 'm', words: [['Monkey', '🐒'], ['Moon', '🌙'], ['Mouse', '🐭']] },
  { letter: 'N', lower: 'n', words: [['Nest', '🪺'], ['Nut', '🥜'], ['Notebook', '📓']] },
  { letter: 'O', lower: 'o', words: [['Orange', '🍊'], ['Octopus', '🐙'], ['Owl', '🦉']] },
  { letter: 'P', lower: 'p', words: [['Pig', '🐷'], ['Pumpkin', '🎃'], ['Pencil', '✏️']] },
  { letter: 'Q', lower: 'q', words: [['Queen', '👸'], ['Question', '❓'], ['Quill', '🪶']] },
  { letter: 'R', lower: 'r', words: [['Rabbit', '🐰'], ['Rainbow', '🌈'], ['Rocket', '🚀']] },
  { letter: 'S', lower: 's', words: [['Sun', '☀️'], ['Snake', '🐍'], ['Star', '⭐']] },
  { letter: 'T', lower: 't', words: [['Tiger', '🐯'], ['Tree', '🌳'], ['Turtle', '🐢']] },
  { letter: 'U', lower: 'u', words: [['Umbrella', '☂️'], ['Unicorn', '🦄'], ['Up', '⬆️']] },
  { letter: 'V', lower: 'v', words: [['Van', '🚐'], ['Violin', '🎻'], ['Volcano', '🌋']] },
  { letter: 'W', lower: 'w', words: [['Watermelon', '🍉'], ['Whale', '🐳'], ['Watch', '⌚']] },
  { letter: 'X', lower: 'x', words: [['Fox', '🦊'], ['Box', '📦'], ['Six', '6️⃣']], note: '"X" is usually taught by its ending sound, as in fox and box.' },
  { letter: 'Y', lower: 'y', words: [['Yo-yo', '🪀'], ['Yarn', '🧶'], ['Yacht', '⛵']] },
  { letter: 'Z', lower: 'z', words: [['Zebra', '🦓'], ['Zipper', '🤐'], ['Zero', '0️⃣']] },
];

/* Letters that look similar in shape, grouped so the "find and color"
   grid mixes in plausible look-alikes rather than random decoys. */
const CONFUSABLE_GROUPS = [
  ['a', 'c', 'e', 'o', 's'],
  ['b', 'd', 'p', 'q'],
  ['m', 'n', 'h', 'r', 'u'],
  ['i', 'j', 'l', 't', 'f'],
  ['v', 'w', 'x', 'y', 'k', 'z'],
  ['g'],
];
