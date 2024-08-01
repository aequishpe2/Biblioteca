import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WelcomeMessage = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Bienvenidos</h1>
      <p className="lead">Esta es la página principal de la aplicación.</p>
      <p>GRUPO 05</p>
      <ul>
        <li>Heidy Nacata</li>
        <li>Anthony Quishpe</li>
        <li>Amanda Rivera</li>
        <li>Danny Rodriguez</li>
        <li>Nayeli Tipantiza</li>
      </ul>
    </div>
  );
};

export default WelcomeMessage;
