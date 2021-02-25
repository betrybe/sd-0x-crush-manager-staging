const boom = require('boom');
const rescue = require('express-rescue');
const talkerSchema = require('../../schemas/talker');

const { readTalkers, writeTalkers } = require('../../utils/fs');

function updateTalker(talkers, newTalker) {
  return talkers.map((talker) => (talker.id === newTalker.id ? newTalker : talker));
}

module.exports = rescue(async (req, res, next) => {
  const talkerId = parseInt(req.params.id, 10);
  const { error } = talkerSchema.validate(req.body);
  
  if (error) {
    return next(error);
  }

  const talkers = await readTalkers();
  const oldTalker = talkers.find((talker) => talker.id === talkerId);

  if (!oldTalker) {
    return next(boom.notFound('Pessoa palestrante não encontrada'));
  }

  const newTalker = { ...oldTalker, ...req.body };
  await writeTalkers(updateTalker(talkers, newTalker));

  res.status(200).json(newTalker);
});