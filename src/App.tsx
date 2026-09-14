import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import LoadingScreen from "./components/Loading";
import Page from "./components/Page.js";
import Header from "./components/Header.js";
import MoviePage from "./components/MoviePage.js";
import Grainient from "./components/Grainient.jsx";
import SearchPage from "./components/SearchPage.js";

import "./App.css";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesTop, setMoviesTop] = useState<Movie[]>([]);

  const [active, setActive] = useState<number | null>(null);

  const [moviePage, setMoviePage] = useState<Movie | null>(null);

  const [search, setSearch] = useState("");

  const [source, changeSource] = useState(false)

  const location = useLocation();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));

    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((res) => res.json())
      .then((data) => setMoviesTop(data.results));
  }, []);

  // Movie clicked inside Page
  function selectMovie(movieId: number) {
    setActive(movieId);
  }

  // Movie clicked when opening the MoviePage
  function aaa(movie: Movie) {
    setMoviePage(movie);
  }

  // Search input
  function searchMovie(value: string) {
    setSearch(value);
  }

  // Where the movies was clicked from
  function sourceChanger(k:boolean){
    changeSource(k)
  }

  const allMovies = [...movies, ...moviesTop];

  // Wait until both API requests have loaded
  if (movies.length === 0 || moviesTop.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!location.pathname.startsWith("/movie/") && (
        <Navbar searchMovie={searchMovie} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div className="movieApp">
              <div className="Grainient">
                <Grainient />
              </div>

              <div className="navbarTrigger"></div>

              <div className="movieContent">
                <Header
                  movies={movies}
                  moviesTop={moviesTop}
                  selectedMovie={active}
                  returnMovie={aaa}
                  changeSource={sourceChanger}
                />

                <Page
                  movies={movies}
                  selectMovie={selectMovie}
                  title="Popular"
                />

                <Page
                  movies={moviesTop}
                  selectMovie={selectMovie}
                  title="Top Rated"
                />
              </div>
            </div>
          }
        />

        <Route
          path="/search"
          element={
            <SearchPage
              allMovies={allMovies}
              search={search}
              returnMovie={aaa}
              changeSource={sourceChanger}
            />
          }
        />

        <Route
          path="/movie/:movieName"
          element={
            moviePage ? (
              <MoviePage movie={moviePage} source={source}/>
            ) : (
              <div>Loading...</div>
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;