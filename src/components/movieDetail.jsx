import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import LoadingPage from './loadingPage.jsx';

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&append_to_response=videos`);
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <LoadingPage />;
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
    <>
      <Navbar />
      <div className="max-w-md mx-5 my-5 font_1 text-center md:max-w-4xl lg:max-w-7xl lg:mx-auto lg:my-20">
        <div className="md:flex md:justify-center md:mb-4 md:space-x-4">
          <div className="md:w-1/3 md:pr-4 md:mb-4">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="mb-4 mx-auto" />
          </div>
          <div className="md:w-2/3 md:text-center md:mb-4"><br/>
            <h1 className="text-2xl text-[#2092a4] font-bold mb-4 md:text-4xl">{title}</h1>
            <p className="mb-4">{overview}</p>
            <div className="mb-4">
              <p className="mb-2">⭐ {vote_average.toFixed(1)}</p>
              <p className="mb-2">Classification: {adult ? 'Adulte' : 'Tout public'}</p>
              <p className="mb-2">Date de sortie: {release_date}</p>
              <p className="mb-2">Durée du film: {runtime} minutes</p>
            </div>
            {videoKey && (
              <div className="aspect-w-16 aspect-h-9 mb-4 ">
                <iframe
                  className="mx-auto"
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
        </div>   
      </div>
      <Footer /> 
    </>
  );  
};

export default MovieDetail;
