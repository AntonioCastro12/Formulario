import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Mapa.css'; // Archivo de estilos para el mapa

const Mapa = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios del servicio API
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="mapa-container">
      <h2>Usuarios en el mapa</h2>
      <div style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }} // Reemplaza con tu clave API de Google Maps
          defaultCenter={{ lat: 0, lng: 0 }} // Centro inicial del mapa (latitud y longitud)
          defaultZoom={2} // Zoom inicial del mapa
        >
          {usuarios.map((usuario) => (
            <Marker
              key={usuario.id}
              lat={parseFloat(usuario.address.geo.lat)}
              lng={parseFloat(usuario.address.geo.lng)}
              text={usuario.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

const Marker = ({ text }) => <div className="marker">{text}</div>;

export default Mapa;