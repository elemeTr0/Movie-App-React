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
}

export default function Page({ movies, selectMovie, title }: PageProps) {

  const movieList = useRef<HTMLDivElement>(null);


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
      selectMovie={selectMovie}
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