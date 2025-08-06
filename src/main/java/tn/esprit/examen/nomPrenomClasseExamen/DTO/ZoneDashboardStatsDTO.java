package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZoneDashboardStatsDTO {
    private int totalRegions;
    private int totalShops;
    private int totalReports;
}
