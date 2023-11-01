package com.medbtissam.gestiondestock;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


/**
 * @OpenAPIDefinition( info = @Info(title = "Gestion de Stock" ,version = "1.0.0"),
 * servers = @Server(url = "http://localhost:8081")
 * )
 */
@SpringBootApplication
@EnableJpaAuditing
public class GestionDeStockApplication {


    public static void main(String[] args) {
        SpringApplication.run(GestionDeStockApplication.class, args);
    }

}
