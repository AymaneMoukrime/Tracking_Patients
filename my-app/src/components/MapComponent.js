import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ locations = {}, patients = [] }) => {
  const center = [31.6295, -7.9811]; // Center of Morocco

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {patients.map(patient => (
        <React.Fragment key={patient.id}>
          {locations[patient.id] && (
            <Marker position={[locations[patient.id].latitude, locations[patient.id].longitude]}>
              <Popup>
                Patient ID: {patient.id}<br />
                Latitude: {locations[patient.id].latitude}<br />
                Longitude: {locations[patient.id].longitude}<br />
                Time: {new Date(locations[patient.id].timestamp).toLocaleString()}
              </Popup>
            </Marker>
          )}
          <Circle
            center={[patient.safeZoneLatitude, patient.safeZoneLongitude]}
            radius={patient.safeZoneRadius}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
