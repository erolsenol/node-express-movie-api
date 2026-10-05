import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('movie API', () => {
  const app = createApp();
  it('validates and creates movies', async () => {
    expect((await request(app).post('/movies').send({ title: '', year: 1800, genre: 'Drama' })).status).toBe(400);
    const created = await request(app).post('/movies').send({ title: 'Arrival', year: 2016, genre: 'Sci-fi' });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe('Arrival');
  });
  it('returns 404 for missing movies and deletes an existing movie', async () => {
    expect((await request(app).get('/movies/missing')).status).toBe(404);
    const created = await request(app).post('/movies').send({ title: 'Alien', year: 1979, genre: 'Sci-fi' });
    expect((await request(app).delete(`/movies/${created.body.id}`)).status).toBe(204);
    expect((await request(app).get(`/movies/${created.body.id}`)).status).toBe(404);
  });
});
