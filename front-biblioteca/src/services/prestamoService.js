import axios from 'axios';

const api = 'http://localhost:8004';

export const getPrestamos = async () => {
    const response = await axios.get(api);
    return response.data;
  };
  
  export const createPrestamo = async (prestamo) => {
    await axios.post(api, prestamo);
  };
  
  export const editPrestamo = async (prestamo) => {
    await axios.put(api + `/${prestamo.id_prestamo}`, prestamo);
  };
  
  export const deletePrestamo = async (id_prestamo) => {
    await axios.delete(api + `/${id_prestamo}`);
  };
  
  export const getPrestamoDetail = async (id_prestamo) => {
    const response = await axios.get(api + `/${id_prestamo}`);
    return response.data;
  };
  
