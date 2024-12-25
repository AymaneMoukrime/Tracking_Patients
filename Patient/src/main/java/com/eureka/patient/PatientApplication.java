package com.eureka.patient;

import com.eureka.patient.entities.Patient;
import com.eureka.patient.repositories.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableDiscoveryClient
public class PatientApplication {

    public static void main(String[] args) {
        SpringApplication.run(PatientApplication.class, args);
    }
   /* @Bean
    CommandLineRunner initData(PatientRepository patientRepository) {
        return args -> {
            patientRepository.save(new Patient(null, "John Doe", "Flu"));
            patientRepository.save(new Patient(null, "Jane Smith", "Pneumonia"));
            patientRepository.save(new Patient(null, "Alice Johnson", "Fracture"));
        };
    }
*/
/*   @Bean
   public WebMvcConfigurer corsConfigurer() {
       return new WebMvcConfigurer() {
           @Override
           public void addCorsMappings(CorsRegistry registry) {
               registry.addMapping("/patients/**")
                       .allowedOrigins("http://localhost:3000") // React app URL
                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                       .allowedHeaders("*")
                       .allowCredentials(true);
           }
       };
   }
*/
}
