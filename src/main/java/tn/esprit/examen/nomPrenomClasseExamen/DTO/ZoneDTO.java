package tn.esprit.examen.nomPrenomClasseExamen.DTO;

public class ZoneDTO {
    private Long idZone;
    private String libelle;
    private String gouvernorat;
    private Long chefZoneId;
    private Long secteurId;

    public Long getSecteurId() {
        return secteurId;
    }

    public void setSecteurId(Long secteurId) {
        this.secteurId = secteurId;
    }

    public Long getIdZone() {
        return idZone;
    }

    public void setIdZone(Long idZone) {
        this.idZone = idZone;
    }

    public Long getChefZoneId() {
        return chefZoneId;
    }

    public void setChefZoneId(Long chefZoneId) {
        this.chefZoneId = chefZoneId;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getGouvernorat() {
        return gouvernorat;
    }

    public void setGouvernorat(String gouvernorat) {
        this.gouvernorat = gouvernorat;
    }
}
