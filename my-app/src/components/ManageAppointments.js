import React, { useEffect, useState, useCallback } from 'react';
import './ManageAppointments.css';

const API_PATIENTS_URL = "http://localhost:8888/SERVICE-PATIENT/patients";
const API_DOCTORS_URL = "http://localhost:8888/SERVICE-DOCTOR/doctors";
const API_APPOINTMENT_URL = "http://localhost:8888/SERVICE-APPOINTMENT/appointments";

const ManageAppointments = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patientId: "",
        doctorId: "",
        appointmentTime: "",
    });
    const [editingAppointment, setEditingAppointment] = useState(null); // State for editing an appointment
    const [error, setError] = useState(null);

    const fetchPatients = async () => {
        try {
            const response = await fetch(API_PATIENTS_URL);
            if (!response.ok) throw new Error("Unable to fetch patients.");
            const data = await response.json();
            setPatients(data);
        } catch (err) {
            console.error("Error fetching patients:", err);
            setError(err.message);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch(API_DOCTORS_URL);
            if (!response.ok) throw new Error("Unable to fetch doctors.");
            const data = await response.json();
            setDoctors(data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
            setError(err.message);
        }
    };

    const fetchAppointments = useCallback(async () => {
        try {
            const response = await fetch(API_APPOINTMENT_URL);
            if (!response.ok) throw new Error("Unable to fetch appointments.");
            const data = await response.json();

            const enrichedAppointments = data.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                const doctor = doctors.find(d => d.id === appointment.doctorId);

                return {
                    ...appointment,
                    patientName: patient ? patient.name : "Unknown Patient",
                    condition: patient ? patient.condition : "Unknown Condition",
                    doctorName: doctor ? doctor.name : "Unknown Doctor",
                    formattedDate: new Date(appointment.appointmentTime).toLocaleString(),
                };
            });

            setAppointments(enrichedAppointments);
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setError(err.message);
        }
    }, [patients, doctors]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });
        if (editingAppointment) {
            setEditingAppointment({ ...editingAppointment, [name]: value });
        }
    };

    const handleAddAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_APPOINTMENT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });

            if (!response.ok) throw new Error("Failed to add appointment.");
            setNewAppointment({ patientId: "", doctorId: "", appointmentTime: "" });
            fetchAppointments();
        } catch (err) {
            console.error("Error adding appointment:", err);
            setError(err.message);
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const response = await fetch(`${API_APPOINTMENT_URL}/${appointmentId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete appointment.");
            fetchAppointments();
        } catch (err) {
            console.error("Error deleting appointment:", err);
            setError(err.message);
        }
    };

    const handleEditAppointment = (appointment) => {
        setEditingAppointment({ ...appointment });
    };

    const handleUpdateAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_APPOINTMENT_URL}/${editingAppointment.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingAppointment),
            });

            if (!response.ok) throw new Error("Failed to update appointment.");
            setEditingAppointment(null); // Clear the editing form after successful update
            fetchAppointments();
        } catch (err) {
            console.error("Error updating appointment:", err);
            setError(err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingAppointment(null); // Reset the editing form
    };

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return (
        <div className="manage-appointments">
            <header>
                <div className="logo">
                    <img src="/images/hospital_logo.png" alt="Logo" />
                </div>
                <h1>Manage Appointments</h1>
            </header>
            <main>
                {error && <p className="error-message">{error}</p>}

                <section className="appointments-list">
                    <h2>Existing Appointments</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Condition</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.condition}</td>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.formattedDate}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditAppointment(appointment)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="add-appointment">
                    <h2>{editingAppointment ? "Edit Appointment" : "Book New Appointment"}</h2>
                    <form onSubmit={editingAppointment ? handleUpdateAppointment : handleAddAppointment}>
                        <label>
                            Patient:
                            <select
                                name="patientId"
                                value={editingAppointment ? editingAppointment.patientId : newAppointment.patientId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Patient</option>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name} ({patient.condition})
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Doctor:
                            <select
                                name="doctorId"
                                value={editingAppointment ? editingAppointment.doctorId : newAppointment.doctorId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name} ({doctor.specialty})
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Appointment Date:
                            <input
                                type="datetime-local"
                                name="appointmentTime"
                                value={editingAppointment ? editingAppointment.appointmentTime : newAppointment.appointmentTime}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <button type="submit" className="add-btn">
                            {editingAppointment ? "Update Appointment" : "Book Appointment"}
                        </button>
                    </form>
                    {editingAppointment && (
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ManageAppointments;
