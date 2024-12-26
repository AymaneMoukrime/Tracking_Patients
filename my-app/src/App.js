import React from 'react';
import './App.css';
import PatientTracker from './components/PatientTracker';

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>Real-Time Patient Tracking</h1>
            </header>
            <div className="content">
                <PatientTracker />
            </div>
        </div>
    );
}

export default App;
