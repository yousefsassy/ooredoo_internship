package tn.esprit.examen.nomPrenomClasseExamen.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class ReportFieldValue {
    @Id
    @GeneratedValue
    private Long idReportFieldValue;
    private String value;

    @ManyToOne
    private ReportField field;

    @ManyToOne
    private User user;
    @ManyToOne
    private Report report;
    private LocalDateTime filledAt = LocalDateTime.now(); // Optionnel, utile pour historique

    public LocalDateTime getFilledAt() {
        return filledAt;
    }

    public void setFilledAt(LocalDateTime filledAt) {
        this.filledAt = filledAt;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public Long getIdReportFieldValue() {
        return idReportFieldValue;
    }

    public void setIdReportFieldValue(Long idReportFieldValue) {
        this.idReportFieldValue = idReportFieldValue;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public ReportField getField() {
        return field;
    }

    public void setField(ReportField field) {
        this.field = field;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
