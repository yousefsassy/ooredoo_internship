package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.AuthenticationResponse;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.SignInRequest;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.SignUpRequest;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.UserDTO;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;

import java.util.List;
import java.util.Map;

public interface IAuthService {
    void register(SignUpRequest request) throws MessagingException;

    AuthenticationResponse authenticate(SignInRequest request);

    void activateAccount(String token) throws MessagingException;

    void initiatePasswordReset(String email) throws MessagingException;

    void resetPassword(String token, String newPassword);
    User getUserByEmail(String email);
    public void approveUserByAdmin(Long userId);
    public List<UserDTO> getAllUsers();
    Map<String, Object> getUserStatistics();

}
