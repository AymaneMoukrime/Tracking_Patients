package com.eureka.appointment.entities;

import com.eureka.appointment.dtos.Doctor;
import com.eureka.appointment.dtos.Patient;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    private Patient patient;
    @Transient
    private Doctor doctor;

    private Long patientId;
    private Long doctorId;

    private LocalDateTime appointmentTime;

    public Appointment(Long id, Patient patient, Doctor doctor, LocalDateTime appointmentTime) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentTime = appointmentTime;
    }

    public Appointment() {
    }

    public Appointment(Long id, Patient patient, Doctor doctor, Long patientId, Long doctorId, LocalDateTime appointmentTime) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentTime = appointmentTime;
    }

    public Appointment(Long id, long patientId, long doctorId, LocalDateTime of) {
        this.id = id;
        this.appointmentTime = of;
        this.patientId = patientId;
        this.doctorId = doctorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
}
