package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.examen.nomPrenomClasseExamen.model.Report;
import tn.esprit.examen.nomPrenomClasseExamen.model.ReportField;

import java.util.List;

public interface ReportFieldRepository extends JpaRepository<ReportField, Long> {
    List<ReportField> findByReportIdReport(Long idReport);
}
