const joi = require('joi');

const TOKEN_REGEX = /[a-z0-9]{16}/i;

const tokenSchema = joi
  .string()
  .pattern(TOKEN_REGEX).message('Token inválido')
  .messages({
    'any.required': 'Token não encontrado',
  })
  .required();

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  const { error } = tokenSchema.validate(token);

  if (error) {
    error.status = 401;
    return next(error);
  }

  return next();
};
