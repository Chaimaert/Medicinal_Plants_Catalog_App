package com.example.plantes.catalogueplantesapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Catalogue des Plantes API",
				version = "1.0",
				description = "API pour gérer les plantes médicinales",
				contact = @Contact(
						name = "Support",
						url = "http://example.com/support",
						email = "support@example.com"
				),
				license = @License(
						name = "Apache 2.0",
						url = "http://www.apache.org/licenses/LICENSE-2.0.html"
				)
		)
)

public class CataloguePlantesApplication {

	public static void main(String[] args) {
		SpringApplication.run(CataloguePlantesApplication.class, args);
	}

}
