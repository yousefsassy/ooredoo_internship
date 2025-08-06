package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.examen.nomPrenomClasseExamen.model.DestinataireReport;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;

import java.util.List;
import java.util.Optional;

public interface DestinataireReportRepository extends JpaRepository<DestinataireReport, Long> {

    List<DestinataireReport> findByDestinataire(User user);
}
