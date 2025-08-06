package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idZone;
    private String libelle;
    private String gouvernorat;


    @OneToOne
    @JoinColumn(name = "chef_zone_id")
    @JsonManagedReference("zone-chef")
    private User chefZone;
    @ManyToOne
    @JoinColumn(name = "secteur_id")
    @JsonBackReference("secteur-zone")
    private Secteur secteur;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    @JsonManagedReference("zone-region")
    private List<Region> regions;


    public Zone(Long idZone) {
        this.idZone = idZone;
    }
    public Long getIdZone() {
        return idZone;
    }

    public void setIdZone(Long idZone) {
        this.idZone = idZone;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }




    public User getChefZone() {
        return chefZone;
    }

    public void setChefZone(User chefZone) {
        this.chefZone = chefZone;
    }

    public Secteur getSecteur() {
        return secteur;
    }

    public void setSecteur(Secteur secteur) {
        this.secteur = secteur;
    }

    public List<Region> getRegions() {
        return regions;
    }

    public void setRegions(List<Region> regions) {
        this.regions = regions;
    }

}
