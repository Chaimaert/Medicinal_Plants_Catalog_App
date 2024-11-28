package com.example.Plantes.Service;

import com.example.Plantes.Entities.Commentaire;
import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Repository.CommentaireRepository;
import com.example.Plantes.Repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlanteService {

    @Autowired
    private PlantRepository planteRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Plante> getAllPlantes() {
        return planteRepository.findAll(); // Ensure proper data retrieval
    }

    public Plante getDetails(Long id) {
        Plante plante = planteRepository.findById(id).orElse(null);
        if (plante != null) {
            List<Commentaire> commentaires = commentaireRepository.findByPlanteId(id);
            plante.setComments(commentaires);

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
        return plante;
    }

    public List<Plante> rechercheAvancee(String nom, List<String> proprietes, List<String> utilisations, String region) {
        return planteRepository.findByAllIgnoreCase(nom, proprietes, utilisations, region);
    }

    public List<Plante> genererRecommandations(String besoinDeSante) {
        if (besoinDeSante == null || besoinDeSante.trim().isEmpty()) {
            return new ArrayList<>();
        }
        return planteRepository.findByUsesContaining(besoinDeSante);
    }

    public Plante addPlante(Plante plante) {
        return planteRepository.save(plante);
    }

    public Plante updatePlante(Long id, Plante planteDetails) {
        Plante existingPlante = planteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found with ID: " + id));

        existingPlante.setName(planteDetails.getName());
        existingPlante.setDescription(planteDetails.getDescription());
        existingPlante.setProperties(planteDetails.getProperties());
        existingPlante.setUses(planteDetails.getUses());
        existingPlante.setRegion(planteDetails.getRegion());
        existingPlante.setImages(planteDetails.getImages());
        existingPlante.setVideos(planteDetails.getVideos());
        existingPlante.setPrecautions(planteDetails.getPrecautions());
        existingPlante.setInteractions(planteDetails.getInteractions());

        return planteRepository.save(existingPlante);
    }

    public void deletePlante(Long id) {
        if (!planteRepository.existsById(id)) {
            throw new RuntimeException("Plant not found with ID: " + id);
        }
        planteRepository.deleteById(id);
    }
}

