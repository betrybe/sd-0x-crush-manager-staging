const path = require('path');
const fs = require('fs').promises;

const TALKERS_FILE_PATH = path.resolve(__dirname, '..', 'talker.json');

function readTalkers() {
  return fs
    .readFile(TALKERS_FILE_PATH, 'utf-8')
    .then((content) => JSON.parse(content));
}

function writeTalkers(talkers) {
  return fs.writeFile(TALKERS_FILE_PATH, JSON.stringify(talkers));
}

module.exports = {
  TALKERS_FILE_PATH,
  readTalkers,
  writeTalkers,
};
