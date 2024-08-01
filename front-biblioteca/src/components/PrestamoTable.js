import React, { useState, useEffect } from 'react';
import { getPrestamos, createPrestamo, editPrestamo, deletePrestamo, getPrestamoDetail } from '../services/prestamoService';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrestamoTable = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [newPrestamo, setNewPrestamo] = useState({ fecha_prestamo: '', usuario: { id_usuario: '' }, libro: { id_libro: '' } });
  const [editingPrestamo, setEditingPrestamo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const fetchPrestamos = async () => {
    const prestamosData = await getPrestamos();
    setPrestamos(prestamosData);
  };

  const handleCreatePrestamo = async () => {
    try {
      await createPrestamo(newPrestamo);
      setNewPrestamo({ fecha_prestamo: '', usuario: { id_usuario: '' }, libro: { id_libro: '' } });
      fetchPrestamos();
      setUpdateMessage('Préstamo creado correctamente.');
    } catch (error) {
      console.error('Error al crear préstamo:', error);
      setUpdateMessage('Error al crear el préstamo.');
    }
  };

  const handleEditPrestamo = async () => {
    try {
      await editPrestamo(editingPrestamo, editingPrestamo.id_prestamo);
      setEditingPrestamo(null);
      fetchPrestamos();
      setShowEditModal(false);
      setUpdateMessage('Préstamo actualizado correctamente.');
    } catch (error) {
      console.error('Error al editar préstamo:', error);
      setUpdateMessage('Error al actualizar el préstamo.');
    }
  };

  const handleDeletePrestamo = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este préstamo?')) {
      try {
        await deletePrestamo(id);
        fetchPrestamos();
        setUpdateMessage('Préstamo eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar préstamo:', error);
        setUpdateMessage('Error al eliminar el préstamo.');
      }
    }
  };

  const handleChangeNewPrestamo = (e) => {
    const { name, value } = e.target;
    setNewPrestamo({ ...newPrestamo, [name]: value });
  };

  const viewPrestamoDetail = async (id) => {
    const prestamoDetail = await getPrestamoDetail(id);
    setSelectedPrestamo(prestamoDetail);
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
          type="date"
          className="form-control mb-2"
          placeholder="Fecha de Préstamo"
          name="fecha_prestamo"
          value={newPrestamo.fecha_prestamo}
          onChange={handleChangeNewPrestamo}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="ID Usuario"
          name="usuario_id"
          value={newPrestamo.usuario.id_usuario}
          onChange={(e) => setNewPrestamo({ ...newPrestamo, usuario: { id_usuario: e.target.value } })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="ID Libro"
          name="libro_id"
          value={newPrestamo.libro.id_libro}
          onChange={(e) => setNewPrestamo({ ...newPrestamo, libro: { id_libro: e.target.value } })}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreatePrestamo}>
          Crear Préstamo
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>Fecha de Préstamo</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Titulo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(prestamo => (
            <tr key={prestamo.id_prestamo}>
              <td>{prestamo.id_prestamo}</td>
              <td>{prestamo.fecha_prestamo}</td>
                <td>{prestamo.usuario ? prestamo.usuario.nombre : ''}</td>
                <td>{prestamo.usuario ? prestamo.usuario.correo_electronico : ''}</td>
                <td>{prestamo.usuario ? prestamo.usuario.telefono : ''}</td>
                <td>{prestamo.libro ? prestamo.libro.titulo : ''}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewPrestamoDetail(prestamo.id_prestamo)}>
                  Ver Detalles
                </button>
                <button className="btn btn-danger" onClick={() => handleDeletePrestamo(prestamo.id_prestamo)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPrestamo && (
        <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Préstamo</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editFechaPrestamo">Fecha de Préstamo</label>
                  <input
                    type="date"
                    className="form-control"
                    id="editFechaPrestamo"
                    name="fecha_prestamo"
                    value={editingPrestamo.fecha_prestamo}
                    onChange={(e) => setEditingPrestamo({ ...editingPrestamo, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editUsuarioId">ID Usuario</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editUsuarioId"
                    name="usuario_id"
                    value={editingPrestamo.usuario.id_usuario}
                    onChange={(e) => setEditingPrestamo({ ...editingPrestamo, usuario: { id_usuario: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editLibroId">ID Libro</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editLibroId"
                    name="libro_id"
                    value={editingPrestamo.libro.id_libro}
                    onChange={(e) => setEditingPrestamo({ ...editingPrestamo, libro: { id_libro: e.target.value } })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditPrestamo}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedPrestamo && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Préstamo</h5>
              </div>
              <div className="modal-body">
                <p><strong>ID Préstamo:</strong> {selectedPrestamo.id_prestamo}</p>
                <p><strong>Fecha de Préstamo:</strong> {selectedPrestamo.fecha_prestamo}</p>
                <p><strong>Nombre:</strong> {selectedPrestamo.usuario ? selectedPrestamo.usuario.nombre : ''}</p>
                <p><strong>Correo:</strong> {selectedPrestamo.usuario ? selectedPrestamo.usuario.correo_electronico : ''}</p>
                <p><strong>Teléfono:</strong> {selectedPrestamo.usuario ? selectedPrestamo.usuario.telefono : ''}</p>
                <p><strong>Titulo:</strong> {selectedPrestamo.libro ? selectedPrestamo.libro.titulo : ''}</p>
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

export default PrestamoTable;

