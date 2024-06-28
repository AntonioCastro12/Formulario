import React from 'react';
import './Tabla.css';

const Tabla = ({ users, onEdit, onDelete }) => {
  return (
    <div className="tabla-responsive">
      <table className="tabla-banco">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>E-mail</th>
            <th>Colonia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.userMail}</td>
              <td>{user.colonia}</td>
              <td>
                <button className="btn-editar" onClick={() => onEdit(user.id)}>✏️ Editar</button>
                <button className="btn-eliminar" onClick={() => onDelete(user.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;