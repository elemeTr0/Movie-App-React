import { useRef } from "react";
import Card from "./Card";
import Button from "./Button";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path: string
}

interface PageProps {
  movies: Movie[];
  selectMovie: (c:number) => void
  title: string
  returnMovie?: (movie:Movie) => void
}

export default function Page({ movies, selectMovie, title }: PageProps) {

  const movieList = useRef<HTMLDivElement>(null);

  function click(movie:Movie){
    selectMovie(movie.id)
  }

  return (
    <div className="movieSection">
        <h2 id="title">{title}</h2>
      <Button
        direction="left"
        onClick={() => {
          movieList.current?.scrollBy({
            left: -500,
            behavior: "smooth"
          });
        }}
      />

      <div className="showCards" ref={movieList}>
  {movies.map((movie) => (
    <Card
      key={movie.id}
      movie={movie}
      onClick={click}
    />
  ))}
</div>

      <Button
        direction="right"
        onClick={() => {
          movieList.current?.scrollBy({
            left: 500,
            behavior: "smooth"
          });
        }}
      />

    </div>
  );
}