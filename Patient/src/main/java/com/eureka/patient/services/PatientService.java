package com.eureka.patient.services;

import com.eureka.patient.entities.Patient;
import com.eureka.patient.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        if (patients.isEmpty()) {
            throw new RuntimeException("patients not found");
        }
        return patients;
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }


    public Patient createPatient(Patient patient) {
        if (patient == null) {
            throw new RuntimeException("Patient details khawya");
        }
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        if (patientDetails == null) {
            throw new RuntimeException("Patient details khawya");
        }

        if (patient != null) {
            patient.setName(patientDetails.getName());
            patient.setCondition(patientDetails.getCondition());
            patient.setSafeZoneLatitude(patientDetails.getSafeZoneLatitude());
            patient.setSafeZoneLongitude(patientDetails.getSafeZoneLongitude());
            patient.setSafeZoneRadius(patientDetails.getSafeZoneRadius());
            return patientRepository.save(patient);
        }
        return null;
    }

    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found");
        }
        patientRepository.deleteById(id);
    }
}
