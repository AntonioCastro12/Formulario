import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import credentials from './credentials';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Maps = () => {
  return (
    <LoadScript
      googleMapsApiKey={credentials.mapsKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Aquí puedes agregar marcadores, ventanas de información, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;