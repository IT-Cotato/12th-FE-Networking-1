import { useState, useEffect } from "react";
import Header from "@/components/header";
import MovieForm from "@/components/movie-form";
import MovieList from "@/components/movie-list";
import "./index.css";

function App() {
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (import.meta.env.DEV) {
        const { worker } = await import("./mocks/browser");
        await worker.start();
      }
      setIsWorkerReady(true);
    }
    prepare();
  }, []);

  if (!isWorkerReady) {
    return <div>Preparing mock server...</div>;
  }

  return (
    <div className="bg-light-background dark:bg-dark-background text-black dark:text-white min-h-screen p-5 transition-all duration-200 ease-in-out">
      <Header />
      <MovieForm />
      <MovieList />
    </div>
  );
}

export default App;
