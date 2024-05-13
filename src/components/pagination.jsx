import React, { useState, useEffect } from 'react';
import Card from './card.jsx';
import BeforeImg from '../assets/img/left24.png';
import AfterImg from '../assets/img/right24.png';

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [movies, setMovies] = useState([]);
    
  
    useEffect(() => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${currentPage}&per_page=20`;
  
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
              id={movie.id}
              title={movie.title}
              adult={movie.adult}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            className=""
          >
           <img src={BeforeImg} alt="before" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            const pageNumber = index + 1;
            const pageToDisplay = currentPage > 2 ? currentPage - 2 + index : pageNumber;
            return (
              <button
                key={pageToDisplay}
                onClick={() => goToPage(pageToDisplay)}
                className={currentPage === pageToDisplay ? 'mx-2 font-bold text-[#2092a4]' : 'mx-2'}
              >
                {pageToDisplay}
              </button>
            );
          })}
          <button
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
            className=""
          >
           <img src={AfterImg} alt="after"/>
          </button>
        </div>
      </div>
  );
  
  
  
}

export default Pagination;
