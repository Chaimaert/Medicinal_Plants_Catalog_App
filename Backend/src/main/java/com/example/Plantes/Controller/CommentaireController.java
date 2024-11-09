package com.example.Plantes.Controller;

import com.example.Plantes.Entities.Commentaire;
import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plantes")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // Obtenir les commentaires d'une plante spécifique
    @GetMapping("/{planteId}/commentaires")
    public List<Commentaire> getCommentaires(@PathVariable Long planteId) {
        return commentaireService.getCommentairesByPlanteId(planteId);
    }

    // Ajouter un commentaire à une plante
    @PostMapping("/{planteId}/commentaires")
    public void ajouterCommentaire(@PathVariable Long planteId, @RequestBody Commentaire commentaire) {
        commentaire.setPlante(new Plante(planteId)); // Associe le commentaire à la plante
        commentaireService.ajouterCommentaire(commentaire);
    }
}
