import React, { useState, useEffect } from 'react';
import { getPayments, createPayment, editPayment, deletePayment, getPaymentDetail } from '../services/paymentService';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ usuario: { id_usuario: '' }, monto: '', fecha_pago: '' });
  const [editingPayment, setEditingPayment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const data = await getPayments();
    setPayments(data);
  };

  const handleCreatePayment = async () => {
    await createPayment(newPayment);
    setNewPayment({ usuario: { id_usuario: '' }, monto: '', fecha_pago: '' });
    fetchPayments();
    setUpdateMessage('Pago creado correctamente.');
  };

  const handleEditPayment = async () => {
    if (!editingPayment.usuario.id_usuario || !editingPayment.monto || !editingPayment.fecha_pago) {
      console.error("Datos incompletos para editar el inventario.");
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      await editPayment(editingPayment);
      setShowEditModal(false);
      setUpdateMessage('Inventario actualizado correctamente.');
      // Actualiza la lista de inventarios si es necesario
    } catch (error) {
      console.error("Error al editar el inventario:", error);
      alert("Ocurrió un error al actualizar el inventario. Por favor, inténtalo de nuevo.");
      // Manejo de errores adicional, si es necesario
    }
  };
  

  const handleDeletePayment = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este pago?')) {
      await deletePayment(id);
      fetchPayments();
      setUpdateMessage('Pago eliminado correctamente.');
    }
  };

  const handleChangeNewPayment = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, usuario: { ...newPayment.usuario, [name]: value }, [name]: value });
  };

  const startEditingPayment = (payment) => {
    setEditingPayment(payment);
    setShowEditModal(true);
  };

  const viewPaymentDetail = async (id) => {
    const detail = await getPaymentDetail(id);
    setSelectedPayment(detail);
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
          placeholder="ID Usuario"
          name="id_usuario"
          value={newPayment.usuario.id_usuario}
          onChange={handleChangeNewPayment}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Monto"
          name="monto"
          value={newPayment.monto}
          onChange={handleChangeNewPayment}
        />
        <input
          type="date"
          className="form-control mb-2"
          placeholder="Fecha de Pago"
          name="fecha_pago"
          value={newPayment.fecha_pago}
          onChange={handleChangeNewPayment}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreatePayment}>
          Crear Pago
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Pago</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Monto</th>
            <th>Fecha de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id_pago}>
              <td>{payment.id_pago}</td>
              <td>{payment.usuario ? payment.usuario.nombre : 'N/A'}</td>
              <td>{payment.usuario ? payment.usuario.telefono : 'N/A'}</td>
              <td>{payment.monto}</td>
              <td>{payment.fecha_pago}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewPaymentDetail(payment.id_pago)}>
                  Ver Detalles
                </button>
                <button className="btn btn-warning mr-2" onClick={() => startEditingPayment(payment)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDeletePayment(payment.id_pago)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar pago */}
      {editingPayment && (
        <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Pago</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editIdUsuario">ID Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editIdUsuario"
                    name="id_usuario"
                    value={editingPayment.usuario ? editingPayment.usuario.id_usuario : ''}
                    onChange={(e) => setEditingPayment({ ...editingPayment, usuario: { ...editingPayment.usuario, id_usuario: e.target.value } })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editMonto">Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    id="editMonto"
                    name="monto"
                    value={editingPayment.monto}
                    onChange={(e) => setEditingPayment({ ...editingPayment, monto: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editFechaPago">Fecha de Pago</label>
                  <input
                    type="date"
                    className="form-control"
                    id="editFechaPago"
                    name="fecha_pago"
                    value={editingPayment.fecha_pago}
                    onChange={(e) => setEditingPayment({ ...editingPayment, fecha_pago: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditPayment}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver detalles del pago */}
      {showDetailModal && selectedPayment && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Pago</h5>
              </div>
              <div className="modal-body">
                <div>
                  <p><strong>ID Pago:</strong> {selectedPayment.id_pago}</p>
                  <p><strong>Nombre:</strong> {selectedPayment.usuario ? selectedPayment.usuario.nombre : 'N/A'}</p>
                  <p><strong>Teléfono:</strong> {selectedPayment.usuario ? selectedPayment.usuario.telefono : 'N/A'}</p>
                  <p><strong>Monto:</strong> {selectedPayment.monto}</p>
                  <p><strong>Fecha de Pago:</strong> {selectedPayment.fecha_pago}</p>
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

export default PaymentTable;
