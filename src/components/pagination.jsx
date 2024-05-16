import React from 'react';
import BeforeImg from '../assets/img/left24.png';
import AfterImg from '../assets/img/right24.png';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4 font_2 text-3xl font-bold">
      <button disabled={currentPage === 1} onClick={goToPreviousPage} className="">
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
      <button disabled={currentPage === totalPages} onClick={goToNextPage} className="">
        <img src={AfterImg} alt="after" />
      </button>
    </div>
  );
};

export default Pagination;
