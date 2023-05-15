const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createMovie = {
  body: Joi.object().keys({
    plot: Joi.string(),
    fullplot: Joi.string(),
    genres: Joi.array().items(Joi.string()),
    runtime: Joi.number(),
    cast: Joi.array().items(Joi.string()),
    num_comments: Joi.number(),
    title: Joi.string(),
    countries: Joi.array().items(Joi.string()),
    released: Joi.date(),
    directors: Joi.array().items(Joi.string()),
    rated: Joi.string(),
    awards: Joi.object({
      wins: Joi.number(),
      nominations: Joi.number(),
      text: Joi.string(),
    }),
    lastupdated: Joi.string(),
    year: Joi.number(),
    type: Joi.string(),
    imdb: Joi.object({
      rating: Joi.number(),
      votes: Joi.number(),
      id: Joi.number(),
    }),
    tomatoes: Joi.object({
      rating: Joi.number(),
      numReviews: Joi.number(),
      meter: Joi.number(),
      lastUpdated: Joi.date(),
    }),
    qualities: Joi.array().items(Joi.string()),
    urls: Joi.array().items(
      Joi.object({ title: Joi.string(), url: Joi.string() })
    ),
  }),
}

const getMovies = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const getMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
}

const updateMovie = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      plot: Joi.string(),
      fullplot: Joi.string(),
      genres: Joi.array().items(Joi.string()),
      runtime: Joi.number(),
      cast: Joi.array().items(Joi.string()),
      num_comments: Joi.number(),
      title: Joi.string(),
      countries: Joi.array().items(Joi.string()),
      released: Joi.date(),
      directors: Joi.array().items(Joi.string()),
      rated: Joi.string(),
      awards: Joi.object({
        wins: Joi.number(),
        nominations: Joi.number(),
        text: Joi.string(),
      }),
      lastupdated: Joi.string(),
      year: Joi.number(),
      type: Joi.string(),
      imdb: Joi.object({
        rating: Joi.number(),
        votes: Joi.number(),
        id: Joi.number(),
      }),
      tomatoes: Joi.object({
        rating: Joi.number(),
        numReviews: Joi.number(),
        meter: Joi.number(),
        lastUpdated: Joi.date(),
      }),
      qualities: Joi.array().items(Joi.string()),
      urls: Joi.array().items(
        Joi.object({ title: Joi.string(), url: Joi.string() })
      ),
    })
    .min(1),
}

const deleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
}

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
}
