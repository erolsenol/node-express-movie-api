const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const pointSchema = mongoose.Schema(
  {
    point: {
      type: Number,
      trim: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
pointSchema.plugin(toJSON)
pointSchema.plugin(paginate)

/**
 * @typedef Point
 */
const Point = mongoose.model('Point', pointSchema)

module.exports = Point
