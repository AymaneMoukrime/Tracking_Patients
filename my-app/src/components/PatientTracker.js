import React, { useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa'; // Import the user icon
import MapComponent from './MapComponent1';
import './PatientTracker.css';

const API_URL = "http://localhost:8888"; // REST API URL
const WS_URL = "ws://localhost:8888/SERVICE-TRACKING/updates"; // WebSocket URL

const PatientTracker = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [locations, setLocations] = useState({});
    const socketRef = useRef(null);
    const alertSoundRef = useRef(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // Fetch initial patient data
        const fetchPatients = async () => {
            try {
                const response = await fetch(`${API_URL}/SERVICE-PATIENT/patients`);
                const data = await response.json();
                setPatients(Array.isArray(data) ? data : []);
                console.log("Fetched patients:", data);

                // Connect to WebSocket after fetching patients
                socketRef.current = new WebSocket(WS_URL);
                
                socketRef.current.onopen = () => {
                    console.log("WebSocket connection established");
                };

                socketRef.current.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        console.log("Received WebSocket message:", message);

                        if (message.type === "locationUpdate") {
                            setLocations(prevLocations => ({
                                ...prevLocations,
                                [message.patientId]: {
                                    latitude: message.latitude,
                                    longitude: message.longitude,
                                    timestamp: message.timestamp,
                                    alert: message.alert
                                }
                            }));

                            // Trigger alert if the patient is outside the safe zone
                            if (message.alert) {
                                const patient = (Array.isArray(data) ? data : []).find(p => p.id === message.patientId);
                                if (patient) {
                                    setAlert(`${patient.name} is outside the safe zone!`);
                                    if (alertSoundRef.current) {
                                        alertSoundRef.current.play();
                                    }
                                } else {
                                    console.error(`Patient with ID ${message.patientId} not found in patients array.`);
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Error parsing WebSocket message:", error);
                    }
                };

                socketRef.current.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };

                socketRef.current.onclose = () => {
                    console.log("WebSocket connection closed");
                };

                return () => {
                    if (socketRef.current) {
                        socketRef.current.close();
                    }
                };
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    const handleCloseAlert = () => {
        if (alertSoundRef.current) {
            alertSoundRef.current.pause();
            alertSoundRef.current.currentTime = 0; // Reset the audio to the beginning
        }
        setAlert(null);
    };

    return (
        <div className="patient-tracker">
            <aside>
                <h2>Patients</h2>
                <ul>
                    {patients.map(patient => (
                        <li
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className={selectedPatient?.id === patient.id ? "selected" : ""}
                            style={{ color: locations[patient.id]?.alert ? 'red' : 'black' }}
                        >
                            <FaUser style={{ marginRight: '8px' }} /> {/* Icon beside the patient's name */}
                            {patient.name}
                        </li>
                    ))}
                </ul>
            </aside>
            <main>
                {selectedPatient ? (
                    <div>
                        <h2>{selectedPatient.name}</h2>
                        <p>Condition: {selectedPatient.condition}</p>
                        <MapComponent locations={locations} patients={patients} />
                    </div>
                ) : (
                    <p>Select a patient to view details</p>
                )}
            </main>
            {alert && (
                <div className="alert-popup">
                    <p>{alert}</p>
                    <button onClick={handleCloseAlert}>Close</button>
                </div>
            )}
            <audio ref={alertSoundRef} src="/sounds/alert.mp3" />
        </div>
    );
};

export default PatientTracker;
