package com.eureka.tracking.services;


import com.eureka.tracking.entities.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PatientService {
    @Autowired
    private PatientClient patientClient;

    public List<Patient> getAllPatients() {
        return patientClient.getAllPatients();
    }

    public Patient getPatientById(Long id) {
        return patientClient.getPatientById(id);
    }

    public Patient savePatient(Patient patient) {
        return patientClient.savePatient(patient);
    }

    public void deletePatient(Long id) {
        patientClient.deletePatient(id);
    }
}
