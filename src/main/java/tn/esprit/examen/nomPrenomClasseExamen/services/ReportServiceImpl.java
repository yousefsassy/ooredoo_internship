package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.*;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements IReportService {

    private final ReportRepository reportRepository;
    private final FieldRepository fieldRepository;
    private final ReportFieldRepository reportFieldRepository;
    private final ReportFieldValueRepository reportFieldValueRepository;
    private final UserRepository userRepository;
    private final DestinataireReportRepository destinataireReportRepository;
    private final ShopRepository shopRepository;

    @Override
    public Report createReportWithFields(CreateReportRequest request) {
        Report report = new Report();
        report.setTitre(request.getTitre());
        report.setContenu(request.getContenu());
        report.setType(request.getType());
        report.setDateCreation(LocalDateTime.now());

        User destinataire = userRepository.findById(request.getDestinataireId())
                .orElseThrow(() -> new EntityNotFoundException("Destinataire non trouvé"));
        report.setDestinataire(destinataire);

        Shop shop = shopRepository.findById(request.getShopId())
                .orElseThrow(() -> new EntityNotFoundException("Shop non trouvé"));
        report.setShop(shop);

        // Sauvegarde initiale du rapport
        report = reportRepository.save(report);

        // Création des ReportField liés au rapport avec label et type copiés
        List<ReportField> reportFields = new ArrayList<>();
        for (Long fieldId : request.getFieldIds()) {
            Field field = fieldRepository.findById(fieldId)
                    .orElseThrow(() -> new EntityNotFoundException("Champ non trouvé avec l'ID : " + fieldId));

            ReportField reportField = new ReportField();
            reportField.setField(field);
            reportField.setReport(report);

            // Copier label et type depuis le Field
            reportField.setLabel(field.getLabel());
            reportField.setType(field.getType());

            reportFields.add(reportField);
        }

        reportFieldRepository.saveAll(reportFields);

        // Recharge complet du rapport avec ses reportFields
        report = reportRepository.findById(report.getIdReport())
                .orElseThrow(() -> new EntityNotFoundException("Report non trouvé après création"));

        return report;
    }







    @Override
    public List<DestinataireReportDTO> getReportsForDestinataire(String username) {
        List<Report> reports = reportRepository.findByDestinataireUsername(username);

        return reports.stream().map(report -> {
            DestinataireReportDTO dto = new DestinataireReportDTO();
            dto.setIdReport(report.getIdReport());  // <-- IL FAUT CETTE LIGNE !!
            dto.setTitre(report.getTitre());
            dto.setContenu(report.getContenu());
            dto.setType(report.getType());


            if (report.getShop() != null)
                dto.setNomShop(report.getShop().getNomShop());
            if (report.getDestinataire() != null)
                dto.setNomAdmin(report.getDestinataire().getUsername());

            // Si tu as des labelsEtValeurs, ajoute ici aussi

            return dto;
        }).collect(Collectors.toList());
    }





    @Override
    public ReportDTO getReportById(Long idReport) {
        Report report = reportRepository.findById(idReport)
                .orElseThrow(() -> new RuntimeException("Rapport non trouvé avec l'ID : " + idReport));

        ReportDTO dto = new ReportDTO();
        dto.setIdReport(report.getIdReport());
        dto.setTitre(report.getTitre());
        dto.setContenu(report.getContenu());
        dto.setType(report.getType());


        List<ReportFieldValueDTO> fieldValues = report.getFieldValues().stream().map(value -> {
            ReportFieldValueDTO valDTO = new ReportFieldValueDTO();
            valDTO.setFieldId(value.getField().getIdReportField());
            valDTO.setValue(value.getValue());
            return valDTO;
        }).collect(Collectors.toList());

        dto.setFieldValues(fieldValues);
        return dto;
    }

    public List<ReportFieldDTO> getReportFieldsByReportId(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        List<ReportField> fields = report.getFields();

        return fields.stream()
                .map(this::convertToReportFieldDTO)
                .collect(Collectors.toList());
    }


    @Transactional
    public void enregistrerChampsRemplis(Long reportId, String username, List<ReportFieldValueDTO> valeurs) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("❌ Rapport non trouvé avec l'ID : " + reportId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("❌ Utilisateur non trouvé : " + username));

        for (ReportFieldValueDTO dto : valeurs) {
            if (dto.getFieldId() == null || dto.getValue() == null) {
                throw new IllegalArgumentException("❌ Chaque champ doit avoir un fieldId et une valeur non null.");
            }

            ReportField field = reportFieldRepository.findById(dto.getFieldId())
                    .orElseThrow(() -> new RuntimeException("❌ Champ non trouvé avec l'ID : " + dto.getFieldId()));

            ReportFieldValue valeur = new ReportFieldValue();
            valeur.setField(field);
            valeur.setReport(report);
            valeur.setUser(user);
            valeur.setValue(dto.getValue());
            valeur.setFilledAt(LocalDateTime.now());

            reportFieldValueRepository.save(valeur);
        }
    }
    public ReportWithValuesDTO getReportWithValues(Long reportId) {
        ReportDTO report = convertReportToDTO(reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report non trouvé")));

        List<ReportFieldDTO> fields = reportFieldRepository.findByReportIdReport(reportId)
                .stream()
                .map(this::convertToReportFieldDTO)
                .collect(Collectors.toList());

        List<ReportFieldValueDTO> values = reportFieldValueRepository.findByReportIdReport(reportId)
                .stream()
                .map(val -> {
                    ReportFieldValueDTO dto = new ReportFieldValueDTO();
                    dto.setFieldId(val.getField().getIdReportField());
                    dto.setValue(val.getValue());
                    return dto;
                })
                .collect(Collectors.toList());

        ReportWithValuesDTO dto = new ReportWithValuesDTO();
        dto.setReport(report);
        dto.setFields(fields);
        dto.setValues(values);
        return dto;
    }

    private ReportDTO convertReportToDTO(Report report) {
        // Conversion simplifiée, adapte selon ta structure
        ReportDTO dto = new ReportDTO();
        dto.setIdReport(report.getIdReport());
        dto.setTitre(report.getTitre());

        return dto;
    }

    private ReportFieldDTO convertToReportFieldDTO(ReportField field) {
        ReportFieldDTO dto = new ReportFieldDTO();
        dto.setIdReportField(field.getIdReportField());
        dto.setLabel(field.getLabel());
        dto.setType(field.getType());

        // Si les options sont dans l'objet Field lié :
        if(field.getField() != null && field.getField().getOptions() != null) {
            dto.setOptions(field.getField().getOptions());
        } else {
            dto.setOptions(List.of());
        }

        return dto;
    }



    public List<DestinataireReportDTO> getAllReports() {
        // Récupérer tous les rapports (avec labels et valeurs)
        return reportRepository.findAll()
                .stream()
                .map(report -> convertToDestinataireReportDTO(report))
                .collect(Collectors.toList());
    }
    private DestinataireReportDTO convertToDestinataireReportDTO(Report report) {
        DestinataireReportDTO dto = new DestinataireReportDTO();
        dto.setIdReport(report.getIdReport());
        dto.setTitre(report.getTitre());
        dto.setType(report.getType());
        dto.setContenu(report.getContenu());

        if (report.getShop() != null)
            dto.setNomShop(report.getShop().getNomShop());

        if (report.getDestinataire() != null)
            dto.setNomAdmin(report.getDestinataire().getUsername());

        // Récupérer les labels et valeurs des champs remplis
        List<LabelValeurDTO> labelsEtValeurs = reportFieldValueRepository.findByReportIdReport(report.getIdReport())
                .stream()
                .map(val -> {
                    LabelValeurDTO lv = new LabelValeurDTO();
                    lv.setLabel(val.getField().getLabel());
                    lv.setValeur(val.getValue());
                    return lv;
                })
                .collect(Collectors.toList());

        dto.setLabelsEtValeurs(labelsEtValeurs);

        return dto;
    }


    public List<FieldDTO> getAllFields() {
        List<Field> fields = fieldRepository.findAll();

        // Mapper les entities Field en DTO pour éviter relations cycliques
        return fields.stream()
                .map(f -> new FieldDTO(
                        f.getIdField(),
                        f.getLabel(),
                        f.getType(),
                        f.getRequired(),
                        f.getOptions()
                ))
                .collect(Collectors.toList());
    }
    public Field addField(FieldDTO fieldDTO) {
        // Création d'une nouvelle entité Field
        Field field = new Field();
        field.setLabel(fieldDTO.getLabel());
        field.setType(fieldDTO.getType());
        field.setRequired(fieldDTO.getRequired());

        // options peut être null, vérifier avant
        if (fieldDTO.getOptions() != null) {
            field.setOptions(fieldDTO.getOptions());
        }

        // Sauvegarde en base et retour de l'objet
        return fieldRepository.save(field);
    }

}

