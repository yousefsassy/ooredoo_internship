package tn.esprit.examen.nomPrenomClasseExamen.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final jwtFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/auth/**",
                                "/auth/register",
                                "/auth/send",
                                "/auth/authenticate",
                                "/auth/activate-account",
                                "/auth/forgot-password",
                                "/auth/reset-password",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html",
                                "/auth/admin/users",
                                "/auth/admin/approve/{userId}",
                                "/createZone",
                                "/updateZone/**",
                                "/deleteZone/**",
                                "/getAllZones",
                                "/getZoneById/**",
                                "/createShop",
                                "/updateShop/**",
                                "/deleteShop/**",
                                "/getAllShops",
                                "/getShopById/**",
                                "/archiveShop/**",
                                "/by-chefzone/**",
                                "/by-chefzone-username/**",
                                "/zone/by-chef/**",
                                "/shop/by-admin/**",
                                "/auth/admin/user-statistics",
                                "/zones-by-gouvernorat",
                                "/shops-by-gouvernorat",
                                "/shops-by-zone-per-gouvernorat",
                                "/zones-without-chef",
                                "/shops/{zoneId}",
                                "/without-admin",
                                "/getAllRegions",
                                "/createRegion",
                                "/Secteursdisponibles",
                                "/createReport",
                                "/by-destinataire/{username}",

                                "/mark-as-read/{reportId}",
                                "/reports/received/{username}",
                                "/regions-without-chef",
                                "/region/by-chef/{username}",
                                "/shops/by-chefregion/{username}",
                                "/region/**",
                                "/region/*",
                                "/dashboardZone",
                                "/zone-with-regions/by-chef/{username}",
                                "/secteur/by-chef/{username}",
                                "/secteurs/{secteurId}/zones",
                                "/zones/by-chefsecteur/{username}",
                                "/createReport",
                                "/reports/for-destinataire/{username}",
                                "/report/**",
                                "/{reportId}/fields",
                                "/submit-report/**",
                                "/report/**",
                                "/{id}/details",
                                "/reports/all",
                                "/fields/all",
                                "/addField",
                                "/report/{reportId}/submit"



                        ).permitAll()
                        .requestMatchers("/auth/admin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/getUserById/**").hasRole("ADMIN")

                        // ✅ Autoriser l'accès aux endpoints zone pour ADMIN et CHEFZONE
                        .requestMatchers("/createZone", "/updateZone/**", "/deleteZone/**").hasAnyRole("ADMIN", "CHEFZONE")
                        .requestMatchers("/getAllZones", "/getZoneById/**").hasAnyRole("ADMIN", "CHEFZONE", "ADMINSHOP")

                        .anyRequest().authenticated()
                )

                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ This tells Spring what CORS rules to apply
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200")); // your frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // if you're using Authorization headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}

