import React, { useState, useEffect } from 'react';
import { getInventories, createInventory, editInventory, deleteInventory, getInventoryDetail } from '../services/inventoryService';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryTable = () => {
  const [inventories, setInventories] = useState([]);
  const [newInventory, setNewInventory] = useState({ libro: { id_libro: '' }, cantidad: '' });
  const [editingInventory, setEditingInventory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    const data = await getInventories();
    setInventories(data);
  };

  const handleCreateInventory = async () => {
    await createInventory(newInventory);
    setNewInventory({ libro: { id_libro: '' }, cantidad: '' });
    fetchInventories();
    setUpdateMessage('Inventario creado correctamente.');
  };

  const handleEditInventory = async () => {
    if (!editingInventory.libro.id_libro || !editingInventory.cantidad) {
      console.error("Datos incompletos para editar el inventario.");
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    try {
      await editInventory(editingInventory);
      setShowEditModal(false);
      setUpdateMessage('Inventario actualizado correctamente.');
      // Actualiza la lista de inventarios si es necesario
    } catch (error) {
      console.error("Error al editar el inventario:", error);
      alert("Ocurrió un error al actualizar el inventario. Por favor, inténtalo de nuevo.");
      // Manejo de errores adicional, si es necesario
    }
  };
  

  const handleDeleteInventory = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este inventario?')) {
      await deleteInventory(id);
      fetchInventories();
      setUpdateMessage('Inventario eliminado correctamente.');
    }
  };

  const handleChangeNewInventory = (e) => {
    const { name, value } = e.target;
    setNewInventory({ ...newInventory, libro: { ...newInventory.libro, [name]: value }, [name]: value });
  };

  const startEditingInventory = (inventory) => {
    setEditingInventory(inventory);
    setShowEditModal(true);
  };

  const viewInventoryDetail = async (id) => {
    const detail = await getInventoryDetail(id);
    setSelectedInventory(detail);
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
          placeholder="ID Libro"
          name="id_libro"
          value={newInventory.libro.id_libro}
          onChange={handleChangeNewInventory}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Cantidad"
          name="cantidad"
          value={newInventory.cantidad}
          onChange={handleChangeNewInventory}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreateInventory}>
          Crear Inventario
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Inventario</th>
            <th>ID Libro</th>
            <th>Titulo</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map(inventory => (
            <tr key={inventory.id_inventario}>
              <td>{inventory.id_inventario}</td>
              <td>{inventory.libro ? inventory.libro.id_libro : 'N/A'}</td>
              <td>{inventory.libro ? inventory.libro.titulo : 'N/A'}</td>
              <td>{inventory.cantidad}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewInventoryDetail(inventory.id_inventario)}>
                  Ver Detalles
                </button>
                <button className="btn btn-warning mr-2" onClick={() => startEditingInventory(inventory)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteInventory(inventory.id_inventario)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingInventory && (
  <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Editar Inventario</h5>
          <button type="button" className="close" onClick={() => setShowEditModal(false)}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="editIdLibro">ID Libro</label>
            <input
              type="text"
              className="form-control"
              id="editIdLibro"
              name="id_libro"
              value={editingInventory.libro ? editingInventory.libro.id_libro : ''}
              onChange={(e) => setEditingInventory({
                ...editingInventory,
                libro: { ...editingInventory.libro, id_libro: e.target.value ? parseInt(e.target.value, 10) : null }
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editCantidad">Cantidad</label>
            <input
              type="number"
              className="form-control"
              id="editCantidad"
              name="cantidad"
              value={editingInventory.cantidad}
              onChange={(e) => setEditingInventory({ ...editingInventory, cantidad: e.target.value ? parseInt(e.target.value, 10) : null })}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={handleEditInventory}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Modal para ver detalles del inventario */}
      {showDetailModal && selectedInventory && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Inventario</h5>
              </div>
              <div className="modal-body">
                <div>
                  <p><strong>ID Inventario:</strong> {selectedInventory.id_inventario}</p>
                    <p><strong>Titulo:</strong> {selectedInventory.libro ? selectedInventory.libro.titulo : 'N/A'}</p>
                  <p><strong>Cantidad:</strong> {selectedInventory.cantidad}</p>
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

export default InventoryTable;
