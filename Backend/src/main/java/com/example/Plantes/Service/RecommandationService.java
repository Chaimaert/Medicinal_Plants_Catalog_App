package com.example.Plantes.Service;

import com.example.Plantes.Entities.Plante;
import com.example.Plantes.dto.UserRequest; // Importer la classe UserRequest
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommandationService {

    @Autowired
    private PlanteService planteService; // Injecter le PlanteService

    /**
     * Cette méthode génère des recommandations de plantes en fonction des besoins de santé,
     * des préférences et des antécédents médicaux de l'utilisateur.
     *
     * @param request Les informations de l'utilisateur pour générer des recommandations.
     * @return Une liste de plantes recommandées.
     */
    public List<Plante> genererRecommandations(UserRequest request) {
        List<Plante> recommandations = planteService.genererRecommandations(request.getBesoinDeSante());

        // Filtrer les recommandations en fonction des préférences
        if (request.getPreferences() != null && !request.getPreferences().isEmpty()) {
            recommandations = recommandations.stream()
                    .filter(plante -> request.getPreferences().stream()
                            .anyMatch(pref -> plante.getProperties().contains(pref) || plante.getUses().contains(pref)))
                    .collect(Collectors.toList());
        }

        // Exclure les plantes en fonction des antécédents médicaux
        if (request.getAntecedentsMedicaux() != null && !request.getAntecedentsMedicaux().isEmpty()) {
            recommandations = recommandations.stream()
                    .filter(plante -> request.getAntecedentsMedicaux().stream()
                            .noneMatch(antecedent -> plante.getPrecautions().contains(antecedent)))
                    .collect(Collectors.toList());
        }

        return recommandations;
    }
}