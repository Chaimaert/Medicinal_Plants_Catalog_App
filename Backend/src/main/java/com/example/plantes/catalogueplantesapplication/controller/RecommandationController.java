package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.dto.UserRequest;
import com.example.plantes.catalogueplantesapplication.service.RecommandationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plantes/recommandations")
public class RecommandationController {

    private static final Logger logger = LoggerFactory.getLogger(RecommandationController.class);

    @Autowired
    private RecommandationService recommandationService;

    @PostMapping
    public List<Plante> obtenirRecommandations(@RequestBody UserRequest request) {
        logger.info("Received request: {}", request);

        List<Plante> recommandations = recommandationService.genererRecommandations(request);

        logger.info("Recommandations generated: {}", recommandations);
        return recommandations;
    }
}
