package tn.esprit.examen.nomPrenomClasseExamen.Config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.Arrays;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Chemin absolu vers le dossier photos sur ta machine Windows
        String photosPath = "file:///C:/Users/dell/Desktop/Stage Ooredoo/ooredoo_internship-report_back/uploads/photos/";
        registry.addResourceHandler("/photos/**")
                .addResourceLocations(photosPath);
    }
}






