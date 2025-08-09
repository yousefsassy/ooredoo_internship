package tn.esprit.examen.nomPrenomClasseExamen.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.*;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.ReportRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;
import tn.esprit.examen.nomPrenomClasseExamen.services.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
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

    @PostMapping(value = "/createZone", consumes = MediaType.APPLICATION_JSON_VALUE)

    public ResponseEntity<ZoneDTO> createZone(@RequestBody ZoneDTO zoneDTO) {
        // Conversion DTO -> Entity
        Zone zone = zoneService.convertToEntity(zoneDTO);
        Zone savedZone = zoneService.createZone(zone);
        // Conversion Entity -> DTO pour la réponse
        return ResponseEntity.ok(zoneService.convertToDTO(savedZone));
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
    public ResponseEntity<ShopDTO> createShop(@RequestBody ShopDTO shopDTO) {
        Shop shop = shopService.convertToEntity(shopDTO);
        Shop created = shopService.createShop(shop);
        ShopDTO responseDTO = shopService.convertToDTO(created);
        return ResponseEntity.ok(responseDTO);
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
    public ResponseEntity<RegionDTO> createRegion(@RequestBody RegionDTO regionDTO) {
        RegionDTO createdRegion = regionService.addRegion(regionDTO);
        return ResponseEntity.ok(createdRegion);
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


    /*@PostMapping("/report/{reportId}/submit")
    public ResponseEntity<?> submitReport(
            @PathVariable Long reportId,
            @RequestParam String username,
            @RequestBody List<ReportFieldValueDTO> values // ✅ ici le bon format
    ) {
        reportService.enregistrerChampsRemplis(reportId, username, values);
        return ResponseEntity.ok("✅ Report submitted successfully.");
    }*/




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
    @PostMapping(value = "/report/{reportId}/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitReportWithFiles(
            @PathVariable Long reportId,
            @RequestParam String username,
            @RequestParam Map<String, String> allRequestParams,
            @RequestParam(required = false) Map<String, MultipartFile> files) {

        try {
            List<ReportFieldValueDTO> valeurs = new ArrayList<>();

            // Traitement des champs texte
            for (Map.Entry<String, String> entry : allRequestParams.entrySet()) {
                String key = entry.getKey();
                if (key.startsWith("field_")) {
                    Long fieldId = Long.parseLong(key.substring(6));
                    String value = entry.getValue();
                    if (value != null && !value.isEmpty()) {
                        ReportFieldValueDTO dto = new ReportFieldValueDTO();
                        dto.setFieldId(fieldId);
                        dto.setValue(value);
                        valeurs.add(dto);
                    }
                }
            }

            // Traitement des fichiers (photos)
            if (files != null) {
                for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
                    String paramName = entry.getKey(); // ex: field_123
                    MultipartFile file = entry.getValue();

                    Long fieldId = Long.parseLong(paramName.substring(6));
                    String storedPath = storeFileAndGetPath(file);

                    ReportFieldValueDTO dto = new ReportFieldValueDTO();
                    dto.setFieldId(fieldId);
                    dto.setValue(storedPath);  // URL relative accessible, ex: /photos/uuid-filename.png
                    valeurs.add(dto);
                }
            }

            reportService.enregistrerChampsRemplis(reportId, username, valeurs);

            return ResponseEntity.ok("Report submitted successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error submitting report: " + e.getMessage());
        }
    }

    // Méthode pour sauvegarder fichier et retourner URL accessible
    private String storeFileAndGetPath(MultipartFile file) throws IOException {
        String storageDir = System.getProperty("user.dir") + "/uploads/photos/";
        Files.createDirectories(Paths.get(storageDir));

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(storageDir).resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // retourne l'URL d'accès relative exposée par addResourceHandlers
        return "/photos/" + filename;
    }



    // Endpoint pour récupérer les données du rapport avec valeurs (texte et photos)
    @GetMapping("/reportwithvalues/{idReport}")
    public ResponseEntity<DestinataireReportDTO> getReportDetailswithvalues(@PathVariable Long idReport) {
        try {
            DestinataireReportDTO reportDetails = reportService.getReportWithLabelsAndValues(idReport);
            return ResponseEntity.ok(reportDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/photos/test")
    public ResponseEntity<String> testPhotoAccess() {
        return ResponseEntity.ok("Endpoint photos OK");
    }




}
