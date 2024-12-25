import React, { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import blueprint from '../images/hospital_blueprint.webp';  // Adjust the import path as needed

// Fix for default icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define the bounds for the image overlay
const bounds = [
  [0, 0], // Top left corner of the image
  [1000, 1000] // Bottom right corner of the image (adjust these to fit your blueprint)
];

// Define the marker icons outside the component to avoid re-creation on each render
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const alertIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = ({ locations = {}, patients = [] }) => {
  const [patientLocations, setPatientLocations] = useState(locations);

  useEffect(() => {
    const handleWebSocketMessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'locationUpdate') {
        setPatientLocations((prevLocations) => ({
          ...prevLocations,
          [data.patientId]: data,
        }));
      }
    };

    // Set up WebSocket connection
    const ws = new WebSocket('ws://localhost:8888/SERVICE-TRACKING/updates');  // Update with your WebSocket URL
    ws.onmessage = handleWebSocketMessage;

    return () => {
      ws.close();
    };
  }, []);

  return (
    <MapContainer
      crs={L.CRS.Simple} // Use a simple CRS to fit the image overlay
      bounds={bounds}
      style={{ height: "100vh", width: "100%" }}
    >
      <ImageOverlay
        url={blueprint}
        bounds={bounds}
      />
      {patients.map(patient => (
        <React.Fragment key={patient.id}>
          {patientLocations[patient.id] && (
            <Marker
              position={[patientLocations[patient.id].latitude, patientLocations[patient.id].longitude]}
              icon={patientLocations[patient.id].alert ? alertIcon : defaultIcon}
            >
              <Popup>
                {patientLocations[patient.id].alert && (
                  <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ ALERT</p>
                )}
                <strong style={{ color: patientLocations[patient.id].alert ? 'red' : 'black' }}>{patient.name}</strong><br />
                <strong>Condition:</strong> {patient.condition}<br />
                <strong>Time:</strong> {new Date(patientLocations[patient.id].timestamp).toLocaleString()}
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
