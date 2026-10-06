import { describe, expect, it, vi } from 'vitest';
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

describe('error responses', () => {
  it('returns JSON for malformed input, oversized bodies and unknown routes', async () => {
    const app = createApp();
    const malformed = await request(app).post('/movies').set('Content-Type', 'application/json').send('{broken');
    expect(malformed.status).toBe(400);
    expect(malformed.body).toEqual({ error: 'Malformed JSON' });
    expect(malformed.headers['content-type']).toContain('application/json');
    const oversized = await request(app).post('/movies').send({ title: 'x'.repeat(33 * 1024) });
    expect(oversized.status).toBe(413);
    expect(oversized.body).toEqual({ error: 'Request body too large' });
    const unsupported = await request(app).post('/movies').set('Content-Type', 'application/json; charset=iso-8859-1').send('{}');
    expect(unsupported.status).toBe(415);
    expect(unsupported.body).toEqual({ error: 'Unsupported body encoding' });
    const unknown = await request(app).get('/missing');
    expect(unknown.status).toBe(404);
    expect(unknown.body).toEqual({ error: 'Route not found' });
    expect((await request(app).get('/health')).body).toEqual({ status: 'ok' });
  });

  it('does not expose internal exception details', async () => {
    const { MovieRepository } = await import('../src/movies.js');
    const repository = new MovieRepository();
    vi.spyOn(repository, 'list').mockImplementation(() => { throw new Error('Private adapter details'); });
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      const response = await request(createApp(repository)).get('/movies');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
      expect(response.text).not.toContain('Private adapter details');
      expect(log).toHaveBeenCalledOnce();
    } finally { vi.restoreAllMocks(); }
  });

  it('updates a movie without creating a new record and validates updates', async () => {
    const app = createApp();
    const created = await request(app).post('/movies').send({ title: 'Alien', year: 1979, genre: 'Sci-fi' });
    const updated = await request(app).put(`/movies/${created.body.id}`).send({ title: 'Arrival', year: 2016, genre: 'Sci-fi' });
    expect(updated.status).toBe(200);
    expect(updated.body.id).toBe(created.body.id);
    expect((await request(app).get('/movies')).body).toHaveLength(1);
    expect((await request(app).put(`/movies/${created.body.id}`).send({ title: ' ' })).status).toBe(400);
    expect((await request(app).put('/movies/missing').send({ title: 'Arrival', year: 2016, genre: 'Sci-fi' })).status).toBe(404);
  });
});
