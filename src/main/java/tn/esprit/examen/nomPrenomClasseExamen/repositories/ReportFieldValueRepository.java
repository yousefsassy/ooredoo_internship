package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.examen.nomPrenomClasseExamen.model.Report;
import tn.esprit.examen.nomPrenomClasseExamen.model.ReportFieldValue;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;

import java.util.List;

public interface ReportFieldValueRepository extends JpaRepository<ReportFieldValue, Long> {
    List<ReportFieldValue> findByReportIdReport(Long reportId);
}
