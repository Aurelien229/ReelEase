import React, { useState } from 'react';

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
    <form className="bg-gray-900 py-10 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" Search for a movie..."
        value={query}
        onChange={handleChange}
        className="bg-transparent border-none outline-none text-xl md:text-3xl flex items-center justify-center rounded-full p-2 shadow-[inset_2px_5px_10px_rgb(5,5,5)]"
      />
      <button type="submit" className="px-4 py-2 ml-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 ">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
