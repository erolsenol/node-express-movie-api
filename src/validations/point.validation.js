const Joi = require('joi')
const { objectId } = require('./custom.validation')

const postPoint = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    point: Joi.number().integer().min(1).max(10).required(),
  }),
}

module.exports = {
  postPoint,
}
