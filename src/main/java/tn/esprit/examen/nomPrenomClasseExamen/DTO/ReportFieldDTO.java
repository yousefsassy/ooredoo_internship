package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class ReportFieldDTO {
    private Long idReportField;
    private String label;
    private String type;
private List<String> options;
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

    public ReportFieldDTO(){}
    public ReportFieldDTO(Long idReportField, String label, String type, List<String> options) {
        this.idReportField = getIdReportField();
        this.label = label;
        this.type = type;
        this.options = options;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }
}
