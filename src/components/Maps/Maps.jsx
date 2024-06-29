import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import credentials from './credentials';
import './maps.css'; // Importando el archivo CSS para estilos adicionales

const containerStyle = {
  width: '100%',
  height: '400px',
  border: '1px solid #ccc', // Añadiendo un borde para mejor visualización
  borderRadius: '8px', // Añadiendo bordes redondeados
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Añadiendo sombra para un efecto de elevación
};

const getMapCenter = (users) => {
  if (users.length === 0) return { lat: 0, lng: 0 };
  
  const latSum = users.reduce((sum, user) => sum + parseFloat(user.numeroExterior), 0);
  const lngSum = users.reduce((sum, user) => sum + parseFloat(user.numeroInterior), 0);
  
  return {
    lat: latSum / users.length,
    lng: lngSum / users.length
  };
};

const Maps = ({ users }) => {
  const center = getMapCenter(users);

  return (
    <div className="map-container"> {/* Envolviendo el mapa en un div para estilos adicionales */}
      <LoadScript googleMapsApiKey={credentials.mapsKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2} // Zoom ajustado para ver todos los marcadores
        >
          {users.map(user => {
            const lat = parseFloat(user.numeroExterior);
            const lng = parseFloat(user.numeroInterior);

            // Validar coordenadas
            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
              console.warn(`Invalid coordinates for user ${user.id}: (${lat}, ${lng})`);
              return null;
            }

            return (
              <Marker
                key={user.id}
                position={{ lat, lng }}
                title={user.nombre}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Maps;