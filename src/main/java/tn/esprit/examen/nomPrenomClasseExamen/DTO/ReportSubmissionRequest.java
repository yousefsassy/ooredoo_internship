package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class ReportSubmissionRequest {
    private String username;
    private List<ReportFieldValueDTO> fieldValues;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<ReportFieldValueDTO> getFieldValues() {
        return fieldValues;
    }

    public void setFieldValues(List<ReportFieldValueDTO> fieldValues) {
        this.fieldValues = fieldValues;
    }
}
