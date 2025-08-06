package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.SecteurDTO;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ZoneDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Secteur;

import java.util.List;

public interface ISecteurService {
    List<SecteurDTO> getAllSecteurs();
    SecteurDTO createSecteur(SecteurDTO secteurDTO);
    SecteurDTO getSecteurById(Long id);
    void deleteSecteur(Long id);
    List<SecteurDTO> getSecteursSansChef();
    SecteurDTO findByChefSecteurUsername(String username);
    public Secteur createSecteurFromDTO(SecteurDTO dto);
    public SecteurDTO toDto(Secteur secteur);
    List<ZoneDTO> getZonesBySecteurId(Long secteurId);

}
