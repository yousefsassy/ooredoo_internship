package tn.esprit.examen.nomPrenomClasseExamen.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.FieldRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.RoleRepository;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    private FieldRepository fieldRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialisation des rôles
        for (RoleName roleName : RoleName.values()) {
            if (roleRepository.findByRoleName(roleName).isEmpty()) {
                Role role = new Role();
                role.setRoleName(roleName);
                roleRepository.save(role);
            }
        }

        // Liste des champs à créer s'ils n'existent pas déjà
        List<Field> initialFields = List.of(
                createFieldIfNotExists("Customer Phone Number", "TEXT", true),
                createFieldIfNotExists("Customer Email", "TEXT", false),
                createFieldIfNotExists("Shop Feedback", "TEXTAREA", true),
                createFieldIfNotExists("Service Quality", "DROPDOWN", true, List.of("Excellent", "Good", "Average", "Poor")),
                createFieldIfNotExists("Number of Visitors", "TEXT", false),
                createFieldIfNotExists("Report Date", "DATE", true),
                createFieldIfNotExists("Manager Comments", "TEXTAREA", false),
                createFieldIfNotExists("Issue Resolved", "CHECKBOX", false),
                createFieldIfNotExists("Product Availability", "DROPDOWN", true, List.of("In Stock", "Out of Stock", "Limited")),
                createFieldIfNotExists("Technician Assigned", "TEXT", false),
                createFieldIfNotExists("Follow-up Required", "CHECKBOX", false),
                createFieldIfNotExists("Customer Satisfaction Score", "DROPDOWN", true, List.of("1", "2", "3", "4", "5")),
                createFieldIfNotExists("Additional Notes", "TEXTAREA", false),
                createFieldIfNotExists("Next Visit Date", "DATE", false),
                createFieldIfNotExists("Photo Evidence", "FILE_UPLOAD", false)
        );

        for (Field field : initialFields) {
            // Vérifie si champ déjà existant selon label (unique)
            boolean exists = fieldRepository.findAll()
                    .stream()
                    .anyMatch(f -> f.getLabel().equals(field.getLabel()));

            if (!exists) {
                fieldRepository.save(field);
            }
        }
    }

    // Méthode utilitaire pour créer un objet Field sans options
    private Field createFieldIfNotExists(String label, String type, boolean required) {
        Field f = new Field();
        f.setLabel(label);
        f.setType(type);
        f.setRequired(required);
        return f;
    }

    // Surcharge avec options pour dropdown
    private Field createFieldIfNotExists(String label, String type, boolean required, List<String> options) {
        Field f = new Field();
        f.setLabel(label);
        f.setType(type);
        f.setRequired(required);
        f.setOptions(options);
        return f;
    }
}

