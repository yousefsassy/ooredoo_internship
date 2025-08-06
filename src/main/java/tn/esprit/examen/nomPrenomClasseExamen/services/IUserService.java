package tn.esprit.examen.nomPrenomClasseExamen.services;

import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.UserDTO;

import java.util.List;
import java.util.Map;

public interface IUserService {
    void approveUserByAdmin(Long userId);
    void deleteUserByAdmin(Long userId);
    User getUserById(Long userId);

    UserDTO getUserDtoById(Long userId);




}
