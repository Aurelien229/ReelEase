import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
import Pagination from './pagination';
import SearchBar from './searchbar';
import SeriesCard from './seriesCard';
import TvGenreFilter from './tvGenreFilter';
import LoadingPage from './loadingPage';
import '../app.css';

const genresList = [
  { id: '10759', name: 'Action & Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '99', name: 'Documentary' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Family' },
  { id: '10762', name: 'Kids' },
  { id: '9648', name: 'Mystery' },
  { id: '10763', name: 'News' },
  { id: '10764', name: 'Reality' },
  { id: '10765', name: 'Sci-Fi & Fantasy' },
  { id: '10766', name: 'Soap' },
  { id: '10767', name: 'Talk' },
  { id: '10768', name: 'War & Politics' },
  { id: '37', name: 'Western' },
];

function Series() {
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searched && !selectedGenre) {
      fetchPopularSeries(currentPage);
    }
  }, [currentPage]);

  const fetchPopularSeries = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: page
        }
      });
      setSeries(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching popular series:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setCurrentPage(1);
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
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
      console.error('Error searching for series:', error);
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
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_genres: genreId,
            page: 1
          }
        });
        setSeries(response.data.results);
        setTotalPages(response.data.total_pages);
        setSearched(false);
      } catch (error) {
        console.error('Error fetching series by genre:', error);
        setSeries([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSeries([]);
      fetchPopularSeries(1);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    if (selectedGenre) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            with_genres: selectedGenre,
            page: page
          }
        });
        setSeries(response.data.results);
      } catch (error) {
        console.error('Error fetching series by genre:', error);
        setSeries([]);
      } finally {
        setIsLoading(false);
      }
    } else if (searched) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            query: searchResults.query,
            page: page
          }
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error searching for series:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchPopularSeries(page);
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
          <TvGenreFilter selectedGenre={selectedGenre} onGenreChange={handleGenreChange} />
          <SearchBar onSearch={handleSearch} />
          {searched && (
            <div>
              <h2 className="text-4xl font-bold mb-8 font_1">
                <span className="text-[#2092a4] font_2 text-8xl font-bold">S</span>
                <span>earch results</span>
              </h2>
              {searchResults.length > 0 ? (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {searchResults.map(series => (
                      <SeriesCard key={series.id} {...series} />
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
                <span className="text-[#2092a4] font_2 text-8xl font-bold">S</span>
                <span>eries by genre</span>
              </h2>
              <p className="text-4xl mb-4 font_1 text-[#2092a4] font-bold">{getGenreName(selectedGenre)}</p>
              {series.length > 0 ? (
                <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {series.map(series => (
                      <SeriesCard key={series.id} {...series} />
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
                <span>opular series</span>
              </h2>
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {series.map(series => (
                    <SeriesCard key={series.id} {...series} />
                  ))}
                </div>
              </div>
            </>
          )}
          {(series.length > 0 || searchResults.length > 0) && (
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

export default Series;
