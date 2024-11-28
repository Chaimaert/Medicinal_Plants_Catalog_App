package com.example.Plantes.Controller;

import com.example.Plantes.Entities.Plante;
import com.example.Plantes.dto.UserRequest; // Importer la classe UserRequest
import com.example.Plantes.Service.RecommandationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plantes/recommandations")
public class RecommandationController {

    @Autowired
    private RecommandationService recommandationService;

    @PostMapping
    public List<Plante> obtenirRecommandations(@RequestBody UserRequest request) {
        return recommandationService.genererRecommandations(request);
    }
}