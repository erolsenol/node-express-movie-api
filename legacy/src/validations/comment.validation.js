const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createComment = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    text: Joi.string().required(),
    email: Joi.string(),
    spoiler: Joi.bool(),
    movieId: Joi.string().custom(objectId).required(),
  }),
}

const updateComment = {
  body: Joi.object()
    .keys({
      text: Joi.string(),
      spoiler: Joi.bool(),
    })
    .min(1),
}

const getComments = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId).required(),
  }),
}

module.exports = {
  createComment,
  getComments,
  updateComment,
}
