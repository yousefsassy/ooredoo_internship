package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.*;
import tn.esprit.examen.nomPrenomClasseExamen.model.Report;

import java.util.List;

public interface IReportService {

        ReportDTO getReportById(Long id);
        public List<DestinataireReportDTO> getReportsForDestinataire(String username);
        Report createReportWithFields(CreateReportRequest request);
        }





