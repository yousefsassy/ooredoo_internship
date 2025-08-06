package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String roleName;
    private boolean enabled;
    private boolean accountLocked;
}
