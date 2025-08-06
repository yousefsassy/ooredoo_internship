package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import tn.esprit.examen.nomPrenomClasseExamen.model.Report;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE r.destinataire.username = :username")
    List<Report> findByDestinataireUsername(@Param("username") String username);


    int countByShopRegionIdRegion(Long regionId);

}
