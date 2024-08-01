import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/users">Usuarios</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/books">Libros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventories">Inventarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payments">Pagos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">Notificaciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prestamos">Prestamos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
