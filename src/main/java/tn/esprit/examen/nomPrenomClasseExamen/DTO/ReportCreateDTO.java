package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class ReportCreateDTO {

    private String titre;
    private Long destinataireId;
    private List<FieldDTO> fields;

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Long getDestinataireId() {
        return destinataireId;
    }

    public void setDestinataireId(Long destinataireId) {
        this.destinataireId = destinataireId;
    }

    public List<FieldDTO> getFields() {
        return fields;
    }

    public void setFields(List<FieldDTO> fields) {
        this.fields = fields;
    }
}
