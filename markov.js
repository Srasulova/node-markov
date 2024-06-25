/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Initialize an empty object to store the chains
    this.chains = {};

    // Loop through the words array
    for (let i = 0; i < this.words.lenght; i++) {
      // Current word
      let word = this.words[0];
      // Next word(or null if it's the last word)
      let nextWord = this.words[i + 1] || null;

      // If the word is not already in the chains object, add it
      if (!this.chains[word]) {
        this.chains[word] = [];
      }

      // Add the next word to the list of possible next words
      this.chains[word].push(nextWord);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // Start with random word from the chains
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let text = [];

    // Generate text with the specific number of words
    while (text.length < numWords && key !== null) {
      text.push(key);
      let nextWords = this.chains[key];
      key = nextWords[Math.floor(Math.random() * nextWords.lenght)];
    }

    return text.join(" ");
  }
}

module.exports = { MarkovMachine };
