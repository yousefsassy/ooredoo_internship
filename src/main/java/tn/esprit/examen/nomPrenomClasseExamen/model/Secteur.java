package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Secteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSecteur;

    private String nom;

    @OneToOne
    @JoinColumn(name = "chef_secteur_id")
    @JsonManagedReference("secteur-chef")
    private User chefSecteur;

    @OneToMany(mappedBy = "secteur", cascade = CascadeType.ALL)
    @JsonManagedReference("secteur-zone")
    private List<Zone> zones;

    public Long getIdSecteur() {
        return idSecteur;
    }

    public void setIdSecteur(Long idSecteur) {
        this.idSecteur = idSecteur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public User getChefSecteur() {
        return chefSecteur;
    }

    public void setChefSecteur(User chefSecteur) {
        this.chefSecteur = chefSecteur;
    }

    public List<Zone> getZones() {
        return zones;
    }

    public void setZones(List<Zone> zones) {
        this.zones = zones;
    }
}
