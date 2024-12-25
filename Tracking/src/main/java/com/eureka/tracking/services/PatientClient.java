package com.eureka.tracking.services;

import com.eureka.tracking.entities.Patient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "SERVICE-PATIENT")
public interface PatientClient {
    @GetMapping("/patients")
    List<Patient> getAllPatients();

    @GetMapping("/patients/{id}")
    Patient getPatientById(@PathVariable("id") Long id);

    @PostMapping("/patients")
    Patient savePatient(@RequestBody Patient patient);

    @DeleteMapping("/patients/{id}")
    void deletePatient(@PathVariable("id") Long id);
}
