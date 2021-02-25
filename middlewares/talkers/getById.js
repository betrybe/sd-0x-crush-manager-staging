const boom = require('boom');
const rescue = require('express-rescue');
const { readTalkers } = require('../../utils/fs');

module.exports = rescue(async (req, res, next) => {
  const talkerId = parseInt(req.params.id, 10);
  const talkers = await readTalkers();

  const talker = talkers.find((t) => t.id === talkerId);

  if (!talker) {
    return next(boom.notFound('Pessoa palestrante não encontrada'));
  }

  return res.status(200).json(talker);
});
