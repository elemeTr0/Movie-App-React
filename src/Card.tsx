interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

interface CardProps {
  movie: Movie;
  selectMovie: (id: number) => void;
}

export default function Card({ movie, selectMovie }: CardProps) {

  function handleClick() {
    selectMovie(movie.id);
  }

  const rating = movie.vote_average;
  const year: string[] = movie.release_date.split('-');

  return (
    <div
      className="Card"
      onClick={handleClick}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 40%, black 100%), url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
      }}
    >
      <h2>{movie.title}</h2>
      <span>({year[0]})</span>
      <p>{rating.toPrecision(2)}⭐</p>
    </div>
  );
}