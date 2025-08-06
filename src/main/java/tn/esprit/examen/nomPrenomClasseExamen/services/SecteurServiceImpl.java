package tn.esprit.examen.nomPrenomClasseExamen.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.SecteurDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ZoneDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Secteur;
import tn.esprit.examen.nomPrenomClasseExamen.model.Zone;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.SecteurRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class SecteurServiceImpl implements ISecteurService{
    private final SecteurRepository secteurRepository;

    @Override
    public List<SecteurDTO> getSecteursSansChef() {
        return secteurRepository.findByChefSecteurIsNull()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SecteurDTO createSecteur(SecteurDTO secteurDTO) {
        Secteur secteur = new Secteur();
        secteur.setNom(secteurDTO.getNom());
        secteur.setChefSecteur(null); // Pas de chef à la création
        secteur.setZones(null);       // Zones non définies à la création
        Secteur saved = secteurRepository.save(secteur);
        return toDto(saved);
    }

    @Override
    public List<SecteurDTO> getAllSecteurs() {
        return secteurRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SecteurDTO getSecteurById(Long id) {
        Secteur secteur = secteurRepository.findById(id).orElse(null);
        if (secteur == null) return null;
        return toDto(secteur);
    }

    @Override
    public void deleteSecteur(Long id) {
        secteurRepository.deleteById(id);
    }

    @Override
    public SecteurDTO findByChefSecteurUsername(String username) {
        Secteur secteur = secteurRepository.findByChefSecteurUsername(username);
        if (secteur == null) return null;
        return toDto(secteur);
    }

    @Override
    public Secteur createSecteurFromDTO(SecteurDTO dto) {
        Secteur secteur = new Secteur();
        secteur.setNom(dto.getNom());
        secteur.setChefSecteur(null); // ou set à partir de dto si nécessaire
        secteur.setZones(null); // pas gérées ici
        return secteurRepository.save(secteur);
    }

    // --- Mappers ---

    public SecteurDTO toDto(Secteur secteur) {
        SecteurDTO dto = new SecteurDTO();
        dto.setIdSecteur(secteur.getIdSecteur());
        dto.setNom(secteur.getNom());

        if (secteur.getZones() != null) {
            List<ZoneDTO> zoneDtos = secteur.getZones()
                    .stream()
                    .map(this::toZoneDto)
                    .collect(Collectors.toList());
            dto.setZones(zoneDtos);
        }

        return dto;
    }

    public ZoneDTO toZoneDto(Zone zone) {
        ZoneDTO dto = new ZoneDTO();
        dto.setIdZone(zone.getIdZone());
        dto.setLibelle(zone.getLibelle());
        dto.setGouvernorat(zone.getGouvernorat());
        return dto;
    }
    public List<ZoneDTO> getZonesBySecteurId(Long secteurId) {
        Secteur secteur = secteurRepository.findById(secteurId)
                .orElseThrow(() -> new RuntimeException("Secteur not found with id " + secteurId));

        return secteur.getZones().stream()
                .map(zone -> {
                    ZoneDTO dto = new ZoneDTO();
                    dto.setIdZone(zone.getIdZone());  // adapte selon ton champ id dans Zone
                    dto.setLibelle(zone.getLibelle());
                    dto.setGouvernorat(zone.getGouvernorat());
                    dto.setChefZoneId(zone.getChefZone() != null ? zone.getChefZone().getId() : null);
                    dto.setSecteurId(secteurId);
                    return dto;
                }).collect(Collectors.toList());
    }


}

