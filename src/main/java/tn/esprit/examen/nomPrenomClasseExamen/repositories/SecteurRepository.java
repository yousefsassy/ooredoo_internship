package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.examen.nomPrenomClasseExamen.model.Secteur;

import java.util.List;

public interface SecteurRepository extends JpaRepository<Secteur, Long> {
    List<Secteur> findByChefSecteurIsNull();
    Secteur findByChefSecteurUsername(String username);
}
