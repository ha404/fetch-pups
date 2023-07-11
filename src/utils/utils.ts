// API calls starts from 0 index; Pagination is 9 items/ page
export const itemCount = (page: number) => {
  if (page === 1) {
    return 0;
  }
  if (page > 1) {
    return page * 9;
  }
};

// Slider value accessibility
export const valuetext = (value: number) => {
  return `${value}dog age`;
};
