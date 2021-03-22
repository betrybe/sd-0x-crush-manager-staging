const joi = require('joi');

const RATE_ERR_MESSAGE = 'O campo "rate" deve ser um inteiro de 1 à 5';
const TALK_ERR_MESSAGE = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

module.exports = joi
  .object({
    name: joi.string().min(3).required(),
    age: joi
      .number()
      .integer()
      .min(18).message('A pessoa palestrante deve ser maior de idade')
      .required(),
    talk: joi.object({
      watchedAt: joi
        .string()
        .regex(/\d{2}\/\d{2}\/\d{4}/).message('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"')
        .required(),
      rate: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
          'any.required': TALK_ERR_MESSAGE,
          'number.base': RATE_ERR_MESSAGE,
          'number.min': RATE_ERR_MESSAGE,
          'number.max': RATE_ERR_MESSAGE,
        }),
    })
    .messages({
      'any.required': TALK_ERR_MESSAGE,
    })
    .required(),
  })
  .messages({
    'any.required': 'O campo {{#label}} é obrigatório',
    'string.min': 'O {{#label}} deve ter pelo menos {{#limit}} caracteres',
  });