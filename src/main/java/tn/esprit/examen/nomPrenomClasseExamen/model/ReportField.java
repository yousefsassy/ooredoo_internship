package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class ReportField {
    @Id
    @GeneratedValue
    private Long idReportField;
    private String label;
    private String type;  // TEXT, DROPDOWN, TEXTAREA, etc.
    @ElementCollection // si c’est une liste simple de String stockée dans une table à part
    private List<String> options;

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    @ManyToOne
    @JsonBackReference
    private Report report;
    @ManyToOne
    @JsonBackReference
    private Field field;

    public Field getField() {
        return field;
    }

    public void setField(Field field) {
        this.field = field;
    }

    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<ReportFieldValue> values;

    public Long getIdReportField() {
        return idReportField;
    }

    public void setIdReportField(Long idReportField) {
        this.idReportField = idReportField;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public List<ReportFieldValue> getValues() {
        return values;
    }

    public void setValues(List<ReportFieldValue> values) {
        this.values = values;
    }
}
