const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { commentService } = require('../services')
// const logger = require('../config/logger')

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createCommentByMovieId(req.body)
  res.send(comment)
})

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateComment(req.params.id, req.body)
  res.send(comment)
})

const getComments = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const comments = await commentService.getCommentsByMovieId(
    req.params.movieId,
    options
  )
  if (!comments) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found')
  }
  res.send(comments)
})

module.exports = {
  createComment,
  getComments,
  updateComment,
}
