package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import lombok.Builder;

@Builder
public class DashboardRegionDTO {
    private int totalShops;
    private int totalAdmins;
    private int totalReports;
    private int urgentReports;

}
