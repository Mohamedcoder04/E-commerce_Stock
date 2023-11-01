package com.medbtissam.gestiondestock.configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI consumOpenApiConfig() {
        final String securitySchemName = "bearerAuth";
        return new OpenAPI()
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemName)
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        securitySchemName,
                                        new SecurityScheme()
                                                .name(securitySchemName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}
