package com.eureka.tracking.entities;


public class Patient {

    private Long id;
    private String name;
    private int age;
    private String condition;

    private double safeZoneLatitude;
    private double safeZoneLongitude;
    private double safeZoneRadius;

    public Patient(Long id, String name, int age, String condition) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.condition = condition;
    }

    public Patient() {
    }

    public Patient(Long id, String name, int age, String condition, double safeZoneLatitude, double safeZoneLongitude, double safeZoneRadius) {
        this.id = id;
        this.name = name;
        this.age = age;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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