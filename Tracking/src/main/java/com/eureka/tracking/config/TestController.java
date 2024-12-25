package com.eureka.tracking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private TrackingWebSocketHandler webSocketHandler;

    @PostMapping("/test-websocket")
    public ResponseEntity<String> testWebSocket() {
        String message = "Test message from server";
        webSocketHandler.sendMessageToAll(message);
        return ResponseEntity.ok("Test message sent");
    }
}