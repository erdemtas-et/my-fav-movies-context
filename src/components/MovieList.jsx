import React, { useContext, useEffect } from "react";
import MovieContext from "../context/MovieContext";
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";
import Favourites from "./Favourites";

function MovieList() {
  const { states, setStates, setId, handleFavourite } =
    useContext(MovieContext);

  useEffect(() => {
    if (states.text.length > 3) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b16473b7616910992c27bffdc949ef94&language=en-US&query=${states.text}&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          if (states.text.length > 3) {
            setStates((prev) => {
              return {
                ...prev,
                movies: data.results,
              };
            });
          }
        });
    }
  }, [states.text, setStates]);

  let navigate = useNavigate();

  const handleClick = (id) => {
    setId(id);
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movielist-container">
      {states.text.length !== 0 ? (
        states.movies.length > 0 &&
        states.movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie.title}
            year={movie.release_date}
            rating={movie.vote_average}
            poster={movie.poster_path}
            handleDetails={handleClick}
            movieID={movie.id}
            handleFavourite={handleFavourite}
          />
        ))
      ) : (
        <div>
          <Favourites></Favourites>
        </div>
      )}
    </div>
  );
}

export default MovieList;
