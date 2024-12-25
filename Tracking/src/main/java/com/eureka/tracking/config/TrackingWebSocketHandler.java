package com.eureka.tracking.config;
import lombok.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class TrackingWebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        synchronized (sessions) {
            sessions.add(session);
        }
        System.out.println("WebSocket connection established with session ID: " + session.getId());
        System.out.println("Current active sessions: " + sessions.size());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("Received message: " + message.getPayload() + " from session: " + session.getId());
        synchronized (sessions) {
            for (WebSocketSession webSocketSession : sessions) {
                if (webSocketSession.isOpen()) {
                    webSocketSession.sendMessage(message);
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        System.out.println("Removing session ID: " + session.getId() + " with status: " + status);
        synchronized (sessions) {
            sessions.remove(session);
        }
        System.out.println("Current active sessions after removal: " + sessions.size());
    }

    public void sendMessageToAll(String message) {
        System.out.println("Broadcasting message to all connected sessions: " + message);
        System.out.println("Active sessions: " + sessions.size());
        synchronized (sessions) {
            for (WebSocketSession session : sessions) {
                System.out.println("Session ID: " + session.getId() + ", State: " + (session.isOpen() ? "OPEN" : "CLOSED"));
                if (session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(message));
                        System.out.println("Message sent to session ID: " + session.getId());
                    } catch (IOException e) {
                        System.err.println("Error sending message to session ID " + session.getId() + ": " + e.getMessage());
                    }
                } else {
                    System.out.println("Skipping closed session: " + session.getId());
                }
            }
        }
        System.out.println("Final active sessions count: " + sessions.size());
    }
}
