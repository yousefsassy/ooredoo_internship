package tn.esprit.examen.nomPrenomClasseExamen.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.DashboardRegionDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.RegionDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Region;
import tn.esprit.examen.nomPrenomClasseExamen.model.Shop;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.model.Zone;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements IRegionService {
    private final RegionRepository regionRepository;
    private final UserRepository userRepository;
    private final ShopRepository shopRepository;
    private final ReportRepository reportRepository;
    private final ZoneRepository zoneRepository;

    @Override
    public RegionDTO addRegion(RegionDTO regionDTO) {
        Region region = new Region();
        region.setDelegation(regionDTO.getDelegation());

        // Associer Zone
        if (regionDTO.getZoneId() != null) {
            Zone zone = zoneRepository.findById(regionDTO.getZoneId())
                    .orElseThrow(() -> new RuntimeException("Zone not found with id " + regionDTO.getZoneId()));
            region.setZone(zone);
        }

        // Associer Chef de Région
        if (regionDTO.getChefRegionId() != null) {
            User chef = userRepository.findById(regionDTO.getChefRegionId())
                    .orElseThrow(() -> new RuntimeException("Chef region not found with id " + regionDTO.getChefRegionId()));
            region.setChefRegion(chef);
        }

        // Auto-générer le nom
        if (region.getZone() != null && region.getZone().getLibelle() != null && region.getDelegation() != null) {
            region.setNom(region.getZone().getLibelle() + " - " + region.getDelegation());
        } else {
            region.setNom(regionDTO.getNom()); // fallback si non auto-générable
        }

        Region saved = regionRepository.save(region);
        return convertToDTO(saved);
    }


    @Override
    public RegionDTO updateRegion(Long id, RegionDTO updatedRegionDTO) {
        Region existing = regionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Region not found"));

        existing.setNom(updatedRegionDTO.getNom());
        existing.setDelegation(updatedRegionDTO.getDelegation());

        if (updatedRegionDTO.getChefRegionId() != null) {
            User chef = userRepository.findById(updatedRegionDTO.getChefRegionId())
                    .orElseThrow(() -> new RuntimeException("Chef region not found with id " + updatedRegionDTO.getChefRegionId()));
            existing.setChefRegion(chef);
        } else {
            existing.setChefRegion(null);
        }

        if (updatedRegionDTO.getZoneId() != null) {
            Zone zone = zoneRepository.findById(updatedRegionDTO.getZoneId())
                    .orElseThrow(() -> new RuntimeException("Zone not found with id " + updatedRegionDTO.getZoneId()));
            existing.setZone(zone);
        } else {
            existing.setZone(null);
        }

        Region saved = regionRepository.save(existing);
        return convertToDTO(saved);
    }

    @Override
    public void deleteRegion(Long id) {
        regionRepository.deleteById(id);
    }

    @Override
    public RegionDTO getRegionById(Long id) {
        Region region = regionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Region not found"));
        return convertToDTO(region);
    }

    @Override
    public List<RegionDTO> getAllRegions() {
        List<Region> regions = regionRepository.findAllWithZone();
        return regions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<RegionDTO> getRegionsWithoutChef() {
        List<Region> regions = regionRepository.findByChefRegionIsNull();
        return regions.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public RegionDTO getRegionByChefUsername(String username) {
        Region region = regionRepository.findByChefRegionUsername(username);
        if (region == null) throw new RuntimeException("Region not found for chef " + username);
        return convertToDTO(region);
    }

    @Override
    public List<Shop> getShopsByChefRegionUsername(String username) {
        Region region = regionRepository.findByChefRegionUsername(username);
        if (region == null) return List.of();
        return region.getShops();
    }

    @Override
    public DashboardRegionDTO getDashboardStatsForChefRegion(String username) {
        Long regionId = regionRepository.findRegionIdByChefUsername(username);

        int totalShops = shopRepository.countByRegion_IdRegion(regionId);
        int totalReports = reportRepository.countByShopRegionIdRegion(regionId);

        return DashboardRegionDTO.builder()
                .totalShops(totalShops)
                .totalReports(totalReports)
                .build();
    }

    // Méthode de conversion Region -> RegionDTO à implémenter si besoin
    private RegionDTO convertToDTO(Region region) {
        RegionDTO dto = new RegionDTO();
        dto.setIdRegion(region.getIdRegion());
        dto.setNom(region.getNom());
        dto.setDelegation(region.getDelegation());
        if (region.getChefRegion() != null) {
            dto.setChefRegionId(region.getChefRegion().getId());
        }
        if (region.getZone() != null) {
            dto.setZoneId(region.getZone().getIdZone());
        }
        // Ajouter plus de champs selon RegionDTO
        return dto;
    }
}