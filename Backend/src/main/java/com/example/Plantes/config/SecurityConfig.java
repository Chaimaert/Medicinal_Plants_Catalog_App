package com.example.Plantes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for simplicity (ensure it's okay for your use case)
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to image and video files
                        .requestMatchers("/admin/files/**").permitAll()
                        // Allow public access to plant endpoints
                        .requestMatchers("/plantes/**").permitAll()
                        // Restrict upload functionality to ADMIN role
                        .requestMatchers("/admin/files/upload").hasRole("ADMIN")
                        // Restrict all other admin endpoints to ADMIN role
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                )
                .httpBasic(Customizer.withDefaults()) // Use basic authentication
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login")
                        .permitAll()
                );
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername("admin")
                        .password(encoder.encode("admin123")) // Admin username/password
                        .roles("ADMIN") // Assign ADMIN role
                        .build()
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

