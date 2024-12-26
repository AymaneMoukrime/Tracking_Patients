import requests
import random
from datetime import datetime
import time

# Base API URL for Spring Boot
API_URL_PATIENT="http://localhost:8888"
API_URL = "http://localhost:8888/SERVICE-TRACKING"

# Sample patients to register with safe zones mapped to rooms
patients = [
    {
        "name": "John Doe",
        "age": 45,
        "condition": "High Blood Pressure",
        "safeZoneLatitude": 195,  # Room 1's Y pixel coordinate (center)
        "safeZoneLongitude": 680, # Room 1's X pixel coordinate (center)
        "safeZoneRadius": 30.0  # Room's radius in blueprint coordinates
    },
    {
        "name": "Jane Smith",
        "age": 52,
        "condition": "Diabetes",
        "safeZoneLatitude": 120,  # Room 2
        "safeZoneLongitude": 550,
        "safeZoneRadius": 30.0
    },
    {
        "name": "Alice Johnson",
        "age": 60,
        "condition": "Asthma",
        "safeZoneLatitude": 450,  # Room 3
        "safeZoneLongitude": 850,
        "safeZoneRadius": 30.0
    },
    {
        "name": "Bob Brown",
        "age": 50,
        "condition": "Heart Disease",
        "safeZoneLatitude": 310,  # Room 4
        "safeZoneLongitude": 750,
        "safeZoneRadius": 30.0
    }
]

# Register patients in the Spring Boot backend
def register_patients():
    registered_patients = []
    for patient in patients:
        response = requests.post(f"{API_URL_PATIENT}/SERVICE-PATIENT/patients", json=patient)
        if response.status_code == 200:
            registered_patient = response.json()
            print(f"Registered patient: {registered_patient}")
            registered_patient.update(patient)  # Add original patient details to registered patient
            registered_patients.append(registered_patient)
        else:
            print(f"Failed to register patient: {response.status_code}")
    return registered_patients

# Initialize patient locations in the Spring Boot backend
def initialize_locations(registered_patients):
    for patient in registered_patients:
        location = {
            "patientId": patient["id"],
            "latitude": patient["safeZoneLatitude"],
            "longitude": patient["safeZoneLongitude"],
            "timestamp": datetime.now().isoformat()
        }
        response = requests.post(f"{API_URL}/api/locations", json=location)
        if response.status_code == 200:
            print(f"Initialized location for patient {patient['id']}: {location}")
        else:
            print(f"Failed to initialize location: {response.status_code}")

# Simulate small location updates within the safe zone
def send_location_updates(registered_patients):
    while True:
        for patient in registered_patients:
            # Small movements within approximately 5 meters in blueprint coordinates
            lat_change = random.uniform(-2, 2)
            lon_change = random.uniform(-2, 2)
            location = {
                "latitude": patient["safeZoneLatitude"] + lat_change,
                "longitude": patient["safeZoneLongitude"] + lon_change,
                "timestamp": datetime.now().isoformat()
            }
            response = requests.put(f"{API_URL}/api/locations/{patient['id']}", json=location)
            if response.status_code == 200:
                print(f"Updated location for patient {patient['id']}: {location}")
            else:
                print(f"Failed to update location: {response.status_code}")
        time.sleep(5)

if __name__ == "__main__":
    registered_patients = register_patients()
    initialize_locations(registered_patients)
    send_location_updates(registered_patients)
