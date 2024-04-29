import React, { useState } from 'react';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Pagination from './components/pagination.jsx';
import SearchBar from './components/searchbar.jsx';
import Card from './components/card.jsx';
import "./app.css";

import axios from 'axios';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'a364dc0ee50f3aebe16042b7f05c109c',
          query: query
        }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white px-5">
        
        <div className="container mx-auto py-10">
        <SearchBar onSearch={handleSearch} />
          <h2 className="text-4xl font-bold mb-8">Search results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {searchResults.length > 0 ? (
              searchResults.map(movie => (
                <Card key={movie.id} {...movie} />
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
          <h2 className="text-4xl font-bold mb-8">Popular movies</h2>
          <Pagination />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
