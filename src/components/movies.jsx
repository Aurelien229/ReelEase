import React, { useEffect, useState } from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Pagination from './pagination.jsx';
import SearchBar from './searchbar.jsx';
import Card from './card.jsx';
import GenreFilter from './genreFilter.jsx';
import LoadingPage from './loadingPage.jsx';
import "../app.css";
import axios from 'axios';

const genresList = [
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '99', name: 'Documentary' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Family' },
  { id: '14', name: 'Fantasy' },
  { id: '36', name: 'History' },
  { id: '27', name: 'Horror' },
  { id: '10402', name: 'Music' },
  { id: '9648', name: 'Mystery' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Science Fiction' },
  { id: '10770', name: 'TV Movie' },
  { id: '53', name: 'Thriller' },
  { id: '10752', name: 'War' },
  { id: '37', name: 'Western' },
];


function Movies() {
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searched && !selectedGenre) {
      fetchPopularMovies(currentPage);
    }
  }, [currentPage]);

  const fetchPopularMovies = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: page
        }
      });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Erreur lors de la récupération des films populaires :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setCurrentPage(1);
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: query,
          page: 1
        }
      });
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);
      setSearched(true);
      setSelectedGenre('');
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
      setSearchResults([]);
      setSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
    setIsLoading(true);
    if (genreId) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_genres: genreId,
            page: 1
          }
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setSearched(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des films par genre :', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setMovies([]);
      fetchPopularMovies(1);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    if (selectedGenre) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_genres: selectedGenre,
            page: page
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des films par genre :', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    } else if (searched) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            query: searchResults.query,
            page: page
          }
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la recherche de films :', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchPopularMovies(page);
    }
  };

  const getGenreName = (genreId) => {
    const genre = genresList.find(genre => genre.id === genreId);
    return genre ? genre.name : '';
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white text-[#01030d] px-5">
        <div className="container mx-auto py-10">
          <GenreFilter selectedGenre={selectedGenre} onGenreChange={handleGenreChange} />
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
          {!searched && selectedGenre && (
            <div>
              <h2 className="text-4xl font-bold mb-8 font_1">
                <span className="text-[#2092a4] font_2 text-8xl font-bold">M</span>
                <span>ovies by genre</span>
              </h2>
              <p className="text-4xl mb-4 font_1 text-[#2092a4] font-bold">{getGenreName(selectedGenre)}</p>
              {movies.length > 0 ? (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {movies.map(movie => (
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
          {!searched && !selectedGenre && (
            <>
              <h2 className="text-4xl font-bold mb-8 font_1">
                <span className="text-[#2092a4] font_2 text-8xl font-bold">P</span>
                <span>opular movies</span>
              </h2>
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {movies.map(movie => (
                    <Card key={movie.id} {...movie} />
                  ))}
                </div>
              </div>
            </>
          )}
          {(movies.length > 0 || searchResults.length > 0) && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
