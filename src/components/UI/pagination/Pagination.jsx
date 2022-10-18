import React from "react";
import { getPagesArray, getVisiblePages } from "../../../utils/pages";
import classes from "./Pagination.module.css";

const Pagination = ({ totalPages, page, changePage, className = "" }) => {
  const pagesArray = getPagesArray(totalPages);
  const visiblePages = getVisiblePages(pagesArray, page);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={[classes.pagination, className].join(" ")}
      aria-label="Pagination"
    >
      <button
        className={classes.control}
        type="button"
        disabled={isFirstPage}
        onClick={() => changePage(page - 1)}
      >
        Previous
      </button>

      <div className={classes.pages}>
        {visiblePages.map((pageItem, index) =>
          pageItem === "..." ? (
            <span
              className={classes.dots}
              key={`${pageItem}-${index}`}
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              className={[
                classes.page,
                page === pageItem ? classes.current : "",
              ].join(" ")}
              type="button"
              onClick={() => changePage(pageItem)}
              aria-current={page === pageItem ? "page" : undefined}
              key={pageItem}
            >
              {pageItem}
            </button>
          ),
        )}
      </div>

      <button
        className={classes.control}
        type="button"
        disabled={isLastPage}
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
