package tn.esprit.examen.nomPrenomClasseExamen.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JWTUtil {
    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    @PostConstruct
    public void logSecretKey() {
        System.out.println("✅ JWT Secret Key loaded: " + SECRET_KEY);  // Debug only
    }


    // Generate signing key from Base64-decoded secret key
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY); // 🔑 Base64 decode
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract claims from the token
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract the username from the token
    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    // Extract the role from the token
    public String getRoleFromToken(String token) {
        return getAllClaimsFromToken(token).get("role", String.class);
    }
    public String generateToken(tn.esprit.examen.nomPrenomClasseExamen.model.User user) {
        Map<String, Object> claims = new HashMap<>();
        String role = "ROLE_" + user.getRole().getRoleName().name(); // Ex: ADMIN → ROLE_ADMIN
        claims.put("authorities", List.of(role)); // ✅ la clé que Spring attend
        claims.put("username", user.getUsername());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }



}
