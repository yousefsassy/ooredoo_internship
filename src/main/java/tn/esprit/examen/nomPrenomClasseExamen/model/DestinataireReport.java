package tn.esprit.examen.nomPrenomClasseExamen.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class DestinataireReport {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Report report;

    @ManyToOne
    private User destinataire;
    private String role;

    private boolean vu = false; // Permet de savoir si le rapport a été lu par ce destinataire

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Report getReport() {
        return report;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public User getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(User destinataire) {
        this.destinataire = destinataire;
    }

    public boolean isVu() {
        return vu;
    }

    public void setVu(boolean vu) {
        this.vu = vu;
    }
}
