import Card from "./Card";
import Grainient from "./Grainient";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

interface SearchProps {
  allMovies: Movie[];
  search: string;
  returnMovie: (movie: Movie) => void;
  changeSource: (k:boolean) => void
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export default function SearchPage({
  allMovies,
  search,
  returnMovie,
  changeSource
}: SearchProps) {

  const filteredMovies = allMovies.filter((movie) =>
    normalize(movie.title).includes(normalize(search))
  );

  const navigate = useNavigate();

  function onClick(movie: Movie) {
    changeSource(true)
    returnMovie(movie);
    navigate(`/movie/${movie.title}`);
  }

  return (
    <div className="searchPage">
      <div className="Grainient">
        <Grainient />
      </div>

      <div className="searchCards">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            movie={movie}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}