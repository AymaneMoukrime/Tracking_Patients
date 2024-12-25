package com.eureka.appointment.services;

import com.eureka.appointment.client.DoctorClient;
import com.eureka.appointment.client.PatientClient;
import com.eureka.appointment.dtos.Doctor;
import com.eureka.appointment.dtos.Patient;
import com.eureka.appointment.entities.Appointment;
import com.eureka.appointment.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientClient patientClient;
    private final DoctorClient doctorClient;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientClient patientClient, DoctorClient doctorClient) {
        this.appointmentRepository = appointmentRepository;
        this.patientClient = patientClient;
        this.doctorClient = doctorClient;
    }

    public List<Appointment> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        if (appointments.isEmpty()) {
            throw new RuntimeException("No appointments found");
        }

        appointments.forEach(appointment -> {
            Patient patient = patientClient.getPatientById(appointment.getPatientId());
            if (patient == null) {
                throw new RuntimeException("Patient not found");
            }
            appointment.setPatient(patient);

            Doctor doctor = doctorClient.getDoctorById(appointment.getDoctorId());
            if (doctor == null) {
                throw new RuntimeException("Doctor not found");
            }
            appointment.setDoctor(doctor);
        });
        return appointments;
    }


    public Appointment getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = patientClient.getPatientById(appointment.getPatientId());
        if (patient == null) {
            throw new RuntimeException("Patient not found");
        }
        appointment.setPatient(patient);

        Doctor doctor = doctorClient.getDoctorById(appointment.getDoctorId());
        if (doctor == null) {
            throw new RuntimeException("Doctor not found");
        }
        appointment.setDoctor(doctor);

        return appointment;
    }

    public Appointment createAppointment(Appointment appointment) {
        if (patientClient.getPatientById(appointment.getPatientId()) == null) {
            throw new RuntimeException("Patient does not exist");
        }
        if (doctorClient.getDoctorById(appointment.getDoctorId()) == null) {
            throw new RuntimeException("Doctor does not exist");
        }
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        if (patientClient.getPatientById(appointmentDetails.getPatientId()) == null) {
            throw new RuntimeException("Patient does not exist");
        }
        if (doctorClient.getDoctorById(appointmentDetails.getDoctorId()) == null) {
            throw new RuntimeException("Doctor does not exist");
        }
        Appointment appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment != null) {
            appointment.setPatientId(appointmentDetails.getPatientId());
            appointment.setDoctorId(appointmentDetails.getDoctorId());
            appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
            return appointmentRepository.save(appointment);
        }
        return null;
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointmentRepository.delete(appointment);
    }
}
