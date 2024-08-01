import axios from 'axios';

const api = 'http://localhost:8006';

export const getBook = async () => {
  const response = await axios.get(api);
  return response.data;
};

export const createBook = async (book) => {
  await axios.post(api, book);
};

export const editBook = async (book) => {
  await axios.put(api + `/${book.id_libro}`, book);
};

export const deleteBook = async (id_libro) => {
  await axios.delete(api + `/${id_libro}`);
};

export const getBookDetail = async (id_libro) => {
  const response = await axios.get(api + `/${id_libro}`);
  return response.data;
};
