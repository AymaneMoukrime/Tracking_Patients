package com.eureka.tracking.controllers;

import com.eureka.tracking.config.TrackingWebSocketHandler;
import com.eureka.tracking.entities.Location;
import com.eureka.tracking.entities.Patient;
import com.eureka.tracking.repositories.LocationRepository;
import com.eureka.tracking.services.PatientClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private PatientClient patientClient; // Use Feign client instead of PatientRepository
    @Autowired
    private TrackingWebSocketHandler webSocketHandler;

    @PostMapping
    public ResponseEntity<String> addLocation(@RequestBody Location location) {
        location.setTimestamp(LocalDateTime.now());
        Location savedLocation = locationRepository.save(location);

        return ResponseEntity.ok("Initial location added successfully");
    }

    @PutMapping("/{patientId}")
    public ResponseEntity<String> updateLocation(@PathVariable Long patientId, @RequestBody Location location) {
        Optional<Location> existingLocation = locationRepository.findByPatientId(patientId);

        if (existingLocation.isPresent()) {
            Location updatedLocation = existingLocation.get();
            updatedLocation.setLatitude(location.getLatitude());
            updatedLocation.setLongitude(location.getLongitude());
            updatedLocation.setTimestamp(LocalDateTime.now());
            locationRepository.save(updatedLocation);

            Patient patient = patientClient.getPatientById(patientId); // Fetch patient from microservice
            boolean isOutsideSafeZone = isOutsideSafeZone(
                    patient.getSafeZoneLatitude(),
                    patient.getSafeZoneLongitude(),
                    location.getLatitude(),
                    location.getLongitude(),
                    patient.getSafeZoneRadius()
            );

            String alertMessage = isOutsideSafeZone ? String.format("Patient %d has left the safe zone!", patientId) : "";
            if (isOutsideSafeZone) {
                System.out.println(alertMessage);
            }

            String message = String.format(Locale.US,
                    "{\"type\":\"locationUpdate\",\"patientId\":%d,\"latitude\":%.6f,\"longitude\":%.6f,\"timestamp\":\"%s\",\"name\":\"%s\",\"condition\":\"%s\",\"alert\":%b}",
                    updatedLocation.getPatientId(),
                    updatedLocation.getLatitude(),
                    updatedLocation.getLongitude(),
                    updatedLocation.getTimestamp().toString(),
                    patient.getName(),
                    patient.getCondition(),
                    isOutsideSafeZone
            );
            webSocketHandler.sendMessageToAll(message);

            return ResponseEntity.ok("Location updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<Location> getLocation(@PathVariable Long patientId) {
        Optional<Location> locations = locationRepository.findByPatientId(patientId);
        if (locations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locations.get());
    }

    private boolean isOutsideSafeZone(double safeZoneLat, double safeZoneLon, double currentLat, double currentLon, double radius) {
        double distance = calculateEuclideanDistance(safeZoneLat, safeZoneLon, currentLat, currentLon);
        return distance > radius;
    }

    private double calculateEuclideanDistance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}
