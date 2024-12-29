package com.example.plantes.catalogueplantesapplication.service;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.dto.UserRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommandationService {

    private final PlanteService planteService;

    public RecommandationService(PlanteService planteService) {
        this.planteService = planteService;
    }

    /**
     * Generate plant recommendations based on user health needs, preferences, and medical history.
     *
     * @param request User information for generating recommendations.
     * @return A list of recommended plants.
     */
    public List<Plante> genererRecommandations(UserRequest request) {
        List<Plante> recommandations = planteService.genererRecommandations(request.getBesoinDeSante());

        // Filter recommendations based on user preferences
        if (request.getPreferences() != null && !request.getPreferences().isEmpty()) {
            recommandations = recommandations.stream()
                    .filter(plante -> request.getPreferences().stream()
                            .anyMatch(pref -> plante.getProperties().contains(pref) || plante.getUses().contains(pref)))
                    .collect(Collectors.toList());
        }

        // Exclude plants based on medical history
        if (request.getAntecedentsMedicaux() != null && !request.getAntecedentsMedicaux().isEmpty()) {
            recommandations = recommandations.stream()
                    .filter(plante -> request.getAntecedentsMedicaux().stream()
                            .noneMatch(antecedent -> plante.getPrecautions().contains(antecedent)))
                    .collect(Collectors.toList());
        }

        return recommandations;
    }
}
