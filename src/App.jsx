import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react'; // Importa el componente de Google Map React
import Formulario from './components/Formulario/Formulario';
import Tabla from './components/Tabla/Tabla';
import './App.css';

// Componente para el marcador en el mapa
const Marker = ({ text }) => <div className="marker">{text}</div>;

function App() {
  // Estado para usuarios y usuario en edición
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Lógica para obtener usuarios desde API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const translatedUsers = response.data.map(user => ({
          id: user.id,
          nombre: user.name, // Traduciendo 'name' a 'nombre'
          primerApellido: user.username, // No hay 'primerApellido' en los datos originales, así que usé 'username'
          userMail: user.email, // Similar aquí, usé 'email' para 'userMail'
          estado: user.address.city, // Usando 'city' para 'estado'
          delegacion: user.address.street, // Usando 'street' para 'delegacion'
          colonia: user.address.suite, // Usando 'suite' para 'colonia'
          curp: '', // No hay 'curp' en los datos originales, así que lo dejo vacío
          rfc: '', // No hay 'rfc' en los datos originales, así que lo dejo vacío
          codigoPostal: user.address.zipcode, // Usando 'zipcode' para 'codigoPostal'
          numeroExterior: user.address.geo.lat, // No hay 'numeroExterior' en los datos originales, así que usé 'lat'
          numeroInterior: user.address.geo.lng, // No hay 'numeroInterior' en los datos originales, así que usé 'lng'
          position: {
            lat: parseFloat(user.address.geo.lat), // Convierte latitud a número flotante
            lng: parseFloat(user.address.geo.lng)  // Convierte longitud a número flotante
          }
        }));
        setUsers(translatedUsers);
      })
      .catch(error => {
        console.error('Error fetching the users data', error);
      });
  }, []);

  // Función para manejar envío de formulario
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
        userMail: formData.userMail // Asegúrate de incluir el correo electrónico aquí
      };
      setUsers([...users, newUser]);
    }
  };

  // Función para manejar edición de usuario
  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUser(userToEdit);
    console.log("Editing User:", userToEdit);
  };

  // Función para manejar eliminación de usuario
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Configuración para el mapa de Google Maps
  const defaultProps = {
    center: {
      lat: 37.7749, // Latitud central por defecto
      lng: -122.4194 // Longitud central por defecto
    },
    zoom: 11 // Zoom inicial del mapa
  };

  return (
    <div className="App">
      <h1>Formulario de Registro</h1>
      <Formulario onSubmit={handleFormSubmit} editingUser={editingUser} />
      <h2>Usuarios</h2>
      <Tabla users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'TU_API_KEY_DE_GOOGLE_MAPS' }} // Reemplaza 'TU_API_KEY_DE_GOOGLE_MAPS' con tu API Key de Google Maps
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* Renderiza marcadores para cada usuario */}
          {users.map(user => (
            <Marker
              key={user.id}
              lat={user.position.lat}
              lng={user.position.lng}
              text={user.nombre}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;