import axios from 'axios';

const api = 'http://localhost:8003';

export const getUsers = async () => {
  const response = await axios.get(api);
  return response.data;
};

export const createUser = async (user) => {
  await axios.post(api, user);
};

export const editUser = async (user) => {
  await axios.put(api + `/${user.id_usuario}`, user);
};

export const deleteUser = async (id_usuario) => {
  await axios.delete(api + `/${id_usuario}`);
};

export const getUserDetail = async (id_usuario) => {
  const response = await axios.get(api + `/${id_usuario}`);
  return response.data;
};
