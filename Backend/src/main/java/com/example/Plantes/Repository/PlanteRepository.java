package com.example.Plantes.Repository;

import com.example.Plantes.Entities.Plante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanteRepository extends JpaRepository<Plante, Long> {
    List<Plante> findByUsesContaining(String besoinDeSante); // Pour les recommandations
    List<Plante> findByAllIgnoreCase(String nom ,List<String> proprietes, List<String> utilisations, String region); // Recherche avancée
}