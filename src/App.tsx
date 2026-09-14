import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import LoadingScreen from './components/Loading'
import Page from './components/Page.js'
import Header from './components/Header.js'
import MoviePage from './components/MoviePage.js'
import Grainient from "./components/Grainient.jsx";
import './App.css'
import SearchPage from './components/SearchPage.js';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string
}

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesTop, setMoviesTop] = useState<Movie[]>([]);

  useEffect(() => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

  fetch('https://api.themoviedb.org/3/movie/popular', options)
    .then(res => res.json())
    .then(data => setMovies(data.results));

  fetch('https://api.themoviedb.org/3/movie/top_rated', options)
    .then(res => res.json())
    .then(data => setMoviesTop(data.results));
}, []);

  const [active, setActive] = useState<number | null>(null);

function selectMovie(movieId: number) {
  setActive(movieId);
}

const [moviePage, setMoviePage] = useState<Movie | null>(null);
const allMovies = [...movies, ...moviesTop];
function aaa(movie: Movie) {
  setMoviePage(movie);
}

const [search, setSearch] = useState("")
function searchMovie(c: string){
  setSearch(c)
}

if (movies.length === 0 || moviesTop.length === 0) {
  return <LoadingScreen />;
}

return (
  <>
    <Navbar searchMovie={searchMovie} />

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
          />
        }
      />

      <Route
        path="/movie/:movieName"
        element={
          moviePage ? (
            <MoviePage movie={moviePage} />
          ) : (
            <div>Loading...</div>
          )
        }
      />
    </Routes>
  </>
);
}


export default App