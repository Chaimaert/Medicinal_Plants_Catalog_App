package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.entities.Commentaire;
import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.service.CommentaireService;
import com.example.plantes.catalogueplantesapplication.dto.CommentaireDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plantes")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // Obtenir les commentaires d'une plante spécifique
    @GetMapping("/{planteId}/commentaires")
    public List<CommentaireDTO> getCommentaires(@PathVariable Long planteId) {
        List<Commentaire> commentaires = commentaireService.getCommentairesByPlanteId(planteId);
        return commentaires.stream()
                .map(commentaire -> new CommentaireDTO(commentaire.getId(), commentaire.getNom(), commentaire.getContenu()))
                .collect(Collectors.toList());
    }

    // Ajouter un commentaire à une plante
    @PostMapping("/{planteId}/commentaires")
    public void ajouterCommentaire(@PathVariable Long planteId, @RequestBody Commentaire commentaire) {
        commentaire.setPlante(new Plante(planteId)); // Associe le commentaire à la plante
        commentaireService.ajouterCommentaire(commentaire);
    }
}
