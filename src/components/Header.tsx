import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

interface HeaderProps {
  movies: Movie[];
  moviesTop: Movie[];
  selectedMovie: number | null;
  returnMovie: (movie:Movie) => void
}

export default function Header({
  movies,
  moviesTop,
  selectedMovie,
  returnMovie
}: HeaderProps) {

  const [active, setActive] = useState(0);

  const allMovies = [...movies, ...moviesTop];

  useEffect(() => {
    if (movies.length === 0 || selectedMovie !== null) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setActive(randomIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [movies.length, selectedMovie]);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  let currentMovie: Movie;

  if (selectedMovie !== null) {
    currentMovie = allMovies.find(
      movie => movie.id === selectedMovie
    )!;
  } else {
    currentMovie = movies[active];
  }

  const year = currentMovie.release_date.split('-');

  return (
    <div className="headerDiv">
      <img
  className={selectedMovie !== null ? "selected" : ""}
  src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
/>

      <div className={`headerDesc ${selectedMovie !== null ? "selected" : ""}`}>
  <h1>{currentMovie.title}</h1>
  <p>{year[0]}</p>
  <p>{currentMovie.overview}</p>

  <WatchNow
    movie={currentMovie}
    returnMovie={returnMovie}
  />

  {selectedMovie === null && (
    <div className="headerTimer">
      <div className="headerTimerProgress"></div>
    </div>
  )}
</div>
      
      <img
  className={selectedMovie !== null ? "selected" : ""}
  src={`https://image.tmdb.org/t/p/w500${currentMovie.backdrop_path}`}
/>

    </div>
  );
}

function WatchNow({
  movie,
  returnMovie
}: {
  movie: Movie;
  returnMovie: (movie: Movie) => void;
}) {
  const navigate = useNavigate();

  function handleClick() {
    returnMovie(movie);
    navigate(`/movie/${movie.title}`);
  }

  return (
    <button id="play" onClick={handleClick}>
      ▷ Watch Now
    </button>
  );
}