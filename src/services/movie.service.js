const httpStatus = require('http-status')
const { Movie } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a movie
 * @param {Object} movieBody
 * @returns {Promise<Movie>}
 */
const createMovie = async (movieBody) => {
  // if (await Movie.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  // }
  return Movie.create(movieBody)
}

/**
 * Query for movies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMovies = async (filter, options) => {
  const movies = await Movie.paginate(filter, options)
  return movies
}

/**
 * Get movie by id
 * @param {ObjectId} id
 * @returns {Promise<Movie>}
 */
const getMovieById = async (id) => {
  return Movie.findById(id)
}

/**
 * Get movie by title
 * @param {String} title
 * @returns {Promise<Movie>}
 */
const getMovieByTitle = async (title) => {
  return Movie.findById(title)
}

/**
 * Update movie by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Movie>}
 */
const updateMovieById = async (movieId, updateBody) => {
  const movie = await getMovieById(movieId)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  Object.assign(movie, updateBody)
  await movie.save()
  return movie
}

/**
 * Delete movie by id
 * @param {ObjectId} userId
 * @returns {Promise<Movie>}
 */
const deleteMovieById = async (movieId) => {
  const movie = await getMovieById(movieId)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }
  await movie.remove()
  return movie
}

const uploadImage = async (movieId, imageBody) => {
  const movie = await getMovieById(movieId)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  movie.imgs = [...movie.imgs, ...imageBody.imgs]
  await movie.save()
  return movie
}

const getMovieByTitleOne = async (titleBody) => {
  const movie = await getMovieByTitle(titleBody)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  return movie
}

module.exports = {
  createMovie,
  queryMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  uploadImage,
  getMovieByTitleOne,
}
