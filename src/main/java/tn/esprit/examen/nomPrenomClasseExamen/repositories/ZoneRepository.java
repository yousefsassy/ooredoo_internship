package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.examen.nomPrenomClasseExamen.model.Secteur;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.model.Zone;

import java.util.List;
import java.util.Optional;

public interface ZoneRepository extends JpaRepository<Zone, Long> {
    @Query("SELECT z.gouvernorat, COUNT(z) FROM Zone z GROUP BY z.gouvernorat")
    List<Object[]> countZonesByGouvernorat();

    @Query("SELECT COUNT(z) FROM Zone z")
    Long countTotalZones();
    List <Zone> findByChefZoneIsNull();
    Optional<Zone> findByChefZone(User chefZone);
    @Query("SELECT z FROM Zone z LEFT JOIN FETCH z.regions WHERE z.chefZone.username = :username")
    Zone findZoneByChefUsername(@Param("username") String username);
    List<Zone> findBySecteur(Secteur secteur);



}
