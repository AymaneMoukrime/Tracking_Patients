package com.eureka.doctor;

import com.eureka.doctor.entities.Doctor;
import com.eureka.doctor.repositories.DoctorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class DoctorApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorApplication.class, args);
    }
    @Bean
    CommandLineRunner initData(DoctorRepository doctorRepository) {
        return args -> {
            doctorRepository.save(new Doctor(null, "Dr. John Smith", "Cardiology", "Room 201"));
            doctorRepository.save(new Doctor(null, "Dr. Emily Davis", "Neurology", "Room 202"));
            doctorRepository.save(new Doctor(null, "Dr. Michael Brown", "Orthopedics", "Room 203"));
        };
    }



}
