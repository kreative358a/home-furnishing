import React from "react";
import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = ({
  articlesPerPage,
  totalArticles,
  paginate,
  currentPage,
}) => {
  // console.log("currentPage", currentPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }
  // const pageNumbers = Array.from(
  //   { length: totalArticles / articlesPerPage },
  //   (_, index) => {
  //     return index + 1;
  //   }
  // );

  return (
    <div className="mt-8 flex justify-end">
      <div className="join">
        <button
          className="btn mr-1 btn-sm sm:btn-md join-item focus:border-none focus:outline-none box-shadow-around-sm-blue"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) {
              paginate(currentPage);
            } else {
              paginate(currentPage - 1);
            }
          }}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => {
          // return (
          //   <a href={`#page=${currentPage}`}>
          //     <button
          //       key={pageNumber}
          //       onClick={() => paginate(pageNumber)}
          //       className={`btn btn-xs sm:btn-md border-none join-item ${
          //         pageNumber === currentPage ? "bg-primary border-red-300" : ""
          //       }`}
          //       style={{ borderRadius: "4px" }}
          //     >
          //       {pageNumber}
          //     </button>
          //   </a>
          // );
          return (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`btn bg-base-200/90 btn-sm sm:btn-md border-none join-item focus:border-none focus:outline-none box-shadow-around-sm-blue mx-1 ${
                pageNumber === currentPage ? "bg-secondary" : ""
              }`}
              style={{ borderRadius: "4px" }}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-sm bg-base-200/90 sm:btn-md join-item focus:border-none focus:outline-none box-shadow-around-sm-blue"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > pageNumbers.slice(-1)) {
              paginate(currentPage);
            } else {
              paginate(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
