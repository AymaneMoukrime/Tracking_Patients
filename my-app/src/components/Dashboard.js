import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ patients }) => {
    return (
        <div className="dashboard-container">
            <h1>Patient Dashboard</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
