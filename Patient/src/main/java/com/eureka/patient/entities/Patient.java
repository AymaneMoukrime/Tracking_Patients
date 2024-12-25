package com.eureka.patient.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String condition; // This will store the current location of the patient
    private double safeZoneLatitude;
    private double safeZoneLongitude;
    private double safeZoneRadius;

    public Patient(Long id, String name, String diagnosis) {
        this.id = id;
        this.name = name;
        this.condition = diagnosis;
    }

    public Patient() {
    }

    public Patient(Long id, String name, String condition, double safeZoneLatitude, double safeZoneLongitude, double safeZoneRadius) {
        this.id = id;
        this.name = name;
        this.condition = condition;
        this.safeZoneLatitude = safeZoneLatitude;
        this.safeZoneLongitude = safeZoneLongitude;
        this.safeZoneRadius = safeZoneRadius;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public double getSafeZoneLatitude() {
        return safeZoneLatitude;
    }

    public void setSafeZoneLatitude(double safeZoneLatitude) {
        this.safeZoneLatitude = safeZoneLatitude;
    }

    public double getSafeZoneLongitude() {
        return safeZoneLongitude;
    }

    public void setSafeZoneLongitude(double safeZoneLongitude) {
        this.safeZoneLongitude = safeZoneLongitude;
    }

    public double getSafeZoneRadius() {
        return safeZoneRadius;
    }

    public void setSafeZoneRadius(double safeZoneRadius) {
        this.safeZoneRadius = safeZoneRadius;
    }
}
