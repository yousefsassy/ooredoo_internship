package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.examen.nomPrenomClasseExamen.model.Region;
import tn.esprit.examen.nomPrenomClasseExamen.model.Shop;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.model.Zone;

import java.util.List;
import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findByArchivedFalse();
    List<Shop> findByAdminShopIsNull();
    Shop findByAdminShop_Username(String username);
    List<Shop> findByRegion(Region region);
    int countByRegion_IdRegion(Long idRegion); // ✅ Bon


}
