package com.eureka.tracking.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final TrackingWebSocketHandler trackingWebSocketHandler;

    public WebSocketConfig(TrackingWebSocketHandler trackingWebSocketHandler) {
        this.trackingWebSocketHandler = trackingWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(trackingWebSocketHandler, "/updates").setAllowedOrigins("*");
    }
}

