package tn.esprit.examen.nomPrenomClasseExamen.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.*;
import tn.esprit.examen.nomPrenomClasseExamen.Exception.EmailAlreadyRegisteredException;
import tn.esprit.examen.nomPrenomClasseExamen.Exception.InvalidRoleException;
import tn.esprit.examen.nomPrenomClasseExamen.Exception.UsernameAlreadyTakenException;
import tn.esprit.examen.nomPrenomClasseExamen.model.User;
import tn.esprit.examen.nomPrenomClasseExamen.services.AuthServiceImpl;
import tn.esprit.examen.nomPrenomClasseExamen.services.EmailService;

import java.util.List;
import java.util.Map;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication")
@RequiredArgsConstructor
public class AuthController {


    private final AuthServiceImpl authServiceImpl;

private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid SignUpRequest request) {
        try {


            // Attempt user registration
            authServiceImpl.register(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "✅ User registered successfully. Please check your email to activate your account."));

        } catch (EmailAlreadyRegisteredException e) {
            logger.warn("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "This email is already registered."));
        } catch (UsernameAlreadyTakenException e) {
            logger.warn("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "This username is already taken."));
        } catch (InvalidRoleException e) {
            logger.warn("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid role selected."));
        } catch (IllegalStateException e) {
            logger.error("Role not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Server configuration error. Please contact support."));
        } catch (MessagingException e) {
            logger.error("Failed to send email: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "We couldn't send the activation email. Please try again later."));
        } catch (Exception e) {
            logger.error("Unexpected error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred. Please try again."));
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid SignInRequest request) {
        logger.info("Request received - username: {}, email: {}, password: {}",
                request.getUsername(), request.getEmail(), request.getPassword());

        try {
            AuthenticationResponse response = authServiceImpl.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }



    @PostMapping("/activate-account")
    public ResponseEntity<?> confirm(@RequestBody Map<String, String> request) {
        try {
            authServiceImpl.activateAccount(request.get("token"));
            return ResponseEntity.ok().body(Map.of("message", "Account activated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> requestBody) {
        try {
            String email = requestBody.get("email");
            authServiceImpl.initiatePasswordReset(email);
            return ResponseEntity.ok(Map.of("message", "Password reset instructions sent to your email."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }



    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            authServiceImpl.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Optional utility method (not used currently, but kept for future)
    private String generateRandomCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            sb.append(characters.charAt(randomIndex));
        }
        return sb.toString();
    }
    @GetMapping("/user-by-email")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        tn.esprit.examen.nomPrenomClasseExamen.model.User user = authServiceImpl.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendTestEmail() {
        emailService.sendEmail("youssef.sassi@medtech.tn", "Test Email", "Bonjour, ceci est un test !");
        return ResponseEntity.ok("Email envoyé !");
    }

    @PostMapping("/admin/approve/{userId}")
    public ResponseEntity<String> approveUser(@PathVariable Long userId) {
        authServiceImpl.approveUserByAdmin(userId);
        return ResponseEntity.ok("User approved successfully");
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(authServiceImpl.getAllUsers());
    }

    @GetMapping("/admin/user-statistics")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        System.out.println("Méthode getUserStatistics appelée !");
        Map<String, Object> stats = authServiceImpl.getUserStatistics();
        return ResponseEntity.ok(stats);
    }



}
