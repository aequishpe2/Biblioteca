import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UserPage';
import BooksPage from './pages/BookPage';
import InventoriesPage from './pages/InventoriesPage';
import PaymentsPage from './pages/PaymentsPage';
import NotificationsPage from './components/NotificationTable';
import PrestamosPage from './pages/PrestamosPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/inventories" element={<InventoriesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/prestamos" element={<PrestamosPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
