const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const movieSchema = mongoose.Schema(
  {
    plot: {
      type: String,

      trim: true,
    },
    fullplot: {
      type: String,

      trim: true,
    },
    genres: {
      type: Array,
    },
    category: {
      type: Array,
    },
    languages: {
      type: Array,
    },
    labels: {
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

      trim: true,
    },
    title0: {
      type: String,
    },
    title1: {
      type: String,
    },
    title2: {
      type: String,
    },
    fetchedSite: {
      type: String,
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
      type: Number,
    },
    endYear: {
      type: Number,
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
    url: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    uhd: { type: Boolean },
    hd: { type: Boolean },
    minutes: {
      type: Number,
    },
    urls: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    imgs: {
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
