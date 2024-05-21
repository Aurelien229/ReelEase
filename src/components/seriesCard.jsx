import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SeriesCard = ({ id, name, poster_path, overview, vote_average }) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchVideoKey = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        });
        const videos = response.data.results;
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos de la série :', error);
      }
    };
    fetchVideoKey();
  }, [id]);

  return (
    <Link to={`/series/${id}`} className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white relative">
      {poster_path && (
        <div>
          <img
            className="w-full cursor-pointer"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`Poster ${name}`}
          />
        </div>
      )}
    </Link>
  );
};

export default SeriesCard;
