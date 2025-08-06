package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idShop;
    private String nomShop;
    private String telephone;
    @OneToOne
    @JoinColumn(name = "admin_shop_id")
    @JsonManagedReference("shop-admin")
    private User adminShop;
    @ManyToOne
    @JoinColumn(name = "region_id")
    @JsonBackReference("region-shop")
    private Region region;

    private boolean archived = false;
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private List<Report> reports;

    public List<Report> getReports() {
        return reports;
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    public Long getIdShop() {
        return idShop;
    }

    public void setIdShop(Long idShop) {
        this.idShop = idShop;
    }

    public String getNomShop() {
        return nomShop;
    }

    public void setNomShop(String nomShop) {
        this.nomShop = nomShop;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public User getAdminShop() {
        return adminShop;
    }

    public void setAdminShop(User adminShop) {
        this.adminShop = adminShop;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }
}
