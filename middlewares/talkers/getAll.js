const rescue = require('express-rescue');
const { readTalkers } = require('../../utils/fs');

module.exports = rescue(async (req, res) => {
  const talkers = await readTalkers();

  res.status(200).json(talkers);
});
