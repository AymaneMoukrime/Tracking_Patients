package com.eureka.appointment;

import com.eureka.appointment.entities.Appointment;
import com.eureka.appointment.repositories.AppointmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AppointmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppointmentApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(AppointmentRepository appointmentRepository) {
        return args -> {
            appointmentRepository.save(new Appointment(null, 1L, 1L, LocalDateTime.of(2024, 12, 23, 10, 0)));
            appointmentRepository.save(new Appointment(null, 2L, 2L, LocalDateTime.of(2024, 12, 23, 11, 0)));
            appointmentRepository.save(new Appointment(null, 3L, 3L, LocalDateTime.of(2024, 12, 23, 12, 0)));
        };
    }





}
