package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class FieldDTO {

    private Long idField;
    private String label;
    private String type;
    private Boolean required;
    private List<String> options;

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

    public FieldDTO(Long idField, String label, String type, Boolean required, List<String> options) {
        this.idField = idField;
        this.label = label;
        this.type = type;
        this.required = required;
        this.options = options;
    }

}
