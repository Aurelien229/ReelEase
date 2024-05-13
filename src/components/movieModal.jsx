import React from 'react';
import { Link } from 'react-router-dom';
import FrImg from '../assets/img/fr.png';
const MovieModal = ({ movie, onClose }) => {
  const { id, title, overview, vote_average, videoKey } = movie;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="rating-circle my-5 mx-5">
          <p className="font-bold">{vote_average.toFixed(1)}</p>
        </div>
        <br /><br /><br />
        <h2 className="font_1 text-center text-[#2092a4] text-lg">{title}</h2>
        <div className="overview-wrapper" style={{ width: '335px' }}>
          <p className="text-white">{overview}</p>
        </div>
        <br/>
        {videoKey && (
          <div>
            <iframe
              width="335"
              height="215"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Link to={`/movie/${id}`}>
          <button className="py-2 text-center" style={{ display: 'block', margin: '0 auto' }}>
            <img src={FrImg} alt="search" />
          </button>
        </Link>
      </div>
    </div>
  );
  
};

export default MovieModal;
