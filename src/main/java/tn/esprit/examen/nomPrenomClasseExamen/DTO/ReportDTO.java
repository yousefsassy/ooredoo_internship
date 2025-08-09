package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import tn.esprit.examen.nomPrenomClasseExamen.model.Report;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ReportDTO {
    private Long idReport;
    private String titre;
    private String description;
    private String type;
    private LocalDateTime dateCreation;
    private UserDTO destinataire;
    private ShopDTO shop;
    private List<FieldDTO> fields;
    private List<ReportFieldValueDTO> fieldValues;
    private Long shopId;
    public LocalDateTime getDateCreation() {
        return dateCreation;
    }


    public ReportDTO() {}



    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public UserDTO getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(UserDTO destinataire) {
        this.destinataire = destinataire;
    }

    public ShopDTO getShop() {
        return shop;
    }

    public void setShop(ShopDTO shop) {
        this.shop = shop;
    }

    public List<FieldDTO> getFields() {
        return fields;
    }

    public void setFields(List<FieldDTO> fields) {
        this.fields = fields;
    }

    public Long getIdReport() {
        return idReport;
    }

    public void setIdReport(Long idReport) {
        this.idReport = idReport;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ReportFieldValueDTO> getFieldValues() {
        return fieldValues;
    }

    public void setFieldValues(List<ReportFieldValueDTO> fieldValues) {
        this.fieldValues = fieldValues;
    }
    public ReportDTO(Report report) {
        this.idReport = report.getIdReport();
        this.titre = report.getTitre();
        this.description = report.getDescription();
        this.type = report.getType();
        this.dateCreation = report.getDateCreation();

        if (report.getDestinataire() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(report.getDestinataire().getId());
            userDTO.setUsername(report.getDestinataire().getUsername());
            this.destinataire = userDTO;
        }

        if (report.getShop() != null) {
            ShopDTO shopDTO = new ShopDTO();
            shopDTO.setIdShop(report.getShop().getIdShop());
            shopDTO.setNomShop(report.getShop().getNomShop());
            this.shop = shopDTO;
        }

        // Pour les valeurs remplies (s'il y en a)
        if (report.getFieldValues() != null) {
            this.fieldValues = report.getFieldValues().stream().map(val -> {
                ReportFieldValueDTO valDTO = new ReportFieldValueDTO();
                valDTO.setFieldId(val.getField().getIdReportField());
                valDTO.setValue(val.getValue());
                return valDTO;
            }).collect(Collectors.toList());
        }
    }
}
