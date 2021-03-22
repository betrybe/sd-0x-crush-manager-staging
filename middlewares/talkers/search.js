const rescue = require('express-rescue');
const { readTalkers } = require('../../utils/fs');
const getAllTalkers = require('./getAll');

module.exports = [
  rescue(async (req, res, next) => {
    if (!req.query.q) return next();

    const searchTerm = req.query.q;

    const results = await readTalkers()
      .then((talkers) => talkers.filter((talker) => talker.name.includes(searchTerm)));
    
    res.status(200)
      .json(results);
  }),
  getAllTalkers,
];
