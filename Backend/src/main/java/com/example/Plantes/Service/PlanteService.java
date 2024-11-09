package com.example.Plantes.Service;

import com.example.Plantes.Entities.Commentaire;
import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Repository.CommentaireRepository;
import com.example.Plantes.Repository.PlanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlanteService {

    @Autowired
    private PlanteRepository planteRepository;

    @Autowired
    private CommentaireRepository commentaireRepository;

    // Obtenir les détails d'une plante par ID
    public Plante getDetails(Long id) {
        // Récupérer la plante par son ID
        Plante plante = planteRepository.findById(id).orElse(null);
        if (plante != null) {
            // Récupérer les commentaires associés à la plante
            List<Commentaire> commentaires = commentaireRepository.findByPlanteId(id);
            plante.setComments(commentaires);

            // Initialisation des listes si elles sont nulles
            if (plante.getImages() == null) {
                plante.setImages(new ArrayList<>());
            }
            if (plante.getVideos() == null) {
                plante.setVideos(new ArrayList<>());
            }
            if (plante.getPrecautions() == null) {
                plante.setPrecautions(new ArrayList<>());
            }
            if (plante.getInteractions() == null) {
                plante.setInteractions(new ArrayList<>());
            }
        }
        return plante; // Retourner les détails de la plante
    }

    // Recherche avancée de plantes
    public List<Plante> rechercheAvancee(String nom, List<String> proprietes, List<String> utilisations, String region) {
        return planteRepository.findByAllIgnoreCase(nom,  proprietes, utilisations,region);
    }

    // Générer des recommandations basées sur un besoin de santé
    public List<Plante> genererRecommandations(String besoinDeSante) {
        if (besoinDeSante == null || besoinDeSante.trim().isEmpty()) {
            return new ArrayList<>(); // Retourner une liste vide si le besoin de santé n'est pas spécifié
        }
        // Filtrer les plantes dont les utilisations contiennent le besoin de santé
        return planteRepository.findByUsesContaining(besoinDeSante);
    }
}
