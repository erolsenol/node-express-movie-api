const httpStatus = require('http-status')
const { Movie, Point } = require('../models')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')

/**
 * Update comment
 * @param {Object} updateComment
 * @returns {Promise<Comment>}
 */
const postPoint = async (id, updateBody, ip) => {
  const movie = await Movie.findById(id)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  const point = await Point.findOne({ ip, movieId: id })
  logger.warn(`point item: ${point}`)
  if (!point) {
    return Point.create({ point: updateBody.point, movieId: id, ip })
  }
  return {
    error: true,
    message: 'Already exists',
  }
}

module.exports = {
  postPoint,
}
