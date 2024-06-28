import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const translatedUsers = response.data.map(user => ({
          id: user.id,
          nombre: user.name, // Traduciendo 'name' a 'nombre'
          primerApellido: user.username, // No hay 'primerApellido' en los datos originales, así que usé 'username'
          userMail: user.email, // Similar aquí, usé 'email' para 'segundoApellido'
          estado: user.address.city, // Usando 'city' para 'estado'
          delegacion: user.address.street, // Usando 'street' para 'delegacion'
          colonia: user.address.suite, // Usando 'suite' para 'colonia'
          curp: '', // No hay 'curp' en los datos originales, así que lo dejo vacío
          rfc: '', // No hay 'rfc' en los datos originales, así que lo dejo vacío
          codigoPostal: user.address.zipcode, // Usando 'zipcode' para 'codigoPostal'
          numeroExterior: user.address.geo.lat, // No hay 'numeroExterior' en los datos originales, así que usé 'lat'
          numeroInterior: user.address.geo.lng, // No hay 'numeroInterior' en los datos originales, así que usé 'lng'
    
        }));
        setUsers(translatedUsers);
      })
      .catch(error => {
        console.error('Error fetching the users data', error);
      });
  }, []);
  const handleFormSubmit = (formData) => {
    if (editingUser) {
      // Editar usuario existente
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      
      const newUser = {
        id: users.length + 1, 
        ...formData
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
    </div>
  );
}

export default App;