import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import credentials from './credentials';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0, // Puedes ajustar el centro del mapa según sea necesario
  lng: 0
};

const Maps = ({ users }) => {
  return (
    <LoadScript googleMapsApiKey={credentials.mapsKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2} // Zoom ajustado para ver todos los marcadores
      >
        {users.map(user => (
          <Marker
            key={user.id}
            position={{ lat: parseFloat(user.numeroExterior), lng: parseFloat(user.numeroInterior) }}
            title={user.nombre}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;