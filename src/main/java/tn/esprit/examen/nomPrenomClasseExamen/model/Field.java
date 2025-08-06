package tn.esprit.examen.nomPrenomClasseExamen.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Field {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_field")
    private Long idField;

    private String label;
    private String type; // "TEXT", "TEXTAREA", "DROPDOWN", etc.
    private Boolean required;
    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ReportField> reportFields;

    public List<ReportField> getReportFields() {
        return reportFields;
    }

    public void setReportFields(List<ReportField> reportFields) {
        this.reportFields = reportFields;
    }

    @ElementCollection
    private List<String> options; // pour dropdown

    public Long getIdField() {
        return idField;
    }

    public void setIdField(Long idField) {
        this.idField = idField;
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

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
