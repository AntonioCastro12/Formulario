import React from 'react';
import './Tabla.css';

const Tabla = ({ users, onEdit, onDelete }) => {
  return (
    <div className="tabla-container">
      <table className="tabla-banco">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Primer Apellido</th>
            <th>Estado</th>
            <th>Acciones</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.primerApellido}</td>
              <td>{user.estado}</td>

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