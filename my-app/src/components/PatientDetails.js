import React, { useEffect } from 'react';
import MapComponent from './MapComponent1';

const PatientDetails = ({ patients, locations, selectedPatientId, setSelectedPatientId }) => {
    useEffect(() => {
        if (selectedPatientId) {
            const patient = patients.find(p => p.id === selectedPatientId);
            if (patient) {
                // Focus on the selected patient
                const patientLocation = locations[selectedPatientId];
                if (patientLocation) {
                    // Update the map to focus on the patient's location
                    // You might need to add logic to update the map's center and zoom
                }
            }
        }
    }, [selectedPatientId, patients, locations]);

    return (
        <div>
            <h1>Patient Details</h1>
            <MapComponent locations={locations} patients={patients} />
        </div>
    );
};

export default PatientDetails;
