package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
public class Report {
    @Id
    @GeneratedValue
    private Long idReport;
    private String titre;
    private String contenu; // facultatif, peut contenir une description
    private String type;
    private LocalDateTime dateCreation;
    @ManyToOne
    private User destinataire;  // user à qui on envoie


    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ReportField> fields;
    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportFieldValue> fieldValues;
    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;
    @PrePersist
    protected void onCreate() {
        this.dateCreation = LocalDateTime.now();
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

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<ReportFieldValue> getFieldValues() {
        return fieldValues;
    }

    public void setFieldValues(List<ReportFieldValue> fieldValues) {
        this.fieldValues = fieldValues;
    }
    // + getter et setter

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

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

    public User getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(User destinataire) {
        this.destinataire = destinataire;
    }

    public List<ReportField> getFields() {
        return fields;
    }

    public void setFields(List<ReportField> fields) {
        this.fields = fields;
    }
}