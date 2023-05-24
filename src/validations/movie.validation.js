const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createMovie = {
  body: Joi.object().keys({
    plot: Joi.string(),
    fullplot: Joi.string(),
    genres: Joi.array().items(Joi.string()),
    category: Joi.array().items(Joi.string()),
    languages: Joi.array().items(Joi.string()),
    labels: Joi.array().items(Joi.string()),
    runtime: Joi.number(),
    cast: Joi.array().items(Joi.string()),
    num_comments: Joi.number(),
    title: Joi.string(),
    title0: Joi.string(),
    title1: Joi.string(),
    title2: Joi.string(),
    fetchedSite: Joi.string(),
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
    endYear: Joi.number(),
    type: Joi.string().lowercase().valid('movie', 'serie'),
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
    uhd: Joi.boolean(),
    hd: Joi.boolean(),
    minutes: Joi.number(),
    url: Joi.string(),
    sourceUrl: Joi.string().required(),
    urls: Joi.array().items(
      Joi.object({ title: Joi.string(), url: Joi.string() })
    ),
    tags: Joi.array().items(Joi.string()),
    img: Joi.string(),
    imgs: Joi.array().items(Joi.string()),
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
      category: Joi.array().items(Joi.string()),
      languages: Joi.array().items(Joi.string()),
      labels: Joi.array().items(Joi.string()),
      runtime: Joi.number(),
      cast: Joi.array().items(Joi.string()),
      num_comments: Joi.number(),
      title: Joi.string(),
      title0: Joi.string(),
      title1: Joi.string(),
      title2: Joi.string(),
      fetchedSite: Joi.string(),
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
      endYear: Joi.number(),
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
      uhd: Joi.boolean(),
      hd: Joi.boolean(),
      minutes: Joi.number(),
      url: Joi.string(),
      sourceUrl: Joi.string().required(),
      urls: Joi.array().items(
        Joi.object({ title: Joi.string(), url: Joi.string() })
      ),
      tags: Joi.array().items(Joi.string()),
      img: Joi.string(),
      imgs: Joi.array().items(Joi.string()),
    })
    .min(1),
}

const deleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
  }),
}

const uploadImage = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    imgs: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        data: Joi.binary().encoding('base64'),
        contentType: Joi.string(),
      })
    ),
  }),
}

const searchTitle = {
  body: Joi.object().keys({
    title: Joi.string().required().min(3),
  }),
}

const getMovieByTitleOne = {
  body: Joi.object().keys({
    title: Joi.string(),
    title0: Joi.string(),
  }),
}

const getMovieBySourceUrl = {
  body: Joi.object().keys({
    sourceUrl: Joi.string().required(),
  }),
}

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  uploadImage,
  getMovieByTitleOne,
  getMovieBySourceUrl,
  searchTitle,
}
