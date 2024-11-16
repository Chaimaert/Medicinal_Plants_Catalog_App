package com.example.Plantes.Controller;

import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Service.PlanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Plante getDetails(@PathVariable Long id) {
        return planteService.getDetails(id);
    }

    // Recherche avancée de plantes
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