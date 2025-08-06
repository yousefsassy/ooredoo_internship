package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class ReportWithValuesDTO {

    private ReportDTO report;  // DTO pour le rapport lui-même, adapte selon ton code
    private List<ReportFieldDTO> fields; // DTO pour les champs du rapport
    private List<ReportFieldValueDTO> values; // liste des valeurs remplies

    public ReportDTO getReport() {
        return report;
    }

    public void setReport(ReportDTO report) {
        this.report = report;
    }

    public List<ReportFieldDTO> getFields() {
        return fields;
    }

    public void setFields(List<ReportFieldDTO> fields) {
        this.fields = fields;
    }

    public List<ReportFieldValueDTO> getValues() {
        return values;
    }

    public void setValues(List<ReportFieldValueDTO> values) {
        this.values = values;
    }
}
