package tn.esprit.examen.nomPrenomClasseExamen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.examen.nomPrenomClasseExamen.model.Role;
import tn.esprit.examen.nomPrenomClasseExamen.model.RoleName;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RoleName roleName); // ✅ Fix: Should return Optional<Role>

    boolean existsByRoleName(RoleName roleName);

}
