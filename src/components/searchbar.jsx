import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import SearchImg from '../assets/img/file-find-solid-48.png';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event, { newValue }) => {
    setQuery(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const getSuggestions = async (value) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: value,
        },
      });

      return response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    const uniqueTitles = new Set();
    const uniqueSuggestions = suggestions.filter(suggestion => {
      if (uniqueTitles.has(suggestion.title)) {
        return false;
      }
      uniqueTitles.add(suggestion.title);
      return true;
    }).slice(0, 5);
    setSuggestions(uniqueSuggestions);
  };
  
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">
      {suggestion.title}
    </div>
  );

  const inputProps = {
    placeholder: ' Search a movie...',
    value: query,
    onChange: handleChange,
    className: 'bg-transparent border-none outline-none text-xl text-center text-gray-500 md:text-3xl flex items-center justify-center rounded-full p-2 shadow-[inset_2px_5px_10px_rgb(5,5,5)]',
  };

  return (
    <form className="bg-white py-10 font_1" onSubmit={handleSubmit}>
      <div className="form-container flex gap-2">
        <button type="submit" className="search-button">
          <img src={SearchImg} alt="search" />
        </button>
        <div className="search-container">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.title}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
      </div>
    </form>
  );  
};

export default SearchBar;
