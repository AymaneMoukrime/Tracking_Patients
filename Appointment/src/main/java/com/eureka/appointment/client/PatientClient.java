package com.eureka.appointment.client;

import com.eureka.appointment.dtos.Patient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SERVICE-PATIENT")
public interface PatientClient {
    @GetMapping("/patients/{id}")
    Patient getPatientById(@PathVariable("id") Long id);
}
