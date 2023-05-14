const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { userService, movieService } = require('../services')

const createMovie = catchAsync(async (req, res) => {
  const movie = await movieService.createMovie(req.body)
  res.status(httpStatus.CREATED).send(movie)
})

const getMovies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await movieService.queryMovies(filter, options)
  res.send(result)
})

const getMovie = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.movieId)
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }
  res.send(movie)
})

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user)
})

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateUser,
  deleteUser,
}
