/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markovText = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
  let markovM = new markovText.MarkovMachine(text);
  console.log(markovM);
}

// read file and generate text
function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Can't read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

// read URL and make text from it

async function makeURLText(URL) {
  let res;

  try {
    res = await axios.get(URL);
  } catch (error) {
    console.error(`Can't read file from: ${URL}: ${error}`);
    process.exit(1);
  }
  generateText(res.data);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
} else if (method === "URL") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
