package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.examen.nomPrenomClasseExamen.model.Region;

import java.util.List;
import java.util.Optional;


public interface RegionRepository extends JpaRepository<Region, Long> {
    // Récupère toutes les régions avec leur zone chargée en eager fetch
    @Query("SELECT r FROM Region r LEFT JOIN FETCH r.zone")
    List<Region> findAllWithZone();
    Optional<Region> findByNom(String nom);

    // Liste des régions sans chef assigné
    List<Region> findByChefRegionIsNull();

    // Trouve la région par le username du chef de région
    Region findByChefRegionUsername(String username);

    // Récupère l'id de la région par le username du chef
    @Query("SELECT r.idRegion FROM Region r WHERE r.chefRegion.username = :username")
    Long findRegionIdByChefUsername(@Param("username") String username);// You can also define methods for pagination and sorting if required
}
