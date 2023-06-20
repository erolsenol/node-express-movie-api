// const httpStatus = require('http-status')
// const pick = require('../utils/pick')
// const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { pointService } = require('../services')
// const logger = require('../config/logger')

const postPoint = catchAsync(async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const comment = await pointService.postPoint(req.params.movieId, req.body, ip)
  if (comment.error) {
    res.status(403).send(comment)
    return
  }
  res.send(comment)
})

module.exports = {
  postPoint,
}
