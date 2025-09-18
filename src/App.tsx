import Header from "./components/Header";
import ThemeButton from "./components/ThemeButton";
import { useTheme } from "./hooks/useTheme";
import AddMovieForm from "./components/AddMovieForm";
import SearchBox from "./components/SearchBox";
import MovieCardList from "./components/MovieCardList";
import Container from "./components/Container";

function App() {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.2s ease",
      }}
    >
      <Header flexRowJustifyContent="end" title="코테이토 영화관">
        <ThemeButton />
      </Header>

      <Container title="영화 추가">
        <AddMovieForm />
      </Container>

      <Container title="영화 목록">
        <SearchBox />
        <MovieCardList />
      </Container>
    </div>
  );
}

export default App;
