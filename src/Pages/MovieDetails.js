import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../context/MovieContext";

function MovieDetails() {
  const { movieID } = useParams();
  const [movieData, setMovieData] = useState("");
  const { setStates } = useContext(MovieContext);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=b16473b7616910992c27bffdc949ef94&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
      });
  }, [movieID]);

  const {
    title,
    genres,
    backdrop_path,
    runtime,
    homepage,
    vote_average,
    overview,
    imdb_id,
    revenue,
  } = movieData;

  return (
    <div
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdrop_path}")`,
      }}
      className="movie-details-container"
    >
      <div className="title-container">
        <h1>{title}</h1>
        <img
          className="movie-image"
          src={
            backdrop_path !== null
              ? `https://image.tmdb.org/t/p/original/${backdrop_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg`
          }
          alt={title + "img"}
        />
      </div>
      <div className="other-details-container">
        <div className="info-container">
          <div className="info-1">
            <span>
              <strong>Category: </strong>
            </span>
            {genres &&
              genres.map((genre, index) => {
                return (
                  <span key={genre.name}>
                    {genre.name}
                    {index < genres.length - 1 ? ", " : ""}{" "}
                  </span>
                );
              })}
            <p>
              <strong>Time: </strong>
              {runtime} mins
            </p>
            <a className="homepage-href" href={homepage}>
              Official Page
            </a>
          </div>

          <div className="info-2">
            {vote_average && (
              <p>
                {" "}
                <strong>Rating: </strong>
                {vote_average.toFixed(2)} / 10
              </p>
            )}
            {revenue ? (
              <p>
                <strong>Revenue: </strong>${revenue.toLocaleString()}
              </p>
            ) : (
              <p>
                <strong>Revenue: </strong>Unknown
              </p>
            )}
            <p>
              <strong>imdb id: </strong> {imdb_id}
            </p>
          </div>
        </div>
        <div className="overview-container">
          <p className="overview">{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
