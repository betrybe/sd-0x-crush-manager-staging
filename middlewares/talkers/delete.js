const rescue = require('express-rescue');
const { readTalkers, writeTalkers } = require('../../utils/fs');

module.exports = rescue(async (req, res) => {
  const talkerId = parseInt(req.params.talkerId, 10);

  const talkers = await readTalkers();

  const newTalkers = talkers.filter((talker) => talker.id !== talkerId);

  await writeTalkers(newTalkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
