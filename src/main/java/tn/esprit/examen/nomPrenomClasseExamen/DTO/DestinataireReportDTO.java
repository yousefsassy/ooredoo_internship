package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class DestinataireReportDTO {

    private Long idReport;
    private String titre;
    private String contenu;
    private String type;
    private boolean vu;
    private String dateCreation;
    private String nomShop; // récupérer depuis report.getShop().getNom()
    private String nomAdmin; // récupérer depuis report.getCreatedBy().getFullName()
    private List<LabelValeurDTO> labelsEtValeurs;


    public Long getIdReport() {
        return idReport;
    }

    public void setIdReport(Long idReport) {
        this.idReport = idReport;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isVu() {
        return vu;
    }

    public void setVu(boolean vu) {
        this.vu = vu;
    }

    public String getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(String dateCreation) {
        this.dateCreation = dateCreation;
    }

    public String getNomShop() {
        return nomShop;
    }

    public void setNomShop(String nomShop) {
        this.nomShop = nomShop;
    }

    public String getNomAdmin() {
        return nomAdmin;
    }

    public void setNomAdmin(String nomAdmin) {
        this.nomAdmin = nomAdmin;
    }

    public List<LabelValeurDTO> getLabelsEtValeurs() {
        return labelsEtValeurs;
    }

    public void setLabelsEtValeurs(List<LabelValeurDTO> labelsEtValeurs) {
        this.labelsEtValeurs = labelsEtValeurs;
    }
}
