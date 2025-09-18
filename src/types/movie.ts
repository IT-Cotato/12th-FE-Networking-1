export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

export interface NewMovie {
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

export type NewMovieInputType = {
  title: string;
  director: string;
  year: string;
  genre: string;
  rating: string;
};
