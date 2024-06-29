import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';
import './App.css';
import Maps from './components/Maps/Maps';
import credentials from './components/Maps/credentials';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const translatedUsers = response.data.map(user => ({
          id: user.id,
          nombre: user.name,
          primerApellido: user.username,
          userMail: user.email,
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
        id: users.length + 1,
        ...formData,
        userMail: formData.userMail
      };
      setUsers([...users, newUser]);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUser(userToEdit);
    console.log("Editing User:", userToEdit);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="App">
      <h1>Formulario de Registro</h1>
      <Formulario onSubmit={handleFormSubmit} editingUser={editingUser} />
      <h2>Usuarios</h2>
      <Tabla users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Maps />
    </div>
  );
}

export default App;