package tn.esprit.examen.nomPrenomClasseExamen.DTO;

public class RegionDTO {
    private Long idRegion;
    private String delegation;
    private String nom;
    private Long zoneId;       // Id de la zone associée
    private Long chefRegionId; // Id de l'utilisateur chef de région

    public Long getIdRegion() {
        return idRegion;
    }

    public void setIdRegion(Long idRegion) {
        this.idRegion = idRegion;
    }

    public String getDelegation() {
        return delegation;
    }

    public void setDelegation(String delegation) {
        this.delegation = delegation;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getZoneId() {
        return zoneId;
    }

    public void setZoneId(Long zoneId) {
        this.zoneId = zoneId;
    }

    public Long getChefRegionId() {
        return chefRegionId;
    }

    public void setChefRegionId(Long chefRegionId) {
        this.chefRegionId = chefRegionId;
    }
}
