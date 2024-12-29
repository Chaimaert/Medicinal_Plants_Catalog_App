package com.example.plantes.catalogueplantesapplication.service;

import com.example.plantes.catalogueplantesapplication.entities.Commentaire;
import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.exceptions.PlanteNotFoundException;
import com.example.plantes.catalogueplantesapplication.repository.CommentaireRepository;
import com.example.plantes.catalogueplantesapplication.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlanteService {

    private static final String PLANTE_NOT_FOUND_MESSAGE = "Plante non trouvée avec ID : ";

    @Autowired
    private PlantRepository planteRepository;

    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Plante> getAllPlantes() {
        return planteRepository.findAll();
    }

    public Plante getDetails(Long id) {
        Plante plante = planteRepository.findById(id)
                .orElseThrow(() -> new PlanteNotFoundException(PLANTE_NOT_FOUND_MESSAGE + id));
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
                .orElseThrow(() -> new PlanteNotFoundException(PLANTE_NOT_FOUND_MESSAGE + id));

        if (planteDetails.getName() != null) {
            existingPlante.setName(planteDetails.getName());
        }
        if (planteDetails.getDescription() != null) {
            existingPlante.setDescription(planteDetails.getDescription());
        }
        if (planteDetails.getProperties() != null) {
            existingPlante.setProperties(planteDetails.getProperties());
        }
        if (planteDetails.getUses() != null) {
            existingPlante.setUses(planteDetails.getUses());
        }
        if (planteDetails.getRegion() != null) {
            existingPlante.setRegion(planteDetails.getRegion());
        }
        if (planteDetails.getImages() != null) {
            existingPlante.setImages(planteDetails.getImages());
        }
        if (planteDetails.getVideos() != null) {
            existingPlante.setVideos(planteDetails.getVideos());
        }
        if (planteDetails.getPrecautions() != null) {
            existingPlante.setPrecautions(planteDetails.getPrecautions());
        }
        if (planteDetails.getInteractions() != null) {
            existingPlante.setInteractions(planteDetails.getInteractions());
        }
        if (planteDetails.getArticles() != null) {
            existingPlante.setArticles(planteDetails.getArticles());
        }

        return planteRepository.save(existingPlante);
    }

    public void deletePlante(Long id) {
        if (!planteRepository.existsById(id)) {
            throw new PlanteNotFoundException(PLANTE_NOT_FOUND_MESSAGE + id);
        }
        planteRepository.deleteById(id);
    }

    public Optional<Plante> findById(Long id) {
        return planteRepository.findById(id);
    }
}

