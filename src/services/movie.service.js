const httpStatus = require('http-status')
const { Movie } = require('../models')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')

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

const filterMovies = async (
  body,
  { page = 1, limit = 20, sortBy = 'desc' }
) => {
  const findObj = {}

  Object.keys(body).forEach((key) => {
    if (key === 'title') {
      findObj[key] = { $regex: body[key], $options: 'i' }
    } else {
      findObj[key] = { $in: body[key] }
    }
  })

  let totalCount = 0

  await Movie.countDocuments(findObj, function (err, count) {
    totalCount = count
  })

  const movies = await Movie.find(findObj).skip(page).limit(limit)

  const res = {
    results: movies,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalResults: totalCount,
  }

  return res
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
const getMovieByTitle = async (body) => {
  return Movie.find({ title: body.title })
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

const searchTitle = async (body, { limit = 20, page = 0 }) => {
  const movie = await Movie.find({
    title: { $regex: body.title, $options: 'i' },
  })
    .skip(Number(page) * Number(limit))
    .limit(Number(limit))
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  // movie.forEach((element) => logger.warn(element.title))

  // logger.warn(`movie: ${movie.length}`)

  return movie
}

const getMovieByTitleOne = async (titleBody) => {
  logger.warn(titleBody.title)
  const movie = await getMovieByTitle(titleBody)

  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  return movie
}

const getMovieBySourceUrl = async (body) => {
  const movie = await Movie.find({ sourceUrl: body.sourceUrl })

  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }

  return movie
}

const deleteAllImg = async () => {
  const result = await Movie.updateMany({}, { $unset: { img: '' } })

  return result
}

module.exports = {
  createMovie,
  queryMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  uploadImage,
  getMovieByTitleOne,
  deleteAllImg,
  getMovieBySourceUrl,
  searchTitle,
  filterMovies,
}
