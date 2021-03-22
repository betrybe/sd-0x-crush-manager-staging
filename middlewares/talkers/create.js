const rescue = require('express-rescue');
const talkerSchema = require('../../schemas/talker');

const { readTalkers, writeTalkers } = require('../../utils/fs');

module.exports = rescue(async (req, res, next) => {
  const { error } = talkerSchema.validate(req.body || {});

  if (error) return next(error);

  const talkers = await readTalkers();
  const id = Math.max(...talkers.map((talker) => talker.id)) + 1;
  
  const newTalker = {
    id,
    ...req.body,
  };

  talkers.push(newTalker);

  await writeTalkers(talkers);

  res.status(201).json(newTalker);
});
