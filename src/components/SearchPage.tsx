import Card from "./Card";
import Grainient from "./Grainient";

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
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export default function SearchPage({ allMovies, search }: SearchProps) {
  const filteredMovies = allMovies.filter((movie) =>
    normalize(movie.title).includes(normalize(search))
  );

  return (
  <div className="searchPage">
    <div className="Grainient">
      <Grainient />
    </div>

    <div className="searchCards">
      {filteredMovies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);
}