import React, { useState, useEffect } from 'react';
import MovieModal from './movieModal'; 
import axios from 'axios';

const Card = ({ id, title, poster_path, overview, vote_average }) => {
  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchVideoKey = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        });
        const videos = response.data.results;
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des vidéos du film :', error);
      }
    };
    fetchVideoKey();
  }, [id]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white relative">
      {poster_path && (
        <div>
          <img
            className="w-full cursor-pointer"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`Poster ${title}`}
            onClick={openModal}
          />
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[#2092a4] opacity-90 " onClick={closeModal}></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="max-w-md mx-auto p-5 relative" style={{ overflowY: 'auto', width: '100%', maxWidth: '375px' }}>
                <span className="close text-red-600 text-3xl" onClick={closeModal}>&times;</span><br/>
                <MovieModal
                  movie={{ id, title, overview, vote_average, videoKey }}
                  onClose={closeModal}
                />
              </div>
            </div>
          </div>
          
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
