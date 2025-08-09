package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class CreateReportRequest {
    public String titre;
    public String description;
    public String type;
    public Long destinataireId;
    public Long shopId;
    public List<Long> fieldIds;

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getDestinataireId() {
        return destinataireId;
    }

    public void setDestinataireId(Long destinataireId) {
        this.destinataireId = destinataireId;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public List<Long> getFieldIds() {
        return fieldIds;
    }

    public void setFieldIds(List<Long> fieldIds) {
        this.fieldIds = fieldIds;
    }
}
