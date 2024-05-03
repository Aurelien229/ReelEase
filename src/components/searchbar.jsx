import React, { useState } from 'react';
import SearchImg from '../assets/img/file-find-solid-48.png';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="bg-white py-10 flex gap-2 font_2 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" Search a movie..."
        value={query}
        onChange={handleChange}
        className="bg-transparent border-none outline-none text-xl md:text-3xl flex items-center justify-center rounded-full p-2 shadow-[inset_2px_5px_10px_rgb(5,5,5)]"
      />
      <button type="submit" className="">
      <img src={SearchImg } alt="search"/>
      </button>
    </form>
  );
};

export default SearchBar;
