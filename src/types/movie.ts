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
