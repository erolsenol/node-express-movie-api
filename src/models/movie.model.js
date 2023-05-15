const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const movieSchema = mongoose.Schema(
  {
    plot: {
      type: String,
      required: true,
      trim: true,
    },
    fullplot: {
      type: String,
      required: true,
      trim: true,
    },
    genres: {
      type: Array,
    },
    runtime: {
      type: Number,
    },
    cast: {
      type: Array,
    },
    num_comments: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    countries: {
      type: Array,
    },
    released: {
      type: Date,
    },
    directors: {
      type: Array,
    },
    rated: {
      type: String,
    },
    awards: {
      type: Object,
    },
    lastupdated: {
      type: String,
    },
    year: {
      type: String,
    },
    imdb: {
      type: Object,
    },
    type: {
      type: String,
    },
    tomatoes: {
      type: Object,
    },
    qualities: {
      type: Array,
    },
    urls: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
movieSchema.plugin(toJSON)
movieSchema.plugin(paginate)

/**
 * @typedef Movie
 */
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
