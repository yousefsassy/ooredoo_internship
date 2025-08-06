package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.CreateReportRequest;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.DestinataireReportDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ReportCreateDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ReportDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Report;

import java.util.List;

public interface IReportService {

        ReportDTO getReportById(Long id);
        public List<DestinataireReportDTO> getReportsForDestinataire(String username);
        Report createReportWithFields(CreateReportRequest request);

        }





