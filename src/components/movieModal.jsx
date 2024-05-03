import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  const { title, overview, vote_average, videoKey } = movie;

  return (
    <div className="modal">
    <div className="modal-content">
    
      <div className="rating-circle my-5 mx-5">
        <p>⭐{vote_average.toFixed(1)}</p>
      </div>
      <br/>
      <br/>
      <br/>
      <h2 className="font_1 text-center text-[#2092a4] text-lg ">{title}</h2>
      <p className="text-white">{overview}</p>
      {videoKey && (
        <div>
          <p>Watch the trailer :</p><br/>
          <iframe
            width="408"
            height="315"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  </div>
  

  );
};

export default MovieModal;
