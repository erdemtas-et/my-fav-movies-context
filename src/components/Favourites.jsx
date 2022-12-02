import React, { useState } from "react";
import { useEffect, useContext } from "react";
import Movie from "./Movie";
import MovieContext from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
function Favourites() {
  const { states, setStates, handleFavourite, setId } =
    useContext(MovieContext);
  const [movies, setMovies] = useState([]);

  let navigate = useNavigate();

  const handleClick = (id) => {
    setId(id);
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    setMovies([]);
    states.favourites.forEach((fav) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${fav}?api_key=b16473b7616910992c27bffdc949ef94&language=en-US`
      )
        .then((res) => res.json())
        .then((data) =>
          setMovies((prev) => {
            return [data, ...prev];
          })
        );
    });
  }, [states.favourites]);

  console.log(movies);

  return (
    <div>
      {movies &&
        movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              title={movie.title}
              year={movie.release_date}
              rating={movie.vote_average.toFixed(2)}
              poster={movie.poster_path}
              movieID={movie.id}
              handleFavourite={handleFavourite}
              handleDetails={handleClick}
            />
          );
        })}
    </div>
  );
}

export default Favourites;
