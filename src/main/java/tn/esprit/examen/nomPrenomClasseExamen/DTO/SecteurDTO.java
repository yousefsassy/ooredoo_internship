package tn.esprit.examen.nomPrenomClasseExamen.DTO;

import java.util.List;

public class SecteurDTO {
    private Long idSecteur;
    private String nom;
    private List<ZoneDTO> zones;

    public Long getIdSecteur() {
        return idSecteur;
    }

    public void setIdSecteur(Long idSecteur) {
        this.idSecteur = idSecteur;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public List<ZoneDTO> getZones() {
        return zones;
    }

    public void setZones(List<ZoneDTO> zones) {
        this.zones = zones;
    }
}
