package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.service.PlanteService;
import com.example.plantes.catalogueplantesapplication.dto.CommentaireDTO;
import com.example.plantes.catalogueplantesapplication.dto.PlanteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plantes")
public class PlanteController {

    @Autowired
    private PlanteService planteService;

    @GetMapping // Handles GET requests to /plantes
    public List<Plante> getAllPlantes() {
        return planteService.getAllPlantes();
    }

    // Obtenir les détails d'une plante par ID
    @GetMapping("/{id}")
    public ResponseEntity<PlanteDTO> getDetails(@PathVariable Long id) {
        Optional<Plante> planteOpt = planteService.findById(id);
        if (planteOpt.isPresent()) {
            Plante plante = planteOpt.get();
            List<CommentaireDTO> commentairesDTO = plante.getComments().stream()
                    .map(commentaire -> new CommentaireDTO(commentaire.getId(), commentaire.getNom(), commentaire.getContenu()))
                    .collect(Collectors.toList());

            // Créer et retourner un DTO pour la plante avec tous les attributs
            PlanteDTO planteDTO = new PlanteDTO(
                    plante.getId(),
                    plante.getName(),
                    plante.getDescription(),
                    plante.getProperties(),
                    plante.getUses(),
                    plante.getPrecautions(),
                    plante.getInteractions(),
                    commentairesDTO,
                    plante.getImages(),
                    plante.getVideos(),
                    plante.getArticles(),
                    plante.getRegion()
            );
            return ResponseEntity.ok(planteDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Recherche plantes
    @GetMapping("/recherche-avancee")
    public List<Plante> rechercheAvancee(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) List<String> proprietes,
            @RequestParam(required = false) List<String> utilisations,
            @RequestParam(required = false) String region) {
        return planteService.rechercheAvancee(nom, proprietes, utilisations, region);
    }

    // Générer des recommandations basées sur un besoin de santé
    @GetMapping("/recommandations")
    public List<Plante> genererRecommandations(@RequestParam String besoinDeSante) {
        return planteService.genererRecommandations(besoinDeSante);
    }
}