import React, { useState, useEffect } from 'react';
import { getUsers, createUser, editUser, deleteUser, getUserDetail } from '../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: '', correo_electronico: '', telefono: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const handleCreateUser = async () => {
    await createUser(newUser);
    setNewUser({ nombre: '', correo_electronico: '', telefono: '' });
    fetchUsers();
    setUpdateMessage('Usuario creado correctamente.');
  };

  const handleEditUser = async () => {
    try {
      await editUser(editingUser);
      setEditingUser(null);
      fetchUsers();
      setShowEditModal(false);
      setUpdateMessage('Usuario actualizado correctamente.');
    } catch (error) {
      console.error('Error al editar usuario:', error);
      setUpdateMessage('Error al actualizar el usuario.');
    }
  };

  const handleDeleteUser = async (id_usuario) => {
    if (window.confirm('¿Está seguro que desea eliminar este usuario?')) {
      await deleteUser(id_usuario);
      fetchUsers();
      setUpdateMessage('Usuario eliminado correctamente.');
    }
  };

  const handleChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const startEditingUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const viewUserDetail = async (id_usuario) => {
    const userDetail = await getUserDetail(id_usuario);
    setSelectedUser(userDetail);
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
          placeholder="Nombre"
          name="nombre"
          value={newUser.nombre}
          onChange={handleChangeNewUser}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Correo Electrónico"
          name="correo_electronico"
          value={newUser.correo_electronico}
          onChange={handleChangeNewUser}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Teléfono"
          name="telefono"
          value={newUser.telefono}
          onChange={handleChangeNewUser}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreateUser}>
          Crear Usuario
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nombre}</td>
              <td>{user.correo_electronico}</td>
              <td>{user.telefono}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewUserDetail(user.id_usuario)}>
                  Ver Detalles
                </button>
                <button className="btn btn-warning mr-2" onClick={() => startEditingUser(user)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id_usuario)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editNombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editNombre"
                    name="nombre"
                    value={editingUser.nombre}
                    onChange={(e) => setEditingUser({ ...editingUser, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editCorreoElectronico">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="editCorreoElectronico"
                    name="correo_electronico"
                    value={editingUser.correo_electronico}
                    onChange={(e) => setEditingUser({ ...editingUser, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editTelefono">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTelefono"
                    name="telefono"
                    value={editingUser.telefono}
                    onChange={(e) => setEditingUser({ ...editingUser, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditUser}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedUser && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Usuario</h5>
              </div>
              <div className="modal-body">
                <div>
                  <p><strong>ID Usuario:</strong> {selectedUser.id_usuario}</p>
                  <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                  <p><strong>Correo Electrónico:</strong> {selectedUser.correo_electronico}</p>
                  <p><strong>Teléfono:</strong> {selectedUser.telefono}</p>
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

export default UserTable;
