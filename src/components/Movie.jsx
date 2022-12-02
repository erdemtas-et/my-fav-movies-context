import React, { useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import MovieContext from "../context/MovieContext";

function Movie({
  title,
  year,
  rating,
  poster,
  handleDetails,
  movieID,
  handleFavourite,
}) {
  const { states } = useContext(MovieContext);

  return (
    <Card>
      <div className="image-container">
        <img
          src={
            poster !== null
              ? `https://image.tmdb.org/t/p/w500${poster}`
              : `https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg`
          }
          alt={title + "img"}
        />
      </div>
      <div className="info-container">
        <h1 className="title-text">{title}</h1>
        <p className="rating-text">Rating : {rating}</p>
        <p className="year-text">Release Date : {year}</p>
        <div className="btn-container">
          <Button
            text="See Details"
            handleDetails={handleDetails}
            id={movieID}
            btnStyle="secondary"
          />
          <button
            onClick={() => handleFavourite(movieID)}
            className="btn btn-primary"
          >
            {states.favourites.includes(movieID) ? "Added" : "Add Favourites"}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default Movie;
