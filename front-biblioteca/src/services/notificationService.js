import axios from 'axios';

const api = 'http://localhost:8007'; // Asegúrate de que este es el puerto correcto para tu microservicio de notificaciones

export const getNotifications = async () => {
  const response = await axios.get(api);
  return response.data;
};

export const createNotification = async (notification) => {
  await axios.post(api, notification);
};

export const editNotification = async (notification) => {
  await axios.put(`${api}/${notification.id_notificacion}`, notification);
};

export const deleteNotification = async (id_notificacion) => {
  await axios.delete(`${api}/${id_notificacion}`);
};

export const getNotificationDetail = async (id_notificacion) => {
  const response = await axios.get(`${api}/${id_notificacion}`);
  return response.data;
};
