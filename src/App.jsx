
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
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: query
        }
      });
      setSearchResults(response.data.results);
      setSearched(true);
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
      setSearchResults([]);
      setSearched(true);
    }
  };

  return (
      <div>
        <Navbar />
        <div className="bg-white text-[#01030d] px-5">
          <div className="container mx-auto py-10">
            <SearchBar onSearch={handleSearch} />
            {searched && (
              <div>
                <h2 className="text-4xl font-bold mb-8 font_1 ">
                  <span className="text-[#2092a4] font_2 text-8xl font-bold">S</span>
                  <span>earch results</span>
                </h2>
                {searchResults.length > 0 ? (
                  <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {searchResults.map(movie => (
                        <Card key={movie.id} {...movie} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="font_2 text-[#FFD97C] text-2xl">No results found</p>
                )}
              </div>
            )}
            <br />
            <h2 className="text-4xl font-bold mb-8 font_1">
              <span className="text-[#2092a4] font_2 text-8xl font-bold">P</span>
              <span>opular movies</span>
            </h2>
            <Pagination />
          </div>
        </div>
        <Footer />
      </div> 
  );
}

export default App;
