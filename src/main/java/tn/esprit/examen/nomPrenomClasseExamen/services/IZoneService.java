package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.ZoneDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Zone;

import java.util.List;
import java.util.Optional;

public interface IZoneService {
    Zone createZone(Zone zone);
    ZoneDTO updateZone(Long id, ZoneDTO zoneDTO);
    void deleteZone(Long id);
    Optional<ZoneDTO> getZoneById(Long id);
    List<ZoneDTO> getAllZones();
}
