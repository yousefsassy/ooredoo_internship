package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRegion;
    private String delegation;
    private String nom;

    @ManyToOne
    @JoinColumn(name = "zone_id")
    @JsonBackReference("zone-region")
    private Zone zone;

    @OneToOne
    @JoinColumn(name = "chef_region_id")
    @JsonManagedReference("region-chef")
    private User chefRegion;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    @JsonManagedReference("region-shop")
    private List<Shop> shops;

    public Long getIdRegion() {
        return idRegion;
    }

    public void setIdRegion(Long idRegion) {
        this.idRegion = idRegion;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public User getChefRegion() {
        return chefRegion;
    }

    public void setChefRegion(User chefRegion) {
        this.chefRegion = chefRegion;
    }

    public List<Shop> getShops() {
        return shops;
    }

    public void setShops(List<Shop> shops) {
        this.shops = shops;
    }
}
