import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string
}
interface MoviePageProps {
  movie: Movie;
}

export default function MoviePage({ movie }: MoviePageProps) {
    const year = movie.release_date.split('-');

    const navigate = useNavigate();

    function handleClick() {
    navigate(`/`);
  }
  return (
    <div className="MoviePage">

      <div
        className="movieBackground"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 40%, black 100%),
            url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})
          `
        }}
      />

      <div id="focus">
        <h1>{movie.title} ({year[0]})</h1>
        <p>{movie.overview}</p>
        
      </div>
        <button id="StartMovie">▶</button>

        <button id="Back" onClick={handleClick}>← Return</button>
    </div>
  );
}