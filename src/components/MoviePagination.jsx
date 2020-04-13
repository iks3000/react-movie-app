import React from "react";

const MoviePagination = (props) => {
  const { page, total_pages, forwardButton, backButton} = props;
  return (
    <div className="pagi-wrapper d-flex justify-content-between">
      <button
        className="btn btn-sm btn-dark shadow-none d-flex align-content-center"
        onClick={backButton} disabled={page <= 1 ? true : false}
      >
        <svg className="bi bi-caret-left-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 00-1.659-.753l-5.48 4.796a1 1 0 000 1.506z" />
        </svg>
      </button>
      <span className="ml-3 mr-3">Page {page} of {total_pages}</span>
      <button
        className="btn btn-sm btn-dark shadow-none d-flex align-content-center"
        onClick={forwardButton} disabled={page === total_pages ? true : false}
      >
        <svg className="bi bi-caret-right-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z" />
        </svg>
      </button>
    </div>
  )
}

export default MoviePagination;