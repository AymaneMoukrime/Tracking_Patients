import React, { useEffect, useState } from 'react';
import './ManageDoctors.css';
import { FaUserMd } from 'react-icons/fa'; // Import doctor icon from React Icons

const API_URL = "http://localhost:8888/SERVICE-DOCTOR/doctors";

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: '',
        location: '',
    });
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [error, setError] = useState(null);  // For handling errors

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Unable to fetch Doctors. Please try again later.");
            }
            const data = await response.json();
            setDoctors(data);
            setError(null);  // Reset error if fetch is successful
        } catch (error) {
            setError(error.message);  // Set error message
            console.error("Error fetching doctors:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleAddDoctor = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoctor),
            });
            if (response.ok) {
                fetchDoctors();
                setNewDoctor({
                    name: '',
                    specialty: '',
                    location: '',
                });
            }
        } catch (error) {
            setError("Failed to add doctor.");  // Set error message for add action
            console.error("Error adding doctor:", error);
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchDoctors();
        } catch (error) {
            setError("Failed to delete doctor.");  // Set error message for delete action
            console.error("Error deleting doctor:", error);
        }
    };

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);
        setNewDoctor({
            name: doctor.name,
            specialty: doctor.specialty,
            location: doctor.location,
        });
    };

    const handleUpdateDoctor = async () => {
        try {
            const response = await fetch(`${API_URL}/${editingDoctor.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoctor),
            });
            if (response.ok) {
                fetchDoctors();
                setEditingDoctor(null);
                setNewDoctor({
                    name: '',
                    specialty: '',
                    location: '',
                });
            }
        } catch (error) {
            setError("Failed to update doctor.");
            console.error("Error updating doctor:", error);
        }
    };

    const handleCancel = () => {
        setEditingDoctor(null);
        setNewDoctor({
            name: '',
            specialty: '',
            location: '',
        });
    };

    return (
        <div className="manage-doctors">
            <header>
                <div className="logo">
                    <img src="/images/hospital_logo.png" alt="Logo" />
                </div>
                <h1>Manage Doctors</h1>
            </header>
            <main>
                {error && <p className="error-message">{error}</p>}
                <section className="doctor-list">
                    <h2>Doctor List</h2>
                    {doctors.length === 0 ? (
                        <p className="no-data">No doctors available. Add some to get started!</p>
                    ) : (
                        <ul>
                            {doctors.map(doctor => (
                                <li key={doctor.id}>
                                    <div className="doctor-info">
                                        <div className="doctor-name-container">
                                            {/* Doctor icon beside the name */}
                                            <FaUserMd className="doctor-icon" />
                                            <strong>{doctor.name}</strong> - {doctor.specialty}
                                        </div>
                                    </div>
                                    <div className="button-container">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditDoctor(doctor)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteDoctor(doctor.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section className="add-doctor">
                    <h2>{editingDoctor ? 'Update Doctor' : 'Add New Doctor'}</h2>
                    <form onSubmit={(e) => { e.preventDefault(); editingDoctor ? handleUpdateDoctor() : handleAddDoctor(); }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newDoctor.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="specialty"
                            placeholder="Specialty"
                            value={newDoctor.specialty}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={newDoctor.location}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit" className="add-btn">
                            {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                        </button>
                    </form>

                    {editingDoctor && (
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ManageDoctors;
