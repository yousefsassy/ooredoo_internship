package tn.esprit.examen.nomPrenomClasseExamen.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.UserDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final UserRepository userRepository;

    @Override
    public void approveUserByAdmin(Long userId) {
        // Implementation here
    }

    @Override
    public void deleteUserByAdmin(Long userId) {
        // Implementation here
    }

    @Override
    public UserDTO getUserDtoById(Long userId) {
        return userRepository.findById(userId)
                .map(this::toDto)
                .orElse(null);
    }

    // DTO mapper utility
    public UserDTO toDto(User user) {
        if (user == null) return null;
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roleName(user.getRoleName())
                .enabled(user.isEnabled())
                .accountLocked(user.isAccountLocked())
                .build();
    }

    @Override
    public User getUserById(Long userId) {
        return null;
    }






}
