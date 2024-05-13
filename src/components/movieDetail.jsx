import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&append_to_response=videos`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    title,
    poster_path,
    overview,
    vote_average,
    adult,
    release_date,
    runtime,
    videos
  } = movie;

  const videoKey = videos && videos.results ? videos.results.find(video => video.type === "Trailer" && video.site === "YouTube") : null;

  return (
    <div className=" max-w-md my-5 mx-5 font_1 text-center">
      <h1 className="text-2xl font-bold mb-4 ">{title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="mb-4" />
      <p className="mb-4">{overview}</p>
      <p className="mb-2">⭐ {vote_average.toFixed(1)}</p>
      <p className="mb-2">Classification: {adult ? 'Adulte' : 'Tout public'}</p>
      <p className="mb-2">Date de sortie: {release_date}</p>
      <p className="mb-2">Durée du film: {runtime} minutes</p>
      {videoKey && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            width="335"
            height="215"
            src={`https://www.youtube.com/embed/${videoKey.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
  
};

export default MovieDetail;
