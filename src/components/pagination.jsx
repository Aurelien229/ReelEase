import React, { useState, useEffect } from 'react';
import Card from './card.jsx';
import BeforeImg from '../assets/img/left-arrow-solid-120.png';
import AfterImg from '../assets/img/right-arrow-solid-120.png';

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [movies, setMovies] = useState([]);
    const API_KEY = 'a364dc0ee50f3aebe16042b7f05c109c';
  
    useEffect(() => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${currentPage}&per_page=20`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        })
        .catch(error => console.error('Erreur lors de la récupération des films : ', error));
    }, [currentPage]);
  
    const goToPage = (page) => {
      setCurrentPage(page);
    };

    const goToPreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    return (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies && movies.map(movie => (
              <Card
                key={movie.id}
                title={movie.title}
                adult={movie.adult}
                release_date={movie.release_date}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
              className=""
            >
             <img src={BeforeImg } alt="before"/>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
              className=""
            >
             <img src={AfterImg } alt="after"/>
            </button>
          </div>
        </div>
    );
}

export default Pagination;

