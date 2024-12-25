import requests
import random
from datetime import datetime
import time

# Base API URL for Spring Boot
API_URL = "http://localhost:8080/api"

# Sample patients to register
patients = [
    {"name": "John Doe", "age": 45, "condition": "High Blood Pressure"},
    {"name": "Jane Smith", "age": 52, "condition": "Diabetes"}
]

# Register patients in the Spring Boot backend
def register_patients():
    patient_ids = []
    for patient in patients:
        response = requests.post(f"{API_URL}/patients", json=patient)
        if response.status_code == 200:
            print(f"Registered patient: {response.json()}")
            patient_ids.append(response.json()["id"])
        else:
            print(f"Failed to register patient: {response.status_code}")
    return patient_ids

# Simulate location updates
def send_location_updates(patient_ids):
    while True:
        for patient_id in patient_ids:
            location = {
                "patientId": patient_id,
                "latitude": random.uniform(-90, 90),
                "longitude": random.uniform(-180, 180),
                "timestamp": datetime.now().isoformat()
            }
            response = requests.post(f"{API_URL}/locations", json=location)
            if response.status_code == 200:
                print(f"Updated location for patient {patient_id}: {location}")
            else:
                print(f"Failed to update location: {response.status_code}")
        time.sleep(5)

if __name__ == "__main__":
    patient_ids = register_patients()
    send_location_updates(patient_ids)
