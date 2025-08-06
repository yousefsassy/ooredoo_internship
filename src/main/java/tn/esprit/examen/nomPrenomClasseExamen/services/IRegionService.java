package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.DashboardRegionDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.RegionDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Region;
import tn.esprit.examen.nomPrenomClasseExamen.model.Shop;

import java.util.List;

public interface IRegionService {
    Region addRegion(Region region);

    RegionDTO updateRegion(Long id, RegionDTO updatedRegionDTO);

    void deleteRegion(Long id);

    RegionDTO getRegionById(Long id);

    List<RegionDTO> getAllRegions();

    List<RegionDTO> getRegionsWithoutChef();

    RegionDTO getRegionByChefUsername(String username);

    List<Shop> getShopsByChefRegionUsername(String username);

    DashboardRegionDTO getDashboardStatsForChefRegion(String username);
    }
