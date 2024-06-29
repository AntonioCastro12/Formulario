import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';
import Maps from './components/Maps/Maps';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const translatedUsers = response.data.map((user, index) => ({
          id: index + 1,
          nombre: user.name,
          primerApellido: user.username,
          segundoApellido: '', // No disponible en la API
          email: user.email,
          estado: user.address.city,
          delegacion: user.address.street,
          colonia: user.address.suite,
          curp: '',
          rfc: '',
          codigoPostal: user.address.zipcode,
          numeroExterior: user.address.geo.lat,
          numeroInterior: user.address.geo.lng,
        }));
        setUsers(translatedUsers);
      })
      .catch(error => {
        console.error('Error fetching the users data', error);
      });
  }, []);

  const handleFormSubmit = (formData) => {
    if (editingUser) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      const newUser = {
        id: 1,
        ...formData
      };
      const updatedUsers = [newUser, ...users].map((user, index) => ({
        ...user,
        id: index + 1
      }));
      setUsers(updatedUsers);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUser(userToEdit);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    const reindexedUsers = updatedUsers.map((user, index) => ({
      ...user,
      id: index + 1
    }));
    setUsers(reindexedUsers);
  };

  return (
    <div className="App">
      <h1>Formulario de Registro</h1>
      <Formulario onSubmit={handleFormSubmit} editingUser={editingUser} />
      <h2>Usuarios</h2>
      <Tabla users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <div className="Maps">
        <Maps users={users} />
      </div>
    </div>
  );
}

export default App;