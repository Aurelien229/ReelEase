import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}`, {
          params: {
            api_key: 'a364dc0ee50f3aebe16042b7f05c109c',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film :', error);
      }
    };

    fetchMovieDetails();


    return () => {

    };
  }, [match.params.id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieDetails;
