import React, { useState, useEffect } from 'react';
import { getBook, createBook, editBook, deleteBook, getBookDetail } from '../services/bookService';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ autor: '', titulo: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const booksData = await getBook();
    setBooks(booksData);
  };

  const handleCreateBook = async () => {
    await createBook(newBook);
    setNewBook({ autor: '', titulo: '' });
    fetchBooks();
    setUpdateMessage('Libro creado correctamente.');
  };

  const handleEditBook = async () => {
    try {
      await editBook(editingBook);
      setEditingBook(null);
      fetchBooks();
      setShowEditModal(false);
      setUpdateMessage('Libro actualizado correctamente.');
    } catch (error) {
      console.error('Error al editar libro:', error);
      setUpdateMessage('Error al actualizar el libro.');
    }
  };

  const handleDeleteBook = async (id_libro) => {
    if (window.confirm('¿Está seguro que desea eliminar este libro?')) {
      await deleteBook(id_libro);
      fetchBooks();
      setUpdateMessage('Libro eliminado correctamente.');
    }
  };

  const handleChangeNewBook = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const startEditingBook = (book) => {
    setEditingBook(book);
    setShowEditModal(true);
  };

  const viewBookDetail = async (id_libro) => {
    const bookDetail = await getBookDetail(id_libro);
    setSelectedBook(bookDetail);
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
          placeholder="Autor"
          name="autor"
          value={newBook.autor}
          onChange={handleChangeNewBook}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Título"
          name="titulo"
          value={newBook.titulo}
          onChange={handleChangeNewBook}
        />
        <button className="btn btn-primary mb-2" onClick={handleCreateBook}>
          Crear Libro
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Libro</th>
            <th>Autor</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id_libro}>
              <td>{book.id_libro}</td>
              <td>{book.autor}</td>
              <td>{book.titulo}</td>
              <td>
                <button className="btn btn-info mr-2" onClick={() => viewBookDetail(book.id_libro)}>
                  Ver Detalles
                </button>
                <button className="btn btn-warning mr-2" onClick={() => startEditingBook(book)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteBook(book.id_libro)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBook && (
        <div className="modal fade show" style={{ display: showEditModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Libro</h5>
                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editAutor">Autor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAutor"
                    name="autor"
                    value={editingBook.autor}
                    onChange={(e) => setEditingBook({ ...editingBook, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editTitulo">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitulo"
                    name="titulo"
                    value={editingBook.titulo}
                    onChange={(e) => setEditingBook({ ...editingBook, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleEditBook}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedBook && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles del Libro</h5>
              </div>
              <div className="modal-body">
                <div>
                  <p><strong>ID Libro:</strong> {selectedBook.id_libro}</p>
                  <p><strong>Autor:</strong> {selectedBook.autor}</p>
                  <p><strong>Título:</strong> {selectedBook.titulo}</p>
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

export default BookTable;
