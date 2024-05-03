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
            api_key: 'a364dc0ee50f3aebe16042b7f05c109c',
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
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white relative">
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
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 " onClick={closeModal}></div>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="max-w-md mx-auto p-5 relative" style={{ overflowY: 'auto' }}>
                  <span className="close text-white text-3xl" onClick={closeModal}>&times;</span><br/>
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
