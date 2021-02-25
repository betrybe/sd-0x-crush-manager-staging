const crypto = require('crypto');
const joi = require('joi');
const rescue = require('express-rescue');

const loginSchema = joi.object({
  email: joi
    .string()
    .email().message('O "email" deve ter o formato "email@email.com"')
    .not()
    .empty()
    .required(),
  password: joi
    .string()
    .min(6).message('O "password" deve ter pelo menos 6 caracteres')
    .required(),
})
  .messages({
    'any.required': 'O campo {{#label}} é obrigatório',
  });

module.exports = rescue(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const token = crypto.randomBytes(8).toString('hex');

  res.status(200).json({ token });
});
