export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};

export const getVisiblePages = (pages, currentPage) => {
  const maxVisiblePages = 7;

  if (pages.length <= maxVisiblePages) {
    return pages;
  }

  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];

  if (currentPage <= 4) {
    return [...pages.slice(0, 5), "...", lastPage];
  }

  if (currentPage >= lastPage - 3) {
    return [firstPage, "...", ...pages.slice(-5)];
  }

  return [
    firstPage,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    lastPage,
  ];
};
