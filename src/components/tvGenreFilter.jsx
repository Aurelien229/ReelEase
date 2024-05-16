import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TVGenreFilter = ({ selectedGenre, onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="mb-8 text-center text-lg">
      <label htmlFor="genre-select" className="mr-2 font-semibold text-2xl text-[#2092a4] font_1">Choose a genre:</label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#2092a4] text-center font_1"
      >
        <option value="">--All genres--</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id} className="text-gray-800">
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TVGenreFilter;
