package com.eureka.doctor.services;

import com.eureka.doctor.entities.Doctor;
import com.eureka.doctor.repositories.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {


        List<Doctor> doctors = doctorRepository.findAll();

        if (doctors.isEmpty()) {
            throw new RuntimeException("No doctors found");
        }
        return doctors;
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor createDoctor(Doctor doctor) {
        if (doctor == null || doctor.getName() == null || doctor.getSpecialty() == null) {
            throw new RuntimeException("Doctor name and specialty must not be null");
        }
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found" ));

        if (doctorDetails.getName() != null) {
            doctor.setName(doctorDetails.getName());
        }

        if (doctorDetails.getSpecialty() != null) {
            doctor.setSpecialty(doctorDetails.getSpecialty());
        }

        if (doctorDetails.getLocation() != null) {
            doctor.setLocation(doctorDetails.getLocation());
        }

        return doctorRepository.save(doctor);
    }


    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found" ));
        doctorRepository.delete(doctor);
    }
}
