import express from 'express';
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
  return app;
}
