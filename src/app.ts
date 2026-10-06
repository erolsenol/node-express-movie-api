import express, { type ErrorRequestHandler } from 'express';
import { MovieRepository, movieInputSchema } from './movies.js';

export function createApp(repository = new MovieRepository()) {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  app.get('/health', (_request, response) => response.json({ status: 'ok' }));
  app.get('/movies', (_request, response) => response.json(repository.list()));
  app.get('/movies/:id', (request, response) => {
    const movie = repository.get(request.params.id);
    if (!movie) return response.status(404).json({ error: 'Movie not found' });
    return response.json(movie);
  });
  app.post('/movies', (request, response) => {
    const parsed = movieInputSchema.safeParse(request.body);
    if (!parsed.success) return response.status(400).json({ error: 'Invalid movie', details: parsed.error.issues });
    return response.status(201).json(repository.create(parsed.data));
  });
  app.put('/movies/:id', (request, response) => {
    const parsed = movieInputSchema.safeParse(request.body);
    if (!parsed.success) return response.status(400).json({ error: 'Invalid movie', details: parsed.error.issues });
    const movie = repository.update(request.params.id, parsed.data);
    if (!movie) return response.status(404).json({ error: 'Movie not found' });
    return response.json(movie);
  });
  app.delete('/movies/:id', (request, response) => {
    if (!repository.delete(request.params.id)) return response.status(404).json({ error: 'Movie not found' });
    return response.status(204).end();
  });
  app.use((_request, response) => response.status(404).json({ error: 'Route not found' }));
  const handleError: ErrorRequestHandler = (error: unknown, _request, response, next) => {
    if (response.headersSent) return next(error);
    const errorType = typeof error === 'object' && error !== null && 'type' in error ? error.type : undefined;
    if (errorType === 'entity.parse.failed') {
      response.status(400).json({ error: 'Malformed JSON' });
    } else if (errorType === 'entity.too.large') {
      response.status(413).json({ error: 'Request body too large' });
    } else if (errorType === 'encoding.unsupported' || errorType === 'charset.unsupported') {
      response.status(415).json({ error: 'Unsupported body encoding' });
    } else {
      console.error('Unhandled request error', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
  app.use(handleError);
  return app;
}
