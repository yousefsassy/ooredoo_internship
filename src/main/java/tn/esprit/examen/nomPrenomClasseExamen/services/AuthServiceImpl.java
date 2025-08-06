package tn.esprit.examen.nomPrenomClasseExamen.services;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.AuthenticationResponse;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.SignInRequest;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.SignUpRequest;
import tn.esprit.examen.nomPrenomClasseExamen.DTO.UserDTO;
import tn.esprit.examen.nomPrenomClasseExamen.Exception.*;
import tn.esprit.examen.nomPrenomClasseExamen.model.*;
import tn.esprit.examen.nomPrenomClasseExamen.repositories.*;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    @Value("${mailing.frontend.activation-url:http://localhost:4200/activate-account}")
    private String activationUrl;

    private final jwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final EmailService emailService;

    private final TokenRepository tokenRepository;
    private final ShopRepository shopRepository;
    private final ZoneRepository zoneRepository;
    private final SecteurRepository secteurRepository;
    private final RegionRepository regionRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);


    public void register(SignUpRequest request) throws MessagingException {
        // 1. Vérification email
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new EmailAlreadyRegisteredException("Email is already registered");
        }

        // 2. Vérification username
        Optional<User> existingUsername = userRepository.findByUsername(request.getUsername());
        if (existingUsername.isPresent()) {
            throw new UsernameAlreadyTakenException("Username is already taken");
        }

        // 3. Vérifier s'il s'agit du tout premier utilisateur
        boolean isFirstUser = userRepository.count() == 0;

        // 4. Rôle demandé
        RoleName requestedRole;
        try {
            requestedRole = RoleName.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidRoleException("Invalid role: " + request.getRole());
        }

        var userRole = roleRepository.findByRoleName(requestedRole)
                .orElseThrow(() -> new IllegalStateException("Role not found: " + requestedRole));

        // 5. Création de l'utilisateur
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(!isFirstUser)
                .enabled(false)
                .role(userRole)
                .build();

        // 6. Sauvegarder utilisateur
        userRepository.save(user);

        // 7. Affectation selon rôle
        switch (requestedRole) {
            case ADMIN:
                // Aucun rattachement spécifique
                break;

            case ADMINSHOP:
                if (request.getShopId() == null) {
                    throw new IllegalArgumentException("Shop ID must be provided for ADMINSHOP role");
                }

                Shop shop = shopRepository.findById(request.getShopId())
                        .orElseThrow(() -> new IllegalArgumentException("Shop not found with ID: " + request.getShopId()));
                shop.setAdminShop(user);
                shopRepository.save(shop);
                break;

            case CHEFZONE:
                if (request.getZoneId() == null) {
                    throw new IllegalArgumentException("Zone ID must be provided for CHEFZONE role");
                }

                Zone zone = zoneRepository.findById(request.getZoneId())
                        .orElseThrow(() -> new IllegalArgumentException("Zone not found with ID: " + request.getZoneId()));
                zone.setChefZone(user);
                zoneRepository.save(zone);
                break;

            case CHEFSECTEUR:
                if (request.getSecteurId() == null) {
                    throw new IllegalArgumentException("Secteur ID must be provided for CHEFSECTEUR role");
                }

                Secteur secteur = secteurRepository.findById(request.getSecteurId())
                        .orElseThrow(() -> new IllegalArgumentException("Secteur not found with ID: " + request.getSecteurId()));
                secteur.setChefSecteur(user);
                secteurRepository.save(secteur);
                break;

            case CHEFREGION:
                if (request.getRegionId() == null) {
                    throw new IllegalArgumentException("Region ID must be provided for CHEFREGION role");
                }

                Region region = regionRepository.findById(request.getRegionId())
                        .orElseThrow(() -> new IllegalArgumentException("Region not found with ID: " + request.getRegionId()));
                region.setChefRegion(user);
                regionRepository.save(region);
                break;

            default:
                throw new IllegalStateException("Unhandled role: " + requestedRole);
        }

        // 8. Envoi de l'email de validation
        sendValidationEmail(user);
    }




    private void sendValidationEmail(User user) {
        String token = generateAndSaveActivationToken(user);
        String confirmationUrl = activationUrl + "?token=" + token;
        logger.info("Sending activation email to user: {} with token: {}", user.getEmail(), token);

        try {
            emailService.sendActivationEmail(
                    user.getEmail(),
                    user.getUsername(),
                    confirmationUrl,
                    token,
                    "Activate Your Account"
            );
        } catch (EmailSendingException e) {
            logger.error("Error sending activation email to {}: {}", user.getEmail(), e.getMessage());
            throw new EmailSendingException("Failed to send activation email to " + user.getEmail(), e);
        }
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        logger.info("Generated activation token: {}", generatedToken);

        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusDays(10))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(SignInRequest request) {
        Optional<User> userOptional = Optional.empty();

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            userOptional = userRepository.findByEmail(request.getEmail());
        } else if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            userOptional = userRepository.findByUsername(request.getUsername());
        } else {
            throw new IllegalArgumentException("Email or username must be provided.");
        }

        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found."));

        if (!user.isEnabled()) throw new AccountNotActivatedException("Account not activated.");
        if (user.isAccountLocked()) throw new AccountLockedException("Account locked.");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail() != null ? request.getEmail() : request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid credentials.");
        }

        var claims = new HashMap<String, Object>();
        claims.put("Username", user.getUsername());
        claims.put("role", user.getRoleName());

        String jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .claims(claims)
                .build();
    }


    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new TokenExpiredException("Invalid token"));

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new TokenExpiredException("Activation token has expired. A new token has been sent to your email.");
        }

        if (savedToken.getValidatedAt() != null) {
            throw new IllegalStateException("Token has already been used to activate the account.");
        }

        User user = savedToken.getUser();
        user.setEnabled(true); // Mail confirmé
        savedToken.setValidatedAt(LocalDateTime.now());

        // Ne pas débloquer ici → l’admin doit approuver !
        userRepository.save(user);
        tokenRepository.save(savedToken);

        logger.info("User {} has validated their email, awaiting admin approval.", user.getUsername());
    }

    public void approveUserByAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setAccountLocked(false); // l'admin débloque
        userRepository.save(user);
    }


    public void initiatePasswordReset(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with email: " + email));

        if (user.getResetTokenExpiry() != null &&
                user.getResetTokenExpiry().isAfter(LocalDateTime.now().minusMinutes(10))) {
            throw new PasswordResetLimitExceededException("You can only reset your password once every 10 minutes.");
        }

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);

        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));

        userRepository.save(user);

        String resetLink = "http://localhost:4200/reset-password?token=" + token;
        emailService.send(
                user.getEmail(),
                emailService.buildEmail("Reset Your Password", resetLink)
        );
    }


    private Map<String, Object> buildClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRoleName());

        return claims;
    }


    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token"));

        // Add token expiration check
        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Reset token has expired");
        }

        // Only update necessary fields
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);

        // Add this to prevent role updates
        userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .roleName(user.getRoleName())
                        .enabled(user.isEnabled())
                        .accountLocked(user.isAccountLocked())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getUserStatistics() {
        List<User> users = userRepository.findAll();

        long totalUsers = users.size();
        long approvedUsers = users.stream()
                .filter(u -> u.getStatus() == Status.ACTIVE) // ou APPROVED selon ton enum
                .count();
        long chefZoneCount = users.stream()
                .filter(u -> "CHEFZONE".equalsIgnoreCase(u.getRoleName()))
                .count();
        long adminCount = users.stream()
                .filter(u -> "ADMIN".equalsIgnoreCase(u.getRoleName()))
                .count();
        long adminShopCount = users.stream()
                .filter(u -> "ADMINSHOP".equalsIgnoreCase(u.getRoleName()))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("approvedUsers", approvedUsers);
        stats.put("chefZoneCount", chefZoneCount);
        stats.put("adminCount", adminCount);
        stats.put("adminShopCount", adminShopCount);

        stats.put("approvedPercentage", totalUsers > 0 ? approvedUsers * 100.0 / totalUsers : 0);
        stats.put("chefZonePercentage", totalUsers > 0 ? chefZoneCount * 100.0 / totalUsers : 0);
        stats.put("adminPercentage", totalUsers > 0 ? adminCount * 100.0 / totalUsers : 0);
        stats.put("adminShopPercentage", totalUsers > 0 ? adminShopCount * 100.0 / totalUsers : 0);

        return stats;

    }
}
