package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.DTO.ShopDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.Shop;

import java.util.List;
import java.util.Optional;

public interface IShopService {
    Shop createShop(Shop shop);

    ShopDTO updateShop(Long id, ShopDTO shopDTO);
    void deleteShop(Long id);
    void archiveShop(Long id);
    List<ShopDTO> getAllShops();
    ShopDTO getShopById(Long id);
    List<ShopDTO> getShopsWithoutAdmin();
    ShopDTO getShopByAdminUsername(String username);
    List<ShopDTO> getShopsByChefRegionUsername(String username);
}

