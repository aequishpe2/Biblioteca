import axios from 'axios';

const api = 'http://localhost:8005';

export const getPayments = async () => {
    const response = await axios.get(api);
    return response.data;
  };
  
  export const createPayment = async (payment) => {
    await axios.post(api, payment);
  };
  
  export const editPayment = async (payment) => {
    await axios.put(api + `/${payment.id_pago}`, payment);
  };
  
  export const deletePayment = async (id_pago) => {
    await axios.delete(api + `/${id_pago}`);
  };
  
  export const getPaymentDetail = async (id_pago) => {
    const response = await axios.get(api + `/${id_pago}`);
    return response.data;
  };