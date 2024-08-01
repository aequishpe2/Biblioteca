import React, { useState, useEffect } from 'react';
import { getNotifications, createNotification, editNotification, deleteNotification, getNotificationDetail } from '../services/notificationService';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({ mensaje: '', fecha_notificacion: '', usuario: { id_usuario: '' } });
  const [editingNotification, setEditingNotification] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const notificationsData = await getNotifications();
    setNotifications(notificationsData);
  };

  const handleCreateNotification = async () => {
    try {
      await createNotification(newNotification);
      setNewNotification({ mensaje: '', fecha_notificacion: '', usuario: { id_usuario: '' } });
      fetchNotifications();
      setUpdateMessage('Notificación creada correctamente.');
    } catch (error) {
      console.error('Error al crear notificación:', error);
      setUpdateMessage('Error al crear la notificación.');
    }
  };

  const handleEditNotification = async () => {
    try {
      await editNotification(editingNotification);
      setEditingNotification(null);
      fetchNotifications();
      setShowEditModal(false);
      setUpdateMessage('Notificación actualizada correctamente.');
    } catch (error) {
      console.error('Error al editar notificación:', error);
      setUpdateMessage('Error al actualizar la notificación.');
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta notificación?')) {
      try {
        await deleteNotification(id);
        fetchNotifications();
        setUpdateMessage('Notificación eliminada correctamente.');
      } catch (error) {
        console.error('Error al eliminar notificación:', error);
        setUpdateMessage('Error al eliminar la notificación.');
      }
    }
  };

  const handleChangeNewNotification = (e) => {
    const { name, value } = e.target;

    if (name === 'id_usuario') {
      setNewNotification({ ...newNotification, usuario: { id_usuario: value } });
    } else {
      setNewNotification({ ...newNotification, [name]: value });
    }
  };

  const viewNotificationDetail = async (id) => {
    const notificationDetail = await getNotificationDetail(id);
    setSelectedNotification(notificationDetail);
    setShowDetailModal(true);
  };

  return (
    <div>
      {updateMessage && (
        <div className="alert alert-success" role="alert">
          {updateMessage}
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Mensaje"
          name="mensaje"
          value={newNotification.mensaje}
          onChange={handleChangeNewNotification}
        />
        <input
          type="date"
          className="form-control mb-2"
          name="fecha_notificacion"
          value={newNotification.fecha_notificacion}
          onChange={handleChangeNewNotification}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="ID Usuario"
          name="id_usuario"
          value={newNotification.usuario.id_usuario}
          onChange={handleChangeNewNotification}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreateNotification}>
          Crear Notificación
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Notificación</th>
            <th>Nombre</th>
            <th>Mensaje</th>
            <th>Fecha de Notificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.id_notificacion}>
              <td>{notification.id_notificacion}</td>
              <td>{notification.usuario ? notification.usuario.nombre : ''}</td>
              <td>{notification.mensaje}</td>
              <td>{notification.fecha_notificacion}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewNotificationDetail(notification.id_notificacion)}>
                  Ver Detalles
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteNotification(notification.id_notificacion)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingNotification && (
        <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Notificación</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editMensaje">Mensaje</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editMensaje"
                    name="mensaje"
                    value={editingNotification.mensaje}
                    onChange={(e) => setEditingNotification({ ...editingNotification, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editFechaNotificacion">Fecha de Notificación</label>
                  <input
                    type="date"
                    className="form-control"
                    id="editFechaNotificacion"
                    name="fecha_notificacion"
                    value={editingNotification.fecha_notificacion}
                    onChange={(e) => setEditingNotification({ ...editingNotification, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editUsuarioId">ID Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editUsuarioId"
                    name="usuario_id"
                    value={editingNotification.usuario ? editingNotification.usuario.id_usuario : ''}
                    onChange={(e) => setEditingNotification({
                      ...editingNotification,
                      usuario: { id_usuario: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditNotification}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedNotification && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de la Notificación</h5>
              </div>
              <div className="modal-body">
                <div>
                  <p><strong>ID Notificación:</strong> {selectedNotification.id_notificacion}</p>
                    <p><strong>Nombre:</strong> {selectedNotification.usuario ? selectedNotification.usuario.nombre : ''}</p>
                  <p><strong>Mensaje:</strong> {selectedNotification.mensaje}</p>
                  <p><strong>Fecha de Notificación:</strong> {selectedNotification.fecha_notificacion}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationTable;
