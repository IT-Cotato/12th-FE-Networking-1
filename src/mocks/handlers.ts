import { http, HttpResponse, delay } from "msw";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
}

// Mock 데이터
const movies: Movie[] = [
  {
    id: 1,
    title: "F1 더 무비",
    director: "조셉 코신스키",
    year: 2025,
    genre: "액션",
    rating: 9,
  },
  {
    id: 2,
    title: "좀비딸",
    director: "필감성",
    year: 2025,
    genre: "코미디",
    rating: 8,
  },
  {
    id: 3,
    title: "극장판 귀멸의 칼날: 무한성편",
    director: "소토자키 하루오",
    year: 2025,
    genre: "애니메이션",
    rating: 9,
  },
  {
    id: 4,
    title:
      "스마트폰을 떨어뜨렸을 뿐인데 세상에서 고양이가 사라진다면 벤자민 버튼의 시간은 거꾸로 간다",
    director: "소토자키 하루오",
    year: 2025,
    genre: "애니메이션",
    rating: 9,
  },
];

let nextMovieId = 5;

export const handlers = [
  http.get("/api/movies", async () => {
    await delay(500);
    return HttpResponse.json(movies);
  }),

  http.post("/api/movies", async ({ request }) => {
    const newMovie = (await request.json()) as Omit<Movie, "id">;
    const movieWithId: Movie = { ...newMovie, id: nextMovieId++ };
    movies.push(movieWithId);
    await delay(300);
    return HttpResponse.json(movieWithId, { status: 201 });
  }),

  http.patch("/api/movies/:id", async ({ request, params }) => {
    const { id } = params;
    if (typeof id !== "string")
      return HttpResponse.json({ message: "잘못된 ID" }, { status: 400 });

    const movieIndex = movies.findIndex((m) => m.id === parseInt(id));
    if (movieIndex === -1)
      return HttpResponse.json(
        { message: "영화를 찾을 수 없음" },
        { status: 404 }
      );

    const updates = (await request.json()) as Partial<Movie>;
    movies[movieIndex] = { ...movies[movieIndex], ...updates };
    await delay(300);
    return HttpResponse.json(movies[movieIndex]);
  }),
];
