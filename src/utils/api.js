export const fetchSuggestions = (searchTerm) => {
  return fetch(`http://localhost:3001/search?q=${searchTerm}`).then((res) => res.json()).catch(err => console.error(err));
};

export const fetchProductDetail = (id) => {
  return fetch(`http://localhost:3001/products/${id}`).then((res) => res.json()).catch(err => console.error(err));
};
