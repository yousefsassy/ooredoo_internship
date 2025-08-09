package tn.esprit.examen.nomPrenomClasseExamen.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.ShopDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.RegionRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.ShopRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.ZoneRepository;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements IShopService{

    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ZoneRepository zoneRepository;
    @Autowired
    private final RegionRepository regionRepository;


    @Override
    public Shop createShop(Shop shop) {
        shop.setArchived(false);  // Toujours non archivé à la création
        return shopRepository.save(shop);
    }

    // Conversion Entity -> DTO
    public ShopDTO convertToDTO(Shop shop) {
        return new ShopDTO(
                shop.getIdShop(),
                shop.getNomShop(),
                shop.getTelephone(),
                shop.getAdminShop() != null ? shop.getAdminShop().getUsername() : null,
                shop.getRegion() != null ? shop.getRegion().getNom() : null
        );
    }

    // Conversion DTO -> Entity (optionnel, si besoin)
    public Shop convertToEntity(ShopDTO dto) {
        Shop shop = new Shop();
        shop.setIdShop(dto.getIdShop());
        shop.setNomShop(dto.getNomShop());
        shop.setTelephone(dto.getTelephone());

        if (dto.getAdminUsername() != null) {
            User admin = userRepository.findByUsername(dto.getAdminUsername())
                    .orElseThrow(() -> new RuntimeException("Admin user not found: " + dto.getAdminUsername()));
            shop.setAdminShop(admin);
        } else {
            shop.setAdminShop(null);
        }

        if (dto.getRegionName() != null) {
            Region region = regionRepository.findByNom(dto.getRegionName())
                    .orElseThrow(() -> new RuntimeException("Region not found: " + dto.getRegionName()));
            shop.setRegion(region);
        } else {
            shop.setRegion(null);
        }

        shop.setArchived(false); // Par défaut

        return shop;
    }


    // Mise à jour
    @Override
    public ShopDTO updateShop(Long id, ShopDTO shopDTO) {
        Shop existingShop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id " + id));

        existingShop.setNomShop(shopDTO.getNomShop());
        existingShop.setTelephone(shopDTO.getTelephone());

        if (shopDTO.getAdminUsername() != null) {
            User admin = userRepository.findByUsername(shopDTO.getAdminUsername())
                    .orElseThrow(() -> new RuntimeException("Admin user not found: " + shopDTO.getAdminUsername()));
            existingShop.setAdminShop(admin);
        } else {
            existingShop.setAdminShop(null);
        }

        if (shopDTO.getRegionName() != null) {
            Region region = regionRepository.findByNom(shopDTO.getRegionName())
                    .orElseThrow(() -> new RuntimeException("Region not found: " + shopDTO.getRegionName()));
            existingShop.setRegion(region);
        } else {
            existingShop.setRegion(null);
        }

        Shop updated = shopRepository.save(existingShop);
        return convertToDTO(updated);
    }

    // Suppression
    @Override
    public void deleteShop(Long id) {
        shopRepository.deleteById(id);
    }

    // Archiver
    @Override
    public void archiveShop(Long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id " + id));
        shop.setArchived(true);
        shopRepository.save(shop);
    }

    // Liste des shops non archivés
    @Override
    public List<ShopDTO> getAllShops() {
        List<Shop> shops = shopRepository.findByArchivedFalse();
        return shops.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Recherche par ID
    @Override
    public ShopDTO getShopById(Long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id " + id));
        return convertToDTO(shop);
    }

    // Shops sans admin
    @Override
    public List<ShopDTO> getShopsWithoutAdmin() {
        List<Shop> shops = shopRepository.findByAdminShopIsNull();
        return shops.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Recherche par admin username
    @Override
    public ShopDTO getShopByAdminUsername(String username) {
        Shop shop = shopRepository.findByAdminShop_Username(username);
        if (shop == null) throw new RuntimeException("Shop not found for admin username " + username);
        return convertToDTO(shop);
    }

    // Shops par chef région
    @Override
    public List<ShopDTO> getShopsByChefRegionUsername(String username) {
        User chef = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Chef region user not found: " + username));

        if (chef.getRegion() == null)
            throw new RuntimeException("No region assigned to this chef");

        List<Shop> shops = shopRepository.findByRegion(chef.getRegion());
        return shops.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
