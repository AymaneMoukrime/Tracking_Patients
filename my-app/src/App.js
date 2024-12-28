import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PatientTracker from './components/PatientTracker';
import ManagePatients from './components/ManagePatients';
import ManageDoctors from './components/ManageDoctors';
import ManageAppointments from './components/ManageAppointments';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <h1>Hospital Management System</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Patients Tracking</Link></li>
                            <li><Link to="/manage">Manage Patients</Link></li>
                            <li><Link to="/manage-doctors">Manage Doctors</Link></li>
                            <li><Link to="/manage-appointments">Manage Appointments</Link></li>
                        </ul>
                    </nav>
                </header>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<PatientTracker />} />
                        <Route path="/manage" element={<ManagePatients />} />
                        <Route path="/manage-doctors" element={<ManageDoctors />} />
                        <Route path="/manage-appointments" element={<ManageAppointments />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
