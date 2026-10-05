const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
    },
    spoiler: {
      type: Boolean,
      default: false,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON)
commentSchema.plugin(paginate)

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
