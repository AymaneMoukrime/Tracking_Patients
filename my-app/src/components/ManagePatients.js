import React, { useEffect, useState } from 'react';
import './ManagePatients.css';

const API_URL = "http://localhost:8888/SERVICE-PATIENT/patients";

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        name: '',
        condition: '',
        safeZoneLatitude: '',
        safeZoneLongitude: '',
        safeZoneRadius: '',
    });
    const [editingPatient, setEditingPatient] = useState(null); // To track if we're editing a patient
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Unable to fetch patients. Please try again later.");
            }
            const data = await response.json();
            setPatients(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching patients:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingPatient({ ...editingPatient, [name]: value });
    };

    const handleAddPatient = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPatient),
            });
            if (response.ok) {
                fetchPatients();
                setNewPatient({
                    name: '',
                    condition: '',
                    safeZoneLatitude: '',
                    safeZoneLongitude: '',
                    safeZoneRadius: '',
                });
            } else {
                throw new Error("Failed to add patient.");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error adding patient:", error);
        }
    };

    const handleDeletePatient = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error("Failed to delete patient.");
            }
            setPatients(patients.filter(patient => patient.id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Error deleting patient:", error);
        }
    };

    const handleEditPatient = async () => {
        try {
            const response = await fetch(`${API_URL}/${editingPatient.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPatient),
            });
            if (response.ok) {
                fetchPatients();
                setEditingPatient(null); // Exit editing mode after successful update
            } else {
                throw new Error("Failed to update patient.");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error updating patient:", error);
        }
    };

    return (
        <div className="manage-patients">
            <header>
                <div className="logo">
                    <img src="/images/hospital_logo.png" alt="Logo" />
                </div>
                <h1>Manage Patients</h1>
            </header>
            <main>
                {error && <p className="error-message">{error}</p>}

                {/* Patient List Section */}
                <section className="patient-list">
                    <h2>Patient List</h2>
                    <ul>
                        {patients.map(patient => (
                            <li key={patient.id}>
                                <div className="patient-info">
                                    <span>{patient.name.charAt(0).toUpperCase()}</span>
                                    <div>
                                        <strong>{patient.name}</strong> - {patient.condition}
                                    </div>
                                </div>
                                <div className="button-container">
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditingPatient(patient)} // Set patient to be edited
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeletePatient(patient.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Add New Patient Form */}
                <section className="add-patient">
                    <h2>{editingPatient ? "Edit Patient" : "Add New Patient"}</h2>
                    <form onSubmit={(e) => { e.preventDefault(); editingPatient ? handleEditPatient() : handleAddPatient(); }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={editingPatient ? editingPatient.name : newPatient.name}
                            onChange={editingPatient ? handleEditChange : handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={editingPatient ? editingPatient.condition : newPatient.condition}
                            onChange={editingPatient ? handleEditChange : handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="safeZoneLatitude"
                            placeholder="Safe Zone Latitude"
                            value={editingPatient ? editingPatient.safeZoneLatitude : newPatient.safeZoneLatitude}
                            onChange={editingPatient ? handleEditChange : handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="safeZoneLongitude"
                            placeholder="Safe Zone Longitude"
                            value={editingPatient ? editingPatient.safeZoneLongitude : newPatient.safeZoneLongitude}
                            onChange={editingPatient ? handleEditChange : handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="safeZoneRadius"
                            placeholder="Safe Zone Radius"
                            value={editingPatient ? editingPatient.safeZoneRadius : newPatient.safeZoneRadius}
                            onChange={editingPatient ? handleEditChange : handleInputChange}
                            required
                        />
                        <button type="submit" className="add-btn">
                            {editingPatient ? "Update Patient" : "Add Patient"}
                        </button>
                        {editingPatient && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setEditingPatient(null)} // Cancel editing mode
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </section>
            </main>
        </div>
    );
};

export default ManagePatients;
