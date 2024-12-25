package com.eureka.appointment.client;

import com.eureka.appointment.dtos.Doctor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "SERVICE-DOCTOR")
public interface DoctorClient {
    @GetMapping("/doctors/{id}")
    Doctor getDoctorById(@PathVariable Long id);
}
