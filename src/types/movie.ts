export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

export type NewMovie = Omit<Movie, "id">;
