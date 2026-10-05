import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export const movieInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  year: z.number().int().min(1888).max(2100),
  genre: z.string().trim().min(1).max(80),
});
export type MovieInput = z.infer<typeof movieInputSchema>;
export interface Movie extends MovieInput { id: string }

export class MovieRepository {
  private readonly movies = new Map<string, Movie>();
  list(): Movie[] { return [...this.movies.values()]; }
  get(id: string): Movie | undefined { return this.movies.get(id); }
  create(input: MovieInput): Movie {
    const movie = { id: randomUUID(), ...input };
    this.movies.set(movie.id, movie);
    return movie;
  }
  update(id: string, input: MovieInput): Movie | undefined {
    if (!this.movies.has(id)) return undefined;
    const movie = { id, ...input };
    this.movies.set(id, movie);
    return movie;
  }
  delete(id: string): boolean { return this.movies.delete(id); }
}
