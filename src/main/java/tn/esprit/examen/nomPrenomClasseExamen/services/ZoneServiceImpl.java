package tn.esprit.examen.nomPrenomClasseExamen.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ZoneDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ZoneDashboardStatsDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.SecteurRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.ZoneRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZoneServiceImpl implements IZoneService {
    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private SecteurRepository secteurRepository;

    // Conversion Entity -> DTO
    public ZoneDTO convertToDTO(Zone zone) {
        ZoneDTO dto = new ZoneDTO();
        dto.setIdZone(zone.getIdZone());
        dto.setLibelle(zone.getLibelle());
        dto.setGouvernorat(zone.getGouvernorat());
        if (zone.getChefZone() != null) {
            dto.setChefZoneId(zone.getChefZone().getId());
        }
        if (zone.getSecteur() != null) {
            dto.setSecteurId(zone.getSecteur().getIdSecteur());
        }
        return dto;
    }


    public Zone convertToEntity(ZoneDTO dto) {
        Zone zone = new Zone();
        zone.setIdZone(dto.getIdZone());
        zone.setLibelle(dto.getLibelle());
        zone.setGouvernorat(dto.getGouvernorat());

        if (dto.getChefZoneId() != null) {
            User chef = userRepository.findById(dto.getChefZoneId())
                    .orElseThrow(() -> new RuntimeException("Chef zone not found with id " + dto.getChefZoneId()));
            zone.setChefZone(chef);
        } else {
            zone.setChefZone(null);
        }

        // Ajout de l'association Secteur
        if (dto.getSecteurId() != null) {
            Secteur secteur = secteurRepository.findById(dto.getSecteurId())
                    .orElseThrow(() -> new RuntimeException("Secteur not found with id " + dto.getSecteurId()));
            zone.setSecteur(secteur);
        } else {
            zone.setSecteur(null);
        }

        return zone;
    }

    @Override
    public Zone createZone(Zone zone) {
        System.out.println("Secteur in zone before save: " +
                (zone.getSecteur() != null ? zone.getSecteur().getIdSecteur() : "null"));
        return zoneRepository.save(zone);
    }


    @Override
    public ZoneDTO updateZone(Long id, ZoneDTO zoneDTO) {
        Zone existing = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id " + id));

        // Mettre à jour champs
        existing.setLibelle(zoneDTO.getLibelle());
        existing.setGouvernorat(zoneDTO.getGouvernorat());

        if (zoneDTO.getChefZoneId() != null) {
            User chef = userRepository.findById(zoneDTO.getChefZoneId())
                    .orElseThrow(() -> new RuntimeException("Chef zone not found with id " + zoneDTO.getChefZoneId()));
            existing.setChefZone(chef);
        } else {
            existing.setChefZone(null);
        }

        Zone updated = zoneRepository.save(existing);
        return convertToDTO(updated);
    }

    @Override
    public void deleteZone(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found with id " + id));
        zoneRepository.delete(zone);
    }

    @Override
    public Optional<ZoneDTO> getZoneById(Long id) {
        Optional<Zone> zone = zoneRepository.findById(id);
        return zone.map(this::convertToDTO);
    }

    @Override
    public List<ZoneDTO> getAllZones() {
        List<Zone> zones = zoneRepository.findAll();
        return zones.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Zone getZoneByChefUsername(String username) {
        User chef = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec le username : " + username));

        Zone zone = chef.getZone();
        if (zone == null) {
            throw new RuntimeException("Ce chef de zone n'a pas de zone assignée.");
        }
        return zone;
    }

    // Pourcentage zones par gouvernorat
    public Map<String, Double> getZonePercentageByGouvernorat() {
        Long totalZones = zoneRepository.countTotalZones();
        List<Object[]> zonesByGov = zoneRepository.countZonesByGouvernorat();

        Map<String, Double> result = new HashMap<>();
        for (Object[] row : zonesByGov) {
            String gouvernorat = (String) row[0];
            Long count = (Long) row[1];
            double percentage = (count * 100.0) / totalZones;
            result.put(gouvernorat, percentage);
        }
        return result;
    }

    public List<Zone> getZonesWithoutChef() {
        return zoneRepository.findByChefZoneIsNull();
    }

    public ZoneDashboardStatsDTO getStatsForChefZone(String username) {
        User chefZone = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!chefZone.getRole().getRoleName().name().equals("CHEFZONE")) {
            throw new RuntimeException("Unauthorized");
        }

        Zone zone = zoneRepository.findByChefZone(chefZone)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        int totalRegions = zone.getRegions() != null ? zone.getRegions().size() : 0;

        int totalShops = 0;
        int totalReports = 0;

        if(zone.getRegions() != null){
            for (Region region : zone.getRegions()) {
                if(region.getShops() != null){
                    totalShops += region.getShops().size();
                    for (Shop shop : region.getShops()) {
                        if(shop.getReports() != null){
                            totalReports += shop.getReports().size();
                        }
                    }
                }
            }
        }

        return new ZoneDashboardStatsDTO(totalRegions, totalShops, totalReports);
    }

    public Zone getZoneWithRegionsByChefUsername(String username) {
        Zone zone = zoneRepository.findZoneByChefUsername(username);
        if (zone == null) {
            throw new RuntimeException("Zone not found for chef username: " + username);
        }
        zone.getRegions().size(); // force chargement lazy
        return zone;
    }

    public List<Zone> getZonesByChefSecteurUsername(String username) {
        Secteur secteur = secteurRepository.findByChefSecteurUsername(username);
        if (secteur == null) {
            throw new RuntimeException("Secteur not found for chef username: " + username);
        }
        return zoneRepository.findBySecteur(secteur);
    }

}