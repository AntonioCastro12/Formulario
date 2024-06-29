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

  // Cargar datos iniciales desde localStorage si están disponibles
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.length > 0) {
      setUsers(storedUsers);
      setIdCounter(storedUsers.length + 1); // Ajustar el contador de IDs
    } else {
      fetchInitialData(); // Si no hay datos en localStorage, cargar desde la API
    }
  }, []);

  // Guardar datos en localStorage cada vez que se modifique el estado `users`
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Función para cargar datos desde la API inicialmente
  const fetchInitialData = () => {
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
        setIdCounter(translatedUsers.length + 1); // Ajustar el contador de IDs
      })
      .catch(error => {
        console.error('Error fetching the users data', error);
      });
  };

  // Manejador para enviar el formulario
  const handleFormSubmit = (formData) => {
    let updatedUsers = [];
    if (editingUser) {
      updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setEditingUser(null);
    } else {
      const newUser = {
        id: idCounter,
        ...formData
      };
      updatedUsers = [newUser, ...users];
      setIdCounter(idCounter + 1); // Incrementar el contador de IDs
    }

    setUsers(updatedUsers);
  };

  // Manejador para editar usuario
  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUser(userToEdit);
  };

  // Manejador para eliminar usuario
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
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