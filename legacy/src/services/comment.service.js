const httpStatus = require('http-status')
const { Comment } = require('../models')
const ApiError = require('../utils/ApiError')
/**
 * Create comment
 * @param {Object} createComment
 * @returns {Promise<Comment>}
 */
const createCommentByMovieId = async (createCommentBody) => {
  return Comment.create(createCommentBody)
}

/**
 * Update comment
 * @param {Object} updateComment
 * @returns {Promise<Comment>}
 */
const updateComment = async (id, updateBody) => {
  const comment = await Comment.findById(id)
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }

  Object.assign(comment, updateBody)
  await comment.save()
  return comment
}

/**
 * Get comments by movie id
 * @param {ObjectId} MovieId
 * @returns {Promise<Comments>}
 */
const getCommentsByMovieId = async (
  id,
  {
    page = 1,
    limit = 20,
    // sortBy = 'desc'
  }
) => {
  let totalCount = 0

  await Comment.countDocuments({ movieId: id }, function (err, count) {
    totalCount = count
  })
  const comments = await Comment.find({ movieId: id }).skip(page).limit(limit)

  const res = {
    results: comments,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalResults: totalCount,
  }

  return res
}

module.exports = {
  createCommentByMovieId,
  getCommentsByMovieId,
  updateComment,
}
