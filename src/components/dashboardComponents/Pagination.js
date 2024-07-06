import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Pagination = ({ totalPages = 1, currentPage, onPageChange }) => {
  const [pageRange, setPageRange] = useState([1, 4]);
  const paginationRef = useRef(null);

  useEffect(() => {
    if (currentPage < pageRange[0]) {
      setPageRange([Math.max(1, currentPage - 3), currentPage]);
    } else if (currentPage > pageRange[1]) {
      setPageRange([currentPage, Math.min(totalPages, currentPage + 3)]);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    gsap.from(paginationRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out'
    });
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      animatePageChange('left');
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      animatePageChange('right');
      onPageChange(currentPage + 1);
    }
  };

  const animatePageChange = (direction) => {
    gsap.to(paginationRef.current, {
      x: direction === 'left' ? 20 : -20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        gsap.to(paginationRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.2
        });
      }
    });
  };

  const animateHover = (target) => {
    gsap.to(target, {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const animateHoverExit = (target) => {
    gsap.to(target, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  return (
    <div ref={paginationRef} className="rounded-b-lg border-t border-gray-200 px-4 py-2">
      <ol className="flex justify-center items-center gap-2 text-xs font-medium">
        <li>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 py-3 bg-white text-gray-900 rtl:rotate-180"
            onMouseEnter={(e) => animateHover(e.currentTarget)}
            onMouseLeave={(e) => animateHoverExit(e.currentTarget)}
          >
            <span className="sr-only">Prev Page</span>
            <svg
              className="h-6 w-6 text-gray-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter(pageNumber => pageNumber >= pageRange[0] && pageNumber <= pageRange[1])
          .map(pageNumber => (
            <li key={pageNumber}>
              <button
                onClick={() => {
                  animatePageChange(pageNumber > currentPage ? 'right' : 'left');
                  onPageChange(pageNumber);
                }}
                className={`block size-8 rounded border ${
                  currentPage === pageNumber
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-gray-100 bg-white text-gray-900'
                } text-center leading-8 justify-center items-center flex`}
                onMouseEnter={(e) => animateHover(e.currentTarget)}
                onMouseLeave={(e) => animateHoverExit(e.currentTarget)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 py-3 bg-white text-gray-900 rtl:rotate-180"
            onMouseEnter={(e) => animateHover(e.currentTarget)}
            onMouseLeave={(e) => animateHoverExit(e.currentTarget)}
          >
            <span className="sr-only">Next Page</span>
            <svg
              className="h-6 w-6 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </li>
      </ol>
    </div>
  );
};

export default Pagination;