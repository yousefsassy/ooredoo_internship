package tn.esprit.examen.nomPrenomClasseExamen.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.*;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.ReportRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;
import tn.esprit.examen.nomPrenomClasseExamen.services.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RestController
@RequiredArgsConstructor
public class Controller {
    @Autowired
    private ZoneServiceImpl zoneService;
    @Autowired
    private ShopServiceImpl shopService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final UserServiceImpl userService;
    @Autowired
    private SecteurServiceImpl secteurService;
    @Autowired
    private final RegionServiceImpl regionService;
    @Autowired
    private final ReportServiceImpl reportService;
    @Autowired
    private ReportRepository reportRepository;

    @PostMapping("/createZone")
    public ResponseEntity<Zone> createZone(@RequestBody Zone zone) {
        Zone created = zoneService.createZone(zone);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/updateZone/{id}")
    public ResponseEntity<ZoneDTO> updateZone(@PathVariable Long id, @RequestBody ZoneDTO zoneDTO) {
        ZoneDTO updated = zoneService.updateZone(id, zoneDTO);
        return ResponseEntity.ok(updated);
    }


    // Delete a zone
    @DeleteMapping("/deleteZone/{id}")
    public ResponseEntity<Void> deleteZone(@PathVariable Long id) {
        zoneService.deleteZone(id);
        return ResponseEntity.noContent().build();
    }

    // Get all zones
    @GetMapping("/getAllZones")
    public ResponseEntity<List<ZoneDTO>> getAllZones() {
        List<ZoneDTO> zones = zoneService.getAllZones();
        return ResponseEntity.ok(zones);
    }

    @GetMapping("/getZoneById/{id}")
    public ResponseEntity<ZoneDTO> getZoneById(@PathVariable Long id) {
        return zoneService.getZoneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/getAllShops")
    public ResponseEntity<List<ShopDTO>> getAllShops() {
        List<ShopDTO> shops = shopService.getAllShops();  // déjà List<ShopDTO>
        return ResponseEntity.ok(shops);
    }


    @GetMapping("/getShopById/{id}")
    public ResponseEntity<ShopDTO> getShopById(@PathVariable Long id) {
        ShopDTO shopDTO = shopService.getShopById(id);  // service renvoie ShopDTO
        return ResponseEntity.ok(shopDTO);
    }


    @PostMapping("/createShop")
    public ResponseEntity<Shop> createShop(@RequestBody Shop shop) {
        Shop created = shopService.createShop(shop);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/updateShop/{id}")
    public ResponseEntity<ShopDTO> updateShop(@PathVariable Long id, @RequestBody ShopDTO shopDTO) {
        ShopDTO updated = shopService.updateShop(id, shopDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteShop/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {
        shopService.deleteShop(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/archiveShop/{id}")
    public ResponseEntity<Void> archiveShop(@PathVariable Long id) {
        shopService.archiveShop(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/zone/by-chef/{username}")
    public ResponseEntity<Zone> getZoneByChefUsername(@PathVariable String username) {
        Zone zone = zoneService.getZoneByChefUsername(username);
        return ResponseEntity.ok(zone);
    }

    @GetMapping("/shop/by-admin/{username}")
    public ResponseEntity<ShopDTO> getShopByAdmin(@PathVariable String username) {
        ShopDTO dto = shopService.getShopByAdminUsername(username);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/zones-by-gouvernorat")
    public Map<String, Double> getZonePercentageByGouvernorat() {
        return zoneService.getZonePercentageByGouvernorat();
    }

    // Pourcentage des shops par gouvernorat
    /*@GetMapping("/shops-by-gouvernorat")
    public Map<String, Double> getShopPercentageByGouvernorat() {
        return shopService.getShopPercentageByGouvernorat();
    }

    // Pourcentage des shops par zone pour chaque gouvernorat
   /* @GetMapping("/shops-by-zone-per-gouvernorat")
    public ResponseEntity<Map<String, Map<String, Double>>> getShopPercentageByZoneLibellePerGouvernorat() {
        Map<String, Map<String, Double>> data = shopService.getShopPercentageByZonePerGouvernorat();
        return ResponseEntity.ok(data);
    }*/


    @GetMapping("/zones-without-chef")
    public ResponseEntity<List<Zone>> getZonesWithoutChef() {
        List<Zone> zonesWithoutChef = zoneService.getZonesWithoutChef();
        if (zonesWithoutChef.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(zonesWithoutChef);
    }
    /*@GetMapping("/shops/{zoneId}")
    public List<Shop> getShopsByZoneId(@PathVariable Long zoneId) {
        return shopService.findByZoneId(zoneId);
    }*/

    @GetMapping("/without-admin")
    public List<ShopDTO> getShopsWithoutAdmin() {
        return shopService.getShopsWithoutAdmin();
    }


    @GetMapping("/Secteursdisponibles")
    public ResponseEntity<List<SecteurDTO>> getSecteursDisponibles() {
        List<SecteurDTO> secteurs = secteurService.getSecteursSansChef();
        return ResponseEntity.ok(secteurs);
    }

    @PostMapping("/createSecteur")
    public ResponseEntity<SecteurDTO> createSecteur(@RequestBody SecteurDTO secteurDTO) {
        Secteur created = secteurService.createSecteurFromDTO(secteurDTO);
        SecteurDTO dto = secteurService.toDto(created);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/getAllSecteurs")
    public ResponseEntity<List<SecteurDTO>> getAllSecteurs() {
        List<SecteurDTO> secteurs = secteurService.getAllSecteurs();
        return ResponseEntity.ok(secteurs);
    }

    @GetMapping("/getSecteurById/{id}")
    public ResponseEntity<SecteurDTO> getSecteurById(@PathVariable Long id) {
        SecteurDTO secteurDTO = secteurService.getSecteurById(id);
        if (secteurDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(secteurDTO);
    }


    // ✅ Delete
    @DeleteMapping("/deleteSecteur/{id}")
    public ResponseEntity<Void> deleteSecteur(@PathVariable Long id) {
        secteurService.deleteSecteur(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createRegion")
    public Region createRegion(@RequestBody Region region) {
        return regionService.addRegion(region);
    }

    @PutMapping("/updateRegion/{id}")
    public RegionDTO updateRegion(@PathVariable Long id, @RequestBody RegionDTO regionDTO) {
        return regionService.updateRegion(id, regionDTO);
    }

    @DeleteMapping("/deleteRegion/{id}")
    public void deleteRegion(@PathVariable Long id) {
        regionService.deleteRegion(id);
    }

    @GetMapping("/getRegionById/{id}")
    public RegionDTO getRegionById(@PathVariable Long id) {
        return regionService.getRegionById(id);
    }

    @GetMapping("/getAllRegions")
    public List<RegionDTO> getAllRegions() {
        return regionService.getAllRegions();
    }


    @GetMapping("/regions-without-chef")
    public ResponseEntity<List<RegionDTO>> getRegionsWithoutChef() {
        List<RegionDTO> regionsWithoutChef = regionService.getRegionsWithoutChef();
        if (regionsWithoutChef.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(regionsWithoutChef);
    }

    @GetMapping("/region/by-chef/{username}")
    public ResponseEntity<RegionDTO> getRegionByChefUsername(@PathVariable String username) {
        try {
            RegionDTO regionDTO = regionService.getRegionByChefUsername(username);
            return ResponseEntity.ok(regionDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/shops/by-chefregion/{username}")
    public ResponseEntity<List<Shop>> getShopsByChefRegion(@PathVariable String username) {
        List<Shop> shops = regionService.getShopsByChefRegionUsername(username);
        return ResponseEntity.ok(shops);
    }

    @GetMapping("/region/{username}")
    public DashboardRegionDTO getStats(@PathVariable String username) {
        return regionService.getDashboardStatsForChefRegion(username);
    }

    @GetMapping("/dashboardZone")
    public ResponseEntity<ZoneDashboardStatsDTO> getZoneStatsForChefZone(@RequestParam String username) {
        return ResponseEntity.ok(zoneService.getStatsForChefZone(username));
    }

    @GetMapping("/zone-with-regions/by-chef/{username}")
    public ResponseEntity<Zone> getZoneWithRegionsByChef(@PathVariable String username) {
        Zone zone = zoneService.getZoneWithRegionsByChefUsername(username);
        return ResponseEntity.ok(zone);
    }

    @GetMapping("/secteur/by-chef/{username}")
    public ResponseEntity<SecteurDTO> getSecteurByChef(@PathVariable String username) {
        SecteurDTO dto = secteurService.findByChefSecteurUsername(username);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/secteurs/{secteurId}/zones")
    public ResponseEntity<List<ZoneDTO>> getZonesBySecteur(@PathVariable Long secteurId) {
        try {
            List<ZoneDTO> zones = secteurService.getZonesBySecteurId(secteurId);
            return ResponseEntity.ok(zones);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/zones/by-chefsecteur/{username}")
    public ResponseEntity<List<Zone>> getZonesByChefSecteur(@PathVariable String username) {
        try {
            List<Zone> zones = zoneService.getZonesByChefSecteurUsername(username);
            return ResponseEntity.ok(zones);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/createReport")
    public ResponseEntity<Report> createReport(@RequestBody CreateReportRequest request) {
        Report createdReport = reportService.createReportWithFields(request);
        return ResponseEntity.ok(createdReport);
    }

    @GetMapping("/reports/for-destinataire/{username}")
    public ResponseEntity<List<DestinataireReportDTO>> getReportsForDestinataire(@PathVariable String username) {
        List<DestinataireReportDTO> reports = reportService.getReportsForDestinataire(username);
        return ResponseEntity.ok(reports);
    }


    @GetMapping("/report/{idReport}")
    public ResponseEntity<ReportDTO> getReportById(@PathVariable Long idReport) {
        return ResponseEntity.ok(reportService.getReportById(idReport));
    }

    @GetMapping("/{reportId}/fields")
    public ResponseEntity<List<ReportFieldDTO>> getReportFields(@PathVariable Long reportId) {
        List<ReportFieldDTO> fields = reportService.getReportFieldsByReportId(reportId);
        return ResponseEntity.ok(fields);
    }


    @PostMapping("/report/{reportId}/submit")
    public ResponseEntity<?> submitReport(
            @PathVariable Long reportId,
            @RequestParam String username,
            @RequestBody List<ReportFieldValueDTO> values // ✅ ici le bon format
    ) {
        reportService.enregistrerChampsRemplis(reportId, username, values);
        return ResponseEntity.ok("✅ Report submitted successfully.");
    }




    @GetMapping("/{id}/details")
    public ResponseEntity<ReportWithValuesDTO> getReportDetails(@PathVariable Long id) {
        ReportWithValuesDTO dto = reportService.getReportWithValues(id);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("/reports/all")
    public ResponseEntity<List<DestinataireReportDTO>> getAllReports() {
        List<DestinataireReportDTO> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserDtoById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/fields/all")
    public List<FieldDTO> getAllFields() {
        return reportService.getAllFields();
    }

    @PostMapping("/addField")
    public ResponseEntity<Field> addField(@RequestBody FieldDTO fieldDTO) {
        Field createdField = reportService.addField(fieldDTO);
        return new ResponseEntity<>(createdField, HttpStatus.CREATED);
    }
}
